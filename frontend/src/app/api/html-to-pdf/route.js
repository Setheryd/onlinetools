export async function POST(request) {
  try {
    const { html, options = {} } = await request.json();

    if (!html) {
      return new Response(JSON.stringify({ error: 'HTML content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // For development, return a simple HTML response with print styles
    // In production, you would use Puppeteer here
    const printHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>PDF Preview</title>
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
        </style>
      </head>
      <body>
        <button class="print-button no-print" onclick="window.print()">Print PDF</button>
        ${html}
      </body>
      </html>
    `;

    return new Response(printHtml, {
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
