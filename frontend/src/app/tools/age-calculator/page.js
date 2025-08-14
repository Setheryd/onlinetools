import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import AgeCalculatorTool from '../../components/tools/AgeCalculatorTool';

export const metadata = {
  title: 'Age Calculator — The Tool Guru',
  description: 'Calculate exact age and time to the next birthday.',
  keywords: ['age calculator', 'date', 'birthday'],
  openGraph: {
    title: 'Age Calculator — The Tool Guru',
    description: 'Exact age and next birthday timing.',
  },
};

const AgeCalculatorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <AgeCalculatorTool />
    </Body>
    <Footer />
  </div>
);

export default AgeCalculatorPage;


