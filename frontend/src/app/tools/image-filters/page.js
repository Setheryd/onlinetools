import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageFiltersTool from '../../components/tools/ImageFiltersTool';

export const metadata = {
  title: 'Image Filters — The Tool Guru',
  description: 'Apply filters and adjustments like blur, sharpen, brightness, saturation, and more.',
  keywords: ['image filters', 'effects', 'grayscale', 'invert', 'blur', 'sharpen', 'tint'],
  openGraph: {
    title: 'Image Filters — The Tool Guru',
    description: 'Enhance images with filters.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageFiltersTool />
    </Body>
    <Footer />
  </div>
);

export default Page;



