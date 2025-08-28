"use client";
import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FiUpload, FiTrash2, FiDownload, FiFile, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

const PdfSplitterTool = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [splitMode, setSplitMode] = useState('every'); // 'range', 'every', 'custom', 'parts'
  const [splitRanges, setSplitRanges] = useState(['1-5']);
  const [everyPages, setEveryPages] = useState(1);
  const [customPages, setCustomPages] = useState('1,3,5,7');
  const [splitIntoParts, setSplitIntoParts] = useState(2);
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
      if (fileToRemove?.pdfDoc) {
        // Clean up PDF document
        fileToRemove.pdfDoc.destroy();
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearAll = () => {
    files.forEach(file => {
      if (file.pdfDoc) {
        file.pdfDoc.destroy();
      }
    });
    setFiles([]);
    setResults([]);
    setError('');
  };

  const addSplitRange = () => {
    setSplitRanges(prev => [...prev, '']);
  };

  const removeSplitRange = (index) => {
    setSplitRanges(prev => prev.filter((_, i) => i !== index));
  };

  const updateSplitRange = (index, value) => {
    setSplitRanges(prev => prev.map((range, i) => i === index ? value : range));
  };

  const validateRange = (range, maxPages) => {
    const rangeRegex = /^\d+(-\d+)?$/;
    if (!rangeRegex.test(range)) return false;
    
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number);
      return start <= end && start > 0 && end <= maxPages;
    }
    
    return Number(range) > 0 && Number(range) <= maxPages;
  };

  const calculateSplitParts = (pageCount, mode, config) => {
    switch (mode) {
      case 'range':
        return config.filter(r => r.trim() && validateRange(r, pageCount)).length;
      case 'every':
        return Math.ceil(pageCount / config);
      case 'custom':
        const pages = config.split(',').map(p => p.trim()).filter(p => p && !isNaN(p) && parseInt(p) <= pageCount);
        return pages.length;
      case 'parts':
        return Math.min(config, pageCount);
      default:
        return 0;
    }
  };

  const getSplitPreview = (file) => {
    if (!file) return [];

    const pageCount = file.pageCount;
    
    switch (splitMode) {
      case 'range':
        return splitRanges.filter(r => r.trim()).map(range => {
          const isValid = validateRange(range, pageCount);
          return { range, isValid, description: `Pages ${range}` };
        });
      case 'every':
        const parts = Math.ceil(pageCount / everyPages);
        return [{
          range: `Every ${everyPages} pages`,
          isValid: everyPages > 0 && everyPages <= pageCount,
          description: `Will create ${parts} parts (${everyPages} pages each)`
        }];
      case 'custom':
        const pages = customPages.split(',').map(p => p.trim()).filter(p => p && !isNaN(p) && parseInt(p) <= pageCount);
        return [{
          range: `Custom pages`,
          isValid: pages.length > 0,
          description: `Will create ${pages.length} parts (pages: ${pages.join(', ')})`
        }];
      case 'parts':
        const pagesPerPart = Math.ceil(pageCount / splitIntoParts);
        return [{
          range: `Split into ${splitIntoParts} parts`,
          isValid: splitIntoParts > 0 && splitIntoParts <= pageCount,
          description: `Will create ${splitIntoParts} parts (~${pagesPerPart} pages each)`
        }];
      default:
        return [];
    }
  };

  const processFile = async (fileInfo) => {
    try {
      const pageCount = fileInfo.pageCount;
      let splitPoints = [];

      switch (splitMode) {
        case 'range':
          splitPoints = splitRanges
            .filter(r => r.trim() && validateRange(r, pageCount))
            .map(range => {
              if (range.includes('-')) {
                const [start, end] = range.split('-').map(Number);
                return { start: start - 1, end: end - 1 };
              } else {
                const page = Number(range) - 1;
                return { start: page, end: page };
              }
            });
          break;

        case 'every':
          for (let i = 0; i < pageCount; i += everyPages) {
            splitPoints.push({
              start: i,
              end: Math.min(i + everyPages - 1, pageCount - 1)
            });
          }
          break;

        case 'custom':
          const pages = customPages
            .split(',')
            .map(p => p.trim())
            .filter(p => p && !isNaN(p) && parseInt(p) <= pageCount)
            .map(p => parseInt(p) - 1);
          
          pages.forEach(page => {
            splitPoints.push({ start: page, end: page });
          });
          break;

        case 'parts':
          const pagesPerPart = Math.ceil(pageCount / splitIntoParts);
          for (let i = 0; i < pageCount; i += pagesPerPart) {
            splitPoints.push({
              start: i,
              end: Math.min(i + pagesPerPart - 1, pageCount - 1)
            });
          }
          break;
      }

      // Create split PDFs
      const splitPdfs = [];
      for (let i = 0; i < splitPoints.length; i++) {
        const { start, end } = splitPoints[i];
        const newPdf = await PDFDocument.create();
        
        for (let j = start; j <= end; j++) {
          const [copiedPage] = await newPdf.copyPages(fileInfo.pdfDoc, [j]);
          newPdf.addPage(copiedPage);
        }
        
        const pdfBytes = await newPdf.save();
        splitPdfs.push({
          name: `${fileInfo.name.replace('.pdf', '')}_part_${i + 1}.pdf`,
          data: pdfBytes
        });
      }

      return {
        fileName: fileInfo.name,
        pageCount: pageCount,
        parts: splitPdfs.length,
        splitPdfs: splitPdfs
      };
    } catch (error) {
      console.error('Error processing file:', error);
      return {
        fileName: fileInfo.name,
        error: 'Splitting failed'
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
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      result.splitPdfs.forEach(pdf => {
        zip.file(pdf.name, pdf.data);
      });
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${result.fileName.replace('.pdf', '')}_split.zip`;
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
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      for (const result of validResults) {
        const folder = zip.folder(result.fileName.replace('.pdf', ''));
        result.splitPdfs.forEach(pdf => {
          folder.file(pdf.name, pdf.data);
        });
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pdf-splits.zip';
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Splitter</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Split PDF files into multiple smaller documents by page ranges, every N pages, custom page selection, or into equal parts.
        </p>
      </div>

      {/* Split Mode Selection */}
      <Card className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Split Method</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="radio" 
                value="every" 
                checked={splitMode === 'every'}
                onChange={(e) => setSplitMode(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Every N Pages</div>
                <div className="text-sm text-gray-500">Split every N pages</div>
              </div>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="radio" 
                value="parts" 
                checked={splitMode === 'parts'}
                onChange={(e) => setSplitMode(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Split into N Parts</div>
                <div className="text-sm text-gray-500">Split into equal parts</div>
              </div>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="radio" 
                value="range" 
                checked={splitMode === 'range'}
                onChange={(e) => setSplitMode(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Page Ranges</div>
                <div className="text-sm text-gray-500">Split by specific ranges</div>
              </div>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="radio" 
                value="custom" 
                checked={splitMode === 'custom'}
                onChange={(e) => setSplitMode(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Custom Pages</div>
                <div className="text-sm text-gray-500">Split at specific pages</div>
              </div>
            </label>
          </div>
        </div>

        {/* Split Configuration */}
        <div className="mb-4">
          {splitMode === 'every' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Split Every N Pages</label>
              <input 
                type="number" 
                min="1" 
                value={everyPages}
                onChange={(e) => setEveryPages(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Each part will contain N pages (except possibly the last part)</p>
            </div>
          )}

          {splitMode === 'parts' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Split into N Parts</label>
              <input 
                type="number" 
                min="2" 
                value={splitIntoParts}
                onChange={(e) => setSplitIntoParts(parseInt(e.target.value) || 2)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">PDF will be split into approximately equal parts</p>
            </div>
          )}

          {splitMode === 'range' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Page Ranges</label>
              <div className="space-y-3">
                {splitRanges.map((range, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input 
                      type="text" 
                      placeholder="e.g., 1-5, 10-15, 20" 
                      value={range}
                      onChange={(e) => updateSplitRange(index, e.target.value)}
                      className={`flex-1 px-3 py-2 border rounded-md text-sm ${
                        range && files.length > 0 && !validateRange(range, Math.max(...files.map(f => f.pageCount))) ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      onClick={() => removeSplitRange(index)}
                      className="text-red-600 hover:text-red-800 px-2 py-2"
                      disabled={splitRanges.length === 1}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addSplitRange}>
                  Add Range
                </Button>
              </div>
            </div>
          )}

          {splitMode === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Split at Pages</label>
              <input 
                type="text" 
                placeholder="e.g., 1,3,5,7,10" 
                value={customPages}
                onChange={(e) => setCustomPages(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <div className="text-xs text-gray-500 mt-1">Enter page numbers separated by commas</div>
            </div>
          )}
        </div>

        {/* Split Preview */}
        {files.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Split Preview</label>
            <div className="bg-gray-50 p-3 rounded-md">
              {files.map((file, fileIndex) => (
                <div key={fileIndex} className="mb-3 last:mb-0">
                  <div className="font-medium text-sm text-gray-900 mb-1">
                    {file.name} ({file.pageCount} pages)
                  </div>
                  {getSplitPreview(file).map((item, index) => (
                    <div key={index} className={`text-sm ${item.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {item.description} {item.isValid ? '✓' : '✗'}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
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
            disabled={files.length === 0 || processing || files.some(file => getSplitPreview(file).some(p => !p.isValid))}
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Splitting PDFs...
              </>
            ) : (
              <>
                <FiDownload className="mr-2" />
                Split PDFs
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
                    <div className="text-sm">Splitting failed</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <FiCheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                    <div className="font-medium text-gray-900">{result.fileName}</div>
                    <div className="text-sm text-gray-500 mb-3">
                      Split into {result.parts} parts ({result.pageCount} pages total)
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
          PDF Splitting Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiFile className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Every N Pages</h3>
            <p className="text-gray-600">
              Split PDFs into chunks of N pages each
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiDownload className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Equal Parts</h3>
            <p className="text-gray-600">
              Split PDFs into equal parts automatically
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiInfo className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Ranges</h3>
            <p className="text-gray-600">
              Split by specific page ranges (e.g., 1-5, 10-15)
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiFile className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Pages</h3>
            <p className="text-gray-600">
              Extract specific pages (e.g., 1,3,5,7)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfSplitterTool;
