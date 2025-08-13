"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { categories, getBuiltTools, getUnbuiltTools } from '@/lib/tools';

const ToolsIndexPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const activeTools = getBuiltTools();
  const comingSoonTools = getUnbuiltTools();

  const matchesFilters = (tool) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      (tool.keywords || []).some(k => k.toLowerCase().includes(query));
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(tool.category);
    return matchesSearch && matchesCategory;
  };

  const filteredActive = useMemo(() => activeTools.filter(matchesFilters), [activeTools, searchQuery, selectedCategories]);
  const filteredComingSoon = useMemo(() => comingSoonTools.filter(matchesFilters), [comingSoonTools, searchQuery, selectedCategories]);

  const isCategorySelected = (id) => selectedCategories.includes(id);
  const toggleCategory = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };
  const clearCategories = () => setSelectedCategories([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">All Tools</h1>
          <p className="text-gray-600">Browse available tools. Others are coming soon.</p>
        </div>

        {/* Search and category filters */}
        <section className="mb-8">
          <div className="max-w-2xl mx-auto mb-4">
            <Input
              placeholder="Search tools by name, description, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-gray-900 placeholder-gray-600 font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategories.length === 0 ? 'primary' : 'outline'}
              size="sm"
              onClick={clearCategories}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={isCategorySelected(cat.id) ? 'primary' : 'outline'}
                size="sm"
                onClick={() => toggleCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Available tools */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActive.map(tool => (
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
        {(filteredComingSoon.length > 0) && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming soon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComingSoon.map(tool => (
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


