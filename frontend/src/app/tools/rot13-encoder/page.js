import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Rot13EncoderTool from '../../components/tools/Rot13EncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'ROT13 Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
  keywords: ['rot13', 'encode', 'decode', 'cipher', 'caesar', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/rot13-encoder',
  },
  openGraph: {
    title: 'ROT13 Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
    url: 'https://thetool.guru/tools/rot13-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'ROT13 Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROT13 Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const Rot13Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <Rot13EncoderTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="ROT13 Encoder/Decoder"
          description="Encode or decode text with the ROT13 cipher. ROT13 shifts each letter by 13 positions in the alphabet (A→N, B→O, etc.), so encoding and decoding are the same operation. It's not encryption—it's used for hiding spoilers, obfuscating jokes, or simple puzzles. All processing runs in your browser."
          features={[
            "Encode and decode ROT13 (same operation)",
            "Handles uppercase and lowercase",
            "Leaves numbers and symbols unchanged",
            "Instant conversion as you type",
            "Copy result to clipboard",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Enter or paste text to encode or decode",
            "Click Encode/Decode (ROT13 is reversible with the same action)",
            "View the result and copy if needed",
            "Use for spoilers, puzzles, or simple obfuscation"
          ]}
          useCases={[
            "Hide spoilers in forum posts",
            "Obfuscate punchlines or answers",
            "Simple cipher puzzles and education",
            "Legacy compatibility (e.g. Usenet)",
            "Lightweight text scrambling"
          ]}
          tips={[
            "ROT13 only affects A–Z and a–z; numbers and punctuation stay the same",
            "Applying ROT13 twice returns the original text",
            "ROT13 is not secure; anyone can decode it instantly",
            "Use for fun or spoilers, not for real secrecy"
          ]}
          faq={[
            {
              question: "What is ROT13?",
              answer: "ROT13 (rotate by 13) is a letter substitution cipher that replaces each letter with the letter 13 positions later in the alphabet. Because the alphabet has 26 letters, applying ROT13 twice gives you the original text."
            },
            {
              question: "Is ROT13 encryption?",
              answer: "No. ROT13 provides no security—it's trivially reversible. It's used for hiding spoilers or making text slightly harder to read at a glance, not for protecting sensitive data."
            },
            {
              question: "Why does encode and decode do the same thing?",
              answer: "Since rotating by 13 twice brings you back to the start (13+13=26), encoding and decoding are the same operation. One click encodes; another click decodes."
            },
            {
              question: "Does ROT13 work on numbers?",
              answer: "No. ROT13 only shifts letters A–Z and a–z. Numbers, spaces, and punctuation are left unchanged."
            }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="rot13-encoder" />
    </Body>
    <Footer />
  </div>
);

export default Rot13Page;
