import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SpeedConverterTool from '../../components/tools/SpeedConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Speed Converter — The Tool Guru',
  description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
  keywords: ['speed', 'converter', 'mph', 'kmh', 'knots', 'mps', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/speed-converter',
  },
  openGraph: {
    title: 'Speed Converter — The Tool Guru',
    description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
    url: 'https://thetool.guru/tools/speed-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Speed Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speed Converter — The Tool Guru',
    description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const SpeedConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <SpeedConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Speed Converter"
          description="Convert between speed units: meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), knots, and feet per second (ft/s). Whether you are comparing driving speeds in different countries, working with aviation or marine speeds in knots, or doing physics or weather calculations, this tool gives you instant, accurate conversions. Enter a value and choose source and target units; the result updates as you type. All calculations run in your browser with no data sent to servers. Useful for travel, sports, science, and everyday conversions."
          features={[
            'Support for m/s, km/h, mph, knots, and ft/s',
            'Instant conversion as you type',
            'Bidirectional: convert from any unit to any other',
            'Clear result with optional copy to clipboard',
            'Standard conversion factors used for accuracy',
            'Runs entirely in your browser; no account needed'
          ]}
          howToUse={[
            'Enter the speed value you know',
            'Select the unit of that value (e.g., mph, km/h)',
            'Select the unit you want to convert to',
            'View the converted result'
          ]}
          useCases={[
            'Driving: convert speed limits or trip speeds between mph and km/h when traveling',
            'Aviation and marine: convert knots to km/h or mph for reporting or planning',
            'Weather: work with wind speeds in m/s, km/h, or mph',
            'Sports: convert running or cycling speeds between units'
          ]}
          tips={[
            '1 mph ≈ 1.609 km/h. For a rough mental conversion, multiply mph by 1.6 to get km/h.',
            'Knots are nautical miles per hour; 1 knot ≈ 1.151 mph.',
            'm/s is common in physics and weather; multiply by 3.6 to get km/h.'
          ]}
          faq={[
            { question: 'How do I convert mph to km/h?', answer: 'Multiply by 1.609. Or use this tool: enter the speed in mph and select km/h as the target unit.' },
            { question: 'What are knots?', answer: 'Knots are nautical miles per hour, used in aviation and maritime. 1 knot ≈ 1.151 mph ≈ 1.852 km/h.' },
            { question: 'Are the conversions accurate?', answer: 'Yes. Standard conversion factors are used. For critical applications (e.g., aviation), always verify with official sources.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="speed-converter" />
    </Body>
    <Footer />
  </div>
);

export default SpeedConverterPage;


