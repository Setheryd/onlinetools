import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageToPdfTool from '../../components/tools/ImageToPdfTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Image to PDF Converter"
            description="Convert images to PDF documents with customizable page settings, layout options, and batch processing. Support for JPG, PNG, WebP, GIF, and BMP formats. Perfect for creating PDFs from photos, combining multiple images into one document, preparing images for printing, or archiving image collections. Our converter provides flexible layout options and maintains image quality in the PDF output."
            features={[
              "Convert single or multiple images to PDF",
              "Support for JPG, PNG, WebP, GIF, and BMP formats",
              "Customizable page size and orientation",
              "Layout options: fit to page, original size, or custom",
              "Batch processing for multiple images",
              "Maintain image quality in PDF output",
              "Arrange images in desired order",
              "Works entirely in your browser - no uploads to servers"
            ]}
            howToUse={[
              "Upload one or more images using the file input or drag-and-drop",
              "Arrange images in the desired order",
              "Select page size (A4, Letter, or custom)",
              "Choose orientation (portrait or landscape)",
              "Select layout option (fit to page, original size, etc.)",
              "Preview the PDF layout",
              "Download the converted PDF document"
            ]}
            useCases={[
              "Create PDFs from photo collections",
              "Combine multiple images into one PDF document",
              "Prepare images for printing as PDF",
              "Archive image collections as PDF files",
              "Create image portfolios in PDF format",
              "Convert scanned documents to PDF",
              "Prepare images for email or sharing as PDF",
              "Create image-based presentations as PDFs"
            ]}
            tips={[
              "Use 'fit to page' for consistent sizing across images",
              "Arrange images in logical order before converting",
              "Consider page orientation based on image aspect ratios",
              "Batch process multiple images for efficiency",
              "Keep original images as backups",
              "Use appropriate page size for your intended use",
              "Test the PDF to ensure images display correctly"
            ]}
            faq={[
              {
                question: "Can I convert multiple images to one PDF?",
                answer: "Yes, you can upload multiple images and they will be combined into a single PDF document, with each image on its own page or arranged as specified."
              },
              {
                question: "Will image quality be preserved in the PDF?",
                answer: "Yes, the tool maintains image quality when converting to PDF. Images are embedded in the PDF at their original resolution (or as specified by your settings)."
              },
              {
                question: "What image formats are supported?",
                answer: "The tool supports JPG, PNG, WebP, GIF, and BMP formats. Most common image formats are supported."
              },
              {
                question: "Can I customize the PDF page size?",
                answer: "Yes, you can choose from standard sizes (A4, Letter) or set custom dimensions. You can also choose portrait or landscape orientation."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </>
  );
};

export default ImageToPdfPage;
