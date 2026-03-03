import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — The Tool Guru',
  description: 'Privacy policy for The Tool Guru. Learn what data we collect, how we use cookies, and how third-party advertising may use data when you visit our site.',
  keywords: ['privacy policy', 'data collection', 'cookies', 'the tool guru', 'online tools'],
  alternates: { canonical: 'https://thetool.guru/privacy' },
};

const PrivacyPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: March 2025</p>
        </div>

        <Card className="p-8 mb-8">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              The Tool Guru (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website thetool.guru. This Privacy Policy explains what information we collect, how we use it, and your choices regarding your data when you use our site.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Information We Collect</h2>
            <p>
              When you visit The Tool Guru, we may collect certain information automatically, including your IP address, browser type, device type, referring URLs, and pages viewed. This helps us understand how visitors use our site and improve our services. Many of our tools run entirely in your browser, and in those cases your input (e.g., text you paste or type) is not sent to our servers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Cookies and Similar Technologies</h2>
            <p>
              We may use cookies and similar technologies (e.g., local storage) to remember preferences, analyze traffic, and improve your experience. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Third-Party Advertising and Data Use</h2>
            <p>
              We may use third-party advertising companies to display ads on our site. These companies may place and read cookies on your browser, or use web beacons and similar technologies to collect information as a result of ad serving on this website. For example, Google may use data to show you relevant ads and measure ad performance.
            </p>
            <p>
              For more information about how Google uses data when you use our partners&apos; sites or apps, please visit:{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                How Google uses data when you use our partners&apos; sites or apps
              </a>.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Your Choices</h2>
            <p>
              You can disable or delete cookies in your browser. You may also opt out of personalized advertising through tools such as Google&apos;s Ad Settings or the Network Advertising Initiative opt-out page. Disabling cookies may affect how some parts of our site work.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Data Security</h2>
            <p>
              We take reasonable steps to protect the information we collect. Where tools process data in your browser only, that data does not leave your device.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top reflects the latest revision. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our practices, please contact us at{' '}
              <Link href="/contact" className="text-blue-600 hover:underline">our Contact page</Link> or email info@thetool.guru.
            </p>
          </div>
        </Card>
      </div>
    </Body>
    <Footer />
  </div>
);

export default PrivacyPage;
