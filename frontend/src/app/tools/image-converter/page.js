import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageConverterTool from '../../components/tools/ImageConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Image Format Converter — The Tool Guru',
  description: 'Convert images between WebP, AVIF, JPEG, and PNG formats.',
  keywords: ['image converter', 'convert image', 'webp', 'avif', 'jpeg', 'png'],
  openGraph: {
    title: 'Image Format Converter — The Tool Guru',
    description: 'Fast image format conversion.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Image Format Converter"
          description="Convert images between WebP, AVIF, JPEG, and PNG formats with high quality. Our image converter supports modern formats like WebP and AVIF for better compression, as well as traditional formats like JPEG and PNG. Perfect for optimizing images for web, converting between formats for compatibility, or preparing images for different use cases. All conversion happens in your browser for complete privacy."
          features={[
            "Convert between WebP, AVIF, JPEG, and PNG formats",
            "High-quality conversion with minimal quality loss",
            "Support for transparency (PNG, WebP, AVIF)",
            "Adjustable quality settings for JPEG and WebP",
            "Batch conversion support",
            "Real-time preview of converted images",
            "Download converted images instantly",
            "Works entirely in your browser - no uploads to servers"
          ]}
          howToUse={[
            "Upload your image using the file input or drag-and-drop",
            "Select the target format (WebP, AVIF, JPEG, or PNG)",
            "Adjust quality settings if available for the target format",
            "Preview the converted image",
            "Check file size reduction if converting to modern formats",
            "Download the converted image",
            "Process additional images as needed"
          ]}
          useCases={[
            "Convert images to WebP or AVIF for better web performance",
            "Convert PNG to JPEG to reduce file size",
            "Convert JPEG to PNG to add transparency support",
            "Optimize images for different platforms and use cases",
            "Convert images for email compatibility (JPEG)",
            "Prepare images for print (high-quality formats)",
            "Convert legacy formats to modern web formats",
            "Standardize image formats across a project"
          ]}
          tips={[
            "WebP and AVIF offer better compression than JPEG/PNG",
            "Use JPEG for photos and PNG for graphics with transparency",
            "AVIF provides the best compression but has limited browser support",
            "WebP is widely supported and offers excellent compression",
            "Maintain quality settings above 80% for photos",
            "Test converted images to ensure quality meets your needs",
            "Consider file size vs quality trade-offs for web use"
          ]}
          faq={[
            {
              question: "Which format should I use for web images?",
              answer: "WebP offers the best balance of quality, compression, and browser support. AVIF provides even better compression but has limited support. JPEG is still widely used and universally supported."
            },
            {
              question: "Will converting reduce image quality?",
              answer: "Converting between lossy formats (JPEG, WebP, AVIF) may cause some quality loss. Converting to PNG (lossless) preserves quality. Our tool uses high-quality conversion algorithms to minimize quality loss."
            },
            {
              question: "Can I convert images with transparency?",
              answer: "Yes, PNG, WebP, and AVIF support transparency. JPEG does not support transparency - transparent areas will become white or black when converting to JPEG."
            },
            {
              question: "What's the difference between WebP and AVIF?",
              answer: "Both are modern image formats with excellent compression. AVIF typically provides 20-30% better compression than WebP but has less browser support. WebP is more widely supported."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;



