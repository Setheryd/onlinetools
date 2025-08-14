import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CoinFlipperTool from '../../components/tools/CoinFlipperTool';

export const metadata = {
  title: 'Coin Flipper — The Tool Guru',
  description: 'Flip a virtual coin with history and simple stats.',
  keywords: ['coin', 'flip', 'heads', 'tails', 'random', 'the tool guru'],
  openGraph: {
    title: 'Coin Flipper — The Tool Guru',
    description: 'Flip a virtual coin with history and simple stats.',
  },
}

const CoinFlipperPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <CoinFlipperTool />
      </Body>
      <Footer />
    </div>
  );
};

export default CoinFlipperPage;


