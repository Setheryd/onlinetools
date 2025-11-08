import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import LengthConverterTool from '../../components/tools/LengthConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Length Converter — The Tool Guru',
  description: 'Convert length units like meters, feet, inches, miles, and more.',
  keywords: ['length', 'converter', 'meters', 'feet', 'inches', 'miles', 'the tool guru'],
  openGraph: {
    title: 'Length Converter — The Tool Guru',
    description: 'Convert length units like meters, feet, inches, miles, and more.',
  },
}

const LengthConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <LengthConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Length Converter"
            description="Convert length units like meters, feet, inches, miles, kilometers, and more. Our length converter supports all common length measurements including metric (meters, kilometers, centimeters) and imperial (feet, inches, miles, yards) units. Perfect for construction, travel, engineering, or any scenario requiring length conversions. The tool provides accurate conversions with support for many length units."
            features={[
              "Convert between meters, feet, inches, miles, kilometers",
              "Support for metric and imperial length units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for many length units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the length value you want to convert",
              "Select the source unit (e.g., meters)",
              "Select the target unit (e.g., feet)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any length conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert measurements for construction projects",
              "Calculate distances in different units",
              "Convert height and width measurements",
              "Calculate travel distances",
              "Convert measurements for international use",
              "Calculate dimensions for design projects",
              "Convert measurements for recipes or instructions",
              "Understand measurements in different units"
            ]}
            tips={[
              "1 meter = 3.28084 feet = 39.3701 inches",
              "1 mile = 1.60934 kilometers = 5,280 feet",
              "Use metric units (meters) for international standards",
              "Use imperial units (feet, inches) for US measurements",
              "Verify conversions for important calculations",
              "Understand unit relationships for better comprehension",
              "Use for accurate length calculations"
            ]}
            faq={[
              {
                question: "What length units are supported?",
                answer: "The tool supports common length units including meters, feet, inches, yards, miles, kilometers, centimeters, millimeters, and nautical miles."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "What's the difference between metric and imperial units?",
                answer: "Metric units (meters, kilometers) are based on the decimal system and used internationally. Imperial units (feet, inches, miles) are used primarily in the United States."
              },
              {
                question: "Can I convert between metric and imperial units?",
                answer: "Yes, the tool supports conversion between all units, including conversions between metric (meters, kilometers) and imperial (feet, miles) systems."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default LengthConverterPage;


