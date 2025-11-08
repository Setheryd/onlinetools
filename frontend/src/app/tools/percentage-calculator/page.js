import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PercentageCalculatorTool from '../../components/tools/PercentageCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Percentage Calculator — The Tool Guru',
  description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
  keywords: ['percentage', 'calculator', 'percent change', 'percent of', 'the tool guru'],
  openGraph: {
    title: 'Percentage Calculator — The Tool Guru',
    description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
  },
}

const PercentageCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PercentageCalculatorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Percentage Calculator"
            description="Compute X% of Y, find what percent X is of Y, and calculate percentage change. Our percentage calculator handles all common percentage calculations including finding percentages, calculating percentage of values, and determining percentage changes. Perfect for discounts, markups, growth rates, or any scenario requiring percentage calculations. The tool provides accurate calculations with clear results."
            features={[
              "Calculate X% of Y",
              "Find what percent X is of Y",
              "Calculate percentage change",
              "Multiple calculation modes",
              "Real-time calculation",
              "Clear result display",
              "Support for various percentage scenarios",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Select calculation type (percent of, what percent, change)",
              "Enter the values for your calculation",
              "View the calculated result",
              "Use for discounts and markups",
              "Calculate growth rates",
              "Find percentage relationships",
              "Use for any percentage calculation",
              "Copy results if needed"
            ]}
            useCases={[
              "Calculate discounts and sale prices",
              "Compute markups and profit margins",
              "Calculate percentage growth or decline",
              "Find percentage relationships",
              "Calculate tax and tip percentages",
              "Compute percentage increases or decreases",
              "Calculate percentage of totals",
              "Find percentage values"
            ]}
            tips={[
              "Use 'X% of Y' to find a percentage of a value",
              "Use 'What percent' to find the percentage relationship",
              "Use 'Percentage change' to calculate growth or decline",
              "Verify calculations for important financial decisions",
              "Understand percentage formulas for better comprehension",
              "Use for accurate percentage calculations",
              "Check results for reasonableness"
            ]}
            faq={[
              {
                question: "How do I calculate a percentage of a number?",
                answer: "Enter the percentage value and the number, then select 'X% of Y'. The tool will calculate the percentage of the number."
              },
              {
                question: "How do I find what percent one number is of another?",
                answer: "Enter both numbers and select 'What percent X is of Y'. The tool will calculate the percentage relationship."
              },
              {
                question: "How do I calculate percentage change?",
                answer: "Enter the original value and the new value, then select 'Percentage change'. The tool will calculate the percentage increase or decrease."
              },
              {
                question: "Can I calculate discounts?",
                answer: "Yes, use 'X% of Y' to calculate discount amounts, or use percentage change to find the discount percentage."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PercentageCalculatorPage;


