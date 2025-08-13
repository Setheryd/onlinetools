import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TimeZoneConverterTool from '../../components/tools/TimeZoneConverterTool';

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
      </Body>
      <Footer />
    </div>
  );
};

export default TimeZoneConverterPage;


