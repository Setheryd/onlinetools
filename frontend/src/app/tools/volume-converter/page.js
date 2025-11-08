import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import VolumeConverterTool from '../../components/tools/VolumeConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Volume Converter — The Tool Guru',
  description: 'Convert between liters, gallons, cubic units, and more.',
  keywords: ['volume', 'converter', 'liters', 'gallons', 'cups', 'cubic', 'the tool guru'],
  openGraph: {
    title: 'Volume Converter — The Tool Guru',
    description: 'Convert between liters, gallons, cubic units, and more.',
  },
}

const VolumeConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <VolumeConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Volume Converter"
            description="Convert between liters, gallons, cubic units, cups, milliliters, and more volume units. Our volume converter supports all common volume measurements including metric (liters, milliliters) and imperial (gallons, cups, fluid ounces) units. Perfect for cooking, chemistry, engineering, or any scenario requiring volume conversions. The tool provides accurate conversions with support for many volume units."
            features={[
              "Convert between liters, gallons, cups, milliliters, fluid ounces",
              "Support for metric and imperial volume units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for many volume units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the volume value you want to convert",
              "Select the source unit (e.g., liters)",
              "Select the target unit (e.g., gallons)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any volume conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert measurements for cooking and recipes",
              "Calculate liquid volumes in different units",
              "Convert volumes for chemistry and science",
              "Calculate container capacities",
              "Convert volumes for international use",
              "Calculate ingredient volumes",
              "Convert volumes for engineering",
              "Understand volumes in different units"
            ]}
            tips={[
              "1 liter = 0.264172 gallons = 4.22675 cups",
              "1 gallon = 3.78541 liters = 16 cups",
              "Use metric units (liters) for international standards",
              "Use imperial units (gallons, cups) for US measurements",
              "Verify conversions for important calculations",
              "Understand unit relationships for better comprehension",
              "Use for accurate volume calculations"
            ]}
            faq={[
              {
                question: "What volume units are supported?",
                answer: "The tool supports common volume units including liters, milliliters, gallons, cups, fluid ounces, pints, quarts, cubic meters, and cubic feet."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "What's the difference between US and UK gallons?",
                answer: "A US gallon is 3.78541 liters, while a UK (imperial) gallon is 4.54609 liters. The tool typically uses US gallons unless specified."
              },
              {
                question: "Can I convert between metric and imperial units?",
                answer: "Yes, the tool supports conversion between all units, including conversions between metric (liters, milliliters) and imperial (gallons, cups) systems."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default VolumeConverterPage;


