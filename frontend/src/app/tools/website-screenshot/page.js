import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WebsiteScreenshotTool from '../../components/tools/WebsiteScreenshotTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'Website Screenshot Tool — The Tool Guru',
  description: 'Capture full-page screenshots of websites in high resolution. Choose from multiple formats (PNG, JPG, WebP) and customize viewport width for perfect screenshots.',
  keywords: ['website screenshot', 'webpage capture', 'full page screenshot', 'png', 'jpg', 'webp', '4k resolution', 'the tool guru'],
  openGraph: {
    title: 'Website Screenshot Tool — The Tool Guru',
    description: 'Capture full-page screenshots of websites in high resolution. Choose from multiple formats and customize viewport width.',
    type: 'website',
    url: 'https://thetool.guru/tools/website-screenshot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Screenshot Tool — The Tool Guru',
    description: 'Capture full-page screenshots of websites in high resolution.',
  },
};

const WebsiteScreenshotPage = async () => {
  // Try to get a related blog post (you can create one later)
  let blogPost = null;
  try {
    blogPost = await blogService.getPostBySlug('complete-guide-to-website-screenshots');
  } catch (error) {
    // Blog post doesn't exist yet, that's fine
    console.log('Blog post not found, continuing without it');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <WebsiteScreenshotTool />
        
        {/* Blog Post Section - only show if blog post exists */}
        {blogPost && (
          <div className="max-w-4xl mx-auto mt-16 px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Master Website Screenshots
              </h2>
              <p className="text-lg text-gray-600">
                Learn advanced techniques for capturing perfect website screenshots for documentation, presentations, and more
              </p>
            </div>
            
            <ToolBlogPost 
              post={blogPost} 
              toolPath="/tools/website-screenshot"
            />
          </div>
        )}

        {/* Comment Section */}
        <CommentSection 
          toolId="website-screenshot"
          toolName="Website Screenshot Tool"
        />
      </Body>
      <Footer />
    </div>
  );
};

export default WebsiteScreenshotPage;
