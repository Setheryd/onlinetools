import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfSplitterTool from '../../components/tools/PdfSplitterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'PDF Splitter - Split PDF Files into Multiple Documents',
  description: 'Split PDF files into multiple smaller documents by page ranges, every N pages, or custom page selection.',
  keywords: ['pdf splitter', 'split pdf', 'pdf pages', 'page ranges', 'pdf document', 'split files'],
  alternates: {
    canonical: 'https://thetool.guru/tools/pdf-splitter',
  },
  openGraph: {
    title: 'PDF Splitter - Split PDF Files into Multiple Documents',
    description: 'Split PDF files into multiple smaller documents by page ranges, every N pages, or custom page selection.',
    url: 'https://thetool.guru/tools/pdf-splitter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'PDF Splitter - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Splitter - Split PDF Files into Multiple Documents',
    description: 'Split PDF files into multiple smaller documents by page ranges, every N pages, or custom page selection.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const PdfSplitterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PdfSplitterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="PDF Splitter"
            description="Split large PDF files into smaller, more manageable documents with precision and ease. Our PDF splitter tool allows you to extract specific pages, split by page ranges, or divide documents at regular intervals. Whether you need to separate chapters, extract specific sections, or break down large files for easier sharing, this tool provides flexible splitting options without compromising document quality."
            features={[
              "Split PDFs by page ranges with custom start and end points",
              "Extract every Nth page automatically for regular intervals",
              "Select specific pages individually for precise control",
              "Maintain original PDF quality and formatting",
              "Process multiple files quickly with batch splitting",
              "No file size limits - handle documents of any size",
              "Instant download of split PDF files",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Upload your PDF file using the file input or drag-and-drop interface",
              "Choose your splitting method: page ranges, every N pages, or custom selection",
              "If using page ranges, specify the start and end page numbers",
              "For regular intervals, enter the number of pages per split",
              "Preview the split configuration to verify your selections",
              "Click the split button to process your PDF",
              "Download the resulting PDF files individually or as a ZIP archive"
            ]}
            useCases={[
              "Separate chapters from a large book or manual into individual files",
              "Extract specific pages from scanned documents or reports",
              "Split invoices or receipts from batch PDF files",
              "Split presentation slides into individual slide PDFs",
              "Create separate files for each section of a legal document",
              "Extract pages from merged PDFs to restore original documents",
              "Prepare smaller files for email attachments with size limits",
              "Organize large PDF portfolios into manageable sections"
            ]}
            tips={[
              "Use page ranges for sequential pages to maintain document flow",
              "Check page numbers carefully before splitting to avoid missing content",
              "For large files, splitting can help improve loading times",
              "Keep a backup of your original PDF before splitting",
              "Use descriptive filenames when downloading split files for easy organization",
              "Combine with our PDF merger tool if you need to reorganize pages later"
            ]}
            faq={[
              {
                question: "Will splitting a PDF affect its quality?",
                answer: "No, our PDF splitter maintains the original quality, formatting, and metadata of your PDF files. The split documents are exact copies of the selected pages."
              },
              {
                question: "Can I split password-protected PDFs?",
                answer: "Password-protected PDFs require the password to be entered before splitting. Once unlocked, they can be split like any other PDF file."
              },
              {
                question: "Is there a limit to the number of pages I can split?",
                answer: "There's no hard limit on the number of pages. You can split PDFs of any size, though very large files may take longer to process."
              },
              {
                question: "Can I undo a split operation?",
                answer: "The split operation creates new files, so your original PDF remains unchanged. You can always re-split the original file with different settings."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PdfSplitterPage;
