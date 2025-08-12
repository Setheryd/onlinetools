import React from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const BlogHero = ({ searchQuery = '', onSearchChange, selectedCategory = '', onCategoryChange, categories = [] }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover tips, tutorials, and insights about web tools, productivity, and development
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white placeholder-blue-200"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <Button variant="primary" className="lg:w-auto">
              Search
            </Button>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">50+</div>
            <div className="text-blue-100">Articles Published</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-blue-100">Monthly Readers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">15+</div>
            <div className="text-blue-100">Expert Authors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
