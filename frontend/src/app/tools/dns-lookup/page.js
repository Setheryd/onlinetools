import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import DnsLookupTool from '../../components/tools/DnsLookupTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'DNS Lookup — The Tool Guru',
  description: 'Resolve DNS records (A, AAAA, CNAME, MX, NS, TXT, SOA, SRV, PTR) for any domain.',
  openGraph: {
    title: 'DNS Lookup — The Tool Guru',
    description: 'Resolve DNS records (A, AAAA, CNAME, MX, NS, TXT, SOA, SRV, PTR) for any domain.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <DnsLookupTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="DNS Lookup"
          description="Resolve DNS records (A, AAAA, CNAME, MX, NS, TXT, SOA, SRV, PTR) for any domain. Our DNS lookup tool queries DNS servers to retrieve all types of DNS records for domains, helping you understand domain configuration, troubleshoot DNS issues, verify DNS settings, or investigate domain information. Perfect for developers, system administrators, or anyone needing to check DNS records."
          features={[
            "Query multiple DNS record types (A, AAAA, CNAME, MX, NS, TXT, SOA, SRV, PTR)",
            "Resolve domain names to IP addresses",
            "Check mail server (MX) records",
            "View name server (NS) information",
            "Retrieve TXT records for verification",
            "Fast DNS resolution",
            "Support for all standard DNS record types",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Enter the domain name you want to look up",
            "Select DNS record types to query (or query all)",
            "Click 'Lookup' to resolve DNS records",
            "View all returned DNS records",
            "Check IP addresses, mail servers, and other records",
            "Use results for troubleshooting or verification",
            "Query different record types as needed"
          ]}
          useCases={[
            "Troubleshoot DNS configuration issues",
            "Verify DNS records for domains",
            "Check domain IP addresses",
            "Verify email server (MX) configuration",
            "Investigate domain DNS settings",
            "Check DNS propagation",
            "Verify domain ownership via TXT records",
            "Debug DNS-related problems"
          ]}
          tips={[
            "Use A records to find IP addresses",
            "Check MX records for email server configuration",
            "Use NS records to see name servers",
            "TXT records often contain verification codes",
            "Query multiple record types for complete information",
            "Check DNS propagation if records were recently changed",
            "Use for troubleshooting domain connectivity issues"
          ]}
          faq={[
            {
              question: "What DNS record types are supported?",
              answer: "The tool supports all standard DNS record types including A (IPv4), AAAA (IPv6), CNAME (aliases), MX (mail servers), NS (name servers), TXT (text records), SOA (start of authority), SRV (service records), and PTR (reverse lookups)."
            },
            {
              question: "How long does DNS lookup take?",
              answer: "DNS lookups are typically very fast, usually completing in under a second. Some lookups may take longer if DNS servers are slow to respond."
            },
            {
              question: "Can I lookup any domain?",
              answer: "Yes, you can lookup DNS records for any publicly accessible domain. The tool queries standard DNS servers to retrieve records."
            },
            {
              question: "What's the difference between A and AAAA records?",
              answer: "A records contain IPv4 addresses (e.g., 192.168.1.1), while AAAA records contain IPv6 addresses (e.g., 2001:0db8::1). Both point domains to IP addresses but use different IP versions."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;


