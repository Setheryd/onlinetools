import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TimestampConverterTool from '../../components/tools/TimestampConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Timestamp Converter — The Tool Guru',
  description: 'Convert between Unix timestamps and human-readable dates. Free online timestamp converter tool.',
  keywords: ['timestamp converter', 'unix time', 'epoch', 'date converter', 'online tool'],
  openGraph: {
    title: 'Timestamp Converter — The Tool Guru',
    description: 'Convert between Unix timestamps and human-readable dates.',
  },
}

const TimestampConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TimestampConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Timestamp Converter"
            description="Convert between Unix timestamps (epoch time) and human-readable dates. Our timestamp converter supports Unix timestamps in seconds and milliseconds, converting them to readable date and time formats. Perfect for developers working with timestamps, debugging time-related code, or understanding Unix time values. The tool provides accurate conversions with support for multiple date formats."
            features={[
              "Convert Unix timestamps to readable dates",
              "Convert dates to Unix timestamps",
              "Support for seconds and milliseconds",
              "Multiple date format options",
              "Real-time conversion",
              "Bidirectional conversion",
              "Clear timestamp display",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter a Unix timestamp or select a date",
              "Choose timestamp format (seconds or milliseconds)",
              "View the converted date and time",
              "Convert dates to timestamps",
              "Use for development and debugging",
              "Copy converted values if needed",
              "Convert between any supported formats",
              "Use for any timestamp conversion needs"
            ]}
            useCases={[
              "Convert timestamps in code development",
              "Debug time-related issues",
              "Understand Unix timestamp values",
              "Convert timestamps for databases",
              "Convert timestamps for APIs",
              "Understand date and time in programming",
              "Convert timestamps for logging",
              "Calculate timestamps for events"
            ]}
            tips={[
              "Unix timestamps count seconds since January 1, 1970 UTC",
              "Millisecond timestamps are common in JavaScript",
              "Verify conversions for important timestamps",
              "Use for debugging time-related code",
              "Check timezone when converting",
              "Understand timestamp format (seconds vs milliseconds)",
              "Use for accurate timestamp conversions"
            ]}
            faq={[
              {
                question: "What is a Unix timestamp?",
                answer: "A Unix timestamp is the number of seconds (or milliseconds) that have elapsed since January 1, 1970, 00:00:00 UTC. It's a common way to represent time in programming."
              },
              {
                question: "What's the difference between seconds and milliseconds?",
                answer: "Unix timestamps can be in seconds (10 digits) or milliseconds (13 digits). JavaScript uses milliseconds, while many systems use seconds."
              },
              {
                question: "Can I convert dates to timestamps?",
                answer: "Yes, you can enter a date and time, and the tool will convert it to a Unix timestamp in the format you specify."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard Unix timestamp calculations. The tool provides precise conversions between timestamps and dates."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default TimestampConverterPage;


