import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RobotsTesterTool from '../../components/tools/RobotsTesterTool';

export const metadata = {
  title: 'Robots.txt & Sitemap Tester — The Tool Guru',
  description: 'Check robots.txt rules for a given user-agent and path, and view the file.',
  openGraph: {
    title: 'Robots.txt & Sitemap Tester — The Tool Guru',
    description: 'Check robots.txt rules for a given user-agent and path, and view the file.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RobotsTesterTool />
    </Body>
    <Footer />
  </div>
);

export default Page;


