'use client';
import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const MarkdownToPdfTool = () => {
  const [markdownContent, setMarkdownContent] = useState(`# Markdown to PDF Converter

Welcome to our powerful Markdown to PDF converter! This tool allows you to convert your Markdown documents into professional PDF files.

## Features

- **Live Preview**: See your Markdown rendered in real-time
- **Professional Output**: High-quality PDF generation
- **Full Markdown Support**: All standard Markdown syntax
- **Custom Styling**: Beautiful default styling with customization options

## Getting Started

1. Enter your Markdown content in the editor
2. Preview the rendered output
3. Click "Generate PDF" to download

### Code Examples

Here's a simple JavaScript example:

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Headers | Support for H1-H6 | ✅ |
| Lists | Ordered and unordered | ✅ |
| Code | Syntax highlighting | ✅ |
| Tables | Full table support | ✅ |

### Blockquotes

> This is a blockquote. It can contain multiple paragraphs and other Markdown elements.
> 
> It's perfect for highlighting important information or quotes.

### Links and Images

- [Visit our website](https://example.com)
- [GitHub Repository](https://github.com/example)

![Sample Image](https://via.placeholder.com/300x200?text=Sample+Image)

## Advanced Features

### Task Lists

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

### Horizontal Rules

---

### Emphasis

*Italic text* and **bold text** and ***bold italic text***

### Inline Code

Use \`console.log()\` to output messages to the console.

## Conclusion

This Markdown to PDF converter makes it easy to create professional documents from your Markdown content. Perfect for documentation, reports, and any text-based content.

---

*Generated with The Tool Guru's Markdown to PDF Converter*`);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [renderedHtml, setRenderedHtml] = useState('');
  const previewRef = useRef(null);

  // Convert markdown to HTML
  const convertMarkdownToHtml = async (markdown) => {
    try {
      const response = await fetch('/api/markdown-to-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown }),
      });

      if (!response.ok) {
        throw new Error('Failed to convert markdown');
      }

      const { html } = await response.json();
      return html;
    } catch (err) {
      console.error('Error converting markdown:', err);
      // Fallback to basic markdown conversion
      return convertMarkdownBasic(markdown);
    }
  };

  // Basic markdown conversion fallback
  const convertMarkdownBasic = (markdown) => {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
      // Line breaks
      .replace(/\n/gim, '<br>');

    return `<div class="markdown-content">${html}</div>`;
  };

  // Update preview when markdown content changes
  useEffect(() => {
    const updatePreview = async () => {
      const html = await convertMarkdownToHtml(markdownContent);
      setRenderedHtml(html);
      
      if (previewRef.current) {
        previewRef.current.srcdoc = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Markdown Preview</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px; 
                color: #333;
              }
              .markdown-content h1, .markdown-content h2, .markdown-content h3 { 
                color: #2c3e50; 
                margin-top: 30px; 
                margin-bottom: 15px;
              }
              .markdown-content h1 { border-bottom: 2px solid #3498db; padding-bottom: 10px; }
              .markdown-content h2 { border-bottom: 1px solid #bdc3c7; padding-bottom: 5px; }
              .markdown-content code { 
                background-color: #f8f9fa; 
                padding: 2px 4px; 
                border-radius: 3px; 
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 0.9em;
              }
              .markdown-content pre { 
                background-color: #f8f9fa; 
                padding: 15px; 
                border-radius: 5px; 
                overflow-x: auto;
                border-left: 4px solid #3498db;
              }
              .markdown-content pre code { background: none; padding: 0; }
              .markdown-content blockquote { 
                border-left: 4px solid #3498db; 
                margin: 20px 0; 
                padding-left: 20px; 
                color: #7f8c8d; 
                font-style: italic;
              }
              .markdown-content table { 
                border-collapse: collapse; 
                width: 100%; 
                margin: 20px 0;
              }
              .markdown-content th, .markdown-content td { 
                border: 1px solid #ddd; 
                padding: 12px; 
                text-align: left; 
              }
              .markdown-content th { 
                background-color: #f2f2f2; 
                font-weight: bold;
              }
              .markdown-content ul, .markdown-content ol { 
                padding-left: 30px; 
                margin: 15px 0;
              }
              .markdown-content li { 
                margin: 5px 0;
              }
              .markdown-content a { 
                color: #3498db; 
                text-decoration: none;
              }
              .markdown-content a:hover { 
                text-decoration: underline;
              }
              .markdown-content hr { 
                border: none; 
                border-top: 2px solid #ecf0f1; 
                margin: 30px 0;
              }
            </style>
          </head>
          <body>
            ${html}
          </body>
          </html>
        `;
      }
    };

    updatePreview();
  }, [markdownContent]);

  const handleGeneratePdf = async () => {
    if (!markdownContent.trim()) {
      setError('Please enter some Markdown content');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/markdown-to-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          markdown: markdownContent,
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
    setMarkdownContent('');
    setError('');
    setSuccess('');
  };

  const handleLoadSample = () => {
    setMarkdownContent(`# Project Documentation

## Overview

This document provides comprehensive information about our project, including setup instructions, API documentation, and usage examples.

## Installation

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Git

### Steps

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/example/project.git
   cd project
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## API Reference

### Authentication

All API requests require authentication using a Bearer token:

\`\`\`javascript
const response = await fetch('/api/data', {
  headers: {
    'Authorization': 'Bearer your-token-here'
  }
});
\`\`\`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users |
| POST | /api/users | Create new user |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

## Configuration

### Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
API_PORT=3000
\`\`\`

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in your \`.env\` file
   - Kill existing processes using the port

2. **Database connection failed**
   - Check your database credentials
   - Ensure the database server is running

### Getting Help

- 📧 Email: support@example.com
- 💬 Discord: [Join our server](https://discord.gg/example)
- 📖 Documentation: [Read the docs](https://docs.example.com)

---

*Last updated: ${new Date().toLocaleDateString()}*`);
    setError('');
    setSuccess('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Markdown to PDF Converter
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Convert your Markdown documents to professional PDF files with live preview. 
          Perfect for documentation, reports, README files, and any Markdown-based content.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Markdown Input Section */}
        <div className="space-y-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Markdown Content</h2>
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
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Markdown content here..."
                spellCheck={false}
              />
              
              <div className="mt-4 flex gap-3">
                <Button
                  variant="primary"
                  onClick={handleGeneratePdf}
                  disabled={isGenerating || !markdownContent.trim()}
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
                  title="Markdown Preview"
                  sandbox="allow-same-origin"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This preview shows how your Markdown will look in the PDF
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
              Why Choose Our Markdown to PDF Converter?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Markdown Support</h3>
                <p className="text-gray-600">
                  Supports all standard Markdown syntax including tables, code blocks, and more
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">👁️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Preview</h3>
                <p className="text-gray-600">
                  See exactly how your Markdown will look in the PDF before generating
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation Ready</h3>
                <p className="text-gray-600">
                  Perfect for converting README files, documentation, and technical content
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Markdown Guide */}
      <div className="mt-8">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Markdown Syntax Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Text Formatting</h4>
                <ul className="space-y-1 text-gray-600">
                  <li><code>**bold**</code> → <strong>bold</strong></li>
                  <li><code>*italic*</code> → <em>italic</em></li>
                  <li><code>`code`</code> → <code>code</code></li>
                  <li><code>~~strikethrough~~</code> → <del>strikethrough</del></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Structure</h4>
                <ul className="space-y-1 text-gray-600">
                  <li><code># Header 1</code></li>
                  <li><code>## Header 2</code></li>
                  <li><code>- List item</code></li>
                  <li><code>[Link](url)</code></li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarkdownToPdfTool;
