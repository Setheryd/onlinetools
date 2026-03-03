import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TemperatureConverterTool from '../../components/tools/TemperatureConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Temperature Converter — The Tool Guru',
  description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
  keywords: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/temperature-converter',
  },
  openGraph: {
    title: 'Temperature Converter — The Tool Guru',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
    url: 'https://thetool.guru/tools/temperature-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Temperature Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temperature Converter — The Tool Guru',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const TemperatureConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <TemperatureConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Temperature Converter"
          description="Convert between Celsius, Fahrenheit, and Kelvin. For weather, cooking, science, and travel. Accurate formulas; all in your browser."
          features={["Celsius, Fahrenheit, Kelvin", "Instant conversion", "Bidirectional", "Copy result", "Works in browser"]}
          howToUse={["Enter a temperature", "Choose source and target scale", "View result"]}
          useCases={["Weather", "Cooking and baking", "Science and labs", "Travel"]}
          tips={["Water freezes at 0°C / 32°F. Boils at 100°C / 212°F. Kelvin = Celsius + 273.15."]}
          faq={[
            { question: "How do I convert Fahrenheit to Celsius?", answer: "Use the formula: C = (F − 32) × 5/9. Or use this tool: enter F and select Celsius as target." },
            { question: "What is Kelvin used for?", answer: "Kelvin is the SI unit for temperature, used in science. 0 K is absolute zero. Kelvin = Celsius + 273.15." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="temperature-converter" />
    </Body>
    <Footer />
  </div>
);

export default TemperatureConverterPage;


