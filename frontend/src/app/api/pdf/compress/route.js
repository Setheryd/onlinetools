import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const optionsStr = formData.get('options');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF files are supported.' },
        { status: 400 }
      );
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File is too large. Maximum file size is ${maxSize / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    // Parse compression options
    let options = {
      removeMetadata: true,
      optimizeImages: true,
      compressText: true,
      imageQuality: 60
    };
    
    if (optionsStr) {
      try {
        const parsedOptions = JSON.parse(optionsStr);
        options = { ...options, ...parsedOptions };
      } catch (err) {
        console.warn('Failed to parse options:', err);
      }
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Perform compression
    const compressedBuffer = await compressPdfBuffer(buffer, options);

    // Check if compression was successful
    if (!compressedBuffer || compressedBuffer.length >= buffer.length) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Unable to compress this PDF further. The file may already be optimized.',
          originalSize: buffer.length,
          compressedSize: compressedBuffer ? compressedBuffer.length : buffer.length,
          compressionRatio: 0
        },
        { status: 200 }
      );
    }

    // Calculate compression ratio
    const compressionRatio = ((buffer.length - compressedBuffer.length) / buffer.length * 100).toFixed(1);
    
    // Convert to base64 for JSON response
    const base64Data = compressedBuffer.toString('base64');

    return NextResponse.json({
      success: true,
      originalSize: buffer.length,
      compressedSize: compressedBuffer.length,
      compressionRatio: parseFloat(compressionRatio),
      compressedData: base64Data,
      fileName: file.name.replace('.pdf', '_compressed.pdf')
    });

  } catch (error) {
    console.error('PDF compression error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'An error occurred during compression. Please try again.',
        details: error.message
      },
      { status: 500 }
    );
  }
}

async function compressPdfBuffer(buffer, options) {
  try {
    // Load the PDF using pdf-lib
    const pdfDoc = await PDFDocument.load(buffer, {
      updateMetadata: false,
      ignoreEncryption: true
    });

    // Create a new PDF with optimized settings
    const newPdf = await PDFDocument.create();
    
    // Copy all pages
    const pageIndices = pdfDoc.getPageIndices();
    for (const pageIndex of pageIndices) {
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
      newPdf.addPage(copiedPage);
    }
    
    // Remove metadata if requested
    if (options.removeMetadata) {
      newPdf.setTitle('');
      newPdf.setAuthor('');
      newPdf.setSubject('');
      newPdf.setKeywords([]);
      newPdf.setCreator('');
      newPdf.setProducer('');
      newPdf.setCreationDate(new Date());
      newPdf.setModificationDate(new Date());
    }
    
    // Try multiple save strategies to find the smallest result
    const strategies = [
      // Strategy 1: Maximum compression
      {
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 1,
        updateFieldAppearances: false,
        throwOnInvalidObject: false
      },
      // Strategy 2: Balanced compression
      {
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100,
        updateFieldAppearances: false,
        throwOnInvalidObject: false
      },
      // Strategy 3: No object streams
      {
        useObjectStreams: false,
        addDefaultPage: false,
        objectsPerTick: 1,
        updateFieldAppearances: false,
        throwOnInvalidObject: false
      },
      // Strategy 4: Minimal settings
      {
        useObjectStreams: false,
        addDefaultPage: false,
        objectsPerTick: 100,
        updateFieldAppearances: false,
        throwOnInvalidObject: false
      }
    ];
    
    let smallestSize = Infinity;
    let bestResult = null;
    
    for (const strategy of strategies) {
      try {
        const bytes = await newPdf.save(strategy);
        if (bytes.length < smallestSize) {
          smallestSize = bytes.length;
          bestResult = bytes;
        }
      } catch (err) {
        console.warn('Strategy failed:', err);
      }
    }
    
    if (bestResult && bestResult.length < buffer.length) {
      return Buffer.from(bestResult);
    }
    
    return null;
  } catch (error) {
    console.error('Compression error:', error);
    return null;
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'PDF Compression API',
    description: 'This endpoint supports PDF compression operations with multiple strategies.',
    methods: ['POST'],
    maxFileSize: '100MB',
    supportedFormats: ['application/pdf'],
    features: [
      'Server-side compression using pdf-lib',
      'Multiple compression strategies',
      'Metadata removal',
      'Object stream optimization',
      'Real-time compression analysis'
    ],
    note: 'For optimal compression, consider using a dedicated PDF compression service.'
  });
}
