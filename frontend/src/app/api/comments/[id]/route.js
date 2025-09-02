import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { filterProfanity } from '../../../../utils/contentModeration';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content || content.length > 1000) {
      return NextResponse.json(
        { error: 'Valid content (max 1000 characters) is required' },
        { status: 400 }
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

    // Update comment in Supabase
    const { data: updatedComment, error } = await supabase
      .from('comments')
      .update({
        content: moderatedContent,
        edited: true
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      return NextResponse.json(
        { error: 'Comment not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Soft delete comment in Supabase
    const { error } = await supabase
      .from('comments')
      .update({ deleted: true })
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { error: 'Comment not found or delete failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
