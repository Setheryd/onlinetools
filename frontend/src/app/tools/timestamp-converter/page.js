import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TimestampConverterTool from '../../components/tools/TimestampConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Timestamp Converter — The Tool Guru',
  description: 'Convert between Unix timestamps and human-readable dates. Free online timestamp converter tool.',
  keywords: ['timestamp converter', 'unix time', 'epoch', 'date converter', 'online tool'],
  alternates: {
    canonical: 'https://thetool.guru/tools/timestamp-converter',
  },
  openGraph: {
    title: 'Timestamp Converter — The Tool Guru',
    description: 'Convert between Unix timestamps and human-readable dates. Free online timestamp converter tool.',
    url: 'https://thetool.guru/tools/timestamp-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Timestamp Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timestamp Converter — The Tool Guru',
    description: 'Convert between Unix timestamps and human-readable dates. Free online timestamp converter tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const TimestampConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <TimestampConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Timestamp Converter"
          description="Convert between Unix timestamps and human-readable dates and times. Unix (epoch) time is the number of seconds or milliseconds since January 1, 1970, 00:00:00 UTC, and is used everywhere in programming—APIs, databases, log files, and configs. This tool lets you paste a timestamp and see the corresponding date and time, or pick a date and get the timestamp. Support for both seconds (10 digits) and milliseconds (13 digits) is included, so you can work with JavaScript Date.now(), Python time.time(), or any other system. All conversion runs in your browser with no server round-trips, so your data stays private. Essential for developers debugging APIs, analyzing logs, or writing scripts that deal with dates."
          features={[
            'Convert Unix timestamp (seconds or milliseconds) to human-readable date and time',
            'Convert a chosen date and time to Unix timestamp in seconds or milliseconds',
            'Support for both 10-digit (seconds) and 13-digit (millisecond) timestamps',
            'One-click copy of the result for use in code or docs',
            'All processing in your browser; no data sent to servers',
            'Clear indication of UTC vs local time where applicable'
          ]}
          howToUse={[
            'To convert timestamp to date: enter the number in the input and select seconds or milliseconds',
            'To convert date to timestamp: use the date/time picker and choose seconds or ms output',
            'View the result in the output area',
            'Copy the value with the copy button for use in your project or logs'
          ]}
          useCases={[
            'Debug API responses or webhooks that return timestamps',
            'Convert log timestamps to readable dates when analyzing errors or events',
            'Generate timestamps for tests, fixtures, or configuration',
            'Understand expiry or "created_at" values stored as epoch time'
          ]}
          tips={[
            '10 digits = seconds (e.g., 1700000000); 13 digits = milliseconds (e.g., 1700000000000). The epoch is 1970-01-01 00:00:00 UTC.',
            'JavaScript Date.now() and many REST APIs use milliseconds; Unix command line and some databases use seconds.',
            'When in doubt, try both seconds and milliseconds if the date looks wrong.'
          ]}
          faq={[
            { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the number of seconds (or milliseconds) since January 1, 1970, 00:00:00 UTC. It is a standard way to store and exchange dates in programming.' },
            { question: 'Seconds or milliseconds?', answer: 'Many APIs and JavaScript use milliseconds (13 digits). Unix systems and some databases use seconds (10 digits). Check your platform; this tool supports both.' },
            { question: 'Why does my timestamp show the wrong date?', answer: 'If you expect a recent date, ensure you chose the right unit: seconds vs milliseconds. A 10-digit number in milliseconds would be a date in 1970; the same number in seconds could be 2023.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="timestamp-converter" />
    </Body>
    <Footer />
  </div>
);

export default TimestampConverterPage;


