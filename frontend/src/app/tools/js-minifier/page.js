import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JsMinifierTool from '../../components/tools/JsMinifierTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="JavaScript Minifier"
            description="Minify JavaScript by removing comments, whitespace, and unnecessary characters to optimize code for production. Our JavaScript minifier reduces file size significantly while preserving functionality, improving website performance, reducing bandwidth usage, and speeding up page load times. Perfect for production deployments, CDN distribution, or any scenario where smaller file sizes improve user experience."
            features={[
              "Minify JavaScript code",
              "Remove comments and whitespace",
              "Optimize code for production",
              "Significantly reduce file size",
              "Preserve all JavaScript functionality",
              "Fast minification processing",
              "Copy minified code instantly",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Paste or upload your JavaScript file",
              "Click 'Minify' to process the code",
              "View the minified output",
              "Check file size reduction",
              "Copy the minified JavaScript",
              "Use minified code in production",
              "Keep original code for development"
            ]}
            useCases={[
              "Optimize JavaScript for production websites",
              "Reduce bandwidth usage and improve performance",
              "Speed up page load times",
              "Prepare JavaScript for deployment",
              "Minify code for CDN distribution",
              "Optimize scripts for mobile devices",
              "Reduce file sizes for better caching",
              "Improve website performance metrics"
            ]}
            tips={[
              "Always keep original JavaScript files as backups",
              "Use minified JavaScript in production, original in development",
              "Test minified code to ensure functionality is preserved",
              "Use source maps for debugging minified code",
              "Minify JavaScript as part of your build process",
              "Check file size reduction to measure optimization",
              "Combine with other optimization techniques for best results"
            ]}
            faq={[
              {
                question: "What does JavaScript minification do?",
                answer: "JavaScript minification removes unnecessary characters like comments, whitespace, and line breaks to reduce file size. It preserves all code functionality while making files smaller and faster to download."
              },
              {
                question: "Will minification break my JavaScript?",
                answer: "Proper minification should not break your JavaScript. However, always test minified code to ensure it works correctly. Keep original files as backups and use source maps for debugging."
              },
              {
                question: "How much file size reduction can I expect?",
                answer: "File size reduction varies but typically ranges from 30-60% depending on the original code. Files with lots of comments and whitespace see greater reductions."
              },
              {
                question: "Should I minify JavaScript in development?",
                answer: "Minify JavaScript for production use only. Keep original, readable code for development. Use build tools to automatically minify during deployment."
              }
            ]}
          />
        </div>
        
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


