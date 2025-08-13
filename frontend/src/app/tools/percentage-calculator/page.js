import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PercentageCalculatorTool from '../../components/tools/PercentageCalculatorTool';

export const metadata = {
  title: 'Percentage Calculator — The Tool Guru',
  description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
  keywords: ['percentage', 'calculator', 'percent change', 'percent of', 'the tool guru'],
  openGraph: {
    title: 'Percentage Calculator — The Tool Guru',
    description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
  },
}

const PercentageCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PercentageCalculatorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default PercentageCalculatorPage;


