"use client";
import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FiUpload, FiTrash2, FiDownload, FiFile, FiAlertCircle, FiCheckCircle, FiImage } from 'react-icons/fi';

const ImageToPdfTool = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [settings, setSettings] = useState({
    pageSize: 'a4', // 'a4', 'letter', 'legal', 'custom'
    orientation: 'portrait', // 'portrait', 'landscape'
    margin: 20, // margin in points
    fitMode: 'fit', // 'fit', 'fill', 'stretch'
    customWidth: 595, // A4 width in points
    customHeight: 842, // A4 height in points
    quality: 0.9
  });
  const [error, setError] = useState('');

  // Dropzone configuration
  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    // Handle rejected files (non-image files)
    if (rejectedFiles && rejectedFiles.length > 0) {
      const invalidFiles = rejectedFiles.map(file => file.file.name).join(', ');
      setError(`Invalid file type(s): ${invalidFiles}. Only image files are supported.`);
      return;
    }

    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'].includes(file.type)
    );
    
    if (imageFiles.length === 0) {
      setError('Please select valid image files.');
      return;
    }

    setError('');

    try {
      const newFiles = [];
      
      for (const file of imageFiles) {
        if (file.size > 15 * 1024 * 1024) {
          setError(`${file.name} is too large. Maximum file size is 15MB.`);
          continue;
        }

        // Validate image dimensions
        const img = new Image();
        const imageLoadPromise = new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load image'));
        });
        
        img.src = URL.createObjectURL(file);
        
        try {
          await imageLoadPromise;
          
          if (img.width > 6000 || img.height > 6000) {
            setError(`${file.name} dimensions are too large. Maximum dimensions are 6000x6000 pixels.`);
            URL.revokeObjectURL(img.src);
            continue;
          }

          newFiles.push({
            file: file,
            name: file.name,
            size: file.size,
            width: img.width,
            height: img.height,
            thumbnailUrl: img.src
          });
        } catch (err) {
          URL.revokeObjectURL(img.src);
          console.error('Error processing image:', err);
          setError(`Failed to process ${file.name}. Please ensure it's a valid image file.`);
        }
      }

      setFiles(prev => [...prev, ...newFiles]);
    } catch (err) {
      console.error('Error processing image files:', err);
      setError('Failed to process image files. Please ensure they are valid images.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp']
    },
    multiple: true,
    validator: (file) => {
      if (!file.type.startsWith('image/')) {
        return {
          code: 'file-invalid-type',
          message: `File "${file.name}" is not an image file. Only image files are supported.`
        };
      }
      return null;
    }
  });

  const removeFile = (index) => {
    setFiles(prev => {
      const fileToRemove = prev[index];
      // Clean up thumbnail URL
      if (fileToRemove?.thumbnailUrl) {
        URL.revokeObjectURL(fileToRemove.thumbnailUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearAll = () => {
    files.forEach(file => {
      // Clean up thumbnail URLs
      if (file?.thumbnailUrl) {
        URL.revokeObjectURL(file.thumbnailUrl);
      }
    });
    setFiles([]);
    setResults([]);
    setError('');
  };

  const getPageDimensions = () => {
    switch (settings.pageSize) {
      case 'a4':
        return settings.orientation === 'portrait' ? { width: 595, height: 842 } : { width: 842, height: 595 };
      case 'letter':
        return settings.orientation === 'portrait' ? { width: 612, height: 792 } : { width: 792, height: 612 };
      case 'legal':
        return settings.orientation === 'portrait' ? { width: 612, height: 1008 } : { width: 1008, height: 612 };
      case 'custom':
        return { width: settings.customWidth, height: settings.customHeight };
      default:
        return { width: 595, height: 842 };
    }
  };

  const convertImageToPdf = async (fileInfo, settings) => {
    try {
      const pdfDoc = await PDFDocument.create();
      const pageDimensions = getPageDimensions();
      
      // Create a page with the specified dimensions
      const page = pdfDoc.addPage([pageDimensions.width, pageDimensions.height]);
      
      // Load the image
      const imageBytes = await fileInfo.file.arrayBuffer();
      let image;
      
      // Determine image type and embed accordingly
      if (fileInfo.file.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else if (fileInfo.file.type === 'image/jpeg' || fileInfo.file.type === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else {
        // For other formats, convert to PNG first using canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve();
          };
          img.onerror = reject;
          img.src = fileInfo.thumbnailUrl;
        });
        
        const pngBlob = await new Promise(resolve => {
          canvas.toBlob(resolve, 'image/png', settings.quality);
        });
        
        const pngBytes = await pngBlob.arrayBuffer();
        image = await pdfDoc.embedPng(pngBytes);
      }
      
      // Calculate image dimensions and positioning
      const { width: pageWidth, height: pageHeight } = page.getSize();
      const margin = settings.margin;
      const availableWidth = pageWidth - (margin * 2);
      const availableHeight = pageHeight - (margin * 2);
      
      let imageWidth, imageHeight;
      
      switch (settings.fitMode) {
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
      
      return {
        fileName: fileInfo.name,
        pdfBytes: pdfBytes,
        pageCount: 1
      };
    } catch (error) {
      console.error('Error converting image to PDF:', error);
      throw error;
    }
  };

  const processFile = async (fileInfo) => {
    try {
      const result = await convertImageToPdf(fileInfo, settings);
      return result;
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
      const blob = new Blob([result.pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${result.fileName.replace(/\.[^/.]+$/, '')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading result:', error);
      setError('Failed to download result');
    }
  };

  const downloadAll = async () => {
    const validResults = results.filter(r => !r.error);
    if (validResults.length === 0) return;
    
    try {
      if (validResults.length === 1) {
        // Single PDF - download directly
        downloadResult(validResults[0]);
      } else {
        // Multiple PDFs - create ZIP
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        
        for (const result of validResults) {
          const fileName = `${result.fileName.replace(/\.[^/.]+$/, '')}.pdf`;
          zip.file(fileName, result.pdfBytes);
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'images-to-pdf.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Image to PDF Converter</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Convert images to PDF documents with customizable page settings and layout options.
        </p>
      </div>

      {/* Settings */}
      <Card className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">PDF Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Size</label>
              <select 
                value={settings.pageSize} 
                onChange={(e) => setSettings(prev => ({ ...prev, pageSize: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
              <select 
                value={settings.orientation} 
                onChange={(e) => setSettings(prev => ({ ...prev, orientation: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fit Mode</label>
              <select 
                value={settings.fitMode} 
                onChange={(e) => setSettings(prev => ({ ...prev, fitMode: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
              >
                <option value="fit">Fit to Page</option>
                <option value="fill">Fill Page</option>
                <option value="stretch">Stretch to Fill</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Margin (points)</label>
              <input 
                type="number" 
                min="0" 
                max="100" 
                value={settings.margin}
                onChange={(e) => setSettings(prev => ({ ...prev, margin: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
              />
            </div>
          </div>
          
          {settings.pageSize === 'custom' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Width (points)</label>
                <input 
                  type="number" 
                  min="100" 
                  max="2000" 
                  value={settings.customWidth}
                  onChange={(e) => setSettings(prev => ({ ...prev, customWidth: parseInt(e.target.value) || 595 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Height (points)</label>
                <input 
                  type="number" 
                  min="100" 
                  max="2000" 
                  value={settings.customHeight}
                  onChange={(e) => setSettings(prev => ({ ...prev, customHeight: parseInt(e.target.value) || 842 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                />
              </div>
            </div>
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
              ? 'Drop your image files here'
              : fileRejections.length > 0
              ? 'Invalid file type detected'
              : 'Drag & drop image files here, or click to select'}
          </p>
          <p className="text-sm text-gray-500">
            Supports JPG, PNG, WebP, GIF, BMP. Maximum file size: 15MB per file. Maximum dimensions: 6000x6000 pixels.
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
                Please remove invalid files and try again with image files only.
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
                Selected Images ({files.length})
              </h3>
              <p className="text-sm text-gray-500">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={file.thumbnailUrl} 
                      alt={file.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {file.width}×{file.height}
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
                Converting to PDF...
              </>
            ) : (
              <>
                <FiFile className="mr-2" />
                Convert to PDF
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
                Please check that all files are valid images and try again.
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
                      Converted to PDF ({result.pageCount} page)
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => downloadResult(result)}
                      className="w-full"
                    >
                      <FiDownload className="mr-2" />
                      Download PDF
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
          Image to PDF Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiImage className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">
              Convert JPG, PNG, WebP, GIF, and BMP images to PDF
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiFile className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Page Sizes</h3>
            <p className="text-gray-600">
              Choose from A4, Letter, Legal, or custom page dimensions
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiDownload className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Layout</h3>
            <p className="text-gray-600">
              Fit, fill, or stretch images with adjustable margins
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiFile className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Batch Processing</h3>
            <p className="text-gray-600">
              Convert multiple images at once with ZIP downloads
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToPdfTool;
