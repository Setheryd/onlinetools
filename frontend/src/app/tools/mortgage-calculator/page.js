import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MortgageCalculatorTool from '../../components/tools/MortgageCalculatorTool';

export const metadata = {
  title: 'Mortgage Calculator — The Tool Guru',
  description: 'Calculate monthly mortgage payments and view an amortization schedule with optional extra payments.',
  keywords: ['mortgage calculator', 'loan', 'amortization', 'payment', 'interest'],
  openGraph: {
    title: 'Mortgage Calculator — The Tool Guru',
    description: 'Mortgage payment and amortization schedule.',
  },
};

const MortgageCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <MortgageCalculatorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default MortgageCalculatorPage;


