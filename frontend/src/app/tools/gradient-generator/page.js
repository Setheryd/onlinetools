import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import GradientMakerTool from '../../components/tools/GradientMakerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Gradient Maker — The Tool Guru',
  description: 'Create beautiful CSS gradients with our comprehensive gradient maker. Generate linear, radial, conic gradients and export as PNG, SVG, JPEG or CSS.',
  keywords: ['gradient maker', 'css gradient', 'linear gradient', 'radial gradient', 'conic gradient', 'color gradient', 'background generator', 'the tool guru'],
  openGraph: {
    title: 'Gradient Maker — The Tool Guru',
    description: 'Create beautiful CSS gradients with our comprehensive gradient maker.',
  },
};

const GradientMakerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <GradientMakerTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Gradient Generator"
            description="Create beautiful CSS gradients with our comprehensive gradient maker. Generate linear, radial, and conic gradients with multiple color stops, angles, and positions. Export gradients as PNG, SVG, JPEG images, or CSS code. Perfect for web design, creating backgrounds, designing user interfaces, or adding visual appeal to projects. The tool provides real-time preview and supports all modern gradient types."
            features={[
              "Create linear, radial, and conic gradients",
              "Multiple color stops with precise control",
              "Adjustable angles and positions",
              "Real-time gradient preview",
              "Export as PNG, SVG, JPEG, or CSS",
              "Copy CSS code for use in projects",
              "Save and reuse gradient configurations",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Select gradient type (linear, radial, or conic)",
              "Add color stops and choose colors",
              "Adjust color positions and opacity",
              "Set angle or direction for linear gradients",
              "Configure center and size for radial gradients",
              "Preview the gradient in real-time",
              "Export as image or copy CSS code",
              "Use in your web projects or designs"
            ]}
            useCases={[
              "Create gradient backgrounds for websites",
              "Design user interface elements",
              "Generate gradient images for graphics",
              "Create CSS gradients for web development",
              "Design social media graphics",
              "Create gradient overlays and effects",
              "Generate gradient assets for projects",
              "Experiment with color combinations"
            ]}
            tips={[
              "Use complementary colors for vibrant gradients",
              "Experiment with multiple color stops",
              "Adjust opacity for subtle effects",
              "Test gradients on different backgrounds",
              "Export in appropriate formats for your use case",
              "Use CSS export for web development",
              "Save favorite gradient configurations"
            ]}
            faq={[
              {
                question: "What types of gradients are supported?",
                answer: "The tool supports linear gradients (straight lines), radial gradients (circular from center), and conic gradients (rotating around a point). Each type has different configuration options."
              },
              {
                question: "Can I export gradients as images?",
                answer: "Yes, you can export gradients as PNG, SVG, or JPEG images. PNG and SVG preserve quality best, while JPEG reduces file size."
              },
              {
                question: "How do I use the CSS code?",
                answer: "Copy the generated CSS code and use it in your stylesheets. The code uses standard CSS gradient syntax compatible with all modern browsers."
              },
              {
                question: "Can I create gradients with more than two colors?",
                answer: "Yes, you can add multiple color stops to create gradients with any number of colors. Each color stop can have its own position and opacity."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default GradientMakerPage;
