import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import EnergyConverterTool from '../../components/tools/EnergyConverterTool';

export const metadata = {
  title: 'Energy Converter — The Tool Guru',
  description: 'Convert between joules, watt-hours, calories, BTU, and more.',
  keywords: ['energy', 'converter', 'joules', 'watt hours', 'kwh', 'calories', 'btu'],
  openGraph: {
    title: 'Energy Converter — The Tool Guru',
    description: 'Convert between joules, watt-hours, calories, BTU, and more.',
  },
}

const EnergyConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <EnergyConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default EnergyConverterPage;


