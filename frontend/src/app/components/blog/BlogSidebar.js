import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Badge from '../ui/Badge';

const BlogSidebar = ({ categories = [], recentPosts = [], searchQuery = '', onSearchChange, selectedCategory = '', onCategoryChange }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Development': 'bg-blue-50 text-blue-700 border-blue-200',
      'Technology': 'bg-purple-50 text-purple-700 border-purple-200',
      'Security': 'bg-red-50 text-red-700 border-red-200',
      'Tutorial': 'bg-green-50 text-green-700 border-green-200',
      'Productivity': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Search Articles</h3>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search articles, tutorials, and guides..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </Card>

      {/* Categories */}
      {categories.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900">Categories</h3>
            </div>
            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => onCategoryChange && onCategoryChange(selectedCategory === category.slug ? '' : category.slug)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    selectedCategory === category.slug
                      ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <Badge 
                    variant="secondary" 
                    size="sm"
                    className={`${
                      selectedCategory === category.slug
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900">Recent Posts</h3>
            </div>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    {post.featuredImage && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDate(post.publishedAt)}
                        </span>
                        {post.category && (
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white border-0 shadow-lg">
        <div className="p-6">
          <div className="text-center mb-4">
            <svg className="w-8 h-8 mx-auto mb-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Get the latest articles and tool updates delivered to your inbox.
            </p>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border-white/20 text-white placeholder-blue-200 focus:bg-white/20 focus:border-white/50 transition-all duration-200"
              />
            </div>
            <button className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
              Subscribe Now
            </button>
          </div>
        </div>
      </Card>

      {/* Popular Tags */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Popular Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['JavaScript', 'Development', 'Performance', 'Security', 'Tutorials', 'Web Tools', 'Productivity', 'Design'].map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
                className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 border border-gray-200 hover:border-blue-300"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogSidebar;
