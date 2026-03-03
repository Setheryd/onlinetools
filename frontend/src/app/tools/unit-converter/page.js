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
          description="Convert between units across multiple categories: length, weight, temperature, volume, area, and more. One tool handles metric and imperial systems so you can switch between meters and feet, kilograms and pounds, Celsius and Fahrenheit, liters and gallons, and other common units. Enter a value and choose source and target units to get an instant, accurate conversion. All calculations run in your browser with no data sent to servers. Useful for daily life, recipes, DIY and construction, travel, and education—anywhere unit conversion is needed."
          features={[
            'Multiple categories: length, weight, temperature, volume, area, and more',
            'Metric and imperial units in each category',
            'Instant conversion as you type; no submit required',
            'Clear source and target unit selection',
            'Copy result for use in documents or apps',
            'Runs entirely in your browser; no account needed'
          ]}
          howToUse={[
            'Select the category (e.g., length, weight, temperature)',
            'Enter the value you want to convert',
            'Choose the unit of the value you entered (source unit)',
            'Choose the unit you want to convert to (target unit)',
            'View the result; it updates as you change values or units'
          ]}
          useCases={[
            'Daily conversions: quick answers for cooking, shopping, or travel',
            'Recipes: convert grams to ounces or cups to milliliters',
            'DIY and construction: switch between feet, meters, and inches',
            'Travel: understand distances, speeds, and temperatures abroad',
            'Education: teach or learn metric and imperial systems'
          ]}
          tips={[
            'Pick the category first, then set source and target units. Results update as you type.',
            'For temperature, formulas differ from simple multiplication (e.g., °C to °F uses a formula).',
            'When in doubt, double-check critical conversions (e.g., medicine or engineering) with a second source.'
          ]}
          faq={[
            { question: 'Which unit types are supported?', answer: 'Length, weight, temperature, volume, area, and other common categories. Select a category to see all available units in that group.' },
            { question: 'Are conversions accurate?', answer: 'Yes. Standard, widely accepted conversion factors are used for each unit type. For critical applications, verify with official or local standards.' },
            { question: 'Can I convert between metric and imperial?', answer: 'Yes. You can convert from any unit to any other in the same category, including metric to imperial and back.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="unit-converter" />
    </Body>
    <Footer />
  </div>
);

export default UnitConverterPage;


