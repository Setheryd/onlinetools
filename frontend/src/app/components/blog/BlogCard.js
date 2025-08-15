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

  const getCategoryColor = (category) => {
    const colors = {
      'Development': 'bg-blue-100 text-blue-800 border-blue-200',
      'Technology': 'bg-purple-100 text-purple-800 border-purple-200',
      'Security': 'bg-red-100 text-red-800 border-red-200',
      'Tutorial': 'bg-green-100 text-green-800 border-green-200',
      'Productivity': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="h-full flex flex-col group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 overflow-hidden">
      {post.featuredImage && (
        <div className="relative h-56 mb-0 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {post.featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary" size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
              {formatDate(post.publishedAt)}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-4">
          {post.category && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          )}
          <div className="flex-1"></div>
          {!post.featuredImage && (
            <span className="text-sm text-gray-500">
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-6 flex-1 line-clamp-3 leading-relaxed">
          {truncateExcerpt(post.excerpt)}
        </p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500 self-center">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {post.author && (
              <>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-white">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{post.author.name}</div>
                  {post.author.bio && (
                    <div className="text-xs text-gray-500 truncate max-w-32">{post.author.bio}</div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-all duration-200 group/link"
          >
            Read More
            <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
