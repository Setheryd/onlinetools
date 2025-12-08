import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PowerConverterTool from '../../components/tools/PowerConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Power Converter — The Tool Guru',
  description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
  keywords: ['power', 'converter', 'watt', 'kilowatt', 'horsepower', 'dbm'],
  openGraph: {
    title: 'Power Converter — The Tool Guru',
    description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
  },
}

const PowerConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PowerConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Power Converter"
            description="Convert between Watts, kilowatts, horsepower, and dBm. Our power converter supports all common power measurements used in electrical engineering, automotive, and telecommunications. Perfect for converting electrical power, engine power, or any scenario requiring power conversions. The tool provides accurate conversions with support for many power units."
            features={[
              "Convert between Watts, kilowatts, horsepower, and dBm",
              "Support for electrical and mechanical power units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for many power units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the power value you want to convert",
              "Select the source unit (e.g., horsepower)",
              "Select the target unit (e.g., kilowatts)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any power conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert engine power between units",
              "Calculate electrical power in different units",
              "Convert power for engineering",
              "Calculate power for equipment",
              "Convert power for international use",
              "Understand power in different units",
              "Convert power for telecommunications",
              "Calculate power ratings"
            ]}
            tips={[
              "1 horsepower = 745.7 Watts = 0.7457 kilowatts",
              "1 kilowatt = 1,000 Watts = 1.34102 horsepower",
              "dBm is a logarithmic unit used in telecommunications",
              "Use metric units (Watts, kilowatts) for international standards",
              "Use horsepower for automotive applications",
              "Verify conversions for important calculations",
              "Use for accurate power calculations"
            ]}
            faq={[
              {
                question: "What power units are supported?",
                answer: "The tool supports common power units including Watts, kilowatts, horsepower (mechanical and metric), and dBm (decibels relative to milliwatt)."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "What is the difference between mechanical and metric horsepower?",
                answer: "Mechanical horsepower (hp) is 745.7 Watts, while metric horsepower (PS) is 735.5 Watts. The tool typically uses mechanical horsepower unless specified."
              },
              {
                question: "What is dBm?",
                answer: "dBm is a logarithmic unit expressing power relative to 1 milliwatt. It's commonly used in telecommunications and radio frequency engineering."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PowerConverterPage;


