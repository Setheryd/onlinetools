import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageCropperTool from '../../components/tools/ImageCropperTool';

export const metadata = {
  title: 'Image Cropper — The Tool Guru',
  description: 'Crop images to precise coordinates and sizes.',
  keywords: ['image cropper', 'crop image', 'trim', 'cut', 'resize'],
  openGraph: {
    title: 'Image Cropper — The Tool Guru',
    description: 'Crop images precisely and quickly.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageCropperTool />
    </Body>
    <Footer />
  </div>
);

export default Page;



