import React from 'react';
import { notFound } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ComingSoonTool from '../../components/tools/ComingSoonTool';
import { getToolById } from '@/lib/tools';

/**
 * Catch-all for tool IDs that don't have a dedicated page (built: false).
 * Built tools have static routes (e.g. tools/base64/page.js) and take precedence.
 * Unbuilt tools (e.g. /tools/route-optimizer) hit this and show Coming Soon instead of 404.
 */
export async function generateMetadata({ params }) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool || tool.built) return { title: 'Not Found — The Tool Guru' };
  return {
    title: `${tool.name} — Coming Soon | The Tool Guru`,
    description: tool.description || `We're building ${tool.name}. Browse our other free tools.`,
    alternates: { canonical: `https://thetool.guru${tool.path}` },
    openGraph: {
      title: `${tool.name} — Coming Soon | The Tool Guru`,
      description: tool.description || `We're building ${tool.name}.`,
      url: `https://thetool.guru${tool.path}`,
      siteName: 'The Tool Guru',
    },
  };
}

export default async function ToolIdPage({ params }) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool) notFound();
  if (tool.built === true) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <ComingSoonTool tool={tool} />
      </Body>
      <Footer />
    </div>
  );
}
