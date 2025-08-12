import React from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getActiveTools } from '@/lib/tools';

const ToolsIndexPage = () => {
  const tools = getActiveTools();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">All Tools</h1>
          <p className="text-gray-600">Browse all currently available tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <Card key={tool.id} hover>
              <div className="flex items-start gap-3">
                <div className="text-2xl">{tool.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href={tool.url}>
                  <Button variant="primary" size="sm">Open</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default ToolsIndexPage;


