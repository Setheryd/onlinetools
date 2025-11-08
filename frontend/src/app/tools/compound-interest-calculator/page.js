import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CompoundInterestCalculatorTool from '../../components/tools/CompoundInterestCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Compound Interest Calculator — The Tool Guru',
  description: 'Compute future value with compounding and periodic contributions.',
  keywords: ['compound interest', 'future value', 'investment', 'finance'],
  openGraph: {
    title: 'Compound Interest Calculator — The Tool Guru',
    description: 'Calculate compound interest and contributions.',
  },
};

const CompoundInterestCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <CompoundInterestCalculatorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Compound Interest Calculator"
            description="Compute future value with compounding and periodic contributions. Our compound interest calculator helps you understand how investments grow over time with compound interest and regular contributions. Perfect for retirement planning, investment analysis, savings goals, or understanding the power of compound interest. The tool calculates future values accounting for initial principal, interest rate, compounding frequency, and periodic contributions."
            features={[
              "Calculate future value with compound interest",
              "Support for periodic contributions",
              "Multiple compounding frequencies",
              "Interest rate calculations",
              "Time period calculations",
              "Growth visualization",
              "Total contribution tracking",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter initial principal amount",
              "Enter annual interest rate",
              "Enter time period (years)",
              "Select compounding frequency",
              "Add periodic contributions if applicable",
              "View calculated future value",
              "See total contributions and interest earned",
              "Understand growth over time"
            ]}
            useCases={[
              "Plan retirement savings",
              "Calculate investment growth",
              "Set savings goals",
              "Understand compound interest power",
              "Compare investment options",
              "Plan for financial goals",
              "Calculate long-term savings",
              "Understand investment returns"
            ]}
            tips={[
              "Higher compounding frequency increases growth",
              "Regular contributions significantly boost final value",
              "Start early to maximize compound interest benefits",
              "Compare different interest rates and terms",
              "Use for long-term financial planning",
              "Understand the impact of time on growth",
              "Factor in inflation for realistic planning"
            ]}
            faq={[
              {
                question: "What is compound interest?",
                answer: "Compound interest is interest calculated on the initial principal plus accumulated interest from previous periods. It allows investments to grow exponentially over time."
              },
              {
                question: "How does compounding frequency affect growth?",
                answer: "More frequent compounding (daily vs annually) results in higher returns because interest is calculated and added more often, allowing it to compound more quickly."
              },
              {
                question: "What's the difference between simple and compound interest?",
                answer: "Simple interest is calculated only on the principal. Compound interest is calculated on principal plus accumulated interest, resulting in exponential growth."
              },
              {
                question: "How do periodic contributions affect the final value?",
                answer: "Regular contributions significantly increase the final value because each contribution also earns compound interest over the remaining time period."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default CompoundInterestCalculatorPage;


