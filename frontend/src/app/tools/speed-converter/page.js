import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SpeedConverterTool from '../../components/tools/SpeedConverterTool';

export const metadata = {
  title: 'Speed Converter — The Tool Guru',
  description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
  keywords: ['speed', 'converter', 'mph', 'kmh', 'knots', 'mps', 'the tool guru'],
  openGraph: {
    title: 'Speed Converter — The Tool Guru',
    description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
  },
}

const SpeedConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <SpeedConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default SpeedConverterPage;


