import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JsMinifierTool from '../../components/tools/JsMinifierTool';

export const metadata = {
  title: 'JavaScript Minifier — The Tool Guru',
  description: 'Minify JavaScript by removing comments and whitespace in your browser.',
  keywords: ['js minifier', 'minify javascript', 'compress js'],
  openGraph: {
    title: 'JavaScript Minifier — The Tool Guru',
    description: 'Minify JS instantly in your browser.',
  },
};

const JsMinifierPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <JsMinifierTool />
    </Body>
    <Footer />
  </div>
);

export default JsMinifierPage;


