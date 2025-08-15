"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FiUpload, FiTrash2, FiDownload, FiFile, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const PDFMergerPage = () => {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [mergedFile, setMergedFile] = useState(null);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    
    // Validate file sizes (15MB limit)
    const validFiles = pdfFiles.filter(file => {
      if (file.size > 15 * 1024 * 1024) {
        setError(`${file.name} is too large. Maximum file size is 15MB.`);
        return false;
      }
      return true;
    });
    
    if (validFiles.length === 0) {
      return;
    }
    
    const newFiles = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      pageCount: 0, // Will be updated when processing
      preview: URL.createObjectURL(file)
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    setError('');
    
    // Detect page counts for new files
    newFiles.forEach(async (fileInfo) => {
      try {
        const arrayBuffer = await fileInfo.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        
        setFiles(prev => prev.map(f => 
          f.id === fileInfo.id ? { ...f, pageCount } : f
        ));
      } catch (err) {
        console.error(`Error detecting page count for ${fileInfo.name}:`, err);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const removeFile = (id) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const moveFile = (id, direction) => {
    setFiles(prev => {
      const index = prev.findIndex(f => f.id === id);
      if (index === -1) return prev;
      
      const newFiles = [...prev];
      if (direction === 'up' && index > 0) {
        [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
      } else if (direction === 'down' && index < newFiles.length - 1) {
        [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      }
      
      return newFiles;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge');
      return;
    }
    
    if (files.length > 20) {
      setError('Too many files. Maximum 20 PDFs can be merged at once.');
      return;
    }

    setIsMerging(true);
    setError('');
    setMergeProgress(0);

    try {
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();
      
      // Process each PDF file in order
      for (let i = 0; i < files.length; i++) {
        const fileInfo = files[i];
        try {
          // Update progress
          setMergeProgress(((i + 1) / files.length) * 100);
          
          // Read the PDF file
          const arrayBuffer = await fileInfo.file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          
          // Get all pages from the PDF
          const pageIndices = pdf.getPageIndices();
          
          // Copy each page to the merged PDF
          for (const pageIndex of pageIndices) {
            const [copiedPage] = await mergedPdf.copyPages(pdf, [pageIndex]);
            mergedPdf.addPage(copiedPage);
          }
        } catch (err) {
          console.error(`Error processing ${fileInfo.name}:`, err);
          setError(`Error processing ${fileInfo.name}. Please ensure it's a valid PDF file.`);
          setIsMerging(false);
          setMergeProgress(0);
          return;
        }
      }
      
      // Generate the merged PDF as bytes
      const mergedPdfBytes = await mergedPdf.save();
      
      // Create a blob from the merged PDF
      const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      
      setMergedFile({
        name: 'merged-document.pdf',
        size: mergedPdfBlob.size,
        url: URL.createObjectURL(mergedPdfBlob)
      });
    } catch (err) {
      console.error('Error merging PDFs:', err);
      setError('Failed to merge PDFs. Please ensure all files are valid PDFs and try again.');
    } finally {
      setIsMerging(false);
      setMergeProgress(0);
    }
  };

  const downloadMerged = () => {
    if (mergedFile) {
      const link = document.createElement('a');
      link.href = mergedFile.url;
      link.download = mergedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearAll = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    if (mergedFile?.url) {
      URL.revokeObjectURL(mergedFile.url);
    }
    setFiles([]);
    setMergedFile(null);
    setError('');
    setMergeProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      if (mergedFile?.url) {
        URL.revokeObjectURL(mergedFile.url);
      }
    };
  }, [files, mergedFile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Merger</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combine multiple PDF files into one document. Drag and drop your PDFs, 
              arrange them in the desired order, and merge them instantly.
            </p>
          </div>

          {/* File Upload Area */}
          <Card className="mb-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg text-gray-600 mb-2">
                {isDragActive
                  ? 'Drop your PDF files here'
                  : 'Drag & drop PDF files here, or click to select'}
              </p>
              <p className="text-sm text-gray-500">
                Supports multiple PDF files. Maximum file size: 15MB per file. 
                Maximum 20 files per merge.
              </p>
            </div>
          </Card>

          {/* File List */}
          {files.length > 0 && (
            <Card className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    PDF Files ({files.length})
                  </h3>
                  <p className="text-sm text-gray-500">
                    Total pages: {files.reduce((total, file) => total + (file.pageCount || 0), 0)} | 
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
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex-shrink-0">
                      <FiFile className="h-8 w-8 text-red-500" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {file.pageCount || '?'} pages
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveFile(file.id, 'up')}
                        disabled={index === 0}
                        className="px-2 py-1"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveFile(file.id, 'down')}
                        disabled={index === files.length - 1}
                        className="px-2 py-1"
                      >
                        ↓
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-600 hover:text-red-700 px-2 py-1"
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Merge Button */}
              <div className="mt-6 text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleMerge}
                  disabled={files.length < 2 || isMerging}
                  className="px-8 py-3"
                >
                  {isMerging ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Merging PDFs...
                    </>
                  ) : (
                    <>
                      <FiDownload className="mr-2" />
                      Merge PDFs
                    </>
                  )}
                </Button>
                
                {/* Progress Bar */}
                {isMerging && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${mergeProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Processing {Math.round(mergeProgress)}% complete
                    </p>
                  </div>
                )}
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
          {mergedFile && (
            <Card className="border-green-200 bg-green-50">
              <div className="text-center">
                <FiCheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  PDFs Merged Successfully!
                </h3>
                <p className="text-green-700 mb-4">
                  Your merged document is ready for download.
                </p>
                <div className="bg-white rounded-lg p-4 mb-4 border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">File name:</span>
                    <span className="font-medium">{mergedFile.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">File size:</span>
                    <span className="font-medium">{formatFileSize(mergedFile.size)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Total pages:</span>
                    <span className="font-medium">{files.reduce((total, file) => total + (file.pageCount || 0), 0)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={downloadMerged}
                    className="px-6 py-2"
                  >
                    <FiDownload className="mr-2" />
                    Download Merged PDF
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
              Why Choose Our PDF Merger?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiUpload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Upload</h3>
                <p className="text-gray-600">
                  Drag and drop multiple PDF files or use our simple file picker
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiFile className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Organization</h3>
                <p className="text-gray-600">
                  Arrange your PDFs in any order before merging
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiDownload className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Download</h3>
                <p className="text-gray-600">
                  Get your merged PDF immediately after processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PDFMergerPage;
