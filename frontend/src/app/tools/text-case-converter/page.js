import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TextCaseConverterTool from '../../components/tools/TextCaseConverterTool';

export const metadata = {
  title: 'Text Case Converter — The Tool Guru',
  description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text converter.',
  keywords: ['text case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'Text Case Converter — The Tool Guru',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more.',
  },
}

const TextCaseConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TextCaseConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default TextCaseConverterPage;
