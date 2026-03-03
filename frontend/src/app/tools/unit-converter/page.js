import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UnitConverterTool from '../../components/tools/UnitConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Unit Converter — The Tool Guru',
  description: 'Convert units across categories like length, weight, temperature, volume, and more.',
  keywords: ['unit converter', 'length', 'weight', 'temperature', 'volume', 'conversion', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/unit-converter',
  },
  openGraph: {
    title: 'Unit Converter — The Tool Guru',
    description: 'Convert units across categories like length, weight, temperature, volume, and more.',
    url: 'https://thetool.guru/tools/unit-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Unit Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter — The Tool Guru',
    description: 'Convert units across categories like length, weight, temperature, volume, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const UnitConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <UnitConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Unit Converter"
          description="Convert units across length, weight, temperature, volume, area, and more. One tool for many unit types. Metric and imperial. All in your browser."
          features={["Multiple categories", "Length, weight, temp, volume, area", "Metric and imperial", "Instant conversion", "Works in browser"]}
          howToUse={["Select category", "Enter value and choose units", "View result"]}
          useCases={["Daily conversions", "Recipes", "DIY and construction", "Travel", "Education"]}
          tips={["Pick the category first, then source and target units. Results update as you type."]}
          faq={[
            { question: "Which unit types are supported?", answer: "Length, weight, temperature, volume, area, and more. Select a category to see available units." },
            { question: "Are conversions accurate?", answer: "Yes. Standard conversion factors are used for each unit type." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="unit-converter" />
    </Body>
    <Footer />
  </div>
);

export default UnitConverterPage;


