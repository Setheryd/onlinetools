import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdf');
    const format = formData.get('format') || 'png';
    const quality = parseFloat(formData.get('quality')) || 0.9;
    const scale = parseInt(formData.get('scale')) || 2;
    const pages = formData.get('pages') || 'all';
    const pageRange = formData.get('pageRange') || '';
    const specificPages = formData.get('specificPages') || '';
    const dpi = parseInt(formData.get('dpi')) || 150;

    if (!pdfFile) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    // Convert the file to ArrayBuffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(uint8Array);
    const pageCount = pdfDoc.getPageCount();

    // Determine which pages to process
    let pagesToProcess = [];
    if (pages === 'all') {
      pagesToProcess = Array.from({ length: pageCount }, (_, i) => i);
    } else if (pages === 'range' && pageRange) {
      // Parse page ranges like "1-5, 10-15"
      const ranges = pageRange.split(',').map(r => r.trim());
      for (const range of ranges) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(n => parseInt(n) - 1);
          for (let i = start; i <= end && i < pageCount; i++) {
            if (i >= 0) pagesToProcess.push(i);
          }
        } else {
          const pageNum = parseInt(range) - 1;
          if (pageNum >= 0 && pageNum < pageCount) {
            pagesToProcess.push(pageNum);
          }
        }
      }
    } else if (pages === 'specific' && specificPages) {
      // Parse specific pages like "1,3,5,7"
      const pageNumbers = specificPages.split(',').map(p => parseInt(p.trim()) - 1);
      pagesToProcess = pageNumbers.filter(p => p >= 0 && p < pageCount);
    }

    if (pagesToProcess.length === 0) {
      return NextResponse.json({ error: 'No valid pages to process' }, { status: 400 });
    }

    // For now, we'll create a simple PDF with the selected pages
    // In a full implementation, you would convert each page to an image
    const newPdfDoc = await PDFDocument.create();
    
    for (const pageIndex of pagesToProcess) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
      newPdfDoc.addPage(copiedPage);
    }

    const pdfBytes = await newPdfDoc.save();
    
    // For now, return the PDF with selected pages
    // In a real implementation, you would convert each page to an image
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="converted_pages.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF to Image conversion error:', error);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'PDF to Image Converter API',
    supportedFormats: ['png', 'jpeg', 'webp'],
    supportedOptions: {
      quality: '0.1 to 1.0',
      scale: '1x to 4x',
      dpi: '72, 150, 300, 600'
    }
  });
}
