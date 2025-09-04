import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HtmlToPdfTool from '../../components/tools/HtmlToPdfTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: 'HTML to PDF Converter — The Tool Guru',
  description: 'Convert HTML to PDF with live preview. Perfect for email templates, reports, and documents. Free online HTML to PDF converter.',
  keywords: ['html to pdf', 'html converter', 'pdf generator', 'email template', 'document converter', 'the tool guru'],
  openGraph: {
    title: 'HTML to PDF Converter — The Tool Guru',
    description: 'Convert HTML to PDF with live preview. Perfect for email templates, reports, and documents.',
  },
};

const HtmlToPdfPage = async () => {
  // Get the HTML to PDF blog post from the service
  const htmlToPdfBlogPost = await blogService.getPostBySlug('html-to-pdf-conversion-guide');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <HtmlToPdfTool />
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About HTML to PDF Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Discover best practices for converting HTML to PDF and creating professional documents
            </p>
          </div>
          
          <ToolBlogPost 
            post={htmlToPdfBlogPost} 
            toolPath="/tools/html-to-pdf"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default HtmlToPdfPage;
