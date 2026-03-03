import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import LengthConverterTool from '../../components/tools/LengthConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Length Converter — The Tool Guru',
  description: 'Convert length units like meters, feet, inches, miles, and more.',
  keywords: ['length', 'converter', 'meters', 'feet', 'inches', 'miles', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/length-converter',
  },
  openGraph: {
    title: 'Length Converter — The Tool Guru',
    description: 'Convert length units like meters, feet, inches, miles, and more.',
    url: 'https://thetool.guru/tools/length-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Length Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Length Converter — The Tool Guru',
    description: 'Convert length units like meters, feet, inches, miles, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const LengthConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <LengthConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Length Converter"
          description="Convert between length units in metric and imperial systems. Enter a value in meters, feet, inches, miles, kilometers, yards, or other common units and get an instant, accurate conversion. Whether you are measuring for DIY or construction, converting road signs or maps for travel, working on sports or fitness distances, or teaching or learning unit conversion, this tool keeps everything in one place. All calculations run in your browser with no data sent to servers. Supports both directions: from metric to imperial and back, with clear, copyable results."
          features={[
            'Support for meters, feet, inches, miles, kilometers, yards, centimeters, millimeters',
            'Instant conversion as you type; no submit button required',
            'Bidirectional: convert from any unit to any other',
            'Clear, readable output with optional copy to clipboard',
            'Metric and imperial systems; useful worldwide',
            'Runs entirely in your browser; no account or uploads'
          ]}
          howToUse={[
            'Enter the length value you know in the input field',
            'Select the unit of the value you entered (e.g., meters, feet)',
            'Select the unit you want to convert to (e.g., inches, miles)',
            'View the converted result; copy it if needed for documents or calculations'
          ]}
          useCases={[
            'DIY and construction: convert between feet/inches and meters for materials or plans',
            'Travel: understand distances in km vs miles or meters vs feet abroad',
            'Sports and fitness: track running or walking distance in your preferred unit',
            'Education: teach or learn metric and imperial length conversion'
          ]}
          tips={[
            '1 meter ≈ 3.281 feet; 1 foot = 12 inches. For rough mental math, 1 m ≈ 3.3 ft.',
            'For precision in construction, use the tool rather than rounded approximations.',
            'Many countries use metric; the US often uses feet and miles—this tool bridges both.'
          ]}
          faq={[
            { question: 'How many feet are in a meter?', answer: '1 meter is approximately 3.281 feet. 1 foot equals 12 inches. The tool gives exact conversions for any value.' },
            { question: 'Can I convert inches to centimeters?', answer: 'Yes. Select inches as the source unit and centimeters (or meters) as the target. 1 inch = 2.54 cm.' },
            { question: 'Is the conversion accurate for engineering or construction?', answer: 'Conversions use standard conversion factors. For critical applications, double-check with your local standards or specifications.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="length-converter" />
    </Body>
    <Footer />
  </div>
);

export default LengthConverterPage;


