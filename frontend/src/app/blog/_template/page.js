'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BlogPost from '../../components/blog/BlogPost';
import BlogSidebar from '../../components/blog/BlogSidebar';

import { blogService } from '../../utils/blogService';

const BlogPostTemplate = () => {
  const params = useParams();
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postData, postsData, categoriesData] = await Promise.all([
          blogService.getPostBySlug(slug),
          blogService.getPosts(),
          blogService.getCategories()
        ]);
        
        if (!postData) {
          setError('Post not found');
          return;
        }
        
        setPost(postData);
        setRecentPosts(postsData.slice(0, 5));
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Body>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog post...</p>
            </div>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Body>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
              <p className="text-gray-600 mb-4">
                {error || 'The blog post you are looking for does not exist.'}
              </p>
              <a 
                href="/blog" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Back to Blog
              </a>
            </div>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogPost post={post} />
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts}
              searchQuery=""
              onSearchChange={() => {}}
            />
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default BlogPostTemplate;
