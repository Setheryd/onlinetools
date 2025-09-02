"use client";
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../ui/Button';
import { FiUpload, FiTrash2, FiDownload, FiFile, FiAlertCircle, FiCheckCircle, FiSettings, FiInfo } from 'react-icons/fi';

const PdfCompressorTool = () => {
  const [file, setFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [error, setError] = useState('');
  const [originalInfo, setOriginalInfo] = useState(null);
  const [compressedInfo, setCompressedInfo] = useState(null);

  // Compression settings
  const [imageQuality, setImageQuality] = useState(60);
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [optimizeImages, setOptimizeImages] = useState(true);
  const [compressText, setCompressText] = useState(true);

  const onDrop = useCallback((acceptedFiles) => {
    const pdfFile = acceptedFiles.find(file => file.type === 'application/pdf');
    
    if (!pdfFile) {
      setError('Please select a valid PDF file.');
      return;
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (pdfFile.size > maxSize) {
      setError(`File is too large. Maximum file size is ${maxSize / (1024 * 1024)}MB.`);
      return;
    }

    setFile({
      id: Math.random().toString(36).substr(2, 9),
      file: pdfFile,
      name: pdfFile.name,
      size: pdfFile.size,
      preview: URL.createObjectURL(pdfFile)
    });
    setError('');
    setCompressedFile(null);
    setOriginalInfo(null);
    setCompressedInfo(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateCompressionRatio = (originalSize, compressedSize) => {
    return ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
  };

  const compressPdf = async () => {
    if (!file) return;

    setIsCompressing(true);
    setError('');
    setCompressionProgress(0);

    try {
      setCompressionProgress(20);
      
      // Use the API route for better compression
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('imageQuality', imageQuality.toString());
      formData.append('removeMetadata', removeMetadata.toString());
      formData.append('optimizeImages', optimizeImages.toString());
      formData.append('compressText', compressText.toString());

      const response = await fetch('/api/pdf/compress', {
        method: 'POST',
        body: formData,
      });

      setCompressionProgress(60);

      if (response.ok) {
        const compressedBlob = await response.blob();
        
        if (compressedBlob.size < file.size) {
          const compressedFileObj = {
            id: Math.random().toString(36).substr(2, 9),
            file: compressedBlob,
            name: file.name.replace('.pdf', '_compressed.pdf'),
            size: compressedBlob.size,
            preview: URL.createObjectURL(compressedBlob)
          };
          
          setCompressedFile(compressedFileObj);
          setOriginalInfo({
            name: file.name,
            size: file.size,
            formattedSize: formatFileSize(file.size)
          });
          setCompressedInfo({
            name: compressedFileObj.name,
            size: compressedFileObj.size,
            formattedSize: formatFileSize(compressedFileObj.size),
            compressionRatio: calculateCompressionRatio(file.size, compressedFileObj.size)
          });
        } else {
          setError('Unable to compress this PDF further. The file may already be optimized.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Compression failed. Please try again.');
      }
      
      setCompressionProgress(100);
    } catch (err) {
      console.error('Compression error:', err);
      setError('An error occurred during compression. Please try again with a different file.');
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };



  const downloadCompressedFile = () => {
    if (!compressedFile) return;
    
    const link = document.createElement('a');
    link.href = compressedFile.preview;
    link.download = compressedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFiles = () => {
    setFile(null);
    setCompressedFile(null);
    setError('');
    setOriginalInfo(null);
    setCompressedInfo(null);
    setCompressionProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Compressor</h1>
        <p className="text-lg text-gray-600 mb-6">
          Compress PDF files to reduce file size while maintaining quality
        </p>
      </div>

      {/* File Upload Area */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 p-8 mb-6">
        <div {...getRootProps()} className="text-center cursor-pointer">
          <input {...getInputProps()} />
          <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-lg text-blue-600">Drop the PDF file here...</p>
          ) : (
            <div>
              <p className="text-lg text-gray-600 mb-2">
                Drag & drop a PDF file here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Maximum file size: 50MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <FiAlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* File Info */}
      {file && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiFile className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">{file.name}</h3>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <Button
              onClick={clearFiles}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <FiTrash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Compression Settings */}
      {file && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiSettings className="h-5 w-5 mr-2" />
            Compression Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={optimizeImages}
                  onChange={(e) => setOptimizeImages(e.target.checked)}
                  className="mr-2"
                />
                Optimize Images
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={removeMetadata}
                  onChange={(e) => setRemoveMetadata(e.target.checked)}
                  className="mr-2"
                />
                Remove Metadata
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={compressText}
                  onChange={(e) => setCompressText(e.target.checked)}
                  className="mr-2"
                />
                Compress Text
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Quality: {imageQuality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={imageQuality}
                onChange={(e) => setImageQuality(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Compress Button */}
      {file && !compressedFile && (
        <div className="text-center mb-6">
          <Button
            onClick={compressPdf}
            disabled={isCompressing}
            className="px-8 py-3 text-lg"
          >
            {isCompressing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Compressing... {compressionProgress}%
              </div>
            ) : (
              'Compress PDF'
            )}
          </Button>
        </div>
      )}

      {/* Progress Bar */}
      {isCompressing && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${compressionProgress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Compressing PDF... {compressionProgress}%
          </p>
        </div>
      )}

      {/* Compression Results */}
      {compressedFile && originalInfo && compressedInfo && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiCheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Compression Complete
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Original File</h4>
              <p className="text-sm text-gray-600">{originalInfo.name}</p>
              <p className="text-lg font-semibold text-gray-900">{originalInfo.formattedSize}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Compressed File</h4>
              <p className="text-sm text-gray-600">{compressedInfo.name}</p>
              <p className="text-lg font-semibold text-green-600">{compressedInfo.formattedSize}</p>
              <p className="text-sm text-green-600">
                {compressedInfo.compressionRatio}% smaller
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              onClick={downloadCompressedFile}
              className="px-6 py-2"
            >
              <FiDownload className="h-4 w-4 mr-2" />
              Download Compressed PDF
            </Button>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <FiInfo className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">How PDF Compression Works</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Optimizes image quality and resolution</li>
              <li>• Removes unnecessary metadata and comments</li>
              <li>• Compresses text and object data</li>
              <li>• Maintains document readability and quality</li>
              <li>• All processing happens in your browser - your files stay private</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfCompressorTool;
