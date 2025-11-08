import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Rot13EncoderTool from '../../components/tools/Rot13EncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'ROT13 Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
  keywords: ['rot13', 'encode', 'decode', 'cipher', 'caesar', 'the tool guru'],
  openGraph: {
    title: 'ROT13 Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
  },
}

const Rot13Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <Rot13EncoderTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="ROT13 Encoder/Decoder"
            description="Encode and decode text using the ROT13 cipher. ROT13 (rotate by 13 places) is a simple letter substitution cipher that shifts each letter 13 positions in the alphabet. It's a special case of the Caesar cipher and is its own inverse - encoding and decoding use the same operation. ROT13 is commonly used for simple text obfuscation, hiding spoilers, and light text scrambling."
            features={[
              "Encode text using ROT13 cipher",
              "Decode ROT13-encoded text (same operation as encoding)",
              "Handle both uppercase and lowercase letters",
              "Preserve numbers, punctuation, and spaces",
              "Real-time encoding and decoding",
              "Copy encoded or decoded text to clipboard",
              "Works entirely in your browser",
              "No data sent to servers - all processing is local"
            ]}
            howToUse={[
              "Enter or paste the text you want to encode",
              "Click 'Encode' to apply ROT13 cipher",
              "View the encoded output (e.g., 'Hello' becomes 'Uryyb')",
              "To decode, paste ROT13-encoded text and click 'Decode' (or 'Encode' again)",
              "Use the copy button to copy encoded or decoded text",
              "Note: Encoding and decoding are the same operation in ROT13"
            ]}
            useCases={[
              "Obfuscate text for simple hiding (not security)",
              "Hide spoilers in online discussions",
              "Create simple puzzles and games",
              "Learn about basic cipher algorithms",
              "Scramble text for fun or educational purposes",
              "Hide answers to quiz questions",
              "Create simple text obfuscation for non-sensitive content",
              "Demonstrate basic cryptography concepts"
            ]}
            tips={[
              "ROT13 is its own inverse - encoding twice returns the original text",
              "ROT13 only affects letters (A-Z, a-z), leaving numbers and punctuation unchanged",
              "ROT13 is NOT encryption - it provides no security, only simple obfuscation",
              "Commonly used in online forums to hide spoilers",
              "Each letter is shifted 13 positions: A→N, B→O, M→Z, etc.",
              "Use ROT13 for fun or learning, not for actual security",
              "Remember that ROT13 is easily reversible by anyone"
            ]}
            faq={[
              {
                question: "What is ROT13?",
                answer: "ROT13 is a simple substitution cipher that shifts each letter 13 positions in the alphabet. It's a special case of the Caesar cipher and is its own inverse - applying ROT13 twice returns the original text."
              },
              {
                question: "Is ROT13 secure?",
                answer: "No, ROT13 provides no security. It's simple obfuscation that can be easily reversed by anyone. Never use ROT13 for actual encryption or security purposes."
              },
              {
                question: "Why is ROT13 its own inverse?",
                answer: "Because the alphabet has 26 letters, shifting by 13 positions twice brings you back to the original letter. Encoding and decoding use the same operation."
              },
              {
                question: "What characters does ROT13 affect?",
                answer: "ROT13 only affects letters (A-Z and a-z). Numbers, punctuation, spaces, and special characters remain unchanged."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default Rot13Page;


