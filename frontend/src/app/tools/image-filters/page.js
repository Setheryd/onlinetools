import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ImageFiltersTool from '../../components/tools/ImageFiltersTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Image Filters — The Tool Guru',
  description: 'Apply filters and adjustments like blur, sharpen, brightness, saturation, and more.',
  keywords: ['image filters', 'effects', 'grayscale', 'invert', 'blur', 'sharpen', 'tint'],
  openGraph: {
    title: 'Image Filters — The Tool Guru',
    description: 'Enhance images with filters.',
  },
};

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <ImageFiltersTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Image Filters"
          description="Apply professional filters and adjustments to your images including blur, sharpen, brightness, contrast, saturation, grayscale, invert, and more. Enhance your photos, create artistic effects, or adjust image properties to achieve the perfect look. Our filter tool provides real-time previews and supports multiple filter combinations. Perfect for photographers, designers, and anyone looking to enhance or stylize their images."
          features={[
            "Apply multiple filters: blur, sharpen, brightness, contrast, saturation",
            "Grayscale, invert, sepia, and tint effects",
            "Adjustable filter intensity and parameters",
            "Real-time preview of filtered images",
            "Combine multiple filters for custom effects",
            "Support for JPEG, PNG, WebP, and AVIF formats",
            "Download filtered images instantly",
            "Works entirely in your browser - no uploads to servers"
          ]}
          howToUse={[
            "Upload your image using the file input or drag-and-drop",
            "Select filters from the available options",
            "Adjust filter intensity using sliders",
            "Preview the filtered image in real-time",
            "Combine multiple filters for custom effects",
            "Reset filters to start over if needed",
            "Download the filtered image when satisfied"
          ]}
          useCases={[
            "Enhance photo brightness and contrast",
            "Create artistic effects with filters",
            "Convert images to grayscale for black and white photography",
            "Adjust saturation for vibrant or muted looks",
            "Apply blur effects for depth of field simulation",
            "Sharpen images to improve clarity",
            "Create vintage looks with sepia or tint filters",
            "Invert colors for creative effects"
          ]}
          tips={[
            "Use filters subtly for natural-looking enhancements",
            "Combine brightness and contrast adjustments for better exposure",
            "Grayscale conversion works well for artistic photography",
            "Blur can help focus attention on specific areas",
            "Sharpen sparingly to avoid introducing artifacts",
            "Adjust saturation to make colors pop or create muted tones",
            "Preview changes in real-time to see effects immediately"
          ]}
          faq={[
            {
              question: "Will applying filters reduce image quality?",
              answer: "Some filters like blur may slightly soften the image, but most adjustments (brightness, contrast, saturation) don't degrade quality. The tool processes images at their original resolution."
            },
            {
              question: "Can I undo a filter after applying it?",
              answer: "You can reset filters and start over, or re-upload the original image. Once downloaded, filtered images are permanent, so keep originals as backups."
            },
            {
              question: "Can I combine multiple filters?",
              answer: "Yes, you can apply multiple filters simultaneously. Adjust each filter's intensity to create custom combinations and effects."
            },
            {
              question: "What's the difference between blur and sharpen?",
              answer: "Blur softens the image by reducing detail, creating a softer, dreamy effect. Sharpen enhances edges and details, making the image appear crisper and more defined."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;



