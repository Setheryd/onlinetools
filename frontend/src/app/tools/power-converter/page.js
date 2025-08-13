import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PowerConverterTool from '../../components/tools/PowerConverterTool';

export const metadata = {
  title: 'Power Converter — The Tool Guru',
  description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
  keywords: ['power', 'converter', 'watt', 'kilowatt', 'horsepower', 'dbm'],
  openGraph: {
    title: 'Power Converter — The Tool Guru',
    description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
  },
}

const PowerConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PowerConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default PowerConverterPage;


