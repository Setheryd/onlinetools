import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import AreaConverterTool from '../../components/tools/AreaConverterTool';

export const metadata = {
  title: 'Area Converter — The Tool Guru',
  description: 'Convert between square meters, feet, acres, hectares, and more.',
  keywords: ['area', 'converter', 'square feet', 'square meters', 'acre', 'hectare', 'the tool guru'],
  openGraph: {
    title: 'Area Converter — The Tool Guru',
    description: 'Convert between square meters, feet, acres, hectares, and more.',
  },
}

const AreaConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <AreaConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default AreaConverterPage;


