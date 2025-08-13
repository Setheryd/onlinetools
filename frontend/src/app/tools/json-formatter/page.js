import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JsonFormatterTool from '../../components/tools/JsonFormatterTool';

export const metadata = {
  title: 'JSON Formatter & Validator — The Tool Guru',
  description: 'Format and validate JSON data with proper indentation and syntax highlighting. Free online JSON tool.',
  keywords: ['json formatter', 'json validator', 'json beautifier', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'JSON Formatter & Validator — The Tool Guru',
    description: 'Format and validate JSON data with proper indentation and syntax highlighting.',
  },
}

const JsonFormatterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <JsonFormatterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default JsonFormatterPage;
