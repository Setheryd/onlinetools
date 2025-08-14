import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CssMinifierTool from '../../components/tools/CssMinifierTool';

export const metadata = {
  title: 'CSS Minifier — The Tool Guru',
  description: 'Minify CSS by removing comments and whitespace. Fast and privacy-friendly.',
  keywords: ['css minifier', 'minify css', 'compress css'],
  openGraph: {
    title: 'CSS Minifier — The Tool Guru',
    description: 'Minify CSS instantly in your browser.',
  },
};

const CssMinifierPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <CssMinifierTool />
    </Body>
    <Footer />
  </div>
);

export default CssMinifierPage;


