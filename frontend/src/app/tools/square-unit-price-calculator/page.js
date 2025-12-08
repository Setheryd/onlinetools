import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SquareUnitPriceCalculatorTool from '../../components/tools/SquareUnitPriceCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Square Unit Price Calculator — The Tool Guru',
  description: 'Calculate total price based on area or volume measurements and price per unit. Supports various units for area and volume calculations.',
  keywords: ['square unit', 'price calculator', 'area price', 'volume price', 'cost calculation', 'per square foot', 'per square meter', 'the tool guru'],
  openGraph: {
    title: 'Square Unit Price Calculator — The Tool Guru',
    description: 'Calculate total price based on area or volume measurements and price per unit. Supports various units for area and volume calculations.',
  },
}

const SquareUnitPriceCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <SquareUnitPriceCalculatorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Square Unit Price Calculator"
            description="Calculate total price based on area or volume measurements and price per unit. Our square unit price calculator supports various units for area (square feet, square meters) and volume (cubic feet, cubic meters) calculations. Perfect for construction projects, real estate, material purchasing, or any scenario requiring price calculations based on area or volume. The tool provides accurate calculations with support for many measurement units."
            features={[
              "Calculate prices based on area measurements",
              "Calculate prices based on volume measurements",
              "Support for square feet, square meters, and more",
              "Support for cubic feet, cubic meters, and more",
              "Real-time calculation",
              "Clear price breakdown",
              "Support for various measurement units",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Select measurement type (area or volume)",
              "Enter the measurement value",
              "Select the measurement unit",
              "Enter the price per unit",
              "View the calculated total price",
              "Use for construction or real estate",
              "Calculate material costs",
              "Use for any area/volume price calculation"
            ]}
            useCases={[
              "Calculate construction material costs",
              "Determine real estate prices per square foot",
              "Calculate flooring or carpet costs",
              "Determine paint or coating costs",
              "Calculate material costs for projects",
              "Estimate project costs based on area",
              "Calculate costs for volume-based materials",
              "Determine pricing for area or volume-based services"
            ]}
            tips={[
              "Use appropriate units for your region (metric or imperial)",
              "Verify price per unit for accuracy",
              "Consider waste or extra material",
              "Double-check measurements for important calculations",
              "Use for estimating project costs",
              "Compare prices across different units",
              "Use for accurate cost calculations"
            ]}
            faq={[
              {
                question: "What measurement units are supported?",
                answer: "The tool supports common area units (square feet, square meters) and volume units (cubic feet, cubic meters) for calculating prices."
              },
              {
                question: "Can I calculate prices for both area and volume?",
                answer: "Yes, you can select whether you're calculating based on area or volume measurements, then enter the appropriate values."
              },
              {
                question: "How accurate are the calculations?",
                answer: "Calculations are highly accurate, using standard multiplication of measurement by price per unit. The tool provides precise price calculations."
              },
              {
                question: "Can I use this for construction estimates?",
                answer: "Yes, the tool is perfect for calculating material costs based on area or volume for construction projects, flooring, painting, and more."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default SquareUnitPriceCalculatorPage;
