import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HexEncoderTool from '../../components/tools/HexEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Hex Encoder/Decoder — The Tool Guru',
  description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
  keywords: ['hex', 'encoder', 'decoder', 'convert', 'utf-8', 'the tool guru'],
  openGraph: {
    title: 'Hex Encoder/Decoder — The Tool Guru',
    description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
  },
}

const HexEncoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <HexEncoderTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Hex Encoder/Decoder"
            description="Convert text to hexadecimal (hex) encoding and decode hex back to text. Hexadecimal encoding represents each character as a pair of hexadecimal digits (0-9, A-F). This is useful for debugging, data analysis, low-level programming, and working with binary data. Our tool supports UTF-8 encoding, ensuring proper handling of international characters."
            features={[
              "Encode text to hexadecimal format",
              "Decode hexadecimal strings back to text",
              "Support for UTF-8 and Unicode characters",
              "Real-time encoding and decoding",
              "Copy hex or decoded text to clipboard",
              "Handle spaces and formatting in hex strings",
              "Works entirely in your browser",
              "No data sent to servers - all processing is local"
            ]}
            howToUse={[
              "Enter or paste the text you want to encode",
              "Click 'Encode' to convert text to hexadecimal",
              "View the hex output (e.g., '48 65 6C 6C 6F' for 'Hello')",
              "To decode, paste a hex string and click 'Decode'",
              "Use the copy button to copy hex or decoded text",
              "Switch between encode and decode modes as needed"
            ]}
            useCases={[
              "Debug binary data and memory dumps",
              "Analyze file contents in hexadecimal format",
              "Convert text for low-level programming",
              "Encode data for network protocols",
              "Decode hex strings from logs or debugging output",
              "Work with binary file formats",
              "Analyze character encoding issues",
              "Convert text for embedded systems programming"
            ]}
            tips={[
              "Hexadecimal uses base-16 (0-9, A-F) to represent bytes",
              "Each byte is represented as two hex digits (00-FF)",
              "Hex strings can include spaces or be continuous",
              "UTF-8 encoding ensures proper handling of Unicode characters",
              "Use hex encoding for debugging binary data",
              "Hex is commonly used in memory addresses and file formats",
              "Remember that hex encoding is not encryption - it's easily reversible"
            ]}
            faq={[
              {
                question: "What is hexadecimal encoding?",
                answer: "Hexadecimal (hex) encoding represents each byte of data as two hexadecimal digits (0-9, A-F). For example, the letter 'A' is represented as '41' in hex."
              },
              {
                question: "How is hex different from binary?",
                answer: "Binary uses base-2 (0s and 1s), while hex uses base-16 (0-9, A-F). Hex is more compact - one hex digit represents 4 bits, so two hex digits represent one byte."
              },
              {
                question: "Can I decode hex with spaces?",
                answer: "Yes, the tool handles hex strings with or without spaces. Spaces are automatically ignored during decoding."
              },
              {
                question: "Does hex encoding support Unicode?",
                answer: "Yes, our tool uses UTF-8 encoding, which properly handles Unicode characters. Each character is encoded to its UTF-8 byte representation in hex."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default HexEncoderPage;


