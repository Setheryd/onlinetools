import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HtaccessGeneratorTool from '../../components/tools/HtaccessGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: '.htaccess Generator — The Tool Guru',
  description: 'Generate .htaccess rules for Apache (HTTPS, host redirects, caching).',
  keywords: ['htaccess', 'apache', 'generator', 'redirects', 'rewrite'],
  openGraph: {
    title: '.htaccess Generator — The Tool Guru',
    description: 'Create .htaccess snippets easily.',
  },
};

const HtaccessGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <HtaccessGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName=".htaccess Generator"
          description="Generate .htaccess rules for Apache web servers including HTTPS redirects, host redirects, caching, and security headers. Our .htaccess generator creates properly formatted Apache configuration rules for common web server tasks. Perfect for setting up HTTPS redirects, configuring caching, adding security headers, managing redirects, or optimizing Apache server performance. The tool generates standard .htaccess syntax that works with Apache servers."
          features={[
            "Generate .htaccess rules for Apache",
            "Create HTTPS redirect rules",
            "Configure host redirects",
            "Set up caching directives",
            "Add security headers",
            "Create URL rewrite rules",
            "Generate custom .htaccess configurations",
            "Works entirely in your browser for privacy"
          ]}
          howToUse={[
            "Select the type of .htaccess rule you need",
            "Configure rule parameters (domains, paths, etc.)",
            "Add multiple rules as needed",
            "Review the generated .htaccess code",
            "Copy the generated code",
            "Save as .htaccess in your web root",
            "Test rules to ensure they work correctly",
            "Backup existing .htaccess before making changes"
          ]}
          useCases={[
            "Set up HTTPS redirects for security",
            "Configure Apache caching for performance",
            "Add security headers to protect websites",
            "Create URL redirects and rewrites",
            "Optimize Apache server configuration",
            "Set up custom error pages",
            "Configure access control rules",
            "Manage Apache server settings"
          ]}
          tips={[
            "Always backup existing .htaccess before making changes",
            "Test .htaccess rules in a staging environment first",
            "Use HTTPS redirects for security and SEO",
            "Configure caching to improve website performance",
            "Add security headers to protect against attacks",
            "Test rules after implementation",
            "Keep .htaccess files organized and commented"
          ]}
          faq={[
            {
              question: "What is .htaccess?",
              answer: ".htaccess is an Apache configuration file that allows you to configure server settings on a per-directory basis. It's placed in web directories and affects that directory and subdirectories."
            },
            {
              question: "Where should I place .htaccess?",
              answer: ".htaccess should be placed in your website's root directory or the specific directory you want to configure. It affects that directory and all subdirectories."
            },
            {
              question: "Will .htaccess work on all servers?",
              answer: ".htaccess works on Apache servers. It doesn't work on Nginx (which uses different configuration) or some other web servers. Check your server type before using."
            },
            {
              question: "Can I break my website with .htaccess?",
              answer: "Incorrect .htaccess rules can cause errors. Always backup existing .htaccess files, test rules carefully, and have a way to restore if something goes wrong."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default HtaccessGeneratorPage;


