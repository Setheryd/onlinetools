import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SqlFormatterTool from '../../components/tools/SqlFormatterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';

export const metadata = {
  title: 'SQL Formatter — Format SQL Queries Online | The Tool Guru',
  description: 'Format SQL with consistent indentation and uppercase keywords. Client-side only.',
  keywords: ['sql formatter', 'format sql', 'sql beautify', 'sql query', 'database', 'the tool guru'],
  alternates: { canonical: 'https://thetool.guru/tools/sql-formatter' },
  openGraph: { title: 'SQL Formatter — The Tool Guru', description: 'Format SQL with consistent indentation.', url: 'https://thetool.guru/tools/sql-formatter', siteName: 'The Tool Guru', images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'SQL Formatter' }], locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'SQL Formatter — The Tool Guru', images: ['/Brand_Assets/Logo.webp'], creator: '@thetoolguru', site: '@thetoolguru' },
};

const structuredData = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'SQL Formatter', applicationCategory: 'DeveloperApplication', operatingSystem: 'Any', url: 'https://thetool.guru/tools/sql-formatter', description: 'Format SQL with consistent indentation and uppercase keywords.', browserRequirements: 'Requires JavaScript.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Format SQL', 'Uppercase keywords', 'Configurable indent', 'Copy formatted SQL'] };

const SqlFormatterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <Header />
    <Body>
      <SqlFormatterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection toolName="SQL Formatter" description="Format SQL queries with consistent indentation and uppercase keywords. All processing in your browser." features={['Format SQL', 'Uppercase keywords', 'Configurable indent', 'Copy formatted SQL', 'Works in browser']} howToUse={['Paste SQL', 'Set indent size', 'Click Format SQL', 'Copy result']} useCases={['Readable SQL in docs', 'Format queries from logs']} faq={[{ question: 'Is my SQL sent to a server?', answer: 'No. Formatting runs entirely in your browser.' }]} />
      </div>
      <RelatedToolsSection toolId="sql-formatter" />
    </Body>
    <Footer />
  </div>
);

export default SqlFormatterPage;
