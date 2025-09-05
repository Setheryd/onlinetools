import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MarkdownToPdfTool from '../../components/tools/MarkdownToPdfTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: 'Markdown to PDF Converter — The Tool Guru',
  description: 'Convert Markdown to PDF with live preview. Great for documentation, reports, and content creation. Free online Markdown to PDF converter.',
  keywords: ['markdown to pdf', 'markdown converter', 'pdf generator', 'documentation', 'content creation', 'the tool guru'],
  openGraph: {
    title: 'Markdown to PDF Converter — The Tool Guru',
    description: 'Convert Markdown to PDF with live preview. Great for documentation, reports, and content creation.',
  },
};

const MarkdownToPdfPage = async () => {
  // Get the Markdown to PDF blog post from the service
  const markdownToPdfBlogPost = await blogService.getPostBySlug('markdown-to-pdf-conversion-guide');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <MarkdownToPdfTool />
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About Markdown to PDF Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Discover how to convert Markdown to professional PDF documents
            </p>
          </div>
          
          <ToolBlogPost 
            post={markdownToPdfBlogPost} 
            toolPath="/tools/markdown-to-pdf"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default MarkdownToPdfPage;
