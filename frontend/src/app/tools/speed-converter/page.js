import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SpeedConverterTool from '../../components/tools/SpeedConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Speed Converter — The Tool Guru',
  description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
  keywords: ['speed', 'converter', 'mph', 'kmh', 'knots', 'mps', 'the tool guru'],
  openGraph: {
    title: 'Speed Converter — The Tool Guru',
    description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
  },
}

const SpeedConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <SpeedConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Speed Converter"
            description="Convert between meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), knots, and feet per second (ft/s). Our speed converter supports all common speed measurements used in transportation, sports, science, and engineering. Perfect for converting vehicle speeds, wind speeds, or any scenario requiring speed conversions. The tool provides accurate conversions with support for many speed units."
            features={[
              "Convert between m/s, km/h, mph, knots, and ft/s",
              "Support for metric and imperial speed units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for many speed units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the speed value you want to convert",
              "Select the source unit (e.g., km/h)",
              "Select the target unit (e.g., mph)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any speed conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert vehicle speeds between units",
              "Calculate wind speeds in different units",
              "Convert speeds for sports and athletics",
              "Calculate speeds for engineering",
              "Convert speeds for international use",
              "Understand speeds in different units",
              "Convert speeds for scientific calculations",
              "Calculate travel speeds"
            ]}
            tips={[
              "1 km/h = 0.621371 mph = 0.277778 m/s",
              "1 mph = 1.60934 km/h = 0.44704 m/s",
              "1 knot = 1.15078 mph = 1.852 km/h",
              "Use metric units (km/h, m/s) for international standards",
              "Use imperial units (mph) for US measurements",
              "Verify conversions for important calculations",
              "Use for accurate speed calculations"
            ]}
            faq={[
              {
                question: "What speed units are supported?",
                answer: "The tool supports common speed units including meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), knots, and feet per second (ft/s)."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "What is a knot?",
                answer: "A knot is a unit of speed equal to one nautical mile per hour, commonly used in aviation and maritime navigation. 1 knot = 1.15078 mph = 1.852 km/h."
              },
              {
                question: "Can I convert between metric and imperial units?",
                answer: "Yes, the tool supports conversion between all units, including conversions between metric (km/h, m/s) and imperial (mph, ft/s) systems."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default SpeedConverterPage;


