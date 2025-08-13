import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WeightConverterTool from '../../components/tools/WeightConverterTool';

export const metadata = {
  title: 'Weight Converter — The Tool Guru',
  description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
  keywords: ['weight', 'converter', 'kg', 'lb', 'oz', 'grams', 'the tool guru'],
  openGraph: {
    title: 'Weight Converter — The Tool Guru',
    description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
  },
}

const WeightConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <WeightConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default WeightConverterPage;


