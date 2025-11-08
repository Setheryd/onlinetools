import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WhoisLookupTool from '../../components/tools/WhoisLookupTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'WHOIS Lookup — The Tool Guru',
  description: 'Get domain registration and expiry information via WHOIS.',
  openGraph: {
    title: 'WHOIS Lookup — The Tool Guru',
    description: 'Get domain registration and expiry information via WHOIS.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <WhoisLookupTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="WHOIS Lookup"
          description="Get domain registration and expiry information via WHOIS. Our WHOIS lookup tool retrieves comprehensive domain information including registration details, expiration dates, registrar information, name servers, and contact information (when available). Perfect for checking domain availability, investigating domain ownership, tracking expiration dates, or researching domain information. Essential for domain management and research."
          features={[
            "Retrieve comprehensive domain registration information",
            "Check domain expiration dates",
            "View registrar and registration details",
            "Get name server information",
            "Access contact information (when available)",
            "Check domain availability status",
            "Fast WHOIS queries",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Enter the domain name you want to look up",
            "Click 'Lookup' to query WHOIS information",
            "View domain registration details",
            "Check expiration dates and renewal information",
            "Review registrar and contact information",
            "Use information for domain research or management",
            "Check multiple domains as needed"
          ]}
          useCases={[
            "Check domain availability and registration status",
            "Investigate domain ownership and registration details",
            "Track domain expiration dates",
            "Research domain information for business purposes",
            "Verify domain registration information",
            "Check registrar and name server details",
            "Investigate domain history and ownership",
            "Monitor domain expiration for renewal planning"
          ]}
          tips={[
            "Use WHOIS to check domain availability",
            "Monitor expiration dates for domain renewal",
            "Check registrar information for domain management",
            "Review contact information when available",
            "Use for domain research and investigation",
            "Check multiple domains for comparison",
            "Verify domain information for business purposes"
          ]}
          faq={[
            {
              question: "What information does WHOIS provide?",
              answer: "WHOIS provides domain registration information including registration date, expiration date, registrar details, name servers, and contact information (when not privacy-protected)."
            },
            {
              question: "Why is some contact information hidden?",
              answer: "Many registrars offer privacy protection services that hide contact information in WHOIS records to protect domain owners from spam and unwanted contact."
            },
            {
              question: "Can I check if a domain is available?",
              answer: "Yes, if a domain lookup returns no registration information, the domain is likely available. However, some domains may be reserved or in a grace period."
            },
            {
              question: "How accurate is WHOIS information?",
              answer: "WHOIS information is generally accurate but depends on the registrar keeping records up to date. Some information may be privacy-protected or outdated."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;


