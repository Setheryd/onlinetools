import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import EnergyConverterTool from '../../components/tools/EnergyConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Energy Converter — The Tool Guru',
  description: 'Convert between joules, watt-hours, calories, BTU, and more.',
  keywords: ['energy', 'converter', 'joules', 'watt hours', 'kwh', 'calories', 'btu'],
  alternates: {
    canonical: 'https://thetool.guru/tools/energy-converter',
  },
  openGraph: {
    title: 'Energy Converter — The Tool Guru',
    description: 'Convert between joules, watt-hours, calories, BTU, and more.',
    url: 'https://thetool.guru/tools/energy-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Energy Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energy Converter — The Tool Guru',
    description: 'Convert between joules, watt-hours, calories, BTU, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const EnergyConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <EnergyConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Energy Converter"
          description="Convert between joules, watt-hours, kWh, calories, BTU, and more. For physics, utilities, and nutrition. All in your browser."
          features={["Joules, Wh, kWh", "Calories, BTU", "Instant conversion", "Works in browser"]}
          howToUse={["Enter value", "Select source and target units", "View result"]}
          useCases={["Physics", "Electricity bills", "Nutrition (calories)", "HVAC (BTU)"]}
          faq={[{ question: "What is a joule?", answer: "The SI unit of energy. 1 kWh = 3,600,000 joules. 1 calorie ≈ 4.184 joules." }]}
        />
      </div>
      <RelatedToolsSection toolId="energy-converter" />
    </Body>
    <Footer />
  </div>
);

export default EnergyConverterPage;


