import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BinaryEncoderTool from '../../components/tools/BinaryEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Binary Encoder/Decoder — The Tool Guru',
  description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
  keywords: ['binary', 'encoder', 'decoder', 'convert', 'utf-8', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/binary-encoder',
  },
  openGraph: {
    title: 'Binary Encoder/Decoder — The Tool Guru',
    description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
    url: 'https://thetool.guru/tools/binary-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Binary Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binary Encoder/Decoder — The Tool Guru',
    description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const BinaryEncoderPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <BinaryEncoderTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Binary Encoder/Decoder"
          description="Convert text to binary and decode binary back to text. Our binary encoder uses UTF-8 encoding so you can encode and decode any Unicode characters. All processing runs in your browser—nothing is sent to servers. Perfect for learning binary, debugging encoding, or working with binary data in programming and digital systems."
          features={[
            "Encode text to binary (UTF-8)",
            "Decode binary back to text",
            "Support for Unicode and special characters",
            "Real-time encoding and decoding",
            "Copy result to clipboard",
            "Works entirely in your browser",
            "No data sent to servers"
          ]}
          howToUse={[
            "Enter or paste text to encode, or binary to decode",
            "Click Encode to convert text to binary",
            "Click Decode to convert binary to text",
            "View the result and use copy if needed",
            "Switch between encode and decode as needed"
          ]}
          useCases={[
            "Learn how text is represented in binary",
            "Encode messages for exercises or puzzles",
            "Decode binary from logs or protocols",
            "Debug character encoding issues",
            "Teach or learn ASCII/UTF-8",
            "Convert between text and binary for APIs",
            "Verify binary representation of strings",
            "Work with binary data in development"
          ]}
          tips={[
            "UTF-8 uses 1–4 bytes per character depending on the character",
            "ASCII characters (e.g. A–Z, 0–9) use one byte in UTF-8",
            "Binary is shown as 0s and 1s; each byte is 8 bits",
            "Invalid binary input will show an error when decoding"
          ]}
          faq={[
            {
              question: "What encoding does the binary use?",
              answer: "The tool uses UTF-8 encoding. UTF-8 can represent all Unicode characters and is the standard encoding for the web and most systems."
            },
            {
              question: "Why does one character produce multiple bytes?",
              answer: "In UTF-8, common ASCII characters use 1 byte, but many other characters (e.g. accented letters, emoji) use 2–4 bytes. That's why one character can become several bytes of binary."
            },
            {
              question: "Is this the same as Base64?",
              answer: "No. Binary encoding turns each character into its raw bit representation (0s and 1s). Base64 turns data into a different text format (A–Z, a–z, 0–9, +, /) and is often used for embedding binary in text."
            },
            {
              question: "Can I decode any sequence of 0s and 1s?",
              answer: "The input must be valid UTF-8: multiples of 8 bits (bytes) that form valid character sequences. Invalid sequences will cause a decode error."
            }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="binary-encoder" />
    </Body>
    <Footer />
  </div>
);

export default BinaryEncoderPage;
