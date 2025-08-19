import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WebsiteSpeedTest from '../../components/tools/WebsiteSpeedTest';

export const metadata = {
  title: 'Website Speed Test — The Tool Guru',
  description: 'Test your internet connection speed, ping, and website performance metrics. Get detailed speed analysis with download/upload speeds and server response times.',
  keywords: ['speed test', 'internet speed', 'ping test', 'website performance', 'download speed', 'upload speed', 'network test', 'the tool guru'],
  openGraph: {
    title: 'Website Speed Test — The Tool Guru',
    description: 'Test your internet connection speed and website performance metrics.',
  },
}

const WebsiteSpeedTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <WebsiteSpeedTest />
      </Body>
      <Footer />
    </div>
  );
};

export default WebsiteSpeedTestPage;
