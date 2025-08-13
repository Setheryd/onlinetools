import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RegexTesterTool from '../../components/tools/RegexTesterTool';

export const metadata = {
  title: 'Regex Tester — OnlineTools',
  description:
    'Test and debug regular expressions with real-time matching and highlighting. Perfect for developers and text processing.',
  keywords: ['regex', 'regular expression', 'test', 'pattern', 'match', 'debug', 'developer']
};

const RegexTesterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <RegexTesterTool />
      </Body>
      <Footer />
    </div>
  );
};

export default RegexTesterPage;
