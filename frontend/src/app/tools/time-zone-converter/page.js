import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TimeZoneConverterTool from '../../components/tools/TimeZoneConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Time Zone Converter — The Tool Guru',
  description: 'Convert a date and time between time zones using your browser.',
  keywords: ['time zone', 'converter', 'utc', 'pst', 'est', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/time-zone-converter',
  },
  openGraph: {
    title: 'Time Zone Converter — The Tool Guru',
    description: 'Convert a date and time between time zones using your browser.',
    url: 'https://thetool.guru/tools/time-zone-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Time Zone Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Zone Converter — The Tool Guru',
    description: 'Convert a date and time between time zones using your browser.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const TimeZoneConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <TimeZoneConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Time Zone Converter"
          description="Convert a date and time between time zones. Pick source and target zones (e.g. UTC, EST, PST). Essential for meetings and travel. Uses your browser."
          features={["Convert between time zones", "Date and time", "Common zones (UTC, EST, PST, etc.)", "Works in browser"]}
          howToUse={["Enter or pick date and time", "Select source time zone", "Select target time zone", "View result"]}
          useCases={["Meetings", "Travel", "Support", "Scheduling"]}
          faq={[
            { question: "What is UTC?", answer: "Coordinated Universal Time—the reference. EST = UTC−5, PST = UTC−8 (approx; DST can shift)." },
            { question: "Does it handle daylight saving?", answer: "Yes. Named zones (e.g. America/New_York) account for DST automatically." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="time-zone-converter" />
    </Body>
    <Footer />
  </div>
);

export default TimeZoneConverterPage;


