import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageWatermarkerTool from '../../components/tools/ImageWatermarkerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Image Watermarker — The Tool Guru',
  description: 'Add text watermarks to your images with adjustable position and style.',
  keywords: ['image watermark', 'watermark', 'text watermark', 'branding', 'copyright'],
  openGraph: {
    title: 'Image Watermarker — The Tool Guru',
    description: 'Add watermarks to images quickly.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageWatermarkerTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Image Watermarker"
          description="Add text watermarks to your images with adjustable position, style, and opacity. Protect your images with copyright notices, brand your photos, or add attribution text. Our watermark tool allows you to customize font, size, color, position, and transparency to create professional watermarks that don't overpower your images. Perfect for photographers, content creators, and businesses protecting their visual assets."
          features={[
            "Add customizable text watermarks to images",
            "Adjust watermark position (9 preset positions + custom)",
            "Customize font size, color, and style",
            "Control opacity/transparency of watermarks",
            "Support for multiple watermark styles",
            "Real-time preview of watermarked image",
            "Download watermarked images instantly",
            "Works entirely in your browser - no uploads to servers"
          ]}
          howToUse={[
            "Upload your image using the file input or drag-and-drop",
            "Enter the watermark text you want to add",
            "Choose watermark position (corners, center, or custom)",
            "Adjust font size, color, and style",
            "Set opacity/transparency level",
            "Preview the watermarked image",
            "Download the watermarked image"
          ]}
          useCases={[
            "Add copyright notices to protect your images",
            "Brand photos with your company logo or name",
            "Add attribution text to shared images",
            "Mark images for preview or sample purposes",
            "Add photographer credits to images",
            "Protect stock photos and digital assets",
            "Add contact information to portfolio images",
            "Mark images with usage rights or licensing information"
          ]}
          tips={[
            "Use semi-transparent watermarks to protect images without completely obscuring them",
            "Place watermarks in corners or edges to minimize interference with the main content",
            "Use contrasting colors for better visibility",
            "Consider watermark size - too large can be distracting, too small can be easily removed",
            "Test watermark visibility on different backgrounds",
            "Keep original unwatermarked images as backups",
            "Use watermarks consistently across your image portfolio"
          ]}
          faq={[
            {
              question: "Can I remove a watermark after adding it?",
              answer: "Once a watermark is added and the image is downloaded, it becomes part of the image. You would need the original unwatermarked image to remove it. Always keep backups of original images."
            },
            {
              question: "What's the best position for a watermark?",
              answer: "Corner positions (bottom-right, bottom-left) are common choices as they're less intrusive. However, the best position depends on your image composition and the level of protection needed."
            },
            {
              question: "Can I add image watermarks (logos)?",
              answer: "This tool currently supports text watermarks. For image/logo watermarks, you would need image editing software that supports layering."
            },
            {
              question: "Will watermarks affect image quality?",
              answer: "Adding a text watermark doesn't degrade the underlying image quality. The watermark is rendered on top of the image, so the original image pixels remain unchanged."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;



