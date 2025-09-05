
import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfEditorTool from '../../components/tools/PdfEditorTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'PDF Editor — The Tool Guru',
  description: 'Edit PDF documents in your browser. Add text, annotations, images, and more. No external APIs required.',
  keywords: ['pdf editor', 'edit pdf', 'annotate pdf', 'pdf text', 'pdf images', 'the tool guru'],
  openGraph: {
    title: 'PDF Editor — The Tool Guru',
    description: 'Edit PDF documents in your browser. Add text, annotations, images, and more.',
  },
};

const PdfEditorPage = async () => {
  // Get the PDF editor blog post from the service
  const pdfEditorBlogPost = await blogService.getPostBySlug('complete-guide-to-pdf-editing');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PdfEditorTool />
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About PDF Editing
            </h2>
            <p className="text-lg text-gray-600">
              Discover the power of browser-based PDF editing and how to create professional documents
            </p>
          </div>
          
          <ToolBlogPost 
            post={pdfEditorBlogPost} 
            toolPath="/tools/pdf-editor"
          />
        </div>

        {/* Comment Section */}
        <CommentSection 
          toolId="pdf-editor"
          toolName="PDF Editor"
        />
      </Body>
      <Footer />
    </div>
  );
};

export default PdfEditorPage;
