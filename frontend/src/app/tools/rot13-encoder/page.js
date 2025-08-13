import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Rot13EncoderTool from '../../components/tools/Rot13EncoderTool';

export const metadata = {
  title: 'ROT13 Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
  keywords: ['rot13', 'encode', 'decode', 'cipher', 'caesar', 'the tool guru'],
  openGraph: {
    title: 'ROT13 Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode text with the ROT13 cipher instantly in your browser.',
  },
}

const Rot13Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <Rot13EncoderTool />
      </Body>
      <Footer />
    </div>
  );
};

export default Rot13Page;


