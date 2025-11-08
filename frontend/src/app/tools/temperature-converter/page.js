import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TemperatureConverterTool from '../../components/tools/TemperatureConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Temperature Converter — The Tool Guru',
  description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
  keywords: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin', 'the tool guru'],
  openGraph: {
    title: 'Temperature Converter — The Tool Guru',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
  },
}

const TemperatureConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TemperatureConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Temperature Converter"
            description="Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately. Our temperature converter supports all three major temperature scales with precise conversions. Perfect for weather, cooking, science, engineering, or any scenario requiring temperature conversions. The tool provides accurate conversions using standard formulas for each temperature scale."
            features={[
              "Convert between Celsius, Fahrenheit, and Kelvin",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations using standard formulas",
              "Support for all three major temperature scales",
              "Easy unit switching",
              "Clear temperature display",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the temperature value you want to convert",
              "Select the source scale (Celsius, Fahrenheit, or Kelvin)",
              "Select the target scale",
              "View the converted temperature automatically",
              "Switch units to convert in reverse",
              "Use for any temperature conversion needs",
              "Copy converted values if needed",
              "Convert between any supported scales"
            ]}
            useCases={[
              "Convert weather temperatures",
              "Calculate cooking temperatures",
              "Convert scientific temperature measurements",
              "Understand temperature in different scales",
              "Convert temperatures for international use",
              "Calculate temperature for engineering",
              "Convert temperatures for recipes",
              "Learn temperature scale relationships"
            ]}
            tips={[
              "0°C = 32°F = 273.15K (freezing point of water)",
              "100°C = 212°F = 373.15K (boiling point of water)",
              "Use Celsius for most international applications",
              "Use Fahrenheit primarily in the United States",
              "Use Kelvin for scientific calculations",
              "Remember that Kelvin has no negative values",
              "Verify conversions for critical applications"
            ]}
            faq={[
              {
                question: "What temperature scales are supported?",
                answer: "The tool supports Celsius (°C), Fahrenheit (°F), and Kelvin (K) - the three major temperature scales used worldwide."
              },
              {
                question: "How do I convert Celsius to Fahrenheit?",
                answer: "Use the formula: F = (C × 9/5) + 32. For example, 0°C = 32°F, 100°C = 212°F."
              },
              {
                question: "What is Kelvin used for?",
                answer: "Kelvin is the scientific temperature scale where 0K is absolute zero. It's used in physics, chemistry, and engineering. Kelvin = Celsius + 273.15."
              },
              {
                question: "Why are temperature conversions not linear?",
                answer: "Temperature scales have different zero points and intervals. Celsius and Fahrenheit have different freezing points (0°C vs 32°F), requiring conversion formulas rather than simple multiplication."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default TemperatureConverterPage;


