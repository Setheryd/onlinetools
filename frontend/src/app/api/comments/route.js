import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { filterProfanity } from '../../../utils/contentModeration';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const toolId = searchParams.get('toolId');

  if (!toolId) {
    return NextResponse.json(
      { error: 'Tool ID is required' },
      { status: 400 }
    );
  }

  try {
    // Get comments from Supabase
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('tool_id', toolId)
      .eq('deleted', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      comments: comments || [],
      total: comments?.length || 0
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { toolId, content, userStageName } = body;

    // Validation
    if (!toolId || !content || !userStageName) {
      return NextResponse.json(
        { error: 'Tool ID, content, and user stage name are required' },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: 'Comment content must be less than 1000 characters' },
        { status: 400 }
      );
    }

    // Rate limiting check
    const { data: recentComments, error: rateLimitError } = await supabase
      .from('rate_limits')
      .select('count')
      .eq('identifier', `${userStageName}_${toolId}_comment`)
      .eq('action', 'post')
      .gte('window_start', new Date(Date.now() - 60000).toISOString()); // 1 minute

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    }

    const currentCount = recentComments?.[0]?.count || 0;
    if (currentCount >= 3) {
      return NextResponse.json(
        { error: 'You are posting too quickly. Please wait a moment.' },
        { status: 429 }
      );
    }

    // Content moderation
    const moderatedContent = filterProfanity(content);
    if (moderatedContent !== content) {
      return NextResponse.json(
        { error: 'Comment contains inappropriate language. Please revise and try again.' },
        { status: 400 }
      );
    }

    // Create new comment
    const { data: newComment, error: insertError } = await supabase
      .from('comments')
      .insert({
        tool_id: toolId,
        content: moderatedContent,
        user_stage_name: userStageName,
        user_ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        user_agent: request.headers.get('user-agent')
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      );
    }

    // Update rate limit
    await supabase
      .from('rate_limits')
      .upsert({
        identifier: `${userStageName}_${toolId}_comment`,
        action: 'post',
        count: currentCount + 1,
        window_start: new Date().toISOString()
      });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
