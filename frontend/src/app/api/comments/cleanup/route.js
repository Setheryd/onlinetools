import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
  try {
    // Call the cleanup function
    const { error } = await supabase.rpc('cleanup_rate_limits');

    if (error) {
      console.error('Cleanup error:', error);
      return NextResponse.json(
        { error: 'Failed to cleanup rate limits' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Rate limits cleaned up successfully' 
    });
  } catch (error) {
    console.error('Error during cleanup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
