import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TipCalculatorTool from '../../components/tools/TipCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Tip Calculator — The Tool Guru',
  description: 'Compute tip amounts, split bills easily, and apply rounding options.',
  keywords: ['tip calculator', 'bill split', 'gratuity', 'restaurant'],
  openGraph: {
    title: 'Tip Calculator — The Tool Guru',
    description: 'Tip and bill-splitting calculator with rounding.',
  },
};

const TipCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TipCalculatorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Tip Calculator"
            description="Compute tip amounts, split bills easily, and apply rounding options. Our tip calculator helps you calculate gratuity amounts, split bills among multiple people, and apply rounding for convenience. Perfect for restaurants, services, or any scenario requiring tip calculations. The tool provides accurate calculations with support for custom tip percentages and bill splitting."
            features={[
              "Calculate tip amounts",
              "Split bills among multiple people",
              "Custom tip percentage",
              "Rounding options",
              "Real-time calculation",
              "Clear breakdown display",
              "Support for various tip scenarios",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the bill amount",
              "Select or enter tip percentage",
              "Enter number of people to split",
              "Choose rounding options if desired",
              "View calculated tip and total",
              "See per-person amounts if splitting",
              "Use for restaurant bills or services",
              "Calculate tips for any scenario"
            ]}
            useCases={[
              "Calculate restaurant tips",
              "Split bills among friends",
              "Calculate service gratuity",
              "Determine tip amounts",
              "Split costs evenly",
              "Calculate tips with rounding",
              "Determine per-person costs",
              "Calculate tips for various services"
            ]}
            tips={[
              "Standard tip percentages: 15% (basic), 18% (good), 20% (excellent)",
              "Use bill splitting for group meals",
              "Apply rounding for convenience",
              "Verify calculations for accuracy",
              "Consider service quality when choosing tip percentage",
              "Use for fair bill splitting",
              "Calculate tips before paying"
            ]}
            faq={[
              {
                question: "What is a standard tip percentage?",
                answer: "Standard tip percentages vary by region and service quality. Common rates are 15% for basic service, 18% for good service, and 20% for excellent service."
              },
              {
                question: "Can I split the bill among multiple people?",
                answer: "Yes, enter the number of people and the tool will calculate the per-person amount including tip."
              },
              {
                question: "What are rounding options?",
                answer: "Rounding options allow you to round the tip or total to the nearest dollar or other amount for convenience."
              },
              {
                question: "How accurate are the calculations?",
                answer: "Calculations are highly accurate, using standard percentage calculations. The tool provides precise tip and bill splitting calculations."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default TipCalculatorPage;


