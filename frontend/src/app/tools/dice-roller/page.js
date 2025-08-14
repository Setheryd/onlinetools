import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import DiceRollerTool from '../../components/tools/DiceRollerTool';

export const metadata = {
  title: 'Dice Roller — The Tool Guru',
  description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
  keywords: ['dice', 'roller', 'd6', 'd20', 'rng', 'the tool guru'],
  openGraph: {
    title: 'Dice Roller — The Tool Guru',
    description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
  },
}

const DiceRollerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <DiceRollerTool />
      </Body>
      <Footer />
    </div>
  );
};

export default DiceRollerPage;


