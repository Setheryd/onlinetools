import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PressureConverterTool from '../../components/tools/PressureConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Pressure Converter — The Tool Guru',
  description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
  keywords: ['pressure', 'converter', 'psi', 'bar', 'kpa', 'atm', 'the tool guru'],
  openGraph: {
    title: 'Pressure Converter — The Tool Guru',
    description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
  },
}

const PressureConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PressureConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Pressure Converter"
            description="Convert between Pascals (Pa), kilopascals (kPa), megapascals (MPa), bar, atmospheres (atm), and pounds per square inch (psi). Our pressure converter supports all common pressure measurements used in engineering, science, and industry. Perfect for converting tire pressures, atmospheric pressures, or any scenario requiring pressure conversions. The tool provides accurate conversions with support for many pressure units."
            features={[
              "Convert between Pa, kPa, MPa, bar, atm, and psi",
              "Support for metric and imperial pressure units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for many pressure units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the pressure value you want to convert",
              "Select the source unit (e.g., psi)",
              "Select the target unit (e.g., bar)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any pressure conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert tire pressures between units",
              "Calculate atmospheric pressures",
              "Convert pressures for engineering",
              "Calculate pressures for science",
              "Convert pressures for industrial use",
              "Understand pressures in different units",
              "Convert pressures for international use",
              "Calculate pressures for equipment"
            ]}
            tips={[
              "1 bar = 100,000 Pa = 14.5038 psi",
              "1 atm = 101,325 Pa = 14.6959 psi",
              "1 psi = 6,894.76 Pa = 0.0689476 bar",
              "Use metric units (Pa, bar) for international standards",
              "Use imperial units (psi) for US measurements",
              "Verify conversions for important calculations",
              "Use for accurate pressure calculations"
            ]}
            faq={[
              {
                question: "What pressure units are supported?",
                answer: "The tool supports common pressure units including Pascals (Pa), kilopascals (kPa), megapascals (MPa), bar, atmospheres (atm), and pounds per square inch (psi)."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "What is standard atmospheric pressure?",
                answer: "Standard atmospheric pressure is 1 atm = 101,325 Pa = 14.6959 psi = 1.01325 bar. This is the average pressure at sea level."
              },
              {
                question: "Can I convert between metric and imperial units?",
                answer: "Yes, the tool supports conversion between all units, including conversions between metric (Pa, bar) and imperial (psi) systems."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PressureConverterPage;


