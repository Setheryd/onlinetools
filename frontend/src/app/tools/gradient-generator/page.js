import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import GradientMakerTool from '../../components/tools/GradientMakerTool';

export const metadata = {
  title: 'Gradient Maker — The Tool Guru',
  description: 'Create beautiful CSS gradients with our comprehensive gradient maker. Generate linear, radial, conic gradients and export as PNG, SVG, JPEG or CSS.',
  keywords: ['gradient maker', 'css gradient', 'linear gradient', 'radial gradient', 'conic gradient', 'color gradient', 'background generator', 'the tool guru'],
  openGraph: {
    title: 'Gradient Maker — The Tool Guru',
    description: 'Create beautiful CSS gradients with our comprehensive gradient maker.',
  },
};

const GradientMakerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <GradientMakerTool />
      </Body>
      <Footer />
    </div>
  );
};

export default GradientMakerPage;
