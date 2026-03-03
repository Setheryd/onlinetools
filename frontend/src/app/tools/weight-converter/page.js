import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WeightConverterTool from '../../components/tools/WeightConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Weight Converter — The Tool Guru',
  description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
  keywords: ['weight', 'converter', 'kg', 'lb', 'oz', 'grams', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/weight-converter',
  },
  openGraph: {
    title: 'Weight Converter — The Tool Guru',
    description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
    url: 'https://thetool.guru/tools/weight-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Weight Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Converter — The Tool Guru',
    description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const WeightConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <WeightConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Weight Converter"
          description="Convert between kilograms, grams, pounds, ounces, and tons. Essential for cooking, shipping, fitness, and science. Accurate conversions in your browser."
          features={["kg, g, lb, oz, tons", "Instant conversion", "Bidirectional", "Copy result", "Works in browser"]}
          howToUse={["Enter a value", "Choose source and target units", "View result and copy if needed"]}
          useCases={["Recipes and cooking", "Shipping and packages", "Fitness and health", "Science and education"]}
          tips={["1 kg ≈ 2.205 lb. 1 lb = 16 oz. Metric uses kg and g."]}
          faq={[
            { question: "Is the conversion accurate?", answer: "Yes. Conversions use standard conversion factors between metric and imperial weight units." },
            { question: "Which units are supported?", answer: "Kilograms (kg), grams (g), pounds (lb), ounces (oz), and tons (metric and US)." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="weight-converter" />
    </Body>
    <Footer />
  </div>
);

export default WeightConverterPage;


