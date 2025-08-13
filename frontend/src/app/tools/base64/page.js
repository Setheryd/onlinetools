import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Base64Tool from '../../components/tools/Base64Tool';

export const metadata = {
  title: 'Base64 Encoder/Decoder — The Tool Guru',
  description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 back to text instantly. No registration required.',
  keywords: ['base64', 'encoder', 'decoder', 'online tool', 'text encoding', 'data encoding', 'the tool guru'],
  openGraph: {
    title: 'Base64 Encoder/Decoder — The Tool Guru',
    description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 back to text instantly.',
  },
}

const Base64Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <Base64Tool />
      </Body>
      <Footer />
    </div>
  );
};

export default Base64Page;


