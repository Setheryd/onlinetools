import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HashGeneratorTool from '../../components/tools/HashGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Hash Generator"
            description="Generate cryptographic hash values for text and data using various hash algorithms. Our hash generator supports MD5, SHA1, SHA256, SHA512, and other popular hash functions. Hashes are one-way functions that create unique digital fingerprints of data, making them essential for data integrity verification, password storage, digital signatures, and security applications."
            features={[
              "Generate MD5, SHA1, SHA256, SHA512, and SHA3 hashes",
              "Support for multiple hash algorithms in one tool",
              "Instant hash generation as you type",
              "Copy hash values to clipboard with one click",
              "Hexadecimal and base64 output formats",
              "Process text of any length",
              "Works entirely in your browser for privacy",
              "No data sent to servers - all processing is local"
            ]}
            howToUse={[
              "Enter or paste the text you want to hash into the input field",
              "Select the hash algorithm you want to use (MD5, SHA1, SHA256, etc.)",
              "The hash value will be generated automatically",
              "View the hash in hexadecimal format",
              "Use the copy button to copy the hash to your clipboard",
              "Switch between different algorithms to compare hash outputs",
              "Hash multiple texts to verify they produce different hash values"
            ]}
            useCases={[
              "Verify file integrity by comparing hash values",
              "Generate checksums for data validation",
              "Create hash values for password verification (with proper salting)",
              "Generate unique identifiers from text data",
              "Verify data hasn't been tampered with during transmission",
              "Create digital signatures and authentication tokens",
              "Hash sensitive data before storage or transmission",
              "Compare hash values to detect duplicate content"
            ]}
            tips={[
              "Use SHA256 or SHA512 for modern security applications (MD5 and SHA1 are deprecated)",
              "Remember that hashing is one-way - you cannot reverse a hash to get the original data",
              "For password storage, always use proper salting and key derivation functions (like bcrypt)",
              "Hash values are deterministic - the same input always produces the same hash",
              "Use longer hash algorithms (SHA512) for better security",
              "Verify file integrity by comparing hashes before and after transfer",
              "Never use MD5 or SHA1 for security-critical applications"
            ]}
            faq={[
              {
                question: "What's the difference between MD5, SHA1, and SHA256?",
                answer: "MD5 produces 128-bit hashes, SHA1 produces 160-bit hashes, and SHA256 produces 256-bit hashes. SHA256 is more secure and recommended for modern applications, while MD5 and SHA1 are considered cryptographically broken."
              },
              {
                question: "Can I reverse a hash to get the original text?",
                answer: "No, hash functions are one-way. You cannot reverse a hash to recover the original data. However, you can hash new data and compare the hashes to see if they match."
              },
              {
                question: "Are hash values unique?",
                answer: "While collisions (two different inputs producing the same hash) are theoretically possible, they're extremely rare with modern hash algorithms. Each unique input should produce a unique hash."
              },
              {
                question: "Should I use hashes for password storage?",
                answer: "Hashes alone are not sufficient for password storage. Use proper password hashing functions like bcrypt, Argon2, or PBKDF2 which include salting and key stretching for security."
              }
            ]}
          />
        </div>

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
