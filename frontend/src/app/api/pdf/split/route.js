import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdf');
    const mode = formData.get('mode') || 'range';
    const ranges = formData.get('ranges');
    const everyPages = parseInt(formData.get('everyPages')) || 5;
    const customPages = formData.get('customPages') || '';

    if (!pdfFile) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    // Convert the file to ArrayBuffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(uint8Array);
    const pageCount = pdfDoc.getPageCount();

    // Determine split points based on mode
    let splitPoints = [];
    
    if (mode === 'range' && ranges) {
      const rangeArray = JSON.parse(ranges);
      for (const range of rangeArray) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(n => parseInt(n) - 1);
          for (let i = start; i <= end && i < pageCount; i++) {
            if (i >= 0) splitPoints.push(i);
          }
        } else {
          const pageNum = parseInt(range) - 1;
          if (pageNum >= 0 && pageNum < pageCount) {
            splitPoints.push(pageNum);
          }
        }
      }
    } else if (mode === 'every') {
      for (let i = everyPages - 1; i < pageCount; i += everyPages) {
        splitPoints.push(i);
      }
    } else if (mode === 'custom' && customPages) {
      const pageNumbers = customPages.split(',').map(p => parseInt(p.trim()) - 1);
      splitPoints = pageNumbers.filter(p => p >= 0 && p < pageCount);
    }

    if (splitPoints.length === 0) {
      return NextResponse.json({ error: 'No valid split points found' }, { status: 400 });
    }

    // Create separate PDFs for each split
    const zip = new JSZip();
    let startPage = 0;
    
    for (let i = 0; i < splitPoints.length; i++) {
      const endPage = splitPoints[i];
      const newPdfDoc = await PDFDocument.create();
      
      for (let j = startPage; j <= endPage; j++) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [j]);
        newPdfDoc.addPage(copiedPage);
      }
      
      const pdfBytes = await newPdfDoc.save();
      zip.file(`split_${i + 1}.pdf`, pdfBytes);
      
      startPage = endPage + 1;
    }

    // Add remaining pages if any
    if (startPage < pageCount) {
      const newPdfDoc = await PDFDocument.create();
      for (let j = startPage; j < pageCount; j++) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [j]);
        newPdfDoc.addPage(copiedPage);
      }
      const pdfBytes = await newPdfDoc.save();
      zip.file(`split_${splitPoints.length + 1}.pdf`, pdfBytes);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    
    return new NextResponse(zipBlob, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="pdf_splits.zip"',
      },
    });

  } catch (error) {
    console.error('PDF Split error:', error);
    return NextResponse.json({ error: 'Splitting failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'PDF Splitter API',
    supportedModes: ['range', 'every', 'custom'],
    examples: {
      range: '1-5, 10-15, 20',
      every: '5 (split every 5 pages)',
      custom: '1,3,5,7 (split at specific pages)'
    }
  });
}
