import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import FileSizeConverterTool from '../../components/tools/FileSizeConverterTool';

export const metadata = {
  title: 'File Size Converter — The Tool Guru',
  description: 'Convert between Bytes, KB, MB, GB, and TB. Free online file size converter tool.',
  keywords: ['file size', 'converter', 'kb', 'mb', 'gb', 'tb', 'bytes'],
  openGraph: {
    title: 'File Size Converter — The Tool Guru',
    description: 'Convert between Bytes, KB, MB, GB, and TB.',
  },
}

const FileSizeConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <FileSizeConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default FileSizeConverterPage;


