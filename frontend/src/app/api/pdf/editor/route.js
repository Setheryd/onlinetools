import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, pdfData, options } = body;
    
    if (!action) {
      return NextResponse.json(
        { error: 'No action specified' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'validate':
        return await validatePdf(pdfData);
      case 'getInfo':
        return await getPdfInfo(pdfData);
      case 'extractText':
        return await extractTextFromPdf(pdfData, options);
      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('PDF Editor API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'An error occurred processing the PDF.',
        details: error.message
      },
      { status: 500 }
    );
  }
}

async function validatePdf(pdfData) {
  try {
    if (!pdfData) {
      return NextResponse.json(
        { error: 'No PDF data provided' },
        { status: 400 }
      );
    }

    // Convert base64 to buffer if needed
    const buffer = Buffer.from(pdfData, 'base64');
    
    // Try to load the PDF
    const pdfDoc = await PDFDocument.load(buffer);
    
    return NextResponse.json({
      success: true,
      isValid: true,
      pageCount: pdfDoc.getPageCount(),
      title: pdfDoc.getTitle() || 'Untitled',
      author: pdfDoc.getAuthor() || 'Unknown',
      subject: pdfDoc.getSubject() || '',
      creator: pdfDoc.getCreator() || '',
      producer: pdfDoc.getProducer() || '',
      creationDate: pdfDoc.getCreationDate(),
      modificationDate: pdfDoc.getModificationDate()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      isValid: false,
      error: 'Invalid PDF file'
    });
  }
}

async function getPdfInfo(pdfData) {
  try {
    if (!pdfData) {
      return NextResponse.json(
        { error: 'No PDF data provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(pdfData, 'base64');
    const pdfDoc = await PDFDocument.load(buffer);
    
    const info = {
      pageCount: pdfDoc.getPageCount(),
      title: pdfDoc.getTitle() || 'Untitled',
      author: pdfDoc.getAuthor() || 'Unknown',
      subject: pdfDoc.getSubject() || '',
      creator: pdfDoc.getCreator() || '',
      producer: pdfDoc.getProducer() || '',
      creationDate: pdfDoc.getCreationDate(),
      modificationDate: pdfDoc.getModificationDate(),
      keywords: pdfDoc.getKeywords() || [],
      fileSize: buffer.length
    };

    return NextResponse.json({
      success: true,
      info
    });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to extract PDF information',
        details: error.message
      },
      { status: 500 }
    );
  }
}

async function extractTextFromPdf(pdfData, options = {}) {
  try {
    if (!pdfData) {
      return NextResponse.json(
        { error: 'No PDF data provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(pdfData, 'base64');
    const pdfDoc = await PDFDocument.load(buffer);
    
    const { pageNumbers = [] } = options;
    const pagesToExtract = pageNumbers.length > 0 ? pageNumbers : Array.from({ length: pdfDoc.getPageCount() }, (_, i) => i);
    
    const extractedText = [];
    
    for (const pageNum of pagesToExtract) {
      if (pageNum >= 0 && pageNum < pdfDoc.getPageCount()) {
        const page = pdfDoc.getPage(pageNum);
        // Note: pdf-lib doesn't have built-in text extraction
        // This would require additional libraries like pdf-parse or pdf2pic
        // For now, we'll return a placeholder
        extractedText.push({
          pageNumber: pageNum + 1,
          text: '[Text extraction requires additional processing]',
          width: page.getWidth(),
          height: page.getHeight()
        });
      }
    }

    return NextResponse.json({
      success: true,
      extractedText,
      totalPages: pdfDoc.getPageCount()
    });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to extract text from PDF',
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'PDF Editor API',
    description: 'This endpoint supports PDF editing operations and validation.',
    methods: ['POST'],
    actions: [
      'validate - Validate PDF file and get basic info',
      'getInfo - Get detailed PDF information',
      'extractText - Extract text from PDF pages'
    ],
    features: [
      'PDF validation',
      'Metadata extraction',
      'Page information',
      'Text extraction (placeholder)',
      'Server-side PDF processing'
    ],
    note: 'Most PDF editing operations are handled client-side for better performance and privacy.'
  });
}
