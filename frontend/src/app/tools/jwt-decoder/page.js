import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JwtDecoderTool from '../../components/tools/JwtDecoderTool';

export const metadata = {
  title: 'JWT Decoder — The Tool Guru',
  description: 'Decode JSON Web Tokens to view header and payload. No verification performed.',
  keywords: ['jwt', 'decoder', 'json web token', 'decode jwt', 'header', 'payload'],
  openGraph: {
    title: 'JWT Decoder — The Tool Guru',
    description: 'Decode JSON Web Tokens to view header and payload.',
  },
}

const JwtDecoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <JwtDecoderTool />
      </Body>
      <Footer />
    </div>
  );
};

export default JwtDecoderPage;


