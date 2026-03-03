import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PercentageCalculatorTool from '../../components/tools/PercentageCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Percentage Calculator — The Tool Guru',
  description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
  keywords: ['percentage', 'calculator', 'percent change', 'percent of', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/percentage-calculator',
  },
  openGraph: {
    title: 'Percentage Calculator — The Tool Guru',
    description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
    url: 'https://thetool.guru/tools/percentage-calculator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Percentage Calculator — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator — The Tool Guru',
    description: 'Compute X% of Y, find what percent X is of Y, and percentage change.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const PercentageCalculatorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <PercentageCalculatorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Percentage Calculator"
          description="Calculate percentages in the most common ways: find X% of a number Y, find what percent X is of Y, or compute percentage change between two values. Used daily for discounts, tips, grades, tax, and growth rates. Enter your numbers and get an instant, accurate result with no signup or server uploads. All calculations run in your browser, so your figures stay private. Ideal for students, shoppers, analysts, and anyone who needs quick percentage answers without opening a spreadsheet."
          features={[
            'Calculate X% of Y (e.g., 20% of 80 = 16)',
            'Find what percent X is of Y (e.g., 16 is 20% of 80)',
            'Compute percentage change between two values (e.g., old vs new)',
            'Instant results as you enter values',
            'Clear labels and optional copy of the result',
            'Runs in your browser; no data sent to servers'
          ]}
          howToUse={[
            'Choose the type of calculation: "X% of Y", "X is what % of Y", or "Percent change"',
            'Enter the known values in the input fields',
            'View the result; the tool updates as you type',
            'Use the result for your discount, tip, grade, or report'
          ]}
          useCases={[
            'Discounts: find the sale price (e.g., 25% off) or the amount saved',
            'Tips: compute 15% or 20% of a bill',
            'Grades: see what percent a score is of the total, or find a weighted percentage',
            'Growth rates: calculate percent increase or decrease between two numbers'
          ]}
          tips={[
            'Percent change = (new − old) / old × 100. Positive means increase, negative means decrease.',
            'For "X% of Y", think: multiply Y by X/100. Example: 20% of 80 = 80 × 0.20 = 16.',
            'To find "X is what % of Y", divide X by Y and multiply by 100.'
          ]}
          faq={[
            { question: 'How do I find percent change?', answer: 'Percent change = (new − old) / old × 100. Enter the old and new values in this tool and it will compute the percentage change for you.' },
            { question: 'What is X% of Y?', answer: 'Multiply Y by X/100. Example: 20% of 80 = 80 × 0.20 = 16. Use the "X% of Y" mode and enter X and Y.' },
            { question: 'Can I use this for tips or tax?', answer: 'Yes. For a tip, use "X% of Y" with X = tip percent (e.g., 15 or 20) and Y = bill amount. Same idea for tax.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="percentage-calculator" />
    </Body>
    <Footer />
  </div>
);

export default PercentageCalculatorPage;


