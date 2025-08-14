import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CompoundInterestCalculatorTool from '../../components/tools/CompoundInterestCalculatorTool';

export const metadata = {
  title: 'Compound Interest Calculator — The Tool Guru',
  description: 'Compute future value with compounding and periodic contributions.',
  keywords: ['compound interest', 'future value', 'investment', 'finance'],
  openGraph: {
    title: 'Compound Interest Calculator — The Tool Guru',
    description: 'Calculate compound interest and contributions.',
  },
};

const CompoundInterestCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <CompoundInterestCalculatorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default CompoundInterestCalculatorPage;


