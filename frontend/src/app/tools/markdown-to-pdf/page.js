import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MarkdownToPdfTool from '../../components/tools/MarkdownToPdfTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Markdown to PDF Converter"
            description="Convert Markdown to PDF with live preview. Great for documentation, reports, and content creation. Our Markdown to PDF converter renders Markdown syntax into beautifully formatted PDF documents, preserving headings, lists, code blocks, links, and other Markdown elements. Perfect for creating documentation, converting README files to PDF, generating reports from Markdown, or archiving Markdown content as professional PDF documents."
            features={[
              "Convert Markdown to professionally formatted PDFs",
              "Live preview of Markdown rendering",
              "Support for all standard Markdown syntax",
              "Preserve code blocks with syntax highlighting",
              "Handle tables, lists, and formatting",
              "Customizable styling and themes",
              "Support for images and links",
              "Works entirely in your browser - no uploads to servers"
            ]}
            howToUse={[
              "Enter or paste your Markdown content into the input field",
              "View the live preview of how the Markdown will render",
              "Adjust PDF settings (page size, margins) if needed",
              "Click 'Convert to PDF' to generate the PDF",
              "Preview the PDF output",
              "Download the converted PDF document",
              "Edit Markdown and reconvert as needed"
            ]}
            useCases={[
              "Convert README files to PDF documentation",
              "Create PDFs from Markdown documentation",
              "Generate reports from Markdown content",
              "Convert Markdown blog posts to PDF",
              "Archive Markdown notes as PDF documents",
              "Create printable versions of Markdown content",
              "Convert Markdown documentation for sharing",
              "Generate PDFs from Markdown-based content management systems"
            ]}
            tips={[
              "Use proper Markdown syntax for best results",
              "Preview the rendering before converting to PDF",
              "Code blocks are preserved with formatting",
              "Images should use absolute URLs or be embedded",
              "Tables render well in PDF format",
              "Use headings to create document structure",
              "Test the PDF output to ensure formatting is correct"
            ]}
            faq={[
              {
                question: "What Markdown features are supported?",
                answer: "The tool supports standard Markdown including headings, lists, links, images, code blocks, tables, blockquotes, and emphasis (bold, italic). Most common Markdown syntax is fully supported."
              },
              {
                question: "Will code blocks be formatted correctly?",
                answer: "Yes, code blocks are preserved with proper formatting and syntax highlighting when supported. Code is displayed in a monospace font with appropriate styling."
              },
              {
                question: "Can I include images in Markdown to PDF?",
                answer: "Yes, images are supported. Use standard Markdown image syntax. Images should use absolute URLs or data URIs for best compatibility."
              },
              {
                question: "Can I customize the PDF styling?",
                answer: "The tool provides default styling that works well for most documents. Some customization options may be available for page size, margins, and basic formatting."
              }
            ]}
          />
        </div>
        
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
