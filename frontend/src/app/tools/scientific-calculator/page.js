import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ScientificCalculatorTool from '../../components/tools/ScientificCalculatorTool';

export const metadata = {
  title: 'Scientific Calculator — The Tool Guru',
  description: 'An advanced scientific calculator with history, variables, DEG/RAD, and graphing.',
  keywords: ['scientific calculator', 'graphing calculator', 'math', 'trigonometry', 'algebra'],
  openGraph: {
    title: 'Scientific Calculator — The Tool Guru',
    description: 'Powerful calculator for complex math with graphing support.',
  },
};

const ScientificCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <ScientificCalculatorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default ScientificCalculatorPage;


