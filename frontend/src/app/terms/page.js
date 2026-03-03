import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — The Tool Guru',
  description: 'Terms of service for The Tool Guru. Read our terms of use, acceptable use policy, and disclaimers for using our free online tools.',
  keywords: ['terms of service', 'terms of use', 'the tool guru', 'online tools', 'legal'],
  alternates: { canonical: 'https://thetool.guru/terms' },
};

const TermsPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: March 2025</p>
        </div>

        <Card className="p-8 mb-8">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Welcome to The Tool Guru. By accessing or using thetool.guru (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Use of the Site</h2>
            <p>
              The Tool Guru provides free online tools and utilities for personal, educational, and professional use. You may use the Site and its tools in a lawful manner and in accordance with these terms. You are responsible for any content you submit or process through our tools.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Acceptable Use</h2>
            <p>
              You agree not to use the Site to: (a) violate any applicable law or regulation; (b) infringe the intellectual property or other rights of others; (c) transmit malware, spam, or harmful code; (d) attempt to gain unauthorized access to our systems or other users&apos; data; or (e) use the Site in any way that could damage, disable, or overburden the Site or our infrastructure. We may suspend or terminate access for violation of these terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Disclaimer of Warranties</h2>
            <p>
              The Site and all tools are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components. Use of our tools (e.g., for encoding, conversion, or document processing) is at your own risk. We are not liable for any loss or damage arising from your use of the Site or reliance on tool outputs.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, The Tool Guru and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or use, arising from your use of the Site or inability to use it. Our total liability for any claims related to the Site shall not exceed the amount you paid to use the Site (which is zero for free use).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Intellectual Property</h2>
            <p>
              The Site design, branding, and original content are owned by The Tool Guru. You may not copy, scrape, or republish substantial portions of the Site without permission. Use of our tools for their intended purpose does not transfer any ownership to you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Third-Party Links and Services</h2>
            <p>
              The Site may contain links to third-party websites or use third-party services (e.g., for advertising or analytics). We are not responsible for the content or practices of third parties. Your use of third-party services is subject to their respective terms and policies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. Continued use of the Site after changes constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us via{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">our Contact page</Link> or email info@thetool.guru.
            </p>
          </div>
        </Card>
      </div>
    </Body>
    <Footer />
  </div>
);

export default TermsPage;
