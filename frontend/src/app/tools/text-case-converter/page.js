import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TextCaseConverterTool from '../../components/tools/TextCaseConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Text Case Converter — The Tool Guru',
  description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text converter.',
  keywords: ['text case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/text-case-converter',
  },
  openGraph: {
    title: 'Text Case Converter — The Tool Guru',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text converter.',
    url: 'https://thetool.guru/tools/text-case-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Text Case Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Case Converter — The Tool Guru',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text converter.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const TextCaseConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <TextCaseConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Text Case Converter"
          description="Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more. Fix caps, format for code or headings, or normalize text. Instant conversion in your browser."
          features={["UPPERCASE, lowercase, Title Case", "camelCase, snake_case, kebab-case", "Sentence case", "Copy result", "Works in browser"]}
          howToUse={["Paste or type text", "Choose target case", "Copy the result"]}
          useCases={["Code (variables, constants)", "Headings and titles", "Normalize data", "Fix CAPS LOCK text"]}
          tips={["Title Case capitalizes major words. Sentence case capitalizes first word only."]}
          faq={[
            { question: "What is camelCase?", answer: "Words joined, first word lowercase, rest capitalized: myVariableName." },
            { question: "What is snake_case?", answer: "Words separated by underscores, usually lowercase: my_variable_name." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="text-case-converter" />
    </Body>
    <Footer />
  </div>
);

export default TextCaseConverterPage;
