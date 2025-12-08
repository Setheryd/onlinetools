import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RedirectCheckerTool from '../../components/tools/RedirectCheckerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Redirect Checker — The Tool Guru',
  description: 'Follow and analyze URL redirects and chains with status codes and headers.',
  openGraph: {
    title: 'Redirect Checker — The Tool Guru',
    description: 'Follow and analyze URL redirects and chains with status codes and headers.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RedirectCheckerTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Redirect Checker"
          description="Follow and analyze URL redirects and chains with status codes and headers. Our redirect checker traces the complete redirect path from a starting URL to the final destination, showing all intermediate redirects, HTTP status codes, and response headers. Perfect for debugging redirect issues, verifying redirect chains, checking SEO redirects, or understanding how URLs are redirected. Essential for web developers and SEO professionals."
          features={[
            "Follow complete redirect chains",
            "Display all HTTP status codes (301, 302, 307, 308, etc.)",
            "Show response headers for each redirect",
            "Identify redirect loops",
            "Check final destination URL",
            "Analyze redirect timing",
            "Test any publicly accessible URL",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Enter the URL you want to check",
            "Click 'Check Redirect' to trace the redirect chain",
            "View all redirects in the chain",
            "Check HTTP status codes for each redirect",
            "Review response headers",
            "Identify the final destination",
            "Check for redirect loops or issues",
            "Use results for debugging or SEO analysis"
          ]}
          useCases={[
            "Debug redirect configuration issues",
            "Verify SEO redirects (301 vs 302)",
            "Check redirect chains for problems",
            "Identify redirect loops",
            "Verify canonical redirects",
            "Check mobile redirects",
            "Analyze redirect performance",
            "Ensure proper redirect implementation"
          ]}
          tips={[
            "301 redirects are permanent and pass SEO value",
            "302 redirects are temporary and don't pass SEO value",
            "Avoid redirect chains when possible (direct redirects are better)",
            "Check for redirect loops that can cause issues",
            "Verify final destination is correct",
            "Use for SEO analysis and optimization",
            "Test redirects after making changes"
          ]}
          faq={[
            {
              question: "What's the difference between 301 and 302 redirects?",
              answer: "301 redirects are permanent and tell search engines to transfer SEO value to the new URL. 302 redirects are temporary and don't transfer SEO value. Use 301 for permanent moves, 302 for temporary redirects."
            },
            {
              question: "What is a redirect chain?",
              answer: "A redirect chain occurs when a URL redirects to another URL, which redirects again, and so on. Long chains can slow down page loads and should be avoided when possible."
            },
            {
              question: "Can redirects affect SEO?",
              answer: "Yes, redirects can affect SEO. 301 redirects properly transfer SEO value, while 302 redirects don't. Long redirect chains can also negatively impact SEO and page speed."
            },
            {
              question: "What is a redirect loop?",
              answer: "A redirect loop occurs when URLs redirect to each other in a cycle, causing browsers to stop following redirects. This is a problem that should be fixed."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;


