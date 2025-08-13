import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TemperatureConverterTool from '../../components/tools/TemperatureConverterTool';

export const metadata = {
  title: 'Temperature Converter — The Tool Guru',
  description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
  keywords: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin', 'the tool guru'],
  openGraph: {
    title: 'Temperature Converter — The Tool Guru',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin quickly and accurately.',
  },
}

const TemperatureConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TemperatureConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default TemperatureConverterPage;


