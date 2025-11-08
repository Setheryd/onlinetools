import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HtmlEncoderTool from '../../components/tools/HtmlEncoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'HTML Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode HTML entities and special characters. Free online HTML encoder/decoder tool.',
  keywords: ['html encoder', 'html decoder', 'entities', 'escape html', 'online tool'],
  openGraph: {
    title: 'HTML Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode HTML entities and special characters.',
  },
}

const HtmlEncoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <HtmlEncoderTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="HTML Encoder/Decoder"
            description="Encode and decode HTML entities and special characters safely. HTML encoding converts special characters like <, >, &, and quotes into their HTML entity equivalents (like &lt;, &gt;, &amp;), making text safe for display in HTML. Essential for web developers, content creators, and anyone working with HTML content that needs to display special characters correctly."
            features={[
              "Encode special characters to HTML entities",
              "Decode HTML entities back to readable text",
              "Handle all standard HTML entities (named and numeric)",
              "Encode quotes, brackets, ampersands, and other special characters",
              "Real-time encoding and decoding",
              "Copy encoded or decoded text to clipboard",
              "Support for Unicode characters",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter or paste the HTML text you want to encode or decode",
              "Click 'Encode' to convert special characters to HTML entities",
              "Click 'Decode' to convert HTML entities back to readable text",
              "View the result in the output field",
              "Use the copy button to copy the encoded or decoded text",
              "Switch between encode and decode modes as needed"
            ]}
            useCases={[
              "Encode user input before displaying in HTML to prevent XSS attacks",
              "Decode HTML entities from APIs or databases for display",
              "Prepare text content for safe HTML insertion",
              "Encode special characters in HTML attributes",
              "Decode HTML entities in email content",
              "Encode code examples for display in documentation",
              "Handle international characters in HTML content",
              "Prepare content for RSS feeds and XML documents"
            ]}
            tips={[
              "Always encode user-generated content before displaying in HTML",
              "HTML encoding helps prevent XSS (Cross-Site Scripting) attacks",
              "Common entities: &lt; (<), &gt; (>), &amp; (&), &quot; (\"), &#39; (')",
              "Numeric entities like &#65; represent characters by code point",
              "Decode HTML entities when processing content from external sources",
              "Use encoding when inserting text into HTML attributes",
              "Remember that HTML encoding is different from URL encoding"
            ]}
            faq={[
              {
                question: "What is HTML encoding?",
                answer: "HTML encoding converts special characters into HTML entities. For example, < becomes &lt; and & becomes &amp;. This prevents browsers from interpreting these characters as HTML code."
              },
              {
                question: "When should I encode HTML?",
                answer: "Encode HTML when displaying user-generated content, inserting text into HTML attributes, or when you need to display characters that have special meaning in HTML (<, >, &, quotes)."
              },
              {
                question: "What's the difference between encoding and escaping?",
                answer: "HTML encoding and escaping are often used interchangeably. Both convert special characters to HTML entities to make them safe for display in HTML."
              },
              {
                question: "Can HTML encoding prevent XSS attacks?",
                answer: "Yes, HTML encoding user input before displaying it helps prevent XSS attacks by ensuring that malicious scripts are displayed as text rather than executed as code."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default HtmlEncoderPage;


