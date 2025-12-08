import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TimeZoneConverterTool from '../../components/tools/TimeZoneConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Time Zone Converter — The Tool Guru',
  description: 'Convert a date and time between time zones using your browser.',
  keywords: ['time zone', 'converter', 'utc', 'pst', 'est', 'the tool guru'],
  openGraph: {
    title: 'Time Zone Converter — The Tool Guru',
    description: 'Convert a date and time between time zones using your browser.',
  },
}

const TimeZoneConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TimeZoneConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Time Zone Converter"
            description="Convert a date and time between different time zones using your browser. Our time zone converter supports all major time zones worldwide, including UTC, EST, PST, GMT, and many others. Perfect for scheduling meetings across time zones, understanding time differences, or any scenario requiring time zone conversions. The tool provides accurate conversions with support for daylight saving time adjustments."
            features={[
              "Convert times between any time zones",
              "Support for all major time zones worldwide",
              "Automatic daylight saving time handling",
              "Date and time conversion",
              "Real-time conversion",
              "Clear time zone display",
              "Support for UTC and local times",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the date and time you want to convert",
              "Select the source time zone",
              "Select the target time zone",
              "View the converted date and time",
              "Check time difference between zones",
              "Use for scheduling across zones",
              "Convert between any time zones",
              "Use for any time zone conversion needs"
            ]}
            useCases={[
              "Schedule meetings across time zones",
              "Understand time differences between locations",
              "Convert times for international communication",
              "Calculate times for travel planning",
              "Convert times for remote work",
              "Understand global time relationships",
              "Convert times for events and deadlines",
              "Calculate times for international business"
            ]}
            tips={[
              "Select accurate source and target time zones",
              "Consider daylight saving time changes",
              "Verify conversions for important events",
              "Use UTC for international coordination",
              "Check time differences before scheduling",
              "Account for time zone changes during travel",
              "Use for accurate time zone conversions"
            ]}
            faq={[
              {
                question: "What time zones are supported?",
                answer: "The tool supports all major time zones worldwide, including UTC, EST, PST, GMT, and many others. You can select from a comprehensive list of time zones."
              },
              {
                question: "How does daylight saving time work?",
                answer: "The tool automatically handles daylight saving time adjustments based on the selected time zones and date. Times are converted accurately including DST changes."
              },
              {
                question: "Can I convert to UTC?",
                answer: "Yes, UTC (Coordinated Universal Time) is supported and is often used as a reference for international time coordination."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard time zone data and accounting for daylight saving time. The tool provides precise time conversions."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default TimeZoneConverterPage;


