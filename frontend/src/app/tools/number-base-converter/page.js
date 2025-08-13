import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import NumberBaseConverterTool from '../../components/tools/NumberBaseConverterTool';

export const metadata = {
  title: 'Number Base Converter — The Tool Guru',
  description: 'Convert numbers between bases 2 and 36 (binary, octal, decimal, hexadecimal).',
  keywords: ['number base converter', 'binary', 'hexadecimal', 'octal', 'decimal', 'radix'],
  openGraph: {
    title: 'Number Base Converter — The Tool Guru',
    description: 'Convert numbers between bases 2 and 36.',
  },
}

const NumberBaseConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <NumberBaseConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default NumberBaseConverterPage;


