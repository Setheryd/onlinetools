import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ShaGeneratorTool from '../../components/tools/ShaGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';

export const metadata = {
  title: 'SHA Hash Generator — SHA-1, SHA-256, SHA-512 | The Tool Guru',
  description: 'Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text. Uses Web Crypto API in your browser.',
  keywords: ['sha', 'hash', 'sha1', 'sha256', 'sha512', 'checksum', 'cryptography', 'the tool guru'],
  alternates: { canonical: 'https://thetool.guru/tools/sha-generator' },
  openGraph: { title: 'SHA Hash Generator — The Tool Guru', description: 'Generate SHA hashes from text. Web Crypto API in browser.', url: 'https://thetool.guru/tools/sha-generator', siteName: 'The Tool Guru', images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'SHA Generator' }], locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'SHA Hash Generator — The Tool Guru', images: ['/Brand_Assets/Logo.webp'], creator: '@thetoolguru', site: '@thetoolguru' },
};

const structuredData = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'SHA Hash Generator', applicationCategory: 'DeveloperApplication', operatingSystem: 'Any', url: 'https://thetool.guru/tools/sha-generator', description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from text. Web Crypto API in browser.', browserRequirements: 'Requires JavaScript. Modern browsers with Web Crypto API.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['SHA-1, SHA-256, SHA-384, SHA-512', 'Web Crypto API', 'No server', 'Copy hash'] };

const ShaGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <Header />
    <Body>
      <ShaGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection toolName="SHA Hash Generator" description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text. Uses the Web Crypto API in your browser—no data is sent to any server." features={['SHA-1, SHA-256, SHA-384, SHA-512', 'Web Crypto API', 'No server', 'Copy hash', 'Works in browser']} howToUse={['Select algorithm', 'Enter text', 'Click Generate hash', 'Copy result']} useCases={['Checksums', 'Password hashing (use bcrypt for passwords)', 'Integrity checks']} faq={[{ question: 'Is my text sent to a server?', answer: 'No. Hashing uses the Web Crypto API in your browser. Nothing is uploaded.' }, { question: 'Should I use SHA for passwords?', answer: 'For password storage use a dedicated tool like bcrypt. SHA is better for checksums and integrity.' }]} />
      </div>
      <RelatedToolsSection toolId="sha-generator" />
    </Body>
    <Footer />
  </div>
);

export default ShaGeneratorPage;
