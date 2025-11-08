import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import QrCodeGeneratorTool from '../../components/tools/QrCodeGeneratorTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
import { blogService } from '../../utils/blogService';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'QR Code Generator — The Tool Guru',
  description: 'Generate QR codes for URLs, text, and more. Free online QR code generator with PNG and SVG output.',
  keywords: ['qr code', 'qr generator', 'barcode', 'png', 'svg', 'the tool guru'],
  openGraph: {
    title: 'QR Code Generator — The Tool Guru',
    description: 'Generate QR codes for URLs, text, and more.',
  },
};

const QrCodeGeneratorPage = async () => {
  // Get the QR code generator blog post from the service
  const qrCodeBlogPost = await blogService.getPostBySlug('complete-guide-to-qr-code-generation');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <QrCodeGeneratorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="QR Code Generator"
            description="Create professional QR codes instantly for URLs, text, email, phone numbers, and more. Our QR code generator produces high-quality QR codes that can be scanned by any smartphone camera. Perfect for marketing materials, business cards, product packaging, event tickets, and any application where you need to share information quickly and easily."
            features={[
              "Generate QR codes for URLs, text, email, phone, SMS, and WiFi",
              "Customizable error correction levels for better scanning",
              "Download QR codes as PNG or SVG images",
              "Adjustable size and resolution for different use cases",
              "Real-time preview of QR code as you type",
              "Support for various QR code data types",
              "High-quality output suitable for printing",
              "Works entirely in your browser - no server processing"
            ]}
            howToUse={[
              "Select the type of QR code you want to create (URL, text, email, etc.)",
              "Enter the content for your QR code (URL, text message, etc.)",
              "Choose the error correction level (higher levels are more robust but larger)",
              "Adjust the size if needed for your specific use case",
              "Preview the QR code in real-time",
              "Download the QR code as PNG or SVG format",
              "Test the QR code by scanning it with your phone before printing"
            ]}
            useCases={[
              "Create QR codes for business cards linking to your website or portfolio",
              "Generate QR codes for product packaging linking to manuals or reviews",
              "Create QR codes for marketing materials and advertisements",
              "Generate QR codes for event tickets and entry passes",
              "Create QR codes for restaurant menus and contactless ordering",
              "Generate WiFi QR codes for easy network sharing",
              "Create QR codes for payment links and donation pages",
              "Generate QR codes for social media profiles and contact information"
            ]}
            tips={[
              "Use higher error correction levels for QR codes that will be printed small or may get damaged",
              "Test your QR code with multiple devices before printing large quantities",
              "Ensure sufficient contrast between the QR code and background for reliable scanning",
              "Leave white space (quiet zone) around QR codes for better scanning",
              "Use SVG format for scalable QR codes that work at any size",
              "Consider the scanning distance when choosing QR code size",
              "For URLs, use shortened links to create simpler QR codes"
            ]}
            faq={[
              {
                question: "What's the difference between PNG and SVG formats?",
                answer: "PNG is a raster format good for fixed-size images. SVG is a vector format that scales perfectly at any size without quality loss, making it ideal for printing."
              },
              {
                question: "What is error correction level?",
                answer: "Error correction allows QR codes to be scanned even if partially damaged or obscured. Higher levels (H) can recover up to 30% damage but create larger codes."
              },
              {
                question: "Can QR codes be customized with colors or logos?",
                answer: "While our tool generates standard black and white QR codes, you can customize them in image editing software. Be careful to maintain sufficient contrast for scanning."
              },
              {
                question: "How do I scan a QR code?",
                answer: "Most modern smartphones have built-in QR code scanning in their camera apps. Simply open the camera and point it at the QR code. No special app needed."
              }
            ]}
          />
        </div>
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About QR Code Technology
            </h2>
            <p className="text-lg text-gray-600">
              Discover the power of QR codes and how to create professional QR codes for your business
            </p>
          </div>
          
          <ToolBlogPost 
            post={qrCodeBlogPost} 
            toolPath="/tools/qr-code-generator"
          />
        </div>

        {/* Comment Section */}
        <CommentSection 
          toolId="qr-code-generator"
          toolName="QR Code Generator"
        />
      </Body>
      <Footer />
    </div>
  );
};

export default QrCodeGeneratorPage;


