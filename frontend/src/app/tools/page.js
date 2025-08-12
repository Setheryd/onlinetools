import React from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getBuiltTools, getUnbuiltTools } from '@/lib/tools';

const ToolsIndexPage = () => {
  const activeTools = getBuiltTools();
  const comingSoonTools = getUnbuiltTools();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">All Tools</h1>
          <p className="text-gray-600">Browse available tools. Others are coming soon.</p>
        </div>

        {/* Available tools */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTools.map(tool => (
              <Card key={tool.id} hover>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{tool.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={tool.path}>
                    <Button variant="primary" size="sm">Open</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Coming soon tools */}
        {comingSoonTools.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming soon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonTools.map(tool => (
                <Card key={tool.id}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{tool.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" disabled>Coming soon</Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </Body>
      <Footer />
    </div>
  );
};

export default ToolsIndexPage;


