
import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PdfEditorTool from '../../components/tools/PdfEditorTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="PDF Editor"
            description="Edit PDF documents directly in your browser. Add text, annotations, images, shapes, and more to your PDFs without needing desktop software. Our PDF editor provides a comprehensive set of editing tools, allowing you to modify PDFs, add comments, highlight text, insert images, and create annotations. Perfect for filling out forms, adding notes to documents, marking up PDFs for review, or making quick edits to PDF files. All editing happens in your browser for complete privacy."
            features={[
              "Add and edit text in PDF documents",
              "Insert images and graphics into PDFs",
              "Add annotations, comments, and highlights",
              "Draw shapes, lines, and freehand annotations",
              "Fill out PDF forms and add signatures",
              "Real-time preview of edits",
              "Download edited PDFs instantly",
              "Works entirely in your browser - no uploads to servers"
            ]}
            howToUse={[
              "Upload your PDF file using the file input or drag-and-drop",
              "Select the editing tool you want to use (text, image, annotation, etc.)",
              "Click on the PDF where you want to add or edit content",
              "Enter text, upload images, or draw annotations",
              "Adjust properties like font, size, color, and position",
              "Preview your edits in real-time",
              "Download the edited PDF when finished"
            ]}
            useCases={[
              "Fill out PDF forms and applications",
              "Add comments and annotations to PDF documents",
              "Insert images and graphics into PDFs",
              "Add text notes and explanations to PDFs",
              "Mark up PDFs for review and feedback",
              "Add signatures and stamps to PDFs",
              "Create annotated PDFs for presentations",
              "Edit PDF documents without desktop software"
            ]}
            tips={[
              "Use text tools for adding or editing text content",
              "Use annotation tools for comments and highlights",
              "Save your work frequently when making extensive edits",
              "Keep original PDFs as backups before editing",
              "Test the edited PDF to ensure all changes are correct",
              "Use appropriate fonts and sizes for readability",
              "Position elements carefully to maintain document layout"
            ]}
            faq={[
              {
                question: "Can I edit existing text in a PDF?",
                answer: "Yes, you can add new text and in some cases edit existing text depending on the PDF structure. Text in scanned PDFs (image-based) may require OCR first."
              },
              {
                question: "Will my edits be permanent?",
                answer: "Yes, once you download the edited PDF, your changes are permanent. Always keep a backup of the original PDF before editing."
              },
              {
                question: "Can I edit password-protected PDFs?",
                answer: "Password-protected PDFs require the password to be entered before editing. Once unlocked, they can be edited like any other PDF."
              },
              {
                question: "What types of edits can I make?",
                answer: "You can add text, images, annotations, highlights, shapes, and comments. The specific editing capabilities depend on the PDF structure and the tool's features."
              }
            ]}
          />
        </div>
        
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
