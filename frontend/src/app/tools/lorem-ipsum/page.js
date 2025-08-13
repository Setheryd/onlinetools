import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import LoremIpsumTool from '../../components/tools/LoremIpsumTool';

export const metadata = {
  title: 'Lorem Ipsum Generator — OnlineTools',
  description:
    'Generate Lorem Ipsum placeholder text with customizable paragraphs, sentences, and words. Perfect for design mockups and content planning.',
  keywords: ['lorem ipsum', 'placeholder text', 'generator', 'design', 'mockup', 'content']
};

const LoremIpsumPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <LoremIpsumTool />
      </Body>
      <Footer />
    </div>
  );
};

export default LoremIpsumPage;
