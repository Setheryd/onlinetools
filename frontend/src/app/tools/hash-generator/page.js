import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HashGeneratorTool from '../../components/tools/HashGeneratorTool';

export const metadata = {
  title: 'Hash Generator — The Tool Guru',
  description: 'Generate MD5, SHA1, SHA256, and other hash values for text. Free online hash generator tool.',
  keywords: ['hash generator', 'md5', 'sha1', 'sha256', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'Hash Generator — The Tool Guru',
    description: 'Generate MD5, SHA1, SHA256, and other hash values for text.',
  },
}

const HashGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <HashGeneratorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default HashGeneratorPage;
