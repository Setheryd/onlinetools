import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import XmlFormatterTool from '../../components/tools/XmlFormatterTool';

export const metadata = {
  title: 'XML Formatter — The Tool Guru',
  description: 'Format and validate XML documents in your browser.',
  keywords: ['xml formatter', 'format xml', 'pretty print xml'],
  openGraph: {
    title: 'XML Formatter — The Tool Guru',
    description: 'Validate and pretty-print XML instantly.',
  },
};

const XmlFormatterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <XmlFormatterTool />
    </Body>
    <Footer />
  </div>
);

export default XmlFormatterPage;


