import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SquareUnitPriceCalculatorTool from '../../components/tools/SquareUnitPriceCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Price per Square Meter & Square Foot Calculator — The Tool Guru',
  description: 'Calculate price per square meter, price per square foot, or total cost from area/volume and unit price. Free calculator for real estate and materials.',
  keywords: ['price per square meter', 'price per square foot', 'square unit price', 'area cost calculator', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/square-unit-price-calculator',
  },
  openGraph: {
    title: 'Price per Square Meter & Square Foot Calculator — The Tool Guru',
    description: 'Calculate price per square meter, price per square foot, or total cost from area/volume and unit price.',
    url: 'https://thetool.guru/tools/square-unit-price-calculator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Square Unit Price Calculator - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Price per Square Meter & Square Foot Calculator — The Tool Guru',
    description: 'Calculate price per square meter, price per square foot, or total cost from area/volume and unit price.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const SquareUnitPriceCalculatorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <SquareUnitPriceCalculatorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Price per Square Meter & Square Foot Calculator"
          description="Calculate price per square meter, price per square foot, or total cost from area and unit price. When comparing flooring, paint, land, or materials, unit price (cost per sq m or sq ft) lets you compare options fairly. Enter your area—by dimensions or total—and either the total cost (to get unit price) or the unit price (to get total cost). All calculations run in your browser. Useful for real estate, home improvement, construction, and comparing supplier quotes in consistent units."
          features={[
            'Calculate price per square meter or price per square foot',
            'Calculate total cost from area and unit price',
            'Enter area by dimensions (length × width) or as a total area value',
            'Support for square meters and square feet',
            'Instant results as you enter values',
            'Runs in your browser; no data sent to servers'
          ]}
          howToUse={[
            'Enter dimensions (length and width) or the total area in your chosen unit',
            'Enter either the total cost (to get price per unit) or the unit price (to get total cost)',
            'Select square meters or square feet as appropriate',
            'View the computed price per unit or total cost'
          ]}
          useCases={[
            'Real estate: compare listing prices per sq m or sq ft',
            'Flooring and tiles: work out cost per square meter or square foot',
            'Materials: compare quotes from suppliers in a common unit',
            'Home improvement: estimate paint, carpet, or flooring total cost from area and unit price'
          ]}
          tips={[
            'Price per sq m = total cost ÷ area in sq m. Same idea for sq ft.',
            'Use the same unit (sq m or sq ft) for all areas when comparing.',
            'When measuring rooms, measure in one unit and stick to it for consistency.'
          ]}
          faq={[
            { question: 'How do I get price per square meter?', answer: 'Divide total cost by area in square meters. Or in this tool: enter the total cost and the area in sq m; it will compute price per sq m.' },
            { question: 'Square foot or square meter?', answer: 'The tool supports both. Use your local unit (e.g., sq ft in the US, sq m in many other countries) so you can compare like with like.' },
            { question: 'Can I use this for volume (e.g., cubic meters)?', answer: 'This calculator is for area (square units). For volume-based pricing (e.g., concrete per cubic meter), use a dedicated volume or unit price tool if available.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="square-unit-price-calculator" />
    </Body>
    <Footer />
  </div>
);

export default SquareUnitPriceCalculatorPage;
