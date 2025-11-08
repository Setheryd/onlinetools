import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UnitConverterTool from '../../components/tools/UnitConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Unit Converter — The Tool Guru',
  description: 'Convert units across categories like length, weight, temperature, volume, and more.',
  keywords: ['unit converter', 'length', 'weight', 'temperature', 'volume', 'conversion', 'the tool guru'],
  openGraph: {
    title: 'Unit Converter — The Tool Guru',
    description: 'Convert units across categories like length, weight, temperature, volume, and more.',
  },
}

const UnitConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <UnitConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Unit Converter"
            description="Convert units across multiple categories including length, weight, temperature, volume, area, speed, and more. Our comprehensive unit converter supports all common measurement units in metric and imperial systems. Perfect for converting measurements in any category, understanding unit relationships, or any scenario requiring unit conversions. The tool provides accurate conversions with support for many unit categories and types."
            features={[
              "Convert units across multiple categories",
              "Support for length, weight, temperature, volume, area, speed, and more",
              "Metric and imperial unit support",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Easy category and unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Select the unit category (length, weight, etc.)",
              "Enter the value you want to convert",
              "Select the source unit",
              "Select the target unit",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any unit conversion needs",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert measurements in any category",
              "Calculate units for international use",
              "Convert units for cooking and recipes",
              "Calculate units for construction",
              "Convert units for science and engineering",
              "Understand units in different systems",
              "Convert units for travel",
              "Calculate units for any purpose"
            ]}
            tips={[
              "Select the appropriate category for your conversion",
              "Use metric units for international standards",
              "Use imperial units for US measurements",
              "Verify conversions for important calculations",
              "Understand unit relationships for better comprehension",
              "Use for accurate unit calculations",
              "Switch categories as needed for different conversions"
            ]}
            faq={[
              {
                question: "What unit categories are supported?",
                answer: "The tool supports multiple categories including length, weight, temperature, volume, area, speed, pressure, power, energy, and file size."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "Can I convert between metric and imperial units?",
                answer: "Yes, the tool supports conversion between all units, including conversions between metric and imperial systems across all categories."
              },
              {
                question: "Are all unit categories available?",
                answer: "The tool provides comprehensive unit conversion across multiple categories. Select the category you need from the available options."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default UnitConverterPage;


