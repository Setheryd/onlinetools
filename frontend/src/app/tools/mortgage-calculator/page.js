import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MortgageCalculatorTool from '../../components/tools/MortgageCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Mortgage Calculator — The Tool Guru',
  description: 'Calculate monthly mortgage payments and view an amortization schedule with optional extra payments.',
  keywords: ['mortgage calculator', 'loan', 'amortization', 'payment', 'interest'],
  openGraph: {
    title: 'Mortgage Calculator — The Tool Guru',
    description: 'Mortgage payment and amortization schedule.',
  },
};

const MortgageCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <MortgageCalculatorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Mortgage Calculator"
            description="Calculate monthly mortgage payments and view an amortization schedule with optional extra payments. Our mortgage calculator helps you understand loan payments, interest costs, and how extra payments affect your loan term. Perfect for homebuyers, real estate investors, or anyone planning to take out a mortgage. The tool provides detailed amortization schedules showing principal and interest breakdowns over the life of the loan."
            features={[
              "Calculate monthly mortgage payments",
              "View complete amortization schedule",
              "Support for extra payments",
              "Interest and principal breakdown",
              "Loan term calculations",
              "Total interest calculations",
              "Payment schedule visualization",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter loan amount (principal)",
              "Enter annual interest rate",
              "Enter loan term in years",
              "Add optional extra payments if desired",
              "View monthly payment amount",
              "Review amortization schedule",
              "See total interest paid",
              "Understand payment breakdown"
            ]}
            useCases={[
              "Calculate mortgage payments before buying",
              "Compare different loan options",
              "Understand interest costs over time",
              "Plan extra payments to reduce loan term",
              "Calculate total cost of homeownership",
              "Estimate monthly housing costs",
              "Plan mortgage refinancing",
              "Understand loan amortization"
            ]}
            tips={[
              "Enter accurate interest rates for precise calculations",
              "Consider extra payments to reduce total interest",
              "Review amortization schedule to understand payment breakdown",
              "Compare different loan terms and rates",
              "Factor in property taxes and insurance separately",
              "Use for planning and budgeting",
              "Verify calculations with lenders"
            ]}
            faq={[
              {
                question: "How is the monthly payment calculated?",
                answer: "Monthly payments are calculated using the standard mortgage formula, accounting for principal, interest rate, and loan term. The formula ensures payments cover both principal and interest."
              },
              {
                question: "What is an amortization schedule?",
                answer: "An amortization schedule shows how each payment is split between principal and interest over the life of the loan. Early payments are mostly interest, later payments are mostly principal."
              },
              {
                question: "How do extra payments affect the loan?",
                answer: "Extra payments reduce the principal balance faster, which reduces total interest paid and can shorten the loan term. The calculator shows the impact of extra payments."
              },
              {
                question: "Does this include property taxes and insurance?",
                answer: "The calculator focuses on principal and interest. Property taxes, insurance, and PMI are typically separate and should be added to get total monthly housing costs."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default MortgageCalculatorPage;


