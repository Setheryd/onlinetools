import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HexEncoderTool from '../../components/tools/HexEncoderTool';

export const metadata = {
  title: 'Hex Encoder/Decoder — The Tool Guru',
  description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
  keywords: ['hex', 'encoder', 'decoder', 'convert', 'utf-8', 'the tool guru'],
  openGraph: {
    title: 'Hex Encoder/Decoder — The Tool Guru',
    description: 'Convert text to hexadecimal and decode hex back to text. UTF-8, client-side.',
  },
}

const HexEncoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <HexEncoderTool />
      </Body>
      <Footer />
    </div>
  );
};

export default HexEncoderPage;


