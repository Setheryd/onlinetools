import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JsonFormatterTool from '../../components/tools/JsonFormatterTool';

export const metadata = {
  title: 'JSON Formatter & Validator — OnlineTools',
  description:
    'Format and validate JSON data with proper indentation, syntax highlighting, and error detection. Perfect for developers and API testing.',
  keywords: ['json', 'formatter', 'validator', 'beautify', 'developer', 'api', 'code']
};

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
