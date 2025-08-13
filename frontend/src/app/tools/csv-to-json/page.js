import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CsvJsonConverterTool from '../../components/tools/CsvJsonConverterTool';

export const metadata = {
  title: 'CSV ⇄ JSON Converter — The Tool Guru',
  description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
  keywords: ['csv', 'json', 'convert', 'parser', 'delimiter', 'the tool guru'],
  openGraph: {
    title: 'CSV ⇄ JSON Converter — The Tool Guru',
    description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
  },
}

const CsvJsonPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <CsvJsonConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default CsvJsonPage;


