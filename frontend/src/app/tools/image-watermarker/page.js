import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageWatermarkerTool from '../../components/tools/ImageWatermarkerTool';

export const metadata = {
  title: 'Image Watermarker — The Tool Guru',
  description: 'Add text watermarks to your images with adjustable position and style.',
  keywords: ['image watermark', 'watermark', 'text watermark', 'branding', 'copyright'],
  openGraph: {
    title: 'Image Watermarker — The Tool Guru',
    description: 'Add watermarks to images quickly.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageWatermarkerTool />
    </Body>
    <Footer />
  </div>
);

export default Page;



