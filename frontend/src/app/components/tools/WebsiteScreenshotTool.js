"use client";
import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import errorCapture from '../../../utils/errorCapture';

const WebsiteScreenshotTool = () => {
  const [url, setUrl] = useState('https://thetool.guru');
  const [format, setFormat] = useState('png');
  const [width, setWidth] = useState(3840); // 4K width default
  const [quality, setQuality] = useState(90);
  const [fullPage, setFullPage] = useState(true);
  const [delay, setDelay] = useState(2); // Delay in seconds
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [screenshotInfo, setScreenshotInfo] = useState(null);
  const downloadLinkRef = useRef(null);

  // Programmatic error capture (silent - only for debugging)
  useEffect(() => {
    const errorHandler = (event) => {
      const errorInfo = {
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      // Only log to console, don't show in UI
      console.log('Captured Error:', errorInfo);
      errorCapture.captureManualError(event.error, errorInfo);
    };

    const unhandledRejectionHandler = (event) => {
      const errorInfo = {
        type: 'Unhandled Promise Rejection',
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      // Only log to console, don't show in UI
      console.log('Captured Promise Rejection:', errorInfo);
      errorCapture.captureManualError(event.reason, errorInfo);
    };

    // Add event listeners
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    // Cleanup
    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, []);

  const formatOptions = [
    { value: 'png', label: 'PNG (Best Quality)', description: 'Lossless compression, perfect for screenshots' },
    { value: 'jpeg', label: 'JPEG (Smaller Size)', description: 'Good quality with smaller file size' },
    { value: 'webp', label: 'WebP (Modern)', description: 'Modern format with excellent compression' }
  ];

  const widthPresets = [
    { value: 1920, label: '1920px (Full HD)', description: 'Standard desktop resolution' },
    { value: 2560, label: '2560px (2K)', description: 'High resolution desktop' },
    { value: 3840, label: '3840px (4K)', description: 'Ultra high resolution' },
    { value: 1366, label: '1366px (Laptop)', description: 'Common laptop resolution' },
    { value: 1024, label: '1024px (Tablet)', description: 'Tablet landscape view' },
    { value: 375, label: '375px (Mobile)', description: 'Mobile portrait view' }
  ];

  const validateUrl = (inputUrl) => {
    try {
      const urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
      return urlObj.toString();
    } catch {
      return null;
    }
  };

  const handleCapture = async () => {
    const validatedUrl = validateUrl(url);
    if (!validatedUrl) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }

    setLoading(true);
    setError('');
    setScreenshotUrl('');
    setScreenshotInfo(null);

    try {
      const params = new URLSearchParams({
        url: validatedUrl,
        format,
        width: width.toString(),
        quality: quality.toString(),
        fullPage: fullPage.toString(),
        delay: delay.toString()
      });

      const response = await fetch(`/api/website-screenshot?${params}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to capture screenshot');
      }

      // Get the blob and create object URL
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setScreenshotUrl(objectUrl);

      // Get screenshot info from headers
      const contentLength = response.headers.get('content-length');
      const actualWidth = response.headers.get('x-screenshot-width');
      const actualHeight = response.headers.get('x-screenshot-height');
      
      setScreenshotInfo({
        size: contentLength ? `${(parseInt(contentLength) / 1024 / 1024).toFixed(2)} MB` : 'Unknown',
        dimensions: actualWidth && actualHeight ? `${actualWidth} × ${actualHeight}` : 'Unknown',
        format: format.toUpperCase()
      });

    } catch (err) {
      const errorMessage = err.message || 'Failed to capture screenshot. Please check the URL and try again.';
      setError(errorMessage);
      
      // Capture API errors silently for debugging
      errorCapture.captureManualError(err, {
        type: 'Screenshot API Error',
        url: validatedUrl,
        format: format,
        width: width,
        quality: quality,
        fullPage: fullPage,
        delay: delay
      });
      
      // Log to console for debugging (only visible in dev tools)
      console.log('Screenshot API Error captured:', {
        message: errorMessage,
        url: validatedUrl,
        format: format,
        width: width,
        delay: delay
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (screenshotUrl && downloadLinkRef.current) {
      const link = downloadLinkRef.current;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5); // Format: 2024-01-15T10-30-00
      const filename = `Tool Guru Webpage Full Screenshot ${timestamp}.${format}`;
      link.href = screenshotUrl;
      link.download = filename;
      link.click();
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (error) setError('');
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Website Screenshot Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Capture full-page screenshots of any website in high resolution. Perfect for documentation, 
          presentations, and archiving web content.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="space-y-6">
          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <div className="relative">
              <input
                type="text"
                id="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter website URL (e.g., example.com or https://example.com)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-400">🌐</span>
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Output Format
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {formatOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                    format === option.value
                      ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={option.value}
                    checked={format === option.value}
                    onChange={(e) => setFormat(e.target.value)}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div className="flex flex-col">
                    <span className="block text-sm font-medium text-gray-900">
                      {option.label}
                    </span>
                    <span className="block text-sm text-gray-500">
                      {option.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Width Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Viewport Width
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {widthPresets.map((preset) => (
                <label
                  key={preset.value}
                  className={`relative flex cursor-pointer rounded-lg border p-3 focus:outline-none ${
                    width === preset.value
                      ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="width"
                    value={preset.value}
                    checked={width === preset.value}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div className="flex flex-col">
                    <span className="block text-sm font-medium text-gray-900">
                      {preset.label}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {preset.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            
            {/* Custom width input */}
            <div className="mt-3">
              <label htmlFor="customWidth" className="block text-sm text-gray-600 mb-1">
                Or enter custom width:
              </label>
              <input
                type="number"
                id="customWidth"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value) || 1920)}
                min="320"
                max="7680"
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-500">px (320-7680)</span>
            </div>
          </div>

          {/* Quality Slider (for JPEG/WebP) */}
          {(format === 'jpeg' || format === 'webp') && (
            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                id="quality"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={loading}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Lower size</span>
                <span>Higher quality</span>
              </div>
            </div>
          )}

          {/* Full Page Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fullPage"
              checked={fullPage}
              onChange={(e) => setFullPage(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={loading}
            />
            <label htmlFor="fullPage" className="ml-2 block text-sm text-gray-700">
              Capture full page height (recommended)
            </label>
          </div>

          {/* Animation Delay */}
          <div>
            <label htmlFor="delay" className="block text-sm font-medium text-gray-700 mb-2">
              Animation Delay: {delay} seconds
            </label>
            <input
              type="range"
              id="delay"
              min="0"
              max="10"
              step="0.5"
              value={delay}
              onChange={(e) => setDelay(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={loading}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>No delay</span>
              <span>Wait for animations</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Allows time for page animations and dynamic content to load before capturing
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Capture Button */}
          <Button
            onClick={handleCapture}
            disabled={loading || !url.trim()}
            className="w-full py-3 text-lg font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Capturing Screenshot...
              </div>
            ) : (
              '📸 Capture Screenshot'
            )}
          </Button>
        </div>
      </div>

      {/* Screenshot Result */}
      {screenshotUrl && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Screenshot Captured Successfully!
            </h3>
            {screenshotInfo && (
              <div className="flex justify-center space-x-6 text-sm text-gray-600 mb-4">
                <span>📐 {screenshotInfo.dimensions}</span>
                <span>📁 {screenshotInfo.size}</span>
                <span>🎨 {screenshotInfo.format}</span>
              </div>
            )}
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
            <img
              src={screenshotUrl}
              alt="Website Screenshot"
              className="max-w-full h-auto mx-auto rounded shadow-lg"
              style={{ maxHeight: '600px' }}
            />
          </div>

          <div className="text-center">
            <Button
              onClick={handleDownload}
              className="px-6 py-3 text-lg font-medium"
            >
              💾 Download Screenshot
            </Button>
          </div>

          {/* Hidden download link */}
          <a
            ref={downloadLinkRef}
            style={{ display: 'none' }}
            href="#"
            download
          >
            Download
          </a>
        </div>
      )}


      {/* Features Section */}
      <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          ✨ Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🖼️</div>
            <h4 className="font-medium text-gray-900 mb-1">Multiple Formats</h4>
            <p className="text-sm text-gray-600">PNG, JPEG, and WebP support</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-medium text-gray-900 mb-1">Responsive Capture</h4>
            <p className="text-sm text-gray-600">Mobile, tablet, and desktop views</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-medium text-gray-900 mb-1">Full Page</h4>
            <p className="text-sm text-gray-600">Capture entire page height</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-medium text-gray-900 mb-1">High Resolution</h4>
            <p className="text-sm text-gray-600">Up to 4K quality screenshots</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-medium text-gray-900 mb-1">Privacy First</h4>
            <p className="text-sm text-gray-600">No data stored on our servers</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">💾</div>
            <h4 className="font-medium text-gray-900 mb-1">Instant Download</h4>
            <p className="text-sm text-gray-600">Download immediately after capture</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteScreenshotTool;
