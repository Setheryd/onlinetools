import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const mode = formData.get('mode') || 'merge';
    const fileCount = parseInt(formData.get('fileCount')) || 0;
    const pages = formData.get('pages') || '';

    if (fileCount === 0) {
      return NextResponse.json({ error: 'No PDF files provided' }, { status: 400 });
    }

    // Collect all PDF files
    const pdfFiles = [];
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file_${i}`);
      if (file) {
        pdfFiles.push(file);
      }
    }

    if (pdfFiles.length === 0) {
      return NextResponse.json({ error: 'No valid PDF files found' }, { status: 400 });
    }

    // Load all PDF documents
    const pdfDocs = [];
    for (const file of pdfFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const pdfDoc = await PDFDocument.load(uint8Array);
      pdfDocs.push(pdfDoc);
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    if (mode === 'merge') {
      // Merge all PDFs in order
      for (const pdfDoc of pdfDocs) {
        const pageCount = pdfDoc.getPageCount();
        for (let i = 0; i < pageCount; i++) {
          const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [i]);
          mergedPdf.addPage(copiedPage);
        }
      }
    } else if (mode === 'reorder') {
      // Reorder pages within each PDF
      for (const pdfDoc of pdfDocs) {
        const pageCount = pdfDoc.getPageCount();
        // For reorder mode, we'll just copy pages in reverse order as an example
        for (let i = pageCount - 1; i >= 0; i--) {
          const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [i]);
          mergedPdf.addPage(copiedPage);
        }
      }
    } else if (mode === 'extract' && pages) {
      // Extract specific pages from all PDFs
      const pageNumbers = pages.split(',').map(p => parseInt(p.trim()) - 1);
      
      for (const pdfDoc of pdfDocs) {
        const pageCount = pdfDoc.getPageCount();
        for (const pageNum of pageNumbers) {
          if (pageNum >= 0 && pageNum < pageCount) {
            const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [pageNum]);
            mergedPdf.addPage(copiedPage);
          }
        }
      }
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="organized.pdf"',
      },
    });

  } catch (error) {
    console.error('PDF Organize error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'PDF Organizer API',
    supportedModes: ['merge', 'reorder', 'extract'],
    description: {
      merge: 'Combine multiple PDFs into one document',
      reorder: 'Reorder pages within PDFs',
      extract: 'Extract specific pages from PDFs'
    }
  });
}
