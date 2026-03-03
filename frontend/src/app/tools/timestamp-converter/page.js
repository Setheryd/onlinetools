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
          description="Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds. Essential for developers and APIs. All processing in your browser."
          features={["Timestamp to date", "Date to timestamp", "Seconds and milliseconds", "Copy result", "Works in browser"]}
          howToUse={["Enter timestamp or pick date", "Choose seconds or ms", "View result and copy"]}
          useCases={["Debug APIs", "Convert in code/configs", "Log analysis"]}
          tips={["10 digits = seconds, 13 = milliseconds. Epoch is 1970-01-01 UTC."]}
          faq={[
            { question: "What is a Unix timestamp?", answer: "Seconds or milliseconds since 1970-01-01 00:00:00 UTC." },
            { question: "Seconds or milliseconds?", answer: "Many APIs use milliseconds (13 digits). Unix often uses seconds (10 digits)." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="timestamp-converter" />
    </Body>
    <Footer />
  </div>
);

export default TimestampConverterPage;


