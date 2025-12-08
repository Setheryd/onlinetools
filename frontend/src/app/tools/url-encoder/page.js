import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UrlEncoderTool from '../../components/tools/UrlEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'URL Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode URLs to handle special characters. Free online URL encoder/decoder tool.',
  keywords: ['url encoder', 'url decoder', 'percent encoding', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'URL Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode URLs to handle special characters.',
  },
}

const UrlEncoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <UrlEncoderTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="URL Encoder/Decoder"
            description="Encode and decode URLs using percent-encoding (URL encoding) to handle special characters safely. URL encoding converts special characters into a format that can be transmitted over the internet, ensuring URLs are valid and functional. Essential for web developers, API developers, and anyone working with URLs that contain special characters, spaces, or non-ASCII characters."
            features={[
              "Encode URLs to percent-encoded format (e.g., %20 for space)",
              "Decode percent-encoded URLs back to readable format",
              "Handle special characters, spaces, and Unicode characters",
              "Encode/decode entire URLs or just specific parts",
              "Real-time encoding and decoding as you type",
              "Copy encoded or decoded URLs to clipboard",
              "Support for all URL-safe and unsafe characters",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter or paste the URL or text you want to encode or decode",
              "Click 'Encode' to convert special characters to percent-encoded format",
              "Click 'Decode' to convert percent-encoded text back to readable format",
              "View the result in the output field",
              "Use the copy button to copy the encoded or decoded URL",
              "Switch between encode and decode modes as needed"
            ]}
            useCases={[
              "Encode URLs with special characters for web applications",
              "Decode URLs received from APIs or web services",
              "Handle URLs with spaces, ampersands, and other special characters",
              "Encode query parameters in URLs for proper transmission",
              "Decode URLs from email links or shared content",
              "Prepare URLs for use in HTML attributes and JavaScript",
              "Encode file paths and filenames in URLs",
              "Handle international characters (Unicode) in URLs"
            ]}
            tips={[
              "Always encode URLs before using them in web applications",
              "Spaces in URLs should be encoded as %20 or +",
              "Special characters like &, =, ?, # have specific meanings in URLs",
              "Only encode the parts of URLs that need encoding (usually query parameters)",
              "Decode URLs when displaying them to users for readability",
              "Use URL encoding for API requests to ensure proper transmission",
              "Be careful not to double-encode URLs (encoding already encoded URLs)"
            ]}
            faq={[
              {
                question: "What is URL encoding?",
                answer: "URL encoding (percent-encoding) converts special characters into a format using % followed by two hexadecimal digits. For example, a space becomes %20."
              },
              {
                question: "When should I encode a URL?",
                answer: "Encode URLs when they contain special characters, spaces, or non-ASCII characters. This is especially important for query parameters and file paths."
              },
              {
                question: "What's the difference between encoding and decoding?",
                answer: "Encoding converts readable text to percent-encoded format (e.g., 'hello world' → 'hello%20world'). Decoding reverses this process."
              },
              {
                question: "Can I encode the entire URL?",
                answer: "You can encode entire URLs, but typically only specific parts (like query parameters) need encoding. The protocol (http://) and domain usually don't need encoding."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default UrlEncoderPage;


