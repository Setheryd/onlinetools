import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageResizerTool from '../../components/tools/ImageResizerTool';

export const metadata = {
  title: 'Image Resizer — The Tool Guru',
  description: 'Resize images to exact dimensions with high quality output.',
  keywords: ['image resizer', 'resize image', 'crop', 'scale', 'webp', 'avif', 'jpeg', 'png'],
  openGraph: {
    title: 'Image Resizer — The Tool Guru',
    description: 'High-quality image resizing and conversion.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageResizerTool />
    </Body>
    <Footer />
  </div>
);

export default Page;



