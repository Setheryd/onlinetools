# PDF Merger Tool

A client-side PDF merging tool that allows users to combine multiple PDF files into a single document.

## Features

- **Drag & Drop Interface**: Easy file upload with drag and drop support
- **File Validation**: Ensures only valid PDF files are processed
- **Size Limits**: Maximum 15MB per file, maximum 20 files per merge
- **Page Count Detection**: Automatically detects and displays page counts for each PDF
- **Progress Tracking**: Real-time progress bar during merge operations
- **Client-Side Processing**: All PDF processing happens in the browser for privacy
- **Instant Download**: Merged PDF is immediately available for download

## Technical Implementation

### Dependencies
- `pdf-lib`: Client-side PDF manipulation library
- `react-dropzone`: File upload handling
- React hooks for state management

### How It Works

1. **File Upload**: Users drag and drop PDF files or select them via file picker
2. **Validation**: Files are validated for type (PDF) and size (≤15MB)
3. **Page Count Detection**: Each PDF is analyzed to determine page count
4. **Merging Process**: 
   - Creates a new PDF document
   - Iterates through uploaded files in order
   - Copies all pages from each PDF to the merged document
   - Updates progress bar during processing
5. **Download**: Merged PDF is generated as a blob and made available for download

### Error Handling

- Invalid PDF files are rejected with specific error messages
- File size limits are enforced
- Processing errors are caught and displayed to the user
- Memory cleanup prevents memory leaks

### Performance Considerations

- Files are processed sequentially to avoid memory issues
- Progress tracking provides user feedback during long operations
- URL objects are properly cleaned up to prevent memory leaks
- Maximum file limits prevent browser crashes

## Browser Compatibility

This tool works in all modern browsers that support:
- ES6+ features
- File API
- ArrayBuffer
- Blob API

## Security Features

- All processing happens client-side (no server uploads)
- File validation prevents malicious file types
- Size limits prevent memory exhaustion attacks
- No data is transmitted to external servers

## Future Enhancements

- PDF compression options
- Page range selection
- Password-protected PDF support
- OCR text extraction
- PDF metadata preservation
