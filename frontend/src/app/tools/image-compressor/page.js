import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageCompressorTool from '../../components/tools/ImageCompressorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Image Compressor & Converter — The Tool Guru',
  description: 'Resize, compress, and convert images to WebP/AVIF/PNG/JPEG with high quality.',
  keywords: ['image compressor', 'image converter', 'webp', 'avif', 'jpeg', 'png'],
  openGraph: {
    title: 'Image Compressor & Converter — The Tool Guru',
    description: 'Modern, high-quality image processing.',
  },
};

const ImageCompressorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageCompressorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Image Compressor & Converter"
          description="Resize, compress, and convert images to WebP, AVIF, PNG, and JPEG with high quality. Our image compressor uses state-of-the-art encoders to optimize images while preserving visual clarity. Resize precisely with multiple fit modes (cover, contain, inside, outside, fill) and set focal positions (center, edges, or smart entropy/attention) for beautiful crops. Strip EXIF metadata for privacy and smaller files. Perfect for web optimization, mobile apps, social media, or any scenario where image size and quality matter."
          features={[
            "High-quality conversion to AVIF, WebP, JPEG, and PNG",
            "Precise resizing with width/height control",
            "Multiple fit modes (cover, contain, inside, outside, fill)",
            "Focal position control (center, edges, smart entropy/attention)",
            "EXIF metadata stripping for privacy",
            "Side-by-side preview with savings and dimensions",
            "Instant in-browser processing",
            "Works entirely in your browser - no uploads to servers"
          ]}
          howToUse={[
            "Upload your image using the file input or drag-and-drop",
            "Select target format (AVIF, WebP, JPEG, or PNG)",
            "Set resize dimensions if needed",
            "Choose fit mode for resizing",
            "Set focal position for cropping",
            "Enable EXIF stripping if desired",
            "Preview the compressed result",
            "Download the optimized image"
          ]}
          useCases={[
            "Convert PNG and JPG to AVIF/WebP for faster websites",
            "Generate responsive images with exact dimensions",
            "Remove EXIF data before sharing photos online",
            "Prepare thumbnails and social media images",
            "Optimize images for mobile applications",
            "Reduce image file sizes for email attachments",
            "Create optimized images for web performance",
            "Prepare images for CDN distribution"
          ]}
          tips={[
            "AVIF and WebP offer better compression than JPEG/PNG",
            "Use appropriate fit modes for different use cases",
            "Strip EXIF data for privacy and smaller files",
            "Preview before downloading to ensure quality",
            "Test different formats to find best compression",
            "Use smart focal position for better automatic crops",
            "Keep original images as backups"
          ]}
          faq={[
            {
              question: "Which format should I use?",
              answer: "AVIF offers the best compression but limited browser support. WebP provides excellent compression with wide support. JPEG is universal but larger. PNG is lossless but largest. Choose based on your needs and browser support requirements."
            },
            {
              question: "Will compression reduce image quality?",
              answer: "Compression may reduce quality slightly, but our tool uses high-quality encoders to minimize quality loss. You can preview results before downloading to ensure quality meets your needs."
            },
            {
              question: "What is EXIF metadata?",
              answer: "EXIF metadata includes information like camera settings, location data, and timestamps embedded in images. Stripping it reduces file size and protects privacy."
            },
            {
              question: "Can I resize and convert at the same time?",
              answer: "Yes, you can resize images while converting formats. Set your desired dimensions and select the target format, and the tool will process both operations together."
            }
          ]}
        />
      </div>

      {/* Blog Post Section */}
      <div className="max-w-4xl mx-auto mt-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Learn More About Image Compression
          </h2>
          <p className="text-lg text-gray-600">
            Discover how to optimize your images for web and mobile applications
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-3xl">
              🖼️
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Complete Guide to Image Compression</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Learn everything about image compression, from basic concepts to advanced techniques. Discover how to optimize your images for web performance, mobile applications, and storage efficiency while maintaining visual quality.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>📅 January 25, 2025</span>
                <span>📖 8 min read</span>
                <span>🏷️ Image Optimization</span>
              </div>
              <a 
                href="/blog/complete-guide-to-image-compression" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Read Full Article →
              </a>
            </div>
          </div>
        </div>
      </div>
    </Body>
    <Footer />
  </div>
);

export default ImageCompressorPage;


