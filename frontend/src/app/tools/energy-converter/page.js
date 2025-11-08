import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import EnergyConverterTool from '../../components/tools/EnergyConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Energy Converter — The Tool Guru',
  description: 'Convert between joules, watt-hours, calories, BTU, and more.',
  keywords: ['energy', 'converter', 'joules', 'watt hours', 'kwh', 'calories', 'btu'],
  openGraph: {
    title: 'Energy Converter — The Tool Guru',
    description: 'Convert between joules, watt-hours, calories, BTU, and more.',
  },
}

const EnergyConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <EnergyConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Energy Converter"
            description="Convert between joules, watt-hours, kilowatt-hours, calories, BTU, and more energy units. Our energy converter supports all common energy measurements used in physics, chemistry, nutrition, and engineering. Perfect for converting electrical energy, food energy, or any scenario requiring energy conversions. The tool provides accurate conversions with support for many energy units."
            features={[
              "Convert between joules, watt-hours, calories, BTU, and more",
              "Support for scientific and practical energy units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for many energy units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the energy value you want to convert",
              "Select the source unit (e.g., kilowatt-hours)",
              "Select the target unit (e.g., BTU)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any energy conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert electrical energy between units",
              "Calculate food energy in different units",
              "Convert energy for physics and chemistry",
              "Calculate energy for engineering",
              "Convert energy for international use",
              "Understand energy in different units",
              "Convert energy for utilities",
              "Calculate energy consumption"
            ]}
            tips={[
              "1 kilowatt-hour = 3,600,000 joules = 3,412 BTU",
              "1 calorie = 4.184 joules",
              "1 BTU = 1,055.06 joules = 0.000293071 kilowatt-hours",
              "Use joules for scientific calculations",
              "Use kilowatt-hours for electrical energy",
              "Use calories for food energy",
              "Verify conversions for important calculations"
            ]}
            faq={[
              {
                question: "What energy units are supported?",
                answer: "The tool supports common energy units including joules, watt-hours, kilowatt-hours, calories, BTU (British Thermal Units), and electronvolts."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "What's the difference between a calorie and a Calorie?",
                answer: "A calorie (cal) is 4.184 joules. A Calorie (capital C, also called kilocalorie) is 1,000 calories = 4,184 joules. Food labels typically use Calories (kilocalories)."
              },
              {
                question: "What is a BTU?",
                answer: "BTU (British Thermal Unit) is a unit of energy equal to about 1,055 joules. It's commonly used in heating and cooling applications, especially in the United States."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default EnergyConverterPage;


