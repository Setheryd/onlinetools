import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageCompressorTool from '../../components/tools/ImageCompressorTool';

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
      <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">About this Image Compressor & Converter</h2>
        <p className="text-gray-700 mb-3">
          Optimize your images with professional-grade quality. This tool uses state-of-the-art encoders to convert
          and compress images to modern formats like AVIF and WebP while preserving clarity. Resize precisely by
          width/height, choose the fitting mode (cover, contain, inside, outside, fill), and set a focal position
          (center, edges, or smart entropy/attention) for beautiful crops. Strip EXIF metadata for privacy and smaller
          files, and preview your results side-by-side with savings and dimensions shown.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Key features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>High-quality conversion to AVIF, WebP, JPEG, and PNG</li>
          <li>Precise resizing with fit modes and focal position control</li>
          <li>Metadata stripping (EXIF) for privacy and smaller outputs</li>
          <li>Instant, in-browser previews and one-click download</li>
          <li>Clear savings and dimensions to guide your optimization</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Popular use cases</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert PNG and JPG assets to AVIF/WebP for faster websites</li>
          <li>Generate responsive images with exact dimensions and crops</li>
          <li>Remove EXIF data before sharing photos online</li>
          <li>Prepare thumbnails and social images with minimal effort</li>
        </ul>
        <p className="text-gray-700 mt-3">
          Whether you’re a developer speeding up page loads or a designer preparing assets, this tool delivers
          modern compression with excellent visual fidelity.
        </p>
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


