import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TextCaseConverterTool from '../../components/tools/TextCaseConverterTool';

export const metadata = {
  title: 'Text Case Converter — OnlineTools',
  description:
    'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Perfect for formatting text and code.',
  keywords: ['text', 'case', 'convert', 'uppercase', 'lowercase', 'title', 'camelcase', 'format']
};

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
