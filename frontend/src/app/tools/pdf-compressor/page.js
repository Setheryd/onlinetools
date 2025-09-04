import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfCompressorTool from '../../components/tools/PdfCompressorTool';

export const metadata = {
  title: 'PDF Compressor - Compress PDF Files to Reduce File Size',
  description: 'Compress PDF files to reduce file size while maintaining quality. Optimize images, remove metadata, and compress text for smaller file sizes.',
  keywords: ['pdf compressor', 'compress pdf', 'reduce pdf size', 'pdf optimization', 'pdf compression', 'smaller pdf files'],
  alternates: {
    canonical: 'https://thetool.guru/tools/pdf-compressor',
  },
  openGraph: {
    title: 'PDF Compressor - Compress PDF Files to Reduce File Size',
    description: 'Compress PDF files to reduce file size while maintaining quality. Optimize images, remove metadata, and compress text for smaller file sizes.',
    url: 'https://thetool.guru/tools/pdf-compressor',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'PDF Compressor - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Compressor - Compress PDF Files to Reduce File Size',
    description: 'Compress PDF files to reduce file size while maintaining quality. Optimize images, remove metadata, and compress text for smaller file sizes.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const PdfCompressorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PdfCompressorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default PdfCompressorPage;
