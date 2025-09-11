import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');
    const pageSize = formData.get('pageSize') || 'a4';
    const orientation = formData.get('orientation') || 'portrait';
    const margin = parseInt(formData.get('margin')) || 20;
    const fitMode = formData.get('fitMode') || 'fit';
    const customWidth = parseInt(formData.get('customWidth')) || 595;
    const customHeight = parseInt(formData.get('customHeight')) || 842;
    const quality = parseFloat(formData.get('quality')) || 0.9;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Check file size (15MB limit)
    if (imageFile.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size too large. Maximum size is 15MB.' }, { status: 413 });
    }

    // Check if it's an image file
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only image files are supported.' }, { status: 400 });
    }

    // Convert the file to ArrayBuffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Get page dimensions
    const getPageDimensions = () => {
      switch (pageSize) {
        case 'a4':
          return orientation === 'portrait' ? { width: 595, height: 842 } : { width: 842, height: 595 };
        case 'letter':
          return orientation === 'portrait' ? { width: 612, height: 792 } : { width: 792, height: 612 };
        case 'legal':
          return orientation === 'portrait' ? { width: 612, height: 1008 } : { width: 1008, height: 612 };
        case 'custom':
          return { width: customWidth, height: customHeight };
        default:
          return { width: 595, height: 842 };
      }
    };

    const pageDimensions = getPageDimensions();
    const page = pdfDoc.addPage([pageDimensions.width, pageDimensions.height]);

    // Embed the image
    let image;
    if (imageFile.type === 'image/png') {
      image = await pdfDoc.embedPng(uint8Array);
    } else if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(uint8Array);
    } else {
      // For other formats, we'll need to convert them
      // This is a simplified approach - in production you might want to use a more robust image processing library
      return NextResponse.json({ error: 'Unsupported image format. Please use PNG or JPEG.' }, { status: 400 });
    }

    // Calculate image dimensions and positioning
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const availableWidth = pageWidth - (margin * 2);
    const availableHeight = pageHeight - (margin * 2);
    
    let imageWidth, imageHeight;
    
    switch (fitMode) {
      case 'fit':
        // Fit image within page bounds while maintaining aspect ratio
        const scaleX = availableWidth / image.width;
        const scaleY = availableHeight / image.height;
        const scale = Math.min(scaleX, scaleY);
        imageWidth = image.width * scale;
        imageHeight = image.height * scale;
        break;
      case 'fill':
        // Fill entire page while maintaining aspect ratio
        const fillScaleX = availableWidth / image.width;
        const fillScaleY = availableHeight / image.height;
        const fillScale = Math.max(fillScaleX, fillScaleY);
        imageWidth = image.width * fillScale;
        imageHeight = image.height * fillScale;
        break;
      case 'stretch':
        // Stretch to fill entire page
        imageWidth = availableWidth;
        imageHeight = availableHeight;
        break;
      default:
        imageWidth = image.width;
        imageHeight = image.height;
    }
    
    // Center the image on the page
    const x = (pageWidth - imageWidth) / 2;
    const y = (pageHeight - imageHeight) / 2;
    
    // Draw the image on the page
    page.drawImage(image, {
      x: x,
      y: y,
      width: imageWidth,
      height: imageHeight,
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${imageFile.name.replace(/\.[^/.]+$/, '')}.pdf"`,
        'Content-Length': pdfBytes.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error converting image to PDF:', error);
    return NextResponse.json({ error: 'Failed to convert image to PDF' }, { status: 500 });
  }
}
