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

        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About Hash Functions
            </h2>
            <p className="text-lg text-gray-600">
              Discover how hash generators create unique digital fingerprints for data verification
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-3xl">
                🔐
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Complete Guide to Hash Generators</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Learn everything about hash generators and how they create unique digital fingerprints for data verification, integrity checking, and security applications. Understand the different hash algorithms and when to use each one.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>📅 January 25, 2025</span>
                  <span>📖 10 min read</span>
                  <span>🏷️ Security & Cryptography</span>
                </div>
                <a 
                  href="/blog/complete-guide-to-hash-generators" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Read Full Article →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default HashGeneratorPage;
