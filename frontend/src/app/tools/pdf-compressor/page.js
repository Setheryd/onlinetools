import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfCompressorTool from '../../components/tools/PdfCompressorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="PDF Compressor"
            description="Compress PDF files to reduce file size while maintaining quality. Our PDF compressor optimizes images, removes unnecessary metadata, and compresses text to create smaller PDF files that are easier to share, email, and store. Perfect for reducing file sizes for email attachments, web uploads, or storage optimization. All compression happens in your browser for complete privacy."
            features={[
              "Compress PDF files to reduce file size significantly",
              "Optimize embedded images within PDFs",
              "Remove unnecessary metadata and objects",
              "Compress text and streamline PDF structure",
              "Maintain document quality and readability",
              "Support for password-protected PDFs",
              "Batch compression for multiple files",
              "Works entirely in your browser - no uploads to servers"
            ]}
            howToUse={[
              "Upload your PDF file using the file input or drag-and-drop",
              "Choose compression level (low, medium, or high)",
              "Review estimated file size reduction",
              "Click 'Compress' to process your PDF",
              "Preview the compressed PDF if available",
              "Download the compressed PDF file",
              "Compare file sizes to see the reduction achieved"
            ]}
            useCases={[
              "Reduce PDF size for email attachments",
              "Optimize PDFs for web uploads and sharing",
              "Compress scanned documents and image-heavy PDFs",
              "Reduce storage space for large PDF collections",
              "Prepare PDFs for faster download and sharing",
              "Optimize PDFs for mobile devices",
              "Compress PDFs before uploading to cloud storage",
              "Reduce bandwidth usage when sharing PDFs online"
            ]}
            tips={[
              "Higher compression may slightly reduce image quality",
              "Text-heavy PDFs compress better than image-heavy PDFs",
              "Scanned documents can often be compressed significantly",
              "Keep original PDFs as backups before compression",
              "Test compressed PDFs to ensure quality meets your needs",
              "Use medium compression for a good balance of size and quality",
              "High compression is best for archival or preview purposes"
            ]}
            faq={[
              {
                question: "Will compression reduce PDF quality?",
                answer: "Compression may reduce image quality slightly, especially at higher compression levels. Text quality is typically preserved. Our tool balances file size reduction with quality maintenance."
              },
              {
                question: "How much can PDFs be compressed?",
                answer: "Compression depends on the PDF content. Image-heavy PDFs can often be reduced by 50-80%, while text-heavy PDFs may see 20-40% reduction. Scanned documents typically compress well."
              },
              {
                question: "Can I compress password-protected PDFs?",
                answer: "Password-protected PDFs require the password to be entered before compression. Once unlocked, they can be compressed like any other PDF."
              },
              {
                question: "Will compressed PDFs still be readable?",
                answer: "Yes, compressed PDFs remain fully readable and functional. The compression optimizes the file structure and images while maintaining document integrity and text quality."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PdfCompressorPage;
