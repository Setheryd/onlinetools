import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WordCounterTool from '../../components/tools/WordCounterTool';

export const metadata = {
  title: 'Word Counter — OnlineTools',
  description:
    'Count words, characters, sentences, and paragraphs in your text. Get detailed statistics and analysis for writing projects.',
  keywords: ['word counter', 'character count', 'text analysis', 'writing', 'statistics', 'content']
};

const WordCounterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <WordCounterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default WordCounterPage;
