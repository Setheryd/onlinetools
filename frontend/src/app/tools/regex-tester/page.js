import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RegexTesterTool from '../../components/tools/RegexTesterTool';

export const metadata = {
  title: 'Regex Tester — The Tool Guru',
  description: 'Test and debug regular expressions with real-time matching and highlighting. Free online regex tester tool.',
  keywords: ['regex tester', 'regular expression', 'pattern matching', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'Regex Tester — The Tool Guru',
    description: 'Test and debug regular expressions with real-time matching and highlighting.',
  },
}

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
