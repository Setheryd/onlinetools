import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import AreaConverterTool from '../../components/tools/AreaConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Area Converter — The Tool Guru',
  description: 'Convert between square meters, feet, acres, hectares, and more.',
  keywords: ['area', 'converter', 'square feet', 'square meters', 'acre', 'hectare', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/area-converter',
  },
  openGraph: {
    title: 'Area Converter — The Tool Guru',
    description: 'Convert between square meters, feet, acres, hectares, and more.',
    url: 'https://thetool.guru/tools/area-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Area Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Area Converter — The Tool Guru',
    description: 'Convert between square meters, feet, acres, hectares, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const AreaConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <AreaConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Area Converter"
          description="Convert between square meters, square feet, acres, hectares, and more. Our area converter supports common imperial and metric units so you can quickly translate land area, room size, or plot dimensions. Perfect for real estate, construction, gardening, or any project that needs area conversions. Free, instant conversions in your browser."
          features={[
            "Convert between sq m, sq ft, acres, hectares, and more",
            "Metric and imperial units supported",
            "Instant conversion as you type",
            "Clear, readable output",
            "Copy result to clipboard",
            "Works entirely in your browser",
            "No signup required"
          ]}
          howToUse={[
            "Enter an area value",
            "Select the unit of the value (e.g. square feet)",
            "Select the unit you want to convert to (e.g. acres)",
            "View the converted result instantly",
            "Switch units to convert in any direction"
          ]}
          useCases={[
            "Compare property sizes in different units",
            "Convert room or land area for planning",
            "Understand lot sizes (acres to sq ft or hectares)",
            "Convert for real estate or construction",
            "Calculate garden or lawn area",
            "Convert for school or work projects",
            "Translate between metric and imperial area",
            "Verify area in different unit systems"
          ]}
          tips={[
            "1 acre = 43,560 square feet; 1 hectare ≈ 2.47 acres",
            "Square meters are metric; square feet are imperial",
            "For rough land area, acres and hectares are common",
            "Room sizes are often given in sq ft (US) or sq m (metric)"
          ]}
          faq={[
            {
              question: "What is an acre?",
              answer: "An acre is a unit of area commonly used in the US and UK for land. One acre equals 43,560 square feet or about 4,047 square meters."
            },
            {
              question: "How do I convert square feet to square meters?",
              answer: "Multiply square feet by 0.092903 to get square meters. Or use this tool: enter the value in sq ft, select square feet, then select square meters to see the result."
            },
            {
              question: "What is a hectare?",
              answer: "A hectare is a metric unit of area equal to 10,000 square meters, or about 2.47 acres. It's often used for land and agriculture outside the US."
            },
            {
              question: "Are conversions exact?",
              answer: "Conversions use standard conversion factors. Results are accurate for everyday use; for surveying or legal purposes, confirm with official conversion standards in your region."
            }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="area-converter" />
    </Body>
    <Footer />
  </div>
);

export default AreaConverterPage;


