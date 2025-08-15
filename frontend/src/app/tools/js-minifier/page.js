import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JsMinifierTool from '../../components/tools/JsMinifierTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: 'JavaScript Minifier — The Tool Guru',
  description: 'Minify JavaScript by removing comments and whitespace in your browser.',
  keywords: ['js minifier', 'minify javascript', 'compress js'],
  openGraph: {
    title: 'JavaScript Minifier — The Tool Guru',
    description: 'Minify JS instantly in your browser.',
  },
};

const JsMinifierPage = async () => {
  // Get the JavaScript minification blog post from the service
  const jsMinificationBlogPost = await blogService.getPostBySlug('ultimate-guide-to-javascript-minification');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <JsMinifierTool />
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About JavaScript Minification
            </h2>
            <p className="text-lg text-gray-600">
              Master JavaScript minification techniques to optimize your code for production
            </p>
          </div>
          
          <ToolBlogPost 
            post={jsMinificationBlogPost} 
            toolPath="/tools/js-minifier"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default JsMinifierPage;


