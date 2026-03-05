import { NextResponse } from 'next/server';
import { transcribe as apiTranscribe } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request) {
  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'Transcription is not configured. Set TOOL_GURU_API_URL.' },
      { status: 503 }
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') || formData.get('audio');
  if (!file || typeof file.arrayBuffer !== 'function') {
    return NextResponse.json({ error: 'No audio file provided. Use field "file" or "audio".' }, { status: 400 });
  }

  try {
    const data = await apiTranscribe(formData);
    const text = data.text ?? data.transcript ?? '';
    return NextResponse.json({ text, ...data });
  } catch (err) {
    const status = err.status ?? 500;
    const message = err.detail ?? err.message ?? 'Transcription failed';
    if (status === 503) {
      return NextResponse.json(
        { error: 'Transcription service unavailable. Whisper may not be installed on the server.' },
        { status: 503 }
      );
    }
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
    }
    if (status === 413) {
      return NextResponse.json(
        { error: message || 'File too large. Maximum size is 25 MB.' },
        { status: 413 }
      );
    }
    if (status === 422) {
      return NextResponse.json({ error: message || 'No speech detected in the audio.' }, { status: 422 });
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
