import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HtmlToPdfTool from '../../components/tools/HtmlToPdfTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="HTML to PDF Converter"
            description="Convert HTML to PDF with live preview. Perfect for converting web pages, email templates, reports, and HTML documents to PDF format. Our HTML to PDF converter renders HTML content accurately, preserving styling, layout, and formatting. Ideal for creating printable documents from web content, archiving web pages, generating reports from HTML templates, or converting HTML emails to PDF for record-keeping."
            features={[
              "Convert HTML code to PDF documents",
              "Live preview of HTML rendering",
              "Preserve CSS styling and formatting",
              "Support for images and embedded content",
              "Customizable page size and margins",
              "Print-friendly PDF output",
              "Handle complex HTML layouts",
              "Works entirely in your browser - no uploads to servers"
            ]}
            howToUse={[
              "Enter or paste your HTML code into the input field",
              "View the live preview of how the HTML will render",
              "Adjust page settings (size, margins) if needed",
              "Click 'Convert to PDF' to generate the PDF",
              "Preview the PDF output",
              "Download the converted PDF document",
              "Make adjustments to HTML and reconvert as needed"
            ]}
            useCases={[
              "Convert web pages to PDF for archiving",
              "Create PDFs from HTML email templates",
              "Generate reports from HTML templates",
              "Convert HTML documentation to PDF",
              "Create printable versions of web content",
              "Archive HTML content as PDF documents",
              "Convert HTML invoices and receipts to PDF",
              "Generate PDFs from HTML forms and data"
            ]}
            tips={[
              "Use inline CSS for best compatibility",
              "Test HTML rendering in the preview before converting",
              "Ensure images use absolute URLs or data URIs",
              "Use print-friendly CSS for better PDF output",
              "Set appropriate page margins for printing",
              "Test the PDF output to ensure formatting is correct",
              "Keep HTML code well-structured for best results"
            ]}
            faq={[
              {
                question: "Will CSS styling be preserved in the PDF?",
                answer: "Yes, the tool preserves CSS styling and formatting. However, some advanced CSS features may not render exactly as in a browser. Use standard CSS for best results."
              },
              {
                question: "Can I convert HTML with images?",
                answer: "Yes, images are supported. Use absolute URLs or data URIs for images. Relative paths may not work in the PDF conversion."
              },
              {
                question: "What HTML features are supported?",
                answer: "The tool supports standard HTML, CSS styling, and basic JavaScript. Complex interactive features may not work in PDF format, as PDFs are static documents."
              },
              {
                question: "Can I customize the PDF page size?",
                answer: "Yes, you can select from standard page sizes (A4, Letter) or set custom dimensions. You can also adjust margins and orientation."
              }
            ]}
          />
        </div>
        
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
