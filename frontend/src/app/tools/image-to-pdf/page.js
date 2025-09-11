import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageToPdfTool from '../../components/tools/ImageToPdfTool';

export const metadata = {
  title: 'Image to PDF Converter - Convert Images to PDF Documents',
  description: 'Convert images to PDF documents with customizable page settings, layout options, and batch processing. Supports JPG, PNG, WebP, GIF, and BMP formats.',
  keywords: ['image to pdf', 'pdf converter', 'jpg to pdf', 'png to pdf', 'image conversion', 'document converter'],
  alternates: {
    canonical: 'https://thetool.guru/tools/image-to-pdf',
  },
  openGraph: {
    title: 'Image to PDF Converter - Convert Images to PDF Documents',
    description: 'Convert images to PDF documents with customizable page settings, layout options, and batch processing. Supports JPG, PNG, WebP, GIF, and BMP formats.',
    url: 'https://thetool.guru/tools/image-to-pdf',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Image to PDF Converter - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to PDF Converter - Convert Images to PDF Documents',
    description: 'Convert images to PDF documents with customizable page settings, layout options, and batch processing. Supports JPG, PNG, WebP, GIF, and BMP formats.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const ImageToPdfPage = () => {
  return (
    <>
      <Header />
      <Body>
        <ImageToPdfTool />
      </Body>
      <Footer />
    </>
  );
};

export default ImageToPdfPage;
