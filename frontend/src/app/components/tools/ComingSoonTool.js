import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ComingSoonTool = ({ tool }) => {
  if (!tool) return null;
  const { name, description, icon, path } = tool;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-8 text-center">
        <div className="text-5xl mb-4" aria-hidden>
          {icon || '🔜'}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
        {description && (
          <p className="text-gray-600 mb-6">{description}</p>
        )}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm font-medium mb-8">
          <span aria-hidden>🚧</span>
          Coming soon. We are building this tool.
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/tools">
            <Button>Browse all tools</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ComingSoonTool;
