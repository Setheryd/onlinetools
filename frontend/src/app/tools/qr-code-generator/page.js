import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import QrCodeGeneratorTool from '../../components/tools/QrCodeGeneratorTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';

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
      </Body>
      <Footer />
    </div>
  );
};

export default QrCodeGeneratorPage;


