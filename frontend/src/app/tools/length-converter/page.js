import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import LengthConverterTool from '../../components/tools/LengthConverterTool';

export const metadata = {
  title: 'Length Converter — The Tool Guru',
  description: 'Convert length units like meters, feet, inches, miles, and more.',
  keywords: ['length', 'converter', 'meters', 'feet', 'inches', 'miles', 'the tool guru'],
  openGraph: {
    title: 'Length Converter — The Tool Guru',
    description: 'Convert length units like meters, feet, inches, miles, and more.',
  },
}

const LengthConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <LengthConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default LengthConverterPage;


