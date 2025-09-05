import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false,
});

export async function POST(request) {
  try {
    const { markdown, options = {} } = await request.json();

    if (!markdown) {
      return new Response(JSON.stringify({ error: 'Markdown content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert markdown to HTML
    const htmlContent = marked(markdown);

    // Create complete HTML document with styling
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Markdown Document</title>
        <style>
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
          .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #007acc;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
          }
          .print-button:hover {
            background: #005a9e;
          }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px 20px; 
            color: #333;
            font-size: 14px;
          }
          
          h1, h2, h3, h4, h5, h6 { 
            color: #2c3e50; 
            margin-top: 30px; 
            margin-bottom: 15px;
            font-weight: 600;
          }
          
          h1 { 
            border-bottom: 2px solid #3498db; 
            padding-bottom: 10px; 
            font-size: 28px;
          }
          
          h2 { 
            border-bottom: 1px solid #bdc3c7; 
            padding-bottom: 5px; 
            font-size: 24px;
          }
          
          h3 { font-size: 20px; }
          h4 { font-size: 18px; }
          h5 { font-size: 16px; }
          h6 { font-size: 14px; }
          
          p { 
            margin: 15px 0; 
            text-align: justify;
          }
          
          code { 
            background-color: #f8f9fa; 
            padding: 2px 6px; 
            border-radius: 3px; 
            font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
            font-size: 0.9em;
            color: #e83e8c;
          }
          
          pre { 
            background-color: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            overflow-x: auto;
            border-left: 4px solid #3498db;
            margin: 20px 0;
            font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
            font-size: 13px;
            line-height: 1.4;
          }
          
          pre code { 
            background: none; 
            padding: 0; 
            color: #333;
          }
          
          blockquote { 
            border-left: 4px solid #3498db; 
            margin: 20px 0; 
            padding-left: 20px; 
            color: #7f8c8d; 
            font-style: italic;
            background-color: #f8f9fa;
            padding: 15px 20px;
            border-radius: 0 5px 5px 0;
          }
          
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin: 20px 0;
            font-size: 14px;
          }
          
          th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left; 
          }
          
          th { 
            background-color: #f2f2f2; 
            font-weight: 600;
            color: #2c3e50;
          }
          
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          
          ul, ol { 
            padding-left: 30px; 
            margin: 15px 0;
          }
          
          li { 
            margin: 8px 0;
          }
          
          a { 
            color: #3498db; 
            text-decoration: none;
          }
          
          a:hover { 
            text-decoration: underline;
          }
          
          hr { 
            border: none; 
            border-top: 2px solid #ecf0f1; 
            margin: 30px 0;
          }
          
          img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
            margin: 10px 0;
          }
          
          /* Print styles */
          @media print {
            body {
              font-size: 12px;
              line-height: 1.4;
            }
            
            h1 { font-size: 24px; }
            h2 { font-size: 20px; }
            h3 { font-size: 18px; }
            
            pre {
              font-size: 11px;
              padding: 15px;
            }
            
            table {
              font-size: 12px;
            }
            
            th, td {
              padding: 8px;
            }
          }
        </style>
      </head>
      <body>
        <button class="print-button no-print" onclick="window.print()">Print PDF</button>
        ${htmlContent}
      </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
