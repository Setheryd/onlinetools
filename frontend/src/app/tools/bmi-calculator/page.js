import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BmiCalculatorTool from '../../components/tools/BmiCalculatorTool';

export const metadata = {
  title: 'BMI Calculator — The Tool Guru',
  description: 'Calculate Body Mass Index and view your category.',
  keywords: ['bmi', 'body mass index', 'health', 'weight', 'height'],
  openGraph: {
    title: 'BMI Calculator — The Tool Guru',
    description: 'BMI calculator with unit switching.',
  },
};

const BmiCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <BmiCalculatorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default BmiCalculatorPage;


