import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PressureConverterTool from '../../components/tools/PressureConverterTool';

export const metadata = {
  title: 'Pressure Converter — The Tool Guru',
  description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
  keywords: ['pressure', 'converter', 'psi', 'bar', 'kpa', 'atm', 'the tool guru'],
  openGraph: {
    title: 'Pressure Converter — The Tool Guru',
    description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
  },
}

const PressureConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PressureConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default PressureConverterPage;


