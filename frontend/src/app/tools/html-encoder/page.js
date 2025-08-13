import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HtmlEncoderTool from '../../components/tools/HtmlEncoderTool';

export const metadata = {
  title: 'HTML Encoder/Decoder — The Tool Guru',
  description: 'Encode or decode HTML entities and special characters. Free online HTML encoder/decoder tool.',
  keywords: ['html encoder', 'html decoder', 'entities', 'escape html', 'online tool'],
  openGraph: {
    title: 'HTML Encoder/Decoder — The Tool Guru',
    description: 'Encode or decode HTML entities and special characters.',
  },
}

const HtmlEncoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <HtmlEncoderTool />
      </Body>
      <Footer />
    </div>
  );
};

export default HtmlEncoderPage;


