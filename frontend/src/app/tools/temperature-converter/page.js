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
          description="Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately. Temperature uses different formulas than simple multiplication—this tool applies the correct equations so you get precise results. Use it for weather (e.g., converting a forecast), cooking and baking (recipe temperatures in °C or °F), travel (understanding local temps abroad), or science and labs (Kelvin). All conversion runs in your browser with no server uploads. Enter a value and choose source and target scales to see the result instantly."
          features={[
            'Celsius (°C), Fahrenheit (°F), and Kelvin (K)',
            'Instant conversion using correct formulas (not simple ratios)',
            'Bidirectional: convert from any scale to any other',
            'Copy result for use in documents or recipes',
            'Accurate formulas: °F to °C uses (F − 32) × 5/9; K = °C + 273.15',
            'Runs in your browser; no account needed'
          ]}
          howToUse={[
            'Enter the temperature value you know',
            'Select the scale of that value (Celsius, Fahrenheit, or Kelvin)',
            'Select the scale you want to convert to',
            'View the converted result'
          ]}
          useCases={[
            'Weather: convert forecasts or historical data between °C and °F',
            'Cooking and baking: convert recipe temperatures (e.g., 180°C to °F)',
            'Science and labs: work with Kelvin and Celsius',
            'Travel: understand local temperature units when abroad'
          ]}
          tips={[
            'Water freezes at 0°C / 32°F and boils at 100°C / 212°F. Kelvin = Celsius + 273.15; 0 K is absolute zero.',
            'Room temperature is about 20–25°C (68–77°F).',
            'For quick °C to °F mental math: double °C, add 30 (approximate).'
          ]}
          faq={[
            { question: 'How do I convert Fahrenheit to Celsius?', answer: 'Use the formula: C = (F − 32) × 5/9. Or use this tool: enter the temperature in Fahrenheit and select Celsius as the target.' },
            { question: 'What is Kelvin used for?', answer: 'Kelvin is the SI unit for temperature, used in science and engineering. 0 K is absolute zero. Kelvin = Celsius + 273.15.' },
            { question: 'Why is the formula different from other unit converters?', answer: 'Temperature scales have different zero points and step sizes. Celsius and Fahrenheit use offset formulas; Kelvin shares the same step size as Celsius but has a different zero.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="temperature-converter" />
    </Body>
    <Footer />
  </div>
);

export default TemperatureConverterPage;


