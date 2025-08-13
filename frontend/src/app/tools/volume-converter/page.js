import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import VolumeConverterTool from '../../components/tools/VolumeConverterTool';

export const metadata = {
  title: 'Volume Converter — The Tool Guru',
  description: 'Convert between liters, gallons, cubic units, and more.',
  keywords: ['volume', 'converter', 'liters', 'gallons', 'cups', 'cubic', 'the tool guru'],
  openGraph: {
    title: 'Volume Converter — The Tool Guru',
    description: 'Convert between liters, gallons, cubic units, and more.',
  },
}

const VolumeConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <VolumeConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default VolumeConverterPage;


