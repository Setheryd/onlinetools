import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TextDiffTool from '../../components/tools/TextDiffTool';

export const metadata = {
  title: 'Text Diff Checker — OnlineTools',
  description:
    'Compare two texts and see the differences highlighted. Perfect for code reviews, document comparisons, and content analysis.',
  keywords: ['text diff', 'difference checker', 'compare text', 'code review', 'document comparison']
};

const TextDiffPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TextDiffTool />
      </Body>
      <Footer />
    </div>
  );
};

export default TextDiffPage;
