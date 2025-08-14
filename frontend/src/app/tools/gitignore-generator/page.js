import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import GitignoreGeneratorTool from '../../components/tools/GitignoreGeneratorTool';

export const metadata = {
  title: '.gitignore Generator — The Tool Guru',
  description: 'Compose .gitignore files from popular templates and custom entries.',
  keywords: ['gitignore', 'generator', 'git', 'templates'],
  openGraph: {
    title: '.gitignore Generator — The Tool Guru',
    description: 'Generate .gitignore easily.',
  },
};

const GitignoreGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <GitignoreGeneratorTool />
    </Body>
    <Footer />
  </div>
);

export default GitignoreGeneratorPage;


