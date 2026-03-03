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
          description="Compute X% of Y, find what percent X is of Y, and percentage change. For discounts, tips, and stats. All in your browser."
          features={["X% of Y", "X is what % of Y", "Percent change", "Instant result", "Works in browser"]}
          howToUse={["Choose calculation type", "Enter values", "View result"]}
          useCases={["Discounts", "Tips", "Grades", "Growth rates"]}
          faq={[
            { question: "How do I find percent change?", answer: "Percent change = (new − old) / old × 100. This tool can compute it for you." },
            { question: "What is X% of Y?", answer: "Multiply Y by X/100. Example: 20% of 80 = 80 × 0.20 = 16." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="percentage-calculator" />
    </Body>
    <Footer />
  </div>
);

export default PercentageCalculatorPage;


