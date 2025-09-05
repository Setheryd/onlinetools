"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Body from '../layout/Body';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { 
  FiUpload, 
  FiDownload, 
  FiFile, 
  FiAlertCircle, 
  FiCheckCircle,
  FiEdit3,
  FiImage,
  FiType,
  FiSquare,
  FiRotateCw,
  FiTrash2,
  FiSave,
  FiUndo,
  FiRedo,
  FiZoomIn,
  FiZoomOut,
  FiMove
} from 'react-icons/fi';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfEditorTool = () => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pdfJsDoc, setPdfJsDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [selectedTool, setSelectedTool] = useState('select');
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState(12);
  const [textColor, setTextColor] = useState('#000000');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [annotations, setAnnotations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const tools = [
    { id: 'select', name: 'Select', icon: FiMove },
    { id: 'text', name: 'Add Text', icon: FiType },
    { id: 'highlight', name: 'Highlight', icon: FiSquare },
    { id: 'image', name: 'Add Image', icon: FiImage },
    { id: 'rotate', name: 'Rotate', icon: FiRotateCw },
    { id: 'delete', name: 'Delete', icon: FiTrash2 },
  ];

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file || file.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setError('File size too large. Maximum size is 50MB');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load with pdf-lib for editing
      const pdfDocLib = await PDFDocument.load(arrayBuffer);
      setPdfDoc(pdfDocLib);
      
      // Load with pdf.js for rendering
      const pdfJsDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfJsDoc(pdfJsDocument);
      
      // Initialize pages array
      const pageCount = pdfJsDocument.numPages;
      const pagesArray = Array.from({ length: pageCount }, (_, i) => ({
        id: i,
        pageNumber: i + 1,
        annotations: []
      }));
      setPages(pagesArray);
      setCurrentPage(0);
      
      // Save initial state to history
      const initialBytes = await pdfDocLib.save();
      setHistory([initialBytes]);
      setHistoryIndex(0);
      
      // Render first page
      await renderPage(0, pdfJsDocument);
      
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Failed to load PDF. Please ensure it\'s a valid PDF file.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const renderPage = async (pageIndex, document = pdfJsDoc) => {
    if (!document || !canvasRef.current) return;

    try {
      const page = await document.getPage(pageIndex + 1);
      const viewport = page.getViewport({ scale });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 0 && newPage < pages.length) {
      setCurrentPage(newPage);
      await renderPage(newPage);
    }
  };

  const handleZoom = async (newScale) => {
    setScale(newScale);
    await renderPage(currentPage);
  };

  const addText = async () => {
    if (!pdfDoc || !textInput.trim()) return;

    try {
      setIsEditing(true);
      const page = pdfDoc.getPage(currentPage);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      // Convert hex color to RGB
      const hex = textColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      page.drawText(textInput, {
        x: 50,
        y: page.getHeight() - 100,
        size: fontSize,
        font: font,
        color: rgb(r, g, b)
      });

      // Save to history
      const newBytes = await pdfDoc.save();
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newBytes);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      // Re-render current page
      await renderPage(currentPage);
      setTextInput('');
      
    } catch (err) {
      console.error('Error adding text:', err);
      setError('Failed to add text to PDF');
    } finally {
      setIsEditing(false);
    }
  };

  const rotatePage = async () => {
    if (!pdfDoc) return;

    try {
      setIsEditing(true);
      const page = pdfDoc.getPage(currentPage);
      page.setRotation(page.getRotation().angle + 90);
      
      // Save to history
      const newBytes = await pdfDoc.save();
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newBytes);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      // Re-render current page
      await renderPage(currentPage);
      
    } catch (err) {
      console.error('Error rotating page:', err);
      setError('Failed to rotate page');
    } finally {
      setIsEditing(false);
    }
  };

  const undo = async () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      
      const pdfDocLib = await PDFDocument.load(history[newIndex]);
      setPdfDoc(pdfDocLib);
      
      await renderPage(currentPage);
    }
  };

  const redo = async () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      
      const pdfDocLib = await PDFDocument.load(history[newIndex]);
      setPdfDoc(pdfDocLib);
      
      await renderPage(currentPage);
    }
  };

  const downloadPdf = async () => {
    if (!pdfDoc) return;

    try {
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'edited-document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError('Failed to download PDF');
    }
  };

  const clearAll = () => {
    setPdfDoc(null);
    setPdfJsDoc(null);
    setPages([]);
    setCurrentPage(0);
    setHistory([]);
    setHistoryIndex(-1);
    setError('');
    setTextInput('');
    setAnnotations([]);
    setIsEditing(false);
    
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Re-render when scale changes
  useEffect(() => {
    if (pdfJsDoc && pages.length > 0) {
      renderPage(currentPage);
    }
  }, [scale, pdfJsDoc, currentPage]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Editor</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Edit PDF documents directly in your browser. Add text, annotations, rotate pages, and more. 
          No external APIs required - everything runs locally.
        </p>
      </div>

      {/* File Upload Area */}
      {!pdfDoc && (
        <Card className="mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <FiUpload className="mx-auto h-16 w-16 text-gray-400 mb-6" />
            <p className="text-xl text-gray-600 mb-4">
              {isDragActive
                ? 'Drop your PDF file here'
                : 'Drag & drop a PDF file here, or click to select'}
            </p>
            <p className="text-sm text-gray-500">
              Maximum file size: 50MB. Supports all standard PDF files.
            </p>
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
            </div>
          </div>
        </Card>
      )}

      {/* PDF Editor Interface */}
      {pdfDoc && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Toolbar */}
          <Card className="lg:col-span-1">
            <div className="space-y-6">
              {/* File Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Document</h3>
                <div className="text-sm text-gray-600">
                  <p>Pages: {pages.length}</p>
                  <p>Current: {currentPage + 1}</p>
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tools</h3>
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Button
                        key={tool.id}
                        variant={selectedTool === tool.id ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTool(tool.id)}
                        className="flex flex-col items-center p-3 h-auto"
                      >
                        <Icon className="h-4 w-4 mb-1" />
                        <span className="text-xs">{tool.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Text Tool Options */}
              {selectedTool === 'text' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Text Options</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Text
                      </label>
                      <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Enter text..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Font Size
                      </label>
                      <input
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value) || 12)}
                        min="8"
                        max="72"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={addText}
                      disabled={!textInput.trim() || isEditing}
                      className="w-full"
                    >
                      {isEditing ? 'Adding...' : 'Add Text'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Page Controls */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Page Controls</h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pages.length - 1}
                      className="flex-1"
                    >
                      Next
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rotatePage}
                    disabled={isEditing}
                    className="w-full"
                  >
                    <FiRotateCw className="mr-2" />
                    Rotate Page
                  </Button>
                </div>
              </div>

              {/* Zoom Controls */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Zoom</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleZoom(scale - 0.25)}
                    disabled={scale <= 0.5}
                  >
                    <FiZoomOut />
                  </Button>
                  <span className="flex-1 text-center text-sm text-gray-600 flex items-center justify-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleZoom(scale + 0.25)}
                    disabled={scale >= 3}
                  >
                    <FiZoomIn />
                  </Button>
                </div>
              </div>

              {/* History Controls */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">History</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={undo}
                    disabled={historyIndex <= 0}
                    className="flex-1"
                  >
                    <FiUndo className="mr-1" />
                    Undo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                    className="flex-1"
                  >
                    <FiRedo className="mr-1" />
                    Redo
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={downloadPdf}
                    className="w-full"
                  >
                    <FiDownload className="mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    className="w-full"
                  >
                    <FiTrash2 className="mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* PDF Viewer */}
          <Card className="lg:col-span-3">
            <div className="flex flex-col h-full">
              {/* Page Navigation */}
              <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Page {currentPage + 1} of {pages.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        index === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Container */}
              <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg p-4">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="border border-gray-300 bg-white shadow-lg"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          PDF Editor Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiType className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Text</h3>
            <p className="text-gray-600">
              Add custom text with different fonts, sizes, and colors to your PDF
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiRotateCw className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Operations</h3>
            <p className="text-gray-600">
              Rotate pages, navigate through documents, and manage page layouts
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiDownload className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Download & Save</h3>
            <p className="text-gray-600">
              Download your edited PDF instantly with all changes preserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfEditorTool;
