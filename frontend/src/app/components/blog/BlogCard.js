import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateExcerpt = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card hover className="h-full flex flex-col">
      {post.featuredImage && (
        <div className="relative h-48 mb-4 overflow-hidden rounded-t-lg">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {post.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="primary" size="sm">
                Featured
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.category && (
            <Badge variant="secondary" size="sm">
              {post.category}
            </Badge>
          )}
          <span className="text-sm text-gray-500">
            {formatDate(post.publishedAt)}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
          {truncateExcerpt(post.excerpt)}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {post.author && (
              <>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{post.author.name}</span>
              </>
            )}
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
