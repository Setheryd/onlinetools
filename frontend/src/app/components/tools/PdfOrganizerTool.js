"use client";
import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FiUpload, FiTrash2, FiDownload, FiFile, FiAlertCircle, FiCheckCircle, FiX, FiMove } from 'react-icons/fi';

const PdfOrganizerTool = () => {
  const [pages, setPages] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

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

    setProcessing(true);
    setError('');

    try {
      const newPages = [];
      
      for (const file of pdfFiles) {
        if (file.size > 15 * 1024 * 1024) {
          setError(`${file.name} is too large. Maximum file size is 15MB.`);
          continue;
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();

        // Generate page thumbnails and metadata
        for (let i = 0; i < pageCount; i++) {
          const pageId = `${file.name}-page-${i + 1}-${Date.now()}-${Math.random()}`;
          
          // Create a thumbnail (simplified - in real implementation you'd render the actual page)
          const thumbnail = await generatePageThumbnail(pdfDoc, i);
          
          newPages.push({
            id: pageId,
            file: file,
            fileName: file.name,
            pageNumber: i + 1,
            originalIndex: i,
            thumbnail: thumbnail,
            size: file.size,
            pdfDoc: pdfDoc
          });
        }
      }

      setPages(prev => [...prev, ...newPages]);
    } catch (err) {
      console.error('Error processing PDF files:', err);
      setError('Failed to process PDF files. Please ensure they are valid PDFs.');
    } finally {
      setProcessing(false);
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

  // Generate a simple page thumbnail (placeholder implementation)
  const generatePageThumbnail = async (pdfDoc, pageIndex) => {
    try {
      // Create a temporary PDF with just this page
      const tempPdf = await PDFDocument.create();
      const [copiedPage] = await tempPdf.copyPages(pdfDoc, [pageIndex]);
      tempPdf.addPage(copiedPage);
      
      // Convert to blob for thumbnail generation
      const pdfBytes = await tempPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      // Create a simple canvas-based thumbnail
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error('Error generating thumbnail:', err);
      return null;
    }
  };

  // Drag and drop functionality for reordering pages
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', ''); // Required for Firefox
    
    // Add dragging class to body for global styles
    document.body.classList.add('dragging');
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (dragIndex !== null && dragIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e, index) => {
    // Only clear if we're leaving the actual drop zone, not entering a child
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
    document.body.classList.remove('dragging');
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (dragIndex === null || dragIndex === dropIndex) {
      return;
    }

    setPages(prev => {
      const newPages = [...prev];
      const draggedPage = newPages[dragIndex];
      
      // Remove the dragged page
      newPages.splice(dragIndex, 1);
      
      // Insert at the new position
      newPages.splice(dropIndex, 0, draggedPage);
      
      return newPages;
    });
    
    setDragIndex(null);
    setDragOverIndex(null);
    document.body.classList.remove('dragging');
  };

  // Remove individual page
  const removePage = (pageId) => {
    setPages(prev => {
      const pageToRemove = prev.find(p => p.id === pageId);
      if (pageToRemove?.thumbnail) {
        URL.revokeObjectURL(pageToRemove.thumbnail);
      }
      return prev.filter(p => p.id !== pageId);
    });
  };

  // Remove all pages from a specific file
  const removeFilePages = (fileName) => {
    setPages(prev => {
      const pagesToRemove = prev.filter(p => p.fileName === fileName);
      pagesToRemove.forEach(page => {
        if (page.thumbnail) {
          URL.revokeObjectURL(page.thumbnail);
        }
      });
      return prev.filter(p => p.fileName !== fileName);
    });
  };

  // Generate timestamped filename
  const generateFilename = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `Tool_Guru_Organized_PDF_${day}${month}${year}${hours}${minutes}${seconds}.pdf`;
  };

  // Process and create the final PDF
  const handleProcess = async () => {
    if (pages.length === 0) {
      setError('Please add at least one PDF page to organize.');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const mergedPdf = await PDFDocument.create();
      
      // Add pages in the current order
      for (const pageInfo of pages) {
        const [copiedPage] = await mergedPdf.copyPages(pageInfo.pdfDoc, [pageInfo.originalIndex]);
        mergedPdf.addPage(copiedPage);
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      setResult({
        name: generateFilename(),
        size: blob.size,
        url: URL.createObjectURL(blob)
      });
    } catch (err) {
      console.error('Error creating organized PDF:', err);
      setError('Failed to create the organized PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // Download the result
  const downloadResult = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Clear all pages
  const clearAll = () => {
    pages.forEach(page => {
      if (page.thumbnail) {
        URL.revokeObjectURL(page.thumbnail);
      }
    });
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }
    setPages([]);
    setResult(null);
    setError('');
  };

  // Get unique file names
  const uniqueFiles = [...new Set(pages.map(page => page.fileName))];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto">
      <style jsx>{`
        .dragging {
          cursor: grabbing !important;
        }
        
        .dragging * {
          cursor: grabbing !important;
        }
        
        .page-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .page-card:hover {
          transform: translateY(-2px);
        }
        
        .page-card.dragging {
          transform: scale(1.1) rotate(2deg);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          z-index: 50;
        }
        
        .page-card.drop-zone {
          transform: scale(1.05);
          box-shadow: 0 10px 25px -5px rgba(34, 197, 94, 0.3);
          border-color: #10b981;
          background-color: #f0fdf4;
        }
        
        .drop-indicator {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .drag-handle {
          cursor: grab;
        }
        
        .drag-handle:active {
          cursor: grabbing;
        }
      `}</style>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Organizer</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Drop multiple PDFs and organize pages with drag & drop. Reorder, delete, and merge pages from different PDFs into one organized document.
        </p>
      </div>

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

      {/* File Management */}
      {uniqueFiles.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Uploaded Files ({uniqueFiles.length})
              </h3>
              <p className="text-sm text-gray-500">
                Total pages: {pages.length} | 
                Total size: {formatFileSize(pages.reduce((total, page) => total + page.size, 0))}
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
            {uniqueFiles.map((fileName) => {
              const filePages = pages.filter(page => page.fileName === fileName);
              const totalSize = filePages.reduce((sum, page) => sum + page.size, 0);
              
              return (
                <div
                  key={fileName}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border"
                >
                  <div className="flex-shrink-0">
                    <FiFile className="h-8 w-8 text-red-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {fileName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(totalSize)} • {filePages.length} pages
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFilePages(fileName)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 className="mr-2" />
                    Remove File
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Pages Grid */}
      {pages.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Page Organization ({pages.length} pages)
              </h3>
              <p className="text-sm text-gray-500">
                Drag and drop pages to reorder them. Click the X to remove individual pages.
              </p>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              onClick={handleProcess}
              disabled={pages.length === 0 || processing}
              className="px-6 py-2"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating PDF...
                </>
              ) : (
                <>
                  <FiDownload className="mr-2" />
                  Create Organized PDF
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 p-4">
            {pages.map((page, index) => (
              <div
                key={page.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={(e) => handleDragLeave(e, index)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, index)}
                className={`page-card relative group cursor-move rounded-xl border-3 transition-all duration-300 ease-out transform ${
                  dragIndex === index
                    ? 'dragging border-blue-500 bg-blue-50 scale-110 shadow-2xl rotate-2 z-50'
                    : dragOverIndex === index
                    ? 'drop-zone border-green-500 bg-green-50 scale-105 shadow-lg ring-4 ring-green-200'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-105'
                } ${dragIndex !== null && dragIndex !== index ? 'opacity-75' : 'opacity-100'}`}
                style={{
                  minHeight: '200px',
                  touchAction: 'none' // Prevents touch scrolling while dragging
                }}
              >
                {/* Drop Zone Indicator */}
                {dragOverIndex === index && dragIndex !== index && (
                  <div className="drop-indicator absolute inset-0 bg-green-100 bg-opacity-50 rounded-xl border-2 border-dashed border-green-500 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                        <FiMove className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium text-green-700">Drop here</p>
                    </div>
                  </div>
                )}

                {/* Page Thumbnail */}
                <div className="aspect-[3/4] bg-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden">
                  {page.thumbnail ? (
                    <iframe
                      src={page.thumbnail}
                      className="w-full h-full rounded-t-xl pointer-events-none"
                      title={`Page ${page.pageNumber} from ${page.fileName}`}
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FiFile className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">Page {page.pageNumber}</p>
                    </div>
                  )}
                </div>

                {/* Page Info */}
                <div className="p-3 bg-white rounded-b-xl border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Page {page.pageNumber}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {page.fileName}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePage(page.id);
                  }}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110 shadow-lg z-20"
                  title="Remove page"
                >
                  <FiX className="h-4 w-4" />
                </button>

                {/* Drag Handle */}
                <div className="drag-handle absolute top-3 left-3 bg-gray-800 bg-opacity-90 text-white rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-opacity-100 shadow-lg z-20">
                  <FiMove className="h-4 w-4" />
                </div>

                {/* Position Indicator */}
                <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-75 text-white text-xs font-mono rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

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

      {/* Success Result */}
      {result && (
        <Card className="border-green-200 bg-green-50">
          <div className="text-center">
            <FiCheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              PDF Organized Successfully!
            </h3>
            <p className="text-green-700 mb-4">
              Your organized document is ready for download.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">File name:</span>
                <span className="font-medium">{result.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">File size:</span>
                <span className="font-medium">{formatFileSize(result.size)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Total pages:</span>
                <span className="font-medium">{pages.length}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={downloadResult}
                className="px-6 py-2"
              >
                <FiDownload className="mr-2" />
                Download Organized PDF
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={clearAll}
                className="px-6 py-2"
              >
                Start Over
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Advanced PDF Organization Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiUpload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-PDF Support</h3>
            <p className="text-gray-600">
              Drop multiple PDF files and merge their pages into one organized document
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiMove className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Page Management</h3>
            <p className="text-gray-600">
              See page thumbnails and drag & drop to reorder pages exactly as you need
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Individual Page Control</h3>
            <p className="text-gray-600">
              Remove specific pages or entire files while keeping the rest organized
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfOrganizerTool;
