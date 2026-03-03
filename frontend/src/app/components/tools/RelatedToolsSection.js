import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import CtaVariant from '../ui/CtaVariant';
import { getRelatedTools } from '@/lib/tools';

/**
 * Renders a "Related tools" section with links to other tools in the same category.
 * Pass either `tools` (array) or `toolId` (string); when toolId is passed, related tools are resolved internally.
 * Section heading is A/B tested (variant A: "Related tools", variant B: "Try these next") via CtaVariant.
 * @param {{ tools?: Array<{ id: string, name: string, path: string, icon?: string, built?: boolean }>, toolId?: string }} props
 */
const RelatedToolsSection = ({ tools: toolsProp, toolId }) => {
  const list = toolId
    ? (getRelatedTools(toolId, 6).filter(t => t && t.built && t.path) || [])
    : (Array.isArray(toolsProp) ? toolsProp.filter(t => t && t.built !== false && t.path) : []);
  if (list.length === 0) return null;

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-900">
          <CtaVariant variantA="Related tools" variantB="Try these next" storageKey="related-tools-heading" />
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((tool) => (
          <Link key={tool.id} href={tool.path}>
            <Card hover className="p-4 h-full transition-shadow">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{tool.icon || '🔧'}</span>
                <span className="font-medium text-gray-900 group-hover:text-blue-600">{tool.name}</span>
              </div>
              {tool.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{tool.description}</p>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedToolsSection;
