import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageCropperTool from '../../components/tools/ImageCropperTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Image Cropper — The Tool Guru',
  description: 'Crop images to precise coordinates and sizes.',
  keywords: ['image cropper', 'crop image', 'trim', 'cut', 'resize'],
  openGraph: {
    title: 'Image Cropper — The Tool Guru',
    description: 'Crop images precisely and quickly.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageCropperTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Image Cropper"
          description="Crop images to precise coordinates and sizes with our intuitive image cropper. Select specific areas of your images, adjust crop dimensions, and create perfectly sized images for your needs. Perfect for removing unwanted areas, focusing on specific parts of images, creating thumbnails, or preparing images for specific aspect ratios. All cropping happens in your browser for complete privacy."
          features={[
            "Crop images to exact pixel coordinates and dimensions",
            "Interactive crop selection with visual preview",
            "Maintain aspect ratio or free-form cropping",
            "Support for JPEG, PNG, WebP, and AVIF formats",
            "Real-time preview of cropped area",
            "Download cropped images instantly",
            "Precise coordinate and size controls",
            "Works entirely in your browser - no uploads to servers"
          ]}
          howToUse={[
            "Upload your image using the file input or drag-and-drop",
            "Select the area you want to crop using the interactive crop tool",
            "Adjust crop dimensions by dragging corners or edges",
            "Set exact coordinates and dimensions if needed",
            "Choose whether to maintain aspect ratio",
            "Preview the cropped result",
            "Download the cropped image"
          ]}
          useCases={[
            "Remove unwanted borders or backgrounds from images",
            "Focus on specific subjects or areas in photos",
            "Create square images for social media profiles",
            "Crop images to specific aspect ratios (16:9, 4:3, etc.)",
            "Extract specific regions from larger images",
            "Create thumbnails and preview images",
            "Prepare images for specific layout requirements",
            "Remove watermarks or unwanted elements from images"
          ]}
          tips={[
            "Use aspect ratio lock for consistent cropping across multiple images",
            "Preview before downloading to ensure the crop is correct",
            "Keep original images as backups before cropping",
            "Consider the final use case when choosing crop dimensions",
            "Square crops (1:1) work well for social media",
            "Use precise coordinates for batch processing requirements",
            "Crop to remove distractions and improve image composition"
          ]}
          faq={[
            {
              question: "Will cropping reduce image quality?",
              answer: "Cropping itself doesn't reduce quality, but the resulting image will have fewer pixels. If you crop a large image to a small area, the cropped image will be smaller in dimensions but maintain the same quality per pixel."
            },
            {
              question: "Can I undo a crop?",
              answer: "Once you download a cropped image, the crop is permanent. However, you can always re-upload the original image and crop it differently. The tool doesn't modify your original file."
            },
            {
              question: "What's the difference between cropping and resizing?",
              answer: "Cropping removes parts of the image to change its composition and dimensions. Resizing changes the overall size while keeping all the image content. You can combine both operations for best results."
            },
            {
              question: "Can I crop multiple images at once?",
              answer: "Currently, you process one image at a time. Upload, crop, download, then proceed to the next image for batch processing."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;



