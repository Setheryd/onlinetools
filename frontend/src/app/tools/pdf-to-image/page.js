import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfToImageTool from '../../components/tools/PdfToImageTool';

export const metadata = {
  title: 'PDF to Image Converter - Convert PDF Pages to Images',
  description: 'Convert PDF pages to high-quality images in PNG, JPEG, or WebP formats. Choose your preferred quality, scale, and DPI settings.',
  keywords: ['pdf to image', 'pdf converter', 'png', 'jpeg', 'webp', 'pdf pages', 'image conversion'],
  alternates: {
    canonical: 'https://thetool.guru/tools/pdf-to-image',
  },
  openGraph: {
    title: 'PDF to Image Converter - Convert PDF Pages to Images',
    description: 'Convert PDF pages to high-quality images in PNG, JPEG, or WebP formats. Choose your preferred quality, scale, and DPI settings.',
    url: 'https://thetool.guru/tools/pdf-to-image',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'PDF to Image Converter - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Image Converter - Convert PDF Pages to Images',
    description: 'Convert PDF pages to high-quality images in PNG, JPEG, or WebP formats. Choose your preferred quality, scale, and DPI settings.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const PdfToImagePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PdfToImageTool />
      </Body>
      <Footer />
    </div>
  );
};

export default PdfToImagePage;
