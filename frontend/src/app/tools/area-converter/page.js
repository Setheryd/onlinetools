import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import AreaConverterTool from '../../components/tools/AreaConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Area Converter — The Tool Guru',
  description: 'Convert between square meters, feet, acres, hectares, and more.',
  keywords: ['area', 'converter', 'square feet', 'square meters', 'acre', 'hectare', 'the tool guru'],
  openGraph: {
    title: 'Area Converter — The Tool Guru',
    description: 'Convert between square meters, feet, acres, hectares, and more.',
  },
}

const AreaConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <AreaConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Area Converter"
            description="Convert between square meters, square feet, acres, hectares, and more area units. Our area converter supports all common area measurements including metric (square meters, hectares) and imperial (square feet, acres) units. Perfect for real estate, construction, agriculture, land measurement, or any scenario requiring area conversions. The tool provides accurate conversions with support for many area units."
            features={[
              "Convert between square meters, square feet, acres, hectares",
              "Support for metric and imperial area units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for many area units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the area value you want to convert",
              "Select the source unit (e.g., square meters)",
              "Select the target unit (e.g., square feet)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any area conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert land area measurements",
              "Calculate property sizes in different units",
              "Convert construction area measurements",
              "Calculate agricultural land areas",
              "Convert real estate listings",
              "Calculate room and building areas",
              "Convert area for planning and design",
              "Understand area measurements in different units"
            ]}
            tips={[
              "1 acre = 43,560 square feet = 4,047 square meters",
              "1 hectare = 10,000 square meters = 2.47 acres",
              "Use metric units (square meters) for international standards",
              "Use imperial units (square feet, acres) for US measurements",
              "Verify conversions for important calculations",
              "Understand unit relationships for better comprehension",
              "Use for accurate area calculations"
            ]}
            faq={[
              {
                question: "What area units are supported?",
                answer: "The tool supports common area units including square meters, square feet, square inches, square yards, acres, hectares, square kilometers, and square miles."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "What's the difference between an acre and a hectare?",
                answer: "An acre is an imperial unit equal to 43,560 square feet or about 4,047 square meters. A hectare is a metric unit equal to 10,000 square meters or about 2.47 acres."
              },
              {
                question: "Can I convert between metric and imperial units?",
                answer: "Yes, the tool supports conversion between all units, including conversions between metric (square meters, hectares) and imperial (square feet, acres) systems."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default AreaConverterPage;


