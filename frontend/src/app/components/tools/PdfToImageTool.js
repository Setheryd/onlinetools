"use client";
import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FiUpload, FiTrash2, FiDownload, FiFile, FiAlertCircle, FiCheckCircle, FiImage } from 'react-icons/fi';

const PdfToImageTool = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [settings, setSettings] = useState({
    format: 'png',
    quality: 0.9,
    scale: 2,
    pages: 'all', // 'all', 'range', 'specific'
    pageRange: '',
    specificPages: '',
    dpi: 150
  });
  const [error, setError] = useState('');

  // Dropzone configuration
  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    // Handle rejected files (non-PDF files)
    if (rejectedFiles && rejectedFiles.length > 0) {
      const invalidFiles = rejectedFiles.map(file => file.file.name).join(', ');
      setError(`Invalid file type(s): ${invalidFiles}. Only PDF files are supported.`);
      return;
    }

    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      setError('Please select valid PDF files.');
      return;
    }

    setError('');

    try {
      const newFiles = [];
      
      for (const file of pdfFiles) {
        if (file.size > 15 * 1024 * 1024) {
          setError(`${file.name} is too large. Maximum file size is 15MB.`);
          continue;
        }

        // Get page count
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();

        newFiles.push({
          file: file,
          name: file.name,
          size: file.size,
          pageCount: pageCount,
          pdfDoc: pdfDoc
        });
      }

      setFiles(prev => [...prev, ...newFiles]);
    } catch (err) {
      console.error('Error processing PDF files:', err);
      setError('Failed to process PDF files. Please ensure they are valid PDFs.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true,
    validator: (file) => {
      if (file.type !== 'application/pdf') {
        return {
          code: 'file-invalid-type',
          message: `File "${file.name}" is not a PDF file. Only PDF files are supported.`
        };
      }
      return null;
    }
  });

  const removeFile = (index) => {
    setFiles(prev => {
      const fileToRemove = prev[index];
      // Clean up any blob URLs if they exist
      if (fileToRemove?.thumbnailUrl) {
        URL.revokeObjectURL(fileToRemove.thumbnailUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearAll = () => {
    files.forEach(file => {
      // Clean up any blob URLs if they exist
      if (file?.thumbnailUrl) {
        URL.revokeObjectURL(file.thumbnailUrl);
      }
    });
    setFiles([]);
    setResults([]);
    setError('');
  };

  const validatePageRange = (range, maxPages) => {
    const rangeRegex = /^\d+(-\d+)?$/;
    if (!rangeRegex.test(range)) return false;
    
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number);
      return start <= end && start > 0 && end <= maxPages;
    }
    
    return Number(range) > 0 && Number(range) <= maxPages;
  };

  const getPagesToConvert = (pageCount, settings) => {
    switch (settings.pages) {
      case 'all':
        return Array.from({ length: pageCount }, (_, i) => i);
      case 'range':
        if (!settings.pageRange) return [];
        const ranges = settings.pageRange.split(',').map(r => r.trim());
        const pages = [];
        ranges.forEach(range => {
          if (validatePageRange(range, pageCount)) {
            if (range.includes('-')) {
              const [start, end] = range.split('-').map(Number);
              for (let i = start - 1; i < end; i++) {
                pages.push(i);
              }
            } else {
              pages.push(Number(range) - 1);
            }
          }
        });
        return [...new Set(pages)].sort((a, b) => a - b);
      case 'specific':
        if (!settings.specificPages) return [];
        return settings.specificPages
          .split(',')
          .map(p => p.trim())
          .filter(p => p && !isNaN(p) && parseInt(p) > 0 && parseInt(p) <= pageCount)
          .map(p => parseInt(p) - 1)
          .sort((a, b) => a - b);
      default:
        return [];
    }
  };

  const convertPageToImage = async (fileInfo, pageIndex, settings) => {
    try {
      // Dynamically import PDF.js only on client side
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set up PDF.js worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      
      // Load the PDF using PDF.js
      const arrayBuffer = await fileInfo.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Get the specific page
      const page = await pdf.getPage(pageIndex + 1); // PDF.js uses 1-based indexing
      
      // Get page dimensions
      const viewport = page.getViewport({ scale: 1 });
      
      // Calculate scale based on DPI and user settings
      const dpi = settings.dpi;
      const pixelsPerInch = dpi / 72; // PDF default is 72 DPI
      const scale = settings.scale * pixelsPerInch;
      
      // Create scaled viewport
      const scaledViewport = page.getViewport({ scale });
      
      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      
      // Set white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Render the PDF page to canvas
      const renderContext = {
        canvasContext: ctx,
        viewport: scaledViewport
      };
      
      await page.render(renderContext).promise;
      
      // Convert to blob
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create image blob'));
            }
          },
          `image/${settings.format}`,
          settings.quality
        );
      });
    } catch (error) {
      console.error('Error converting page to image:', error);
      throw error;
    }
  };

  const processFile = async (fileInfo) => {
    try {
      const pageCount = fileInfo.pageCount;
      const pagesToConvert = getPagesToConvert(pageCount, settings);
      
      if (pagesToConvert.length === 0) {
        throw new Error('No valid pages to convert');
      }

      const images = [];
      
      for (let i = 0; i < pagesToConvert.length; i++) {
        const pageIndex = pagesToConvert[i];
        const pageNumber = pageIndex + 1;
        
                 const imageBlob = await convertPageToImage(fileInfo, pageIndex, settings);
        
        images.push({
          name: `${fileInfo.name.replace('.pdf', '')}_page_${pageNumber}.${settings.format}`,
          blob: imageBlob,
          pageNumber: pageNumber
        });
      }

      return {
        fileName: fileInfo.name,
        pageCount: pageCount,
        convertedPages: pagesToConvert.length,
        images: images
      };
    } catch (error) {
      console.error('Error processing file:', error);
      return {
        fileName: fileInfo.name,
        error: 'Conversion failed'
      };
    }
  };

  const handleProcessAll = async () => {
    if (files.length === 0) return;
    
    setProcessing(true);
    setResults([]);
    setError('');
    
    const newResults = [];
    
    for (let i = 0; i < files.length; i++) {
      const result = await processFile(files[i]);
      newResults.push(result);
      setResults([...newResults]);
    }
    
    setProcessing(false);
  };

  const downloadResult = async (result) => {
    if (result.error) return;
    
    try {
      if (result.images.length === 1) {
        // Single image - download directly
        const url = URL.createObjectURL(result.images[0].blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = result.images[0].name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Multiple images - create ZIP
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        
        result.images.forEach(image => {
          zip.file(image.name, image.blob);
        });
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${result.fileName.replace('.pdf', '')}_images.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading result:', error);
      setError('Failed to download result');
    }
  };

  const downloadAll = async () => {
    const validResults = results.filter(r => !r.error);
    if (validResults.length === 0) return;
    
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      for (const result of validResults) {
        const folder = zip.folder(result.fileName.replace('.pdf', ''));
        result.images.forEach(image => {
          folder.file(image.name, image.blob);
        });
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pdf-images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading all results:', error);
      setError('Failed to download all results');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF to Image Converter</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Convert PDF pages to high-quality images in PNG, JPEG, or WebP formats with customizable settings.
        </p>
      </div>

      {/* Settings */}
      <Card className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <select 
                value={settings.format} 
                onChange={(e) => setSettings(prev => ({ ...prev, format: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.1" 
                value={settings.quality}
                onChange={(e) => setSettings(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">{Math.round(settings.quality * 100)}%</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scale</label>
              <select 
                value={settings.scale} 
                onChange={(e) => setSettings(prev => ({ ...prev, scale: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
              >
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
                <option value={4}>4x</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DPI</label>
              <select 
                value={settings.dpi} 
                onChange={(e) => setSettings(prev => ({ ...prev, dpi: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
              >
                <option value={72}>72 DPI</option>
                <option value={150}>150 DPI</option>
                <option value={300}>300 DPI</option>
                <option value={600}>600 DPI</option>
              </select>
            </div>
          </div>
        </div>

        {/* Page Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pages to Convert</label>
          <div className="flex flex-wrap gap-4 mb-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                value="all" 
                checked={settings.pages === 'all'}
                onChange={(e) => setSettings(prev => ({ ...prev, pages: e.target.value }))}
                className="mr-2"
              />
              All Pages
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                value="range" 
                checked={settings.pages === 'range'}
                onChange={(e) => setSettings(prev => ({ ...prev, pages: e.target.value }))}
                className="mr-2"
              />
              Page Range
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                value="specific" 
                checked={settings.pages === 'specific'}
                onChange={(e) => setSettings(prev => ({ ...prev, pages: e.target.value }))}
                className="mr-2"
              />
              Specific Pages
            </label>
          </div>
          
          {settings.pages === 'range' && (
            <input 
              type="text" 
              placeholder="e.g., 1-5, 10-15" 
              value={settings.pageRange}
              onChange={(e) => setSettings(prev => ({ ...prev, pageRange: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          )}
          
          {settings.pages === 'specific' && (
            <input 
              type="text" 
              placeholder="e.g., 1,3,5,7" 
              value={settings.specificPages}
              onChange={(e) => setSettings(prev => ({ ...prev, specificPages: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          )}
        </div>
      </Card>

      {/* File Upload Area */}
      <Card className="mb-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : fileRejections.length > 0
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className={`mx-auto h-12 w-12 mb-4 ${
            fileRejections.length > 0 ? 'text-red-400' : 'text-gray-400'
          }`} />
          <p className="text-lg text-gray-600 mb-2">
            {isDragActive
              ? 'Drop your PDF files here'
              : fileRejections.length > 0
              ? 'Invalid file type detected'
              : 'Drag & drop PDF files here, or click to select'}
          </p>
          <p className="text-sm text-gray-500">
            Supports multiple PDF files. Maximum file size: 15MB per file.
          </p>
          
          {/* File Rejection Messages */}
          {fileRejections.length > 0 && (
            <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700 mb-2">
                <FiAlertCircle className="h-4 w-4" />
                <span className="font-medium">Invalid files detected:</span>
              </div>
              <ul className="text-sm text-red-600 space-y-1">
                {fileRejections.map((rejection, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-red-500">•</span>
                    <span className="font-mono">{rejection.file.name}</span>
                    <span className="text-red-500">-</span>
                    <span>{rejection.errors[0]?.message || 'Invalid file type'}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-red-600 mt-2">
                Please remove invalid files and try again with PDF files only.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Selected Files ({files.length})
              </h3>
              <p className="text-sm text-gray-500">
                Total pages: {files.reduce((total, file) => total + file.pageCount, 0)} | 
                Total size: {formatFileSize(files.reduce((total, file) => total + file.size, 0))}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-red-600 hover:text-red-700"
              >
                <FiTrash2 className="mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                <div className="flex-shrink-0">
                  <FiFile className="h-8 w-8 text-red-500" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)} • {file.pageCount} pages
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FiTrash2 className="mr-2" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Actions */}
      <Card className="mb-8">
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleProcessAll} 
            disabled={files.length === 0 || processing}
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Converting to Images...
              </>
            ) : (
              <>
                <FiImage className="mr-2" />
                Convert to Images
              </>
            )}
          </Button>
          <Button variant="outline" onClick={clearAll}>
            <FiTrash2 className="mr-2" />
            Clear All
          </Button>
          {results.length > 0 && (
            <Button variant="outline" onClick={downloadAll}>
              <FiDownload className="mr-2" />
              Download All
            </Button>
          )}
        </div>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="mb-8 border-red-200 bg-red-50">
          <div className="flex items-center gap-3 text-red-700">
            <FiAlertCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">{error}</p>
              <p className="text-sm text-red-600 mt-1">
                Please check that all files are valid PDFs and try again.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Results</h3>
            <div className="text-sm text-gray-500">
              {results.filter(r => !r.error).length} of {results.length} files processed successfully
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                {result.error ? (
                  <div className="text-center text-red-600">
                    <FiAlertCircle className="mx-auto h-8 w-8 mb-2" />
                    <div className="font-medium">{result.fileName}</div>
                    <div className="text-sm">Conversion failed</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <FiCheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                    <div className="font-medium text-gray-900">{result.fileName}</div>
                    <div className="text-sm text-gray-500 mb-3">
                      Converted {result.convertedPages} of {result.pageCount} pages to {settings.format.toUpperCase()}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => downloadResult(result)}
                      className="w-full"
                    >
                      <FiDownload className="mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          PDF to Image Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiImage className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">
              Convert to PNG, JPEG, or WebP formats
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiFile className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Page Support</h3>
            <p className="text-gray-600">
              Convert all pages, specific ranges, or individual pages
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiDownload className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">High Quality</h3>
            <p className="text-gray-600">
              Adjustable quality, scale, and DPI settings
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiFile className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Batch Processing</h3>
            <p className="text-gray-600">
              Convert multiple PDFs at once with ZIP downloads
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfToImageTool;
