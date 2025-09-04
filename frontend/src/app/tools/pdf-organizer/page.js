import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfOrganizerTool from '../../components/tools/PdfOrganizerTool';

export const metadata = {
  title: 'PDF Organizer - Organize PDF Files with Drag & Drop',
  description: 'Organize PDF files with drag & drop interface. Reorder, merge, and manage multiple PDFs.',
  keywords: ['pdf organizer', 'drag drop pdf', 'merge pdf', 'reorder pdf', 'pdf management', 'organize files'],
  alternates: {
    canonical: 'https://thetool.guru/tools/pdf-organizer',
  },
  openGraph: {
    title: 'PDF Organizer - Organize PDF Files with Drag & Drop',
    description: 'Organize PDF files with drag & drop interface. Reorder, merge, and manage multiple PDFs.',
    url: 'https://thetool.guru/tools/pdf-organizer',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'PDF Organizer - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Organizer - Organize PDF Files with Drag & Drop',
    description: 'Organize PDF files with drag & drop interface. Reorder, merge, and manage multiple PDFs.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const PdfOrganizerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PdfOrganizerTool />
      </Body>
      <Footer />
    </div>
  );
};

export default PdfOrganizerPage;
