import React from 'react';
import Link from 'next/link';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ToolBlogPost = ({ post, toolPath }) => {
  // Handle case where post is undefined or null
  if (!post) {
    return (
      <Card className="mb-8">
        <div className="p-6">
          <p className="text-gray-500">Blog post not found.</p>
        </div>
      </Card>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const formatReadingTime = (content) => {
    if (!content || typeof content !== 'string') return 'Unknown reading time';
    try {
      const wordsPerMinute = 200;
      const wordCount = content.split(' ').length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      return `${readingTime} min read`;
    } catch (error) {
      return 'Unknown reading time';
    }
  };

  return (
    <Card className="mb-8">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          {post.category && (
            <Badge variant="primary">
              {post.category}
            </Badge>
          )}
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">{formatDate(post.publishedAt)}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">{formatReadingTime(post.content)}</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title || 'Untitled Post'}
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {post.excerpt || 'No excerpt available.'}
        </p>

        {/* Author Info */}
        {post.author && (
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {post.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900 text-sm">{post.author.name}</div>
              {post.author.bio && (
                <div className="text-xs text-gray-600">{post.author.bio}</div>
              )}
            </div>
          </div>
        )}

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-6">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Content Preview */}
        <div className="prose prose-sm max-w-none mb-6">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: post.content ? (post.content.substring(0, 300) + (post.content.length > 300 ? '...' : '')) : 'No content available.' 
            }} 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/blog/${post.slug}`}>
            <Button variant="primary" size="sm">
              Read Full Article
            </Button>
          </Link>
          {toolPath && (
            <Link href={toolPath}>
              <Button variant="outline" size="sm">
                Try the Tool
              </Button>
            </Link>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ToolBlogPost;
