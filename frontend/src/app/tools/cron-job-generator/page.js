import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CronJobGeneratorTool from '../../components/tools/CronJobGeneratorTool';

export const metadata = {
  title: 'Cron Job Generator — The Tool Guru',
  description: 'Create cron expressions with presets and human-readable summaries.',
  keywords: ['cron', 'cronjob', 'schedule', 'generator'],
  openGraph: {
    title: 'Cron Job Generator — The Tool Guru',
    description: 'Build cron expressions easily.',
  },
};

const CronJobGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <CronJobGeneratorTool />
    </Body>
    <Footer />
  </div>
);

export default CronJobGeneratorPage;


