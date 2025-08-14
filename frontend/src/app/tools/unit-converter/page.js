import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UnitConverterTool from '../../components/tools/UnitConverterTool';

export const metadata = {
  title: 'Unit Converter — The Tool Guru',
  description: 'Convert units across categories like length, weight, temperature, volume, and more.',
  keywords: ['unit converter', 'length', 'weight', 'temperature', 'volume', 'conversion', 'the tool guru'],
  openGraph: {
    title: 'Unit Converter — The Tool Guru',
    description: 'Convert units across categories like length, weight, temperature, volume, and more.',
  },
}

const UnitConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <UnitConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default UnitConverterPage;


