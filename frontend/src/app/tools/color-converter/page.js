import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ColorConverterTool from '../../components/tools/ColorConverterTool';

export const metadata = {
  title: 'Color Converter — The Tool Guru',
  description: 'Pick a color and convert between HEX, RGB, HSL, HSV, and CMYK. Supports alpha.',
  keywords: ['color converter', 'hex', 'rgb', 'hsl', 'hsv', 'cmyk', 'picker'],
  openGraph: {
    title: 'Color Converter — The Tool Guru',
    description: 'Convert colors between popular formats with a modern color picker.',
  },
};

const ColorConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <ColorConverterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default ColorConverterPage;


