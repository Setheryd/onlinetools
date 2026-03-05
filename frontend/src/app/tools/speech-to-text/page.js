import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TranscribeTool from '../../components/tools/TranscribeTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'Audio to Text (Transcribe) — The Tool Guru',
  description: 'Convert audio or video to text with server-side transcription. Upload MP3, WAV, M4A, or video files and get a transcript. Powered by Whisper.',
  keywords: ['speech to text', 'transcribe', 'audio to text', 'Whisper', 'transcript', 'voice recognition', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/speech-to-text',
  },
  openGraph: {
    title: 'Audio to Text (Transcribe) — The Tool Guru',
    description: 'Convert audio or video to text with server-side transcription. Upload MP3, WAV, M4A, or video files and get a transcript.',
    url: 'https://thetool.guru/tools/speech-to-text',
    siteName: 'The Tool Guru',
    images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Audio to Text — The Tool Guru' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audio to Text (Transcribe) — The Tool Guru',
    description: 'Convert audio or video to text with server-side transcription.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const SpeechToTextPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <TranscribeTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Audio to Text (Transcribe)"
          description="Upload an audio or video file and get a text transcript. The tool uses server-side speech recognition (e.g. Whisper) so it works with MP3, WAV, M4A, and common video formats. Ideal for meeting notes, captions, or turning voice into editable text."
          features={[
            'Upload audio or video and get a transcript',
            'Supports MP3, WAV, M4A, OGG, WebM, MP4',
            'Server-side processing—no browser limits',
            'Copy or download the transcript',
            'Useful for meetings, podcasts, and video content',
          ]}
          howToUse={[
            'Choose an audio or video file',
            'Click Transcribe',
            'Wait for the server to process (may take a minute for long files)',
            'Copy or download the transcript',
          ]}
          useCases={[
            'Meeting and interview notes',
            'Podcast and video captions',
            'Accessibility and subtitles',
            'Searchable archives of audio',
            'Turning voice memos into text',
          ]}
          tips={[
            'Clear audio gives better results. Background noise can reduce accuracy.',
            'If the service returns 503, the transcription engine may not be installed on the server.',
          ]}
        />
      </div>
      <CommentSection toolId="speech-to-text" toolName="Audio to Text (Transcribe)" />
      <RelatedToolsSection toolId="speech-to-text" />
    </Body>
    <Footer />
  </div>
);

export default SpeechToTextPage;
