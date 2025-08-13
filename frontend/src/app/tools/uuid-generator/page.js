import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UuidGeneratorTool from '../../components/tools/UuidGeneratorTool';

export const metadata = {
  title: 'UUID Generator — The Tool Guru',
  description: 'Generate RFC 4122 v4 UUIDs. Free online UUID generator tool.',
  keywords: ['uuid', 'guid', 'generator', 'rfc4122', 'unique id', 'online tool'],
  openGraph: {
    title: 'UUID Generator — The Tool Guru',
    description: 'Generate RFC 4122 v4 UUIDs.',
  },
}

const UuidGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <UuidGeneratorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default UuidGeneratorPage;


