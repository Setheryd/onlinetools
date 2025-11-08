import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BinaryEncoderTool from '../../components/tools/BinaryEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Binary Encoder/Decoder — The Tool Guru',
  description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
  keywords: ['binary', 'encoder', 'decoder', 'convert', 'utf-8', 'the tool guru'],
  openGraph: {
    title: 'Binary Encoder/Decoder — The Tool Guru',
    description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
  },
}

const BinaryEncoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <BinaryEncoderTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Binary Encoder/Decoder"
            description="Convert text to binary (0s and 1s) and decode binary back to text. Binary encoding represents each character as a sequence of 8 bits (bytes). This is useful for understanding how computers store text, learning about character encoding, debugging, and educational purposes. Our tool supports UTF-8 encoding for proper handling of all characters."
            features={[
              "Encode text to binary format (0s and 1s)",
              "Decode binary strings back to readable text",
              "Support for UTF-8 and Unicode characters",
              "Real-time encoding and decoding",
              "Copy binary or decoded text to clipboard",
              "Handle spaces in binary strings",
              "Works entirely in your browser",
              "No data sent to servers - all processing is local"
            ]}
            howToUse={[
              "Enter or paste the text you want to encode",
              "Click 'Encode' to convert text to binary",
              "View the binary output (e.g., '01001000 01100101 01101100 01101100 01101111' for 'Hello')",
              "To decode, paste a binary string and click 'Decode'",
              "Use the copy button to copy binary or decoded text",
              "Switch between encode and decode modes as needed"
            ]}
            useCases={[
              "Learn how computers store text as binary data",
              "Understand character encoding and ASCII/Unicode",
              "Debug binary data and file formats",
              "Educational purposes for computer science",
              "Analyze text at the bit level",
              "Convert text for low-level programming",
              "Decode binary strings from logs or debugging",
              "Work with binary protocols and file formats"
            ]}
            tips={[
              "Binary uses base-2 (only 0s and 1s) to represent data",
              "Each character is typically represented as 8 bits (1 byte)",
              "Binary strings can include spaces between bytes for readability",
              "UTF-8 encoding ensures proper handling of Unicode characters",
              "Binary is the fundamental representation of data in computers",
              "Use binary encoding for educational and debugging purposes",
              "Remember that binary encoding is not encryption - it's easily reversible"
            ]}
            faq={[
              {
                question: "What is binary encoding?",
                answer: "Binary encoding represents each character as a sequence of 0s and 1s (bits). Each character is typically 8 bits (1 byte). For example, 'A' is '01000001' in binary."
              },
              {
                question: "How many bits represent one character?",
                answer: "In standard ASCII, each character is 8 bits (1 byte). UTF-8 encoding uses 1-4 bytes per character depending on the character, with ASCII characters using 1 byte."
              },
              {
                question: "Can I decode binary with spaces?",
                answer: "Yes, the tool handles binary strings with or without spaces. Spaces between bytes are automatically ignored during decoding."
              },
              {
                question: "Why would I use binary encoding?",
                answer: "Binary encoding is useful for educational purposes, understanding how computers store data, debugging binary file formats, and learning about character encoding systems."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default BinaryEncoderPage;


