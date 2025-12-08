import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageResizerTool from '../../components/tools/ImageResizerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Image Resizer — The Tool Guru',
  description: 'Resize images to exact dimensions with high quality output.',
  keywords: ['image resizer', 'resize image', 'crop', 'scale', 'webp', 'avif', 'jpeg', 'png'],
  openGraph: {
    title: 'Image Resizer — The Tool Guru',
    description: 'High-quality image resizing and conversion.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageResizerTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Image Resizer"
          description="Resize images to exact dimensions with high-quality output. Our image resizer supports multiple formats including JPEG, PNG, WebP, and AVIF. Perfect for creating thumbnails, optimizing images for web, preparing images for social media, or adjusting image dimensions for specific requirements. All processing happens in your browser for complete privacy."
          features={[
            "Resize images to exact pixel dimensions",
            "Maintain aspect ratio or allow custom dimensions",
            "Support for JPEG, PNG, WebP, and AVIF formats",
            "High-quality resizing algorithms",
            "Batch processing multiple images",
            "Real-time preview of resized images",
            "Download resized images instantly",
            "Works entirely in your browser - no uploads to servers"
          ]}
          howToUse={[
            "Upload your image using the file input or drag-and-drop",
            "Set your desired width and height dimensions",
            "Choose whether to maintain aspect ratio",
            "Select output format (JPEG, PNG, WebP, or AVIF)",
            "Preview the resized image",
            "Adjust quality settings if needed",
            "Download the resized image"
          ]}
          useCases={[
            "Create thumbnails for websites and galleries",
            "Resize images for social media posts and profiles",
            "Optimize images for email attachments",
            "Prepare images for print at specific dimensions",
            "Resize product images for e-commerce sites",
            "Create responsive images for web design",
            "Adjust image sizes for mobile apps",
            "Prepare images for presentations and documents"
          ]}
          tips={[
            "Maintain aspect ratio to prevent image distortion",
            "Use WebP or AVIF for smaller file sizes with good quality",
            "For web use, aim for file sizes under 200KB when possible",
            "Higher resolution doesn't always mean better quality - consider the display size",
            "Resize before uploading to reduce upload time",
            "Keep original images as backups before resizing",
            "Use appropriate dimensions for your target platform"
          ]}
          faq={[
            {
              question: "Will resizing affect image quality?",
              answer: "Resizing can affect quality, especially when enlarging images. Our tool uses high-quality algorithms to minimize quality loss. Downscaling (making smaller) generally maintains better quality than upscaling."
            },
            {
              question: "What's the maximum image size I can resize?",
              answer: "The tool can handle images up to reasonable browser memory limits. Very large images (over 10MB) may take longer to process. We recommend resizing images that are under 15MB for best performance."
            },
            {
              question: "Can I resize multiple images at once?",
              answer: "Yes, you can process multiple images sequentially. Upload one image, resize it, download it, then proceed to the next image."
            },
            {
              question: "Which format should I use for web images?",
              answer: "WebP and AVIF offer the best compression with good quality. JPEG is widely supported and good for photos. PNG is best for images with transparency or simple graphics."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;



