import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UrlEncoderTool from '../../components/tools/UrlEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'URL Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode URLs to handle special characters. Free online URL encoder/decoder tool.',
  keywords: ['url encoder', 'url decoder', 'percent encoding', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/url-encoder',
  },
  openGraph: {
    title: 'URL Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode URLs to handle special characters. Free online URL encoder/decoder tool.',
    url: 'https://thetool.guru/tools/url-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'URL Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode URLs to handle special characters. Free online URL encoder/decoder tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const UrlEncoderPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <UrlEncoderTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="URL Encoder/Decoder"
          description="Encode or decode URL components with percent-encoding (e.g. space to %20). Essential for query strings, form data, and APIs. All processing in your browser."
          features={[
            "Encode text for URLs",
            "Decode percent-encoded URLs",
            "Handle spaces, symbols, Unicode",
            "Copy result",
            "Works in your browser"
          ]}
          howToUse={[
            "Enter text to encode or URL/string to decode",
            "Click Encode or Decode",
            "Copy result into your URL or code"
          ]}
          useCases={[
            "Build query strings",
            "Encode form data",
            "Decode URLs from logs or APIs",
            "OAuth or API parameters"
          ]}
          tips={[
            "Spaces: %20 or + in query strings. Encode only the parts that need it.",
            "Decoding twice is usually safe; encoding twice can over-encode."
          ]}
          faq={[
            { question: "What is percent-encoding?", answer: "Unsafe characters are replaced with % plus two hex digits (e.g. space becomes %20)." },
            { question: "When should I encode?", answer: "When building URLs with user input, query parameters, or non-ASCII. Decode when reading URLs to get original text." },
            { question: "%20 or + for space?", answer: "In query strings both are valid. + is common in form encoding. In path segments use %20." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="url-encoder" />
    </Body>
    <Footer />
  </div>
);

export default UrlEncoderPage;
