'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Body from '../components/layout/Body';
import BlogHero from '../components/blog/BlogHero';
import BlogCard from '../components/blog/BlogCard';
import BlogSidebar from '../components/blog/BlogSidebar';
import Button from '../components/ui/Button';
import { blogService } from '../utils/blogService';

const BlogPageClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          blogService.getAllPosts(),
          blogService.getCategories()
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    return filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }, [posts, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <Body>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Loading blog posts...</p>
          </div>
        </div>
      </Body>
    );
  }

  if (error) {
    return (
      <Body>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Blog Posts</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Try Again
            </Button>
          </div>
        </div>
      </Body>
    );
  }

  return (
    <>
      {/* Full-width Hero Section */}
      <BlogHero 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      
      {/* Main Content Area */}
      <Body>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-12">
          {/* Blog Posts Column */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchQuery || selectedCategory ? 'Search Results' : 'Latest Articles'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredPosts.length === 0 
                      ? 'No posts found'
                      : `${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} found`
                    }
                  </p>
                </div>
                
                {/* Active Filters Display */}
                {(searchQuery || selectedCategory) && (
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Search: "{searchQuery}"
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Category: {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory('')}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery || selectedCategory 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'No blog posts available at the moment.'
                    }
                  </p>
                  {(searchQuery || selectedCategory) && (
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button (if needed in future) */}
            {filteredPosts.length > 6 && (
              <div className="text-center mt-12">
                <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Load More Posts
                </Button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BlogSidebar
                categories={categories}
                recentPosts={posts.slice(0, 5)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-16"></div>
      </Body>
    </>
  );
};

export default BlogPageClient;
