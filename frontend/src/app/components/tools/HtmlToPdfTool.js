'use client';
import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const HtmlToPdfTool = () => {
  const [htmlContent, setHtmlContent] = useState(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sample HTML Document</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 30px; }
        .highlight { background-color: #f0f8ff; padding: 15px; border-left: 4px solid #007acc; margin: 20px 0; }
        .button { background-color: #007acc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Welcome to HTML to PDF Converter</h1>
    <p>This is a sample HTML document that demonstrates various HTML elements and styling.</p>
    
    <h2>Features</h2>
    <ul>
        <li>Live HTML preview</li>
        <li>Professional PDF output</li>
        <li>Email template support</li>
        <li>Responsive design</li>
    </ul>
    
    <div class="highlight">
        <strong>Pro Tip:</strong> This tool is perfect for converting email templates, reports, and documents to PDF format.
    </div>
    
    <h2>Sample Table</h2>
    <table>
        <tr>
            <th>Feature</th>
            <th>Description</th>
            <th>Status</th>
        </tr>
        <tr>
            <td>HTML Preview</td>
            <td>Real-time preview of your HTML</td>
            <td>✅ Active</td>
        </tr>
        <tr>
            <td>PDF Generation</td>
            <td>High-quality PDF output</td>
            <td>✅ Active</td>
        </tr>
    </table>
    
    <a href="#" class="button">Sample Button</a>
    
    <h2>Contact Information</h2>
    <p>Email: contact@example.com<br>
    Phone: (555) 123-4567<br>
    Website: www.example.com</p>
</body>
</html>`);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const previewRef = useRef(null);

  // Update preview when HTML content changes
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.srcdoc = htmlContent;
    }
  }, [htmlContent]);

  const handleGeneratePdf = async () => {
    if (!htmlContent.trim()) {
      setError('Please enter some HTML content');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/html-to-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          options: {
            format: 'A4',
            margin: {
              top: '20mm',
              right: '20mm',
              bottom: '20mm',
              left: '20mm'
            },
            printBackground: true,
            displayHeaderFooter: false
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess('PDF generated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setHtmlContent('');
    setError('');
    setSuccess('');
  };

  const handleLoadSample = () => {
    setHtmlContent(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Template</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .button { background-color: #007acc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Newsletter</h1>
            <p>Stay updated with our latest news and offers</p>
        </div>
        <div class="content">
            <h2>Hello Subscriber!</h2>
            <p>Thank you for subscribing to our newsletter. We're excited to share some amazing updates with you.</p>
            
            <h3>What's New This Month:</h3>
            <ul>
                <li>New product launches</li>
                <li>Exclusive member discounts</li>
                <li>Upcoming events and webinars</li>
                <li>Industry insights and tips</li>
            </ul>
            
            <a href="#" class="button">Learn More</a>
            
            <p>Best regards,<br>The Team</p>
        </div>
        <div class="footer">
            <p>© 2024 Your Company. All rights reserved.</p>
            <p>You received this email because you subscribed to our newsletter.</p>
        </div>
    </div>
</body>
</html>`);
    setError('');
    setSuccess('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          HTML to PDF Converter
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Convert your HTML content to professional PDF documents with live preview. 
          Perfect for email templates, reports, invoices, and any HTML-based documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* HTML Input Section */}
        <div className="space-y-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">HTML Content</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLoadSample}
                  >
                    Load Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your HTML content here..."
                spellCheck={false}
              />
              
              <div className="mt-4 flex gap-3">
                <Button
                  variant="primary"
                  onClick={handleGeneratePdf}
                  disabled={isGenerating || !htmlContent.trim()}
                  className="flex-1"
                >
                  {isGenerating ? 'Generating PDF...' : 'Generate PDF'}
                </Button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Preview</h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  ref={previewRef}
                  className="w-full h-96 border-0"
                  title="HTML Preview"
                  sandbox="allow-same-origin"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This preview shows how your HTML will look in the PDF
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12">
        <Card>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose Our HTML to PDF Converter?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">👁️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Preview</h3>
                <p className="text-gray-600">
                  See exactly how your HTML will look in the PDF before generating
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Templates</h3>
                <p className="text-gray-600">
                  Perfect for converting email HTML to PDF for archiving or printing
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Styling</h3>
                <p className="text-gray-600">
                  Supports CSS, images, and all modern HTML features
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Usage Tips */}
      <div className="mt-8">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Include complete HTML structure with DOCTYPE, html, head, and body tags</li>
              <li>• Use inline CSS or include styles in the head section for best results</li>
              <li>• For email templates, use table-based layouts for better compatibility</li>
              <li>• Test your HTML in the preview before generating the PDF</li>
              <li>• Large images will be automatically resized to fit the page</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HtmlToPdfTool;
