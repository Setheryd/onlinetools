import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TipCalculatorTool from '../../components/tools/TipCalculatorTool';

export const metadata = {
  title: 'Tip Calculator — The Tool Guru',
  description: 'Compute tip amounts, split bills easily, and apply rounding options.',
  keywords: ['tip calculator', 'bill split', 'gratuity', 'restaurant'],
  openGraph: {
    title: 'Tip Calculator — The Tool Guru',
    description: 'Tip and bill-splitting calculator with rounding.',
  },
};

const TipCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TipCalculatorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default TipCalculatorPage;


