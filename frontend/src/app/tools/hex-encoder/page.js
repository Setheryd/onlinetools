import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HexEncoderTool from '../../components/tools/HexEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Hex Encoder/Decoder — The Tool Guru',
  description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
  keywords: ['hex', 'encoder', 'decoder', 'convert', 'utf-8', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/hex-encoder',
  },
  openGraph: {
    title: 'Hex Encoder/Decoder — The Tool Guru',
    description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
    url: 'https://thetool.guru/tools/hex-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Hex Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hex Encoder/Decoder — The Tool Guru',
    description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const HexEncoderPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <HexEncoderTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Hex Encoder/Decoder"
          description="Convert text to hexadecimal and decode hex back to text. Uses UTF-8. Common in programming and debugging. All processing runs in your browser."
          features={[
            "Encode text to hex (UTF-8)",
            "Decode hex back to text",
            "Unicode support",
            "Copy result to clipboard",
            "Works in your browser"
          ]}
          howToUse={[
            "Enter text to encode or hex to decode",
            "Click Encode or Decode",
            "Copy the result as needed"
          ]}
          useCases={[
            "Debug string encoding",
            "Encode/decode hex from logs or APIs",
            "Work with color codes",
            "Teach or learn hexadecimal"
          ]}
          tips={[
            "Two hex digits = one byte. UTF-8 may use multiple bytes per character.",
            "Spaces in hex input are often ignored when decoding."
          ]}
          faq={[
            { question: "What encoding is used?", answer: "UTF-8. Each character is converted to its UTF-8 bytes, then each byte is shown as two hex digits." },
            { question: "How is this different from Base64?", answer: "Hex uses 0-9 and A-F; two chars per byte. Base64 is more compact. Hex is easier for debugging." },
            { question: "Can I decode any hex string?", answer: "Use an even number of hex digits (each byte = 2 digits) and valid UTF-8 for correct text output." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="hex-encoder" />
    </Body>
    <Footer />
  </div>
);

export default HexEncoderPage;
