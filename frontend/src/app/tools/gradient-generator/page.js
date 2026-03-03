import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import GradientMakerTool from '../../components/tools/GradientMakerTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import { blogService } from '../../utils/blogService';
export const metadata = {
  title: 'Gradient Maker — The Tool Guru',
  description: 'Create beautiful CSS gradients with our comprehensive gradient maker. Generate linear, radial, conic gradients and export as PNG, SVG, JPEG or CSS.',
  keywords: ['gradient maker', 'css gradient', 'linear gradient', 'radial gradient', 'conic gradient', 'color gradient', 'background generator', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/gradient-generator',
  },
  openGraph: {
    title: 'Gradient Maker — The Tool Guru',
    description: 'Create beautiful CSS gradients with our comprehensive gradient maker. Generate linear, radial, conic gradients and export as PNG, SVG, JPEG or CSS.',
    url: 'https://thetool.guru/tools/gradient-generator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Gradient Maker — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gradient Maker — The Tool Guru',
    description: 'Create beautiful CSS gradients with our comprehensive gradient maker. Generate linear, radial, conic gradients and export as PNG, SVG, JPEG or CSS.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default async function GradientMakerPage() {
  const gradientBlogPost = await blogService.getPostBySlug('complete-guide-to-css-gradients');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Gradient Maker',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    url: 'https://thetool.guru/tools/gradient-generator',
    description: 'Create beautiful CSS gradients. Generate linear, radial, conic gradients and export as PNG, SVG, JPEG or CSS. No signup required.',
    browserRequirements: 'Requires JavaScript. Works in modern browsers.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Linear, radial, and conic gradients',
      'Multiple color stops',
      'Real-time preview',
      'Export PNG, SVG, JPEG, CSS',
      'Copy CSS code',
      'Works in browser for privacy',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
        <div className="max-w-4xl mx-auto px-4 mt-8">
          <ToolBlogPost post={gradientBlogPost} toolPath="/tools/gradient-generator" />
        </div>
      <RelatedToolsSection toolId="gradient-generator" />

      </Body>
      <Footer />
    </div>
  );
}
