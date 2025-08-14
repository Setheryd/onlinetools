import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RandomNumberGeneratorTool from '../../components/tools/RandomNumberGeneratorTool';

export const metadata = {
  title: 'Random Number Generator — The Tool Guru',
  description: 'Generate random numbers within a range, with optional uniqueness and count.',
  keywords: ['random', 'number', 'generator', 'rng', 'the tool guru'],
  openGraph: {
    title: 'Random Number Generator — The Tool Guru',
    description: 'Generate random numbers within a range, with optional uniqueness and count.',
  },
}

const RandomNumberGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <RandomNumberGeneratorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default RandomNumberGeneratorPage;


