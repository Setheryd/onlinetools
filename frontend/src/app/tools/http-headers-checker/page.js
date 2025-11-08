import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HttpHeadersTool from '../../components/tools/HttpHeadersTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'HTTP Headers Checker — The Tool Guru',
  description: 'Inspect HTTP response headers and the full redirect chain for any URL.',
  openGraph: {
    title: 'HTTP Headers Checker — The Tool Guru',
    description: 'Inspect HTTP response headers and the full redirect chain for any URL.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <HttpHeadersTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="HTTP Headers Checker"
          description="Inspect HTTP response headers and the full redirect chain for any URL. Our HTTP headers checker retrieves and displays all HTTP headers sent by web servers, including security headers, caching directives, content type, and redirect chains. Perfect for debugging web issues, verifying security headers, checking redirect chains, or understanding how servers respond to requests. Essential for web developers and system administrators."
          features={[
            "View all HTTP response headers",
            "Follow and display redirect chains",
            "Check security headers (CSP, HSTS, etc.)",
            "View caching directives",
            "Check content type and encoding",
            "Display status codes",
            "Analyze any publicly accessible URL",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Enter the URL you want to check",
            "Click 'Check Headers' to fetch HTTP headers",
            "View all response headers",
            "Follow redirect chains if present",
            "Check security headers configuration",
            "Review caching and content headers",
            "Analyze header configuration",
            "Use results for debugging or optimization"
          ]}
          useCases={[
            "Debug web server configuration issues",
            "Verify security headers are properly set",
            "Check redirect chains and status codes",
            "Analyze caching directives",
            "Troubleshoot HTTP-related problems",
            "Verify content type and encoding",
            "Check CORS headers configuration",
            "Optimize HTTP header configuration"
          ]}
          tips={[
            "Check security headers for proper configuration",
            "Verify redirect chains are working correctly",
            "Review caching headers for optimization",
            "Check content type headers for proper MIME types",
            "Verify CORS headers if dealing with cross-origin requests",
            "Use for debugging HTTP-related issues",
            "Compare headers across different URLs"
          ]}
          faq={[
            {
              question: "What are HTTP headers?",
              answer: "HTTP headers are additional information sent with HTTP requests and responses. They include metadata like content type, caching directives, security settings, and server information."
            },
            {
              question: "What are security headers?",
              answer: "Security headers like Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), and X-Frame-Options help protect websites from various attacks. They should be properly configured."
            },
            {
              question: "What is a redirect chain?",
              answer: "A redirect chain occurs when a URL redirects to another URL, which may redirect again. The checker follows these redirects and shows the complete chain with status codes."
            },
            {
              question: "Can I check any website?",
              answer: "You can check any publicly accessible website. The tool makes HTTP requests to retrieve headers. Some sites may block automated requests or require specific headers."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;


