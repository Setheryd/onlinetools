import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfCompressorTool from '../../components/tools/PdfCompressorTool';

export const metadata = {
  title: 'PDF Compressor — The Tool Guru',
  description: 'Free online PDF compressor. Reduce PDF file size while maintaining quality. Optimize images, remove metadata, and compress text objects.',
  keywords: ['pdf compressor', 'pdf compression', 'reduce pdf size', 'pdf optimizer', 'compress pdf online', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/pdf-compressor',
  },
  openGraph: {
    title: 'PDF Compressor — The Tool Guru',
    description: 'Free online PDF compressor. Reduce PDF file size while maintaining quality. Optimize images, remove metadata, and compress text objects.',
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
    title: 'PDF Compressor — The Tool Guru',
    description: 'Free online PDF compressor. Reduce PDF file size while maintaining quality. Optimize images, remove metadata, and compress text objects.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const PdfCompressorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <PdfCompressorTool />
      
      {/* About Section */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">About this PDF Compressor</h2>
        <p className="text-gray-700 mb-3">
          Optimize your PDF files with our advanced compression tool. This tool uses intelligent algorithms to reduce file size 
          while maintaining document quality and readability. Perfect for sharing documents via email, uploading to websites, 
          or storing in cloud services with limited space.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Key features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Intelligent image compression with quality control</li>
          <li>Metadata removal for privacy and smaller files</li>
          <li>Text and object compression for optimal results</li>
          <li>Real-time compression preview and progress tracking</li>
          <li>Secure client-side processing - your files never leave your browser</li>
          <li>Support for files up to 50MB in size</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Popular use cases</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Reduce PDF size for email attachments</li>
          <li>Optimize documents for web uploads and sharing</li>
          <li>Prepare files for cloud storage with size limits</li>
          <li>Remove sensitive metadata before sharing</li>
          <li>Compress scanned documents and image-heavy PDFs</li>
        </ul>
        <p className="text-gray-700 mt-3">
          Whether you're a professional sharing documents with clients, a student submitting assignments, 
          or anyone needing to optimize PDF files, this tool provides the compression you need with the quality you expect.
        </p>
      </div>
    </Body>
    <Footer />
  </div>
);

export default PdfCompressorPage;
