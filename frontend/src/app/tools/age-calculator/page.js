import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import AgeCalculatorTool from '../../components/tools/AgeCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Age Calculator — The Tool Guru',
  description: 'Calculate exact age and time to the next birthday.',
  keywords: ['age calculator', 'date', 'birthday'],
  openGraph: {
    title: 'Age Calculator — The Tool Guru',
    description: 'Exact age and next birthday timing.',
  },
};

const AgeCalculatorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <AgeCalculatorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Age Calculator"
          description="Calculate exact age and time to the next birthday with precision. Our age calculator provides detailed breakdowns including years, months, days, hours, minutes, and seconds. Perfect for determining exact age for legal purposes, calculating time until birthdays, tracking milestones, or simply satisfying curiosity about precise age calculations. The tool handles leap years, different month lengths, and time zones accurately."
          features={[
            "Calculate exact age in years, months, days, hours, minutes, and seconds",
            "Time until next birthday calculation",
            "Support for any date range",
            "Accurate leap year handling",
            "Real-time age updates",
            "Multiple date format support",
            "Age breakdown by different time units",
            "Works entirely in your browser for privacy"
          ]}
          howToUse={[
            "Enter your birth date using the date picker",
            "Optionally enter a reference date (defaults to today)",
            "Click 'Calculate Age' to get results",
            "View detailed age breakdown",
            "Check time until next birthday",
            "See age in different time units",
            "Use for any date calculation needs"
          ]}
          useCases={[
            "Calculate exact age for legal or official purposes",
            "Determine time until next birthday",
            "Calculate age differences between people",
            "Track milestones and anniversaries",
            "Calculate age for eligibility requirements",
            "Determine time since specific events",
            "Calculate age for insurance or medical purposes",
            "Track age for educational or career milestones"
          ]}
          tips={[
            "Use accurate birth dates for precise calculations",
            "Check time until next birthday for planning",
            "Use reference dates to calculate age at specific times",
            "Review age breakdown for detailed information",
            "Account for time zones if needed for precise calculations",
            "Use for tracking milestones and anniversaries",
            "Calculate age differences for comparisons"
          ]}
          faq={[
            {
              question: "How accurate is the age calculation?",
              answer: "The age calculation is highly accurate, accounting for leap years, different month lengths, and precise time calculations. It provides exact age down to seconds."
            },
            {
              question: "Can I calculate age for future dates?",
              answer: "Yes, you can use any reference date, including future dates, to calculate age at that specific point in time."
            },
            {
              question: "Does it handle leap years correctly?",
              answer: "Yes, the calculator correctly handles leap years, including the extra day in February during leap years."
            },
            {
              question: "Can I calculate age differences?",
              answer: "Yes, you can calculate the age of one person and compare it to another by using different reference dates or calculating each separately."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default AgeCalculatorPage;


