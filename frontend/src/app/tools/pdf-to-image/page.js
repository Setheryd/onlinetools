import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfToImageTool from '../../components/tools/PdfToImageTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="PDF to Image Converter"
            description="Convert PDF pages to high-quality images in PNG, JPEG, or WebP formats. Extract individual pages or entire documents as images with customizable quality, scale, and DPI settings. Perfect for creating thumbnails, extracting pages for presentations, sharing PDF content as images, or converting PDFs for use in image editing software. All conversion happens in your browser for complete privacy."
            features={[
              "Convert PDF pages to PNG, JPEG, or WebP images",
              "Extract individual pages or entire documents",
              "Customizable DPI and quality settings",
              "Adjustable scale for different resolutions",
              "High-quality rendering of PDF content",
              "Batch conversion of multiple pages",
              "Download individual images or ZIP archive",
              "Works entirely in your browser - no uploads to servers"
            ]}
            howToUse={[
              "Upload your PDF file using the file input or drag-and-drop",
              "Select which pages to convert (all pages or specific range)",
              "Choose output format (PNG, JPEG, or WebP)",
              "Adjust DPI and quality settings",
              "Set scale factor if needed",
              "Click 'Convert' to process your PDF",
              "Download individual images or download all as ZIP"
            ]}
            useCases={[
              "Create thumbnails from PDF pages",
              "Extract pages for presentations and documents",
              "Convert PDFs for use in image editing software",
              "Share PDF content as images on social media",
              "Create preview images for PDF documents",
              "Extract diagrams and charts from PDFs",
              "Convert PDF pages for web display",
              "Prepare PDF content for print design"
            ]}
            tips={[
              "Use PNG for text-heavy pages to preserve quality",
              "Use JPEG for photo-heavy pages to reduce file size",
              "Higher DPI settings produce better quality but larger files",
              "300 DPI is standard for print quality",
              "72-150 DPI is sufficient for web use",
              "Extract specific pages to save processing time",
              "Use WebP format for best compression with good quality"
            ]}
            faq={[
              {
                question: "What DPI should I use?",
                answer: "For web use, 72-150 DPI is sufficient. For print, use 300 DPI. Higher DPI produces better quality but significantly larger file sizes."
              },
              {
                question: "Can I convert all pages at once?",
                answer: "Yes, you can convert all pages or select a specific range. The tool will process each page and provide individual downloads or a ZIP archive."
              },
              {
                question: "Which format is best for PDF to image conversion?",
                answer: "PNG is best for text and graphics as it's lossless. JPEG is better for photos and reduces file size. WebP offers good compression with quality."
              },
              {
                question: "Will the image quality match the PDF?",
                answer: "Image quality depends on the DPI setting and the original PDF quality. Higher DPI settings produce images that more closely match the PDF appearance."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PdfToImagePage;
