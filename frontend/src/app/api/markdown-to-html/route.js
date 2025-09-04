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
    const { markdown } = await request.json();

    if (!markdown) {
      return new Response(JSON.stringify({ error: 'Markdown content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert markdown to HTML
    const html = marked(markdown);

    return new Response(JSON.stringify({ html }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error converting markdown:', error);
    return new Response(JSON.stringify({ error: 'Failed to convert markdown' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
