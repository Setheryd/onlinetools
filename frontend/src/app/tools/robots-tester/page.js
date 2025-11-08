import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RobotsTesterTool from '../../components/tools/RobotsTesterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Robots.txt & Sitemap Tester — The Tool Guru',
  description: 'Check robots.txt rules for a given user-agent and path, and view the file.',
  openGraph: {
    title: 'Robots.txt & Sitemap Tester — The Tool Guru',
    description: 'Check robots.txt rules for a given user-agent and path, and view the file.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RobotsTesterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Robots.txt & Sitemap Tester"
          description="Check robots.txt rules for a given user-agent and path, and view the file contents. Our robots.txt tester helps you verify that your robots.txt file is working correctly, test which paths are allowed or disallowed for specific user agents, and view sitemap links. Perfect for debugging robots.txt configuration, ensuring crawlers can access important pages, or verifying that blocked directories are properly restricted."
          features={[
            "Test robots.txt rules for specific paths",
            "Check rules for different user agents",
            "View full robots.txt file contents",
            "Verify allow/disallow rules",
            "Check sitemap links",
            "Test multiple paths and user agents",
            "Validate robots.txt format",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Enter the website URL to test",
            "Select or enter a user agent (e.g., Googlebot, * for all)",
            "Enter the path you want to test",
            "Click 'Test' to check robots.txt rules",
            "View whether the path is allowed or disallowed",
            "Review the full robots.txt file",
            "Test different paths and user agents",
            "Verify your robots.txt configuration"
          ]}
          useCases={[
            "Verify robots.txt is working correctly",
            "Test which paths are blocked or allowed",
            "Debug robots.txt configuration issues",
            "Check rules for specific user agents",
            "Verify sitemap links in robots.txt",
            "Ensure important pages are accessible",
            "Test robots.txt after making changes",
            "Verify blocked directories are restricted"
          ]}
          tips={[
            "Test with different user agents to see rule differences",
            "Test both allowed and disallowed paths",
            "Verify that important pages are accessible",
            "Check that blocked directories are properly restricted",
            "Use * for all user agents or specific ones like Googlebot",
            "Test paths with and without trailing slashes",
            "Verify sitemap links are accessible"
          ]}
          faq={[
            {
              question: "What user agents should I test?",
              answer: "Test with common user agents like Googlebot (Google), Bingbot (Bing), or * (all crawlers). Different crawlers may have different rules if specified in robots.txt."
            },
            {
              question: "How do I know if a path is allowed?",
              answer: "The tester will show whether a path is allowed or disallowed based on robots.txt rules. Allowed means crawlers can access it, disallowed means they should not."
            },
            {
              question: "Can I test paths that don't exist?",
              answer: "Yes, you can test any path. The tester checks robots.txt rules, not whether the path actually exists on the website."
            },
            {
              question: "What if robots.txt doesn't exist?",
              answer: "If robots.txt doesn't exist, all paths are allowed by default. The tester will indicate that no robots.txt file was found."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;


