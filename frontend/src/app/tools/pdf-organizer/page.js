import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfOrganizerTool from '../../components/tools/PdfOrganizerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="PDF Organizer"
            description="Organize PDF files with an intuitive drag-and-drop interface. Reorder pages, merge multiple PDFs, and manage your documents with ease. Our PDF organizer provides a visual interface where you can drag and drop pages to rearrange them, combine multiple PDFs into one document, or organize pages from a single PDF. Perfect for reorganizing documents, combining reports, or creating custom PDF compilations."
            features={[
              "Drag and drop interface for easy page organization",
              "Reorder pages within a single PDF or across multiple PDFs",
              "Merge multiple PDF files into one document",
              "Visual page thumbnails for easy identification",
              "Remove unwanted pages",
              "Rearrange pages by dragging",
              "Combine pages from different PDFs",
              "Works entirely in your browser - no uploads to servers"
            ]}
            howToUse={[
              "Upload one or more PDF files",
              "View page thumbnails in the organizer interface",
              "Drag pages to reorder them",
              "Drag pages between different PDFs to merge",
              "Remove pages by deleting them from the organizer",
              "Preview the organized PDF structure",
              "Download the organized PDF when finished"
            ]}
            useCases={[
              "Reorganize pages in a PDF document",
              "Combine multiple PDFs into one document",
              "Merge reports and documents",
              "Create custom PDF compilations",
              "Remove unwanted pages from PDFs",
              "Organize scanned documents",
              "Combine chapters or sections from different PDFs",
              "Create presentation PDFs from multiple sources"
            ]}
            tips={[
              "Use drag and drop to quickly reorder pages",
              "Preview thumbnails to identify pages before organizing",
              "Keep original PDFs as backups before organizing",
              "Organize pages logically for better document flow",
              "Combine related PDFs to create comprehensive documents",
              "Remove unnecessary pages to reduce file size",
              "Test the organized PDF to ensure pages are in correct order"
            ]}
            faq={[
              {
                question: "Can I undo page movements?",
                answer: "You can drag pages back to their original positions or remove and re-add them. However, once downloaded, the organization is permanent, so keep original PDFs as backups."
              },
              {
                question: "How many PDFs can I organize at once?",
                answer: "You can organize multiple PDFs simultaneously. The tool handles multiple files and allows you to merge pages from different PDFs into one organized document."
              },
              {
                question: "Will organizing affect PDF quality?",
                answer: "No, organizing pages doesn't affect the quality of individual pages. The tool rearranges pages without re-encoding or compressing them."
              },
              {
                question: "Can I organize password-protected PDFs?",
                answer: "Password-protected PDFs require the password to be entered before organizing. Once unlocked, they can be organized like any other PDF."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PdfOrganizerPage;
