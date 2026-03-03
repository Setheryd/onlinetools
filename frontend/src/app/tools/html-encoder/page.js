import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HtmlEncoderTool from '../../components/tools/HtmlEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'HTML Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode HTML entities and special characters. Free online HTML encoder/decoder tool.',
  keywords: ['html encoder', 'html decoder', 'entities', 'escape html', 'online tool'],
  alternates: {
    canonical: 'https://thetool.guru/tools/html-encoder',
  },
  openGraph: {
    title: 'HTML Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode HTML entities and special characters. Free online HTML encoder/decoder tool.',
    url: 'https://thetool.guru/tools/html-encoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'HTML Encoder/Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode HTML entities and special characters. Free online HTML encoder/decoder tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const HtmlEncoderPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <HtmlEncoderTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="HTML Encoder/Decoder"
          description="Encode or decode HTML entities (e.g. < to &lt;, « to &laquo;). Prevents XSS and displays special characters safely in HTML. Essential for web forms and user-generated content. All processing in your browser."
          features={[
            "Encode <, >, &, quotes to entities",
            "Decode HTML entities to characters",
            "Handle common and named entities",
            "Copy result",
            "Works in your browser"
          ]}
          howToUse={[
            "Enter text to encode or entity string to decode",
            "Click Encode or Decode",
            "Copy the result into your HTML or code"
          ]}
          useCases={[
            "Escape user input for safe HTML output",
            "Display code or special chars in HTML",
            "Decode entities from APIs or docs",
            "Prevent XSS when rendering user content"
          ]}
          tips={[
            "Always encode user input before inserting into HTML to prevent XSS.",
            "Common entities: < &lt; > &gt; & &amp; \" &quot; ' &#39;"
          ]}
          faq={[
            { question: "What are HTML entities?", answer: "Special sequences like &lt; that represent characters (e.g. <). Used to display <, >, &, and quotes safely in HTML." },
            { question: "When should I encode?", answer: "When inserting untrusted or user text into HTML. Encoding prevents the browser from interpreting it as tags or script (XSS)." },
            { question: "Decode vs encode?", answer: "Encode: turn < into &lt; for safe display. Decode: turn &lt; back into < when you have entity text and need plain characters." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="html-encoder" />
    </Body>
    <Footer />
  </div>
);

export default HtmlEncoderPage;
