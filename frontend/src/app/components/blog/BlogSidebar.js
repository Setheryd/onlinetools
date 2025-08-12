import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Badge from '../ui/Badge';

const BlogSidebar = ({ categories = [], recentPosts = [], searchQuery = '', onSearchChange }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </Card>

      {/* Categories */}
      {categories.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700">{category.name}</span>
                <Badge variant="secondary" size="sm">
                  {category.count}
                </Badge>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex gap-3">
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-blue-100 text-sm mb-4">
          Get the latest articles and tool updates delivered to your inbox.
        </p>
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white/10 border-white/20 text-white placeholder-blue-200"
          />
          <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </Card>

      {/* Tags */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['Web Tools', 'Productivity', 'Tutorial', 'Tips', 'Development', 'Design'].map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
              className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BlogSidebar;
