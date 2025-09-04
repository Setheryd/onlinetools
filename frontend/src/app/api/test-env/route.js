import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return NextResponse.json({
    supabaseUrl: supabaseUrl ? 'Set' : 'Missing',
    supabaseKey: supabaseKey ? 'Set' : 'Missing',
    env: process.env.NODE_ENV,
    allEnv: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
  });
}
