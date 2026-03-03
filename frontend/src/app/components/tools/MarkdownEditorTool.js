'use client';

import React, { useState, useMemo } from 'react';
import { marked } from 'marked';
import Button from '../ui/Button';

const DEFAULT_MD = `# Hello Markdown

Write **bold** and *italic* text, \`inline code\`, and more.

## List
- Item one
- Item two

## Link
[The Tool Guru](https://thetool.guru)

## Code block
\`\`\`js
console.log('Hello, world!');
\`\`\`
`;

marked.setOptions({ gfm: true, breaks: true });

const MarkdownEditorTool = () => {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);

  const html = useMemo(() => {
    try {
      return marked(markdown || '');
    } catch {
      return '<p>Invalid markdown.</p>';
    }
  }, [markdown]);

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch (_) {}
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch (_) {}
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Markdown Editor</h1>
      <p className="text-gray-600 mb-6">
        Write and preview Markdown in real time. Copy as Markdown or as HTML. All processing in your browser.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Markdown</label>
            <Button variant="outline" size="sm" onClick={copyMarkdown}>Copy Markdown</Button>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[420px] px-3 py-2 border border-gray-300 rounded-md text-sm font-mono text-gray-900"
            placeholder="Enter Markdown..."
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Preview</label>
            <Button variant="outline" size="sm" onClick={copyHtml}>Copy HTML</Button>
          </div>
          <div
            className="w-full h-[420px] px-4 py-3 border border-gray-300 rounded-md text-sm overflow-auto bg-gray-50 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setMarkdown(DEFAULT_MD)} variant="outline">Reset sample</Button>
        <Button onClick={() => setMarkdown('')} variant="outline">Clear</Button>
      </div>
    </div>
  );
};

export default MarkdownEditorTool;
