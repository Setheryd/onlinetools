import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TimestampConverterTool from '../../components/tools/TimestampConverterTool';

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
      </Body>
      <Footer />
    </div>
  );
};

export default TimestampConverterPage;


