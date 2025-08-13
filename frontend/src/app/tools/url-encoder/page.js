import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UrlEncoderTool from '../../components/tools/UrlEncoderTool';

export const metadata = {
  title: 'URL Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode URLs to handle special characters. Free online URL encoder/decoder tool.',
  keywords: ['url encoder', 'url decoder', 'percent encoding', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'URL Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode URLs to handle special characters.',
  },
}

const UrlEncoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <UrlEncoderTool />
      </Body>
      <Footer />
    </div>
  );
};

export default UrlEncoderPage;


