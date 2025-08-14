import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageConverterTool from '../../components/tools/ImageConverterTool';

export const metadata = {
  title: 'Image Format Converter — The Tool Guru',
  description: 'Convert images between WebP, AVIF, JPEG, and PNG formats.',
  keywords: ['image converter', 'convert image', 'webp', 'avif', 'jpeg', 'png'],
  openGraph: {
    title: 'Image Format Converter — The Tool Guru',
    description: 'Fast image format conversion.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageConverterTool />
    </Body>
    <Footer />
  </div>
);

export default Page;



