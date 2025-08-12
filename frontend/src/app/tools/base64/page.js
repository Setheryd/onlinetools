import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Base64Tool from '../../components/tools/Base64Tool';

export const metadata = {
  title: 'Base64 Encoder/Decoder — OnlineTools',
  description:
    'Modern Base64 encoder/decoder with UTF-8 support, URL-safe, padding, line wrap, and file drag-and-drop. 100% in-browser.',
  keywords: ['base64', 'encoder', 'decoder', 'url-safe', 'utf-8']
};

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


