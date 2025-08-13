import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BinaryEncoderTool from '../../components/tools/BinaryEncoderTool';

export const metadata = {
  title: 'Binary Encoder/Decoder — The Tool Guru',
  description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
  keywords: ['binary', 'encoder', 'decoder', 'convert', 'utf-8', 'the tool guru'],
  openGraph: {
    title: 'Binary Encoder/Decoder — The Tool Guru',
    description: 'Convert text to binary and decode binary back to text. Client-side, UTF-8.',
  },
}

const BinaryEncoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <BinaryEncoderTool />
      </Body>
      <Footer />
    </div>
  );
};

export default BinaryEncoderPage;


