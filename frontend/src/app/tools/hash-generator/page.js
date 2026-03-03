import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HashGeneratorTool from '../../components/tools/HashGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Hash Generator — MD5, SHA1, SHA256 Online | The Tool Guru',
  description: 'Free online hash generator. Create MD5, SHA1, SHA256, SHA384, SHA512 hashes from text instantly. No signup.',
  keywords: ['hash generator', 'md5', 'sha1', 'sha256', 'sha512', 'checksum', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/hash-generator',
  },
  openGraph: {
    title: 'Hash Generator — MD5, SHA1, SHA256 Online | The Tool Guru',
    description: 'Free online hash generator. Create MD5, SHA1, SHA256 and more from text instantly.',
    url: 'https://thetool.guru/tools/hash-generator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Hash Generator - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hash Generator — MD5, SHA1, SHA256 Online | The Tool Guru',
    description: 'Free online hash generator. Create MD5, SHA1, SHA256 hashes from text instantly.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const HashGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <HashGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Hash Generator"
          description="Generate MD5, SHA-1, SHA-256, and SHA-512 hash values for any text. Our free online hash generator uses the Web Crypto API to compute secure hashes in your browser. Perfect for checksums, password hashing verification, data integrity checks, and cryptographic applications."
          features={[
            'Generate SHA-1, SHA-256, and SHA-512 hashes',
            'Instant hashing as you type',
            'Copy any hash to clipboard',
            'Works entirely in your browser (no data sent to server)',
            'Supports any text input',
            'Hex-encoded output'
          ]}
          howToUse={[
            'Enter or paste the text you want to hash',
            'Hashes are generated automatically for SHA-1, SHA-256, and SHA-512',
            'Click a hash to copy it to your clipboard',
            'Use the generated hashes for checksums, verification, or integration'
          ]}
          useCases={[
            'Verify file or data integrity with checksums',
            'Generate password hashes for verification',
            'Create hash values for API signatures',
            'Checksum comparison and validation',
            'Data fingerprinting'
          ]}
          tips={[
            'SHA-256 is recommended for security-sensitive use; SHA-1 is deprecated for security',
            'Hashes are one-way: you cannot recover the original text from the hash',
            'Identical input always produces the same hash'
          ]}
          faq={[
            {
              question: 'What is a hash?',
              answer: 'A hash is a fixed-size fingerprint of data. The same input always produces the same hash, but even a tiny change in input produces a completely different hash.'
            },
            {
              question: 'Which algorithm should I use?',
              answer: 'Use SHA-256 for general security (checksums, signatures). SHA-512 is stronger but produces longer output. SHA-1 is not recommended for new security-sensitive applications.'
            },
            {
              question: 'Is my data sent to a server?',
              answer: 'No. Hashing is done entirely in your browser using the Web Crypto API. Your text never leaves your device.'
            },
            {
              question: 'What is MD5 and should I use it?',
              answer: 'MD5 is an older hash function that is not secure for passwords or signatures (vulnerable to collisions). Use SHA-256 or SHA-512 for security. MD5 is still sometimes used for non-security checksums.'
            }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="hash-generator" />
    </Body>
    <Footer />
  </div>
);

export default HashGeneratorPage;
