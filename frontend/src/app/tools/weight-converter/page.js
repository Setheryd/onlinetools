import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WeightConverterTool from '../../components/tools/WeightConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Weight Converter — The Tool Guru',
  description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
  keywords: ['weight', 'converter', 'kg', 'lb', 'oz', 'grams', 'the tool guru'],
  openGraph: {
    title: 'Weight Converter — The Tool Guru',
    description: 'Convert between kilograms, grams, pounds, ounces, and tons.',
  },
}

const WeightConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <WeightConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Weight Converter"
            description="Convert between kilograms, grams, pounds, ounces, tons, and more weight units. Our weight converter supports all common weight measurements including metric (kilograms, grams, metric tons) and imperial (pounds, ounces, US tons) units. Perfect for cooking, shipping, health tracking, or any scenario requiring weight conversions. The tool provides accurate conversions with support for many weight units."
            features={[
              "Convert between kilograms, grams, pounds, ounces, tons",
              "Support for metric and imperial weight units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for many weight units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the weight value you want to convert",
              "Select the source unit (e.g., kilograms)",
              "Select the target unit (e.g., pounds)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any weight conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert weights for cooking and recipes",
              "Calculate shipping weights",
              "Convert body weight measurements",
              "Calculate package weights",
              "Convert weights for international use",
              "Calculate ingredient weights",
              "Convert weights for health tracking",
              "Understand weights in different units"
            ]}
            tips={[
              "1 kilogram = 2.20462 pounds = 35.274 ounces",
              "1 pound = 0.453592 kilograms = 16 ounces",
              "Use metric units (kilograms) for international standards",
              "Use imperial units (pounds, ounces) for US measurements",
              "Verify conversions for important calculations",
              "Understand unit relationships for better comprehension",
              "Use for accurate weight calculations"
            ]}
            faq={[
              {
                question: "What weight units are supported?",
                answer: "The tool supports common weight units including kilograms, grams, pounds, ounces, tons (metric and US), stones, and milligrams."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "What's the difference between metric and US tons?",
                answer: "A metric ton is 1,000 kilograms (2,204.62 pounds). A US ton (short ton) is 2,000 pounds (907.185 kilograms). They are different units."
              },
              {
                question: "Can I convert between metric and imperial units?",
                answer: "Yes, the tool supports conversion between all units, including conversions between metric (kilograms, grams) and imperial (pounds, ounces) systems."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default WeightConverterPage;


