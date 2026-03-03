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
        <ToolContentSection
          toolName="SHA Hash Generator"
          description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes from any text or string. SHA (Secure Hash Algorithm) produces a fixed-length fingerprint that changes completely when the input changes even slightly, making it ideal for checksums, integrity verification, and digital signatures. Our tool uses the Web Crypto API in your browser so your data never leaves your device—no server uploads, no logging. Developers use SHA hashes to verify file downloads, validate API payloads, and implement content-addressable storage. Choose the algorithm that fits your needs: SHA-256 is the most widely recommended for general use; SHA-512 offers stronger security for sensitive applications."
          features={[
            'Support for SHA-1, SHA-256, SHA-384, and SHA-512 algorithms',
            'Uses the Web Crypto API—industry-standard cryptography in the browser',
            'No data sent to any server; all hashing happens locally',
            'One-click copy of the generated hash to clipboard',
            'Works in all modern browsers without plugins',
            'Handles Unicode and long text inputs'
          ]}
          howToUse={[
            'Select the hash algorithm (SHA-1, SHA-256, SHA-384, or SHA-512) from the dropdown',
            'Type or paste the text you want to hash into the input field',
            'Click "Generate hash" to compute the hash value',
            'Copy the result with the copy button for use in your project or verification'
          ]}
          useCases={[
            'Verify file integrity by comparing hashes before and after download',
            'Generate checksums for configuration files or data payloads',
            'Create content hashes for caching or deduplication in applications',
            'Test and debug code that uses SHA hashes (e.g., API signatures or commit IDs)'
          ]}
          tips={[
            'Use SHA-256 or SHA-512 for new projects; SHA-1 is considered weak for security-sensitive uses.',
            'For password storage, use a dedicated key-derivation function like bcrypt or Argon2, not raw SHA.',
            'Hash values are deterministic: the same input always produces the same hash.'
          ]}
          faq={[
            { question: 'Is my text sent to a server?', answer: 'No. Hashing uses the Web Crypto API in your browser. Nothing is uploaded or stored.' },
            { question: 'Should I use SHA for passwords?', answer: 'For password storage use a dedicated tool like bcrypt or Argon2. SHA is better for checksums and integrity verification.' },
            { question: 'What is the difference between SHA-256 and SHA-512?', answer: 'SHA-256 produces a 256-bit (64 hex character) hash; SHA-512 produces a 512-bit (128 hex character) hash. SHA-512 is stronger but slightly slower. Both are secure for most use cases.' },
            { question: 'Can I hash binary data or files?', answer: 'This tool hashes text you paste. For files, use a checksum utility (e.g., sha256sum) or a file-hash tool that reads binary content.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="sha-generator" />
    </Body>
    <Footer />
  </div>
);

export default ShaGeneratorPage;
