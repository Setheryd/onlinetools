import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SslCheckerTool from '../../components/tools/SslCheckerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'SSL Certificate Checker — The Tool Guru',
  description: 'Check SSL certificate details, SANs, issuer, and expiry for any host.',
  openGraph: {
    title: 'SSL Certificate Checker — The Tool Guru',
    description: 'Check SSL certificate details, SANs, issuer, and expiry for any host.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <SslCheckerTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="SSL Certificate Checker"
          description="Check SSL certificate details, SANs (Subject Alternative Names), issuer information, and expiry dates for any host. Our SSL checker verifies SSL/TLS certificate validity, displays certificate information, checks expiration dates, and identifies certificate issues. Perfect for monitoring certificate expiration, verifying SSL configuration, troubleshooting SSL problems, or ensuring websites have valid certificates."
          features={[
            "Check SSL certificate validity",
            "Display certificate details (issuer, subject, validity period)",
            "Show SANs (Subject Alternative Names)",
            "Check certificate expiration dates",
            "Verify certificate chain",
            "Identify certificate issues",
            "Test any hostname or domain",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Enter the hostname or domain to check",
            "Click 'Check SSL' to verify certificate",
            "View certificate details and information",
            "Check expiration date and validity period",
            "Review SANs and certificate chain",
            "Identify any certificate issues",
            "Monitor certificate expiration",
            "Verify SSL configuration"
          ]}
          useCases={[
            "Monitor SSL certificate expiration",
            "Verify SSL certificate installation",
            "Check certificate validity for websites",
            "Troubleshoot SSL connection issues",
            "Verify certificate chain configuration",
            "Check SANs for multi-domain certificates",
            "Ensure websites have valid SSL certificates",
            "Monitor certificate renewal dates"
          ]}
          tips={[
            "Check certificates regularly to avoid expiration",
            "Monitor expiration dates well in advance",
            "Verify that certificates cover all required domains (SANs)",
            "Check certificate chain for proper configuration",
            "Use for troubleshooting SSL connection problems",
            "Verify certificate issuer and validity",
            "Set reminders for certificate renewal"
          ]}
          faq={[
            {
              question: "What is an SSL certificate?",
              answer: "An SSL (Secure Sockets Layer) certificate is a digital certificate that authenticates a website's identity and enables encrypted connections. It's essential for HTTPS websites."
            },
            {
              question: "How do I know if a certificate is valid?",
              answer: "The checker will show certificate validity, expiration date, and any issues. A valid certificate should not be expired, should match the domain, and should have a proper certificate chain."
            },
            {
              question: "What are SANs?",
              answer: "SANs (Subject Alternative Names) are additional domain names covered by a single SSL certificate. They allow one certificate to secure multiple domains or subdomains."
            },
            {
              question: "What happens when a certificate expires?",
              answer: "When an SSL certificate expires, browsers will show security warnings and users may not be able to access the site securely. Certificates should be renewed before expiration."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;


