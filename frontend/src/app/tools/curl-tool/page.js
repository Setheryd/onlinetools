import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CurlTool from '../../components/tools/CurlTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'cURL Tool - HTTP Request Builder & API Tester',
  description: 'Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers. Support for all HTTP methods, authentication, and advanced options.',
  keywords: ['curl', 'http', 'request', 'api', 'test', 'method', 'rest', 'developer', 'tool'],
  alternates: {
    canonical: 'https://thetool.guru/tools/curl-tool',
  },
  openGraph: {
    title: 'cURL Tool - HTTP Request Builder & API Tester',
    description: 'Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers. Support for all HTTP methods, authentication, and advanced options.',
    url: 'https://thetool.guru/tools/curl-tool',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'cURL Tool - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL Tool - HTTP Request Builder & API Tester',
    description: 'Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers. Support for all HTTP methods, authentication, and advanced options.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const CurlToolPage = () => {
  return (
    <>
      <Header />
      <Body>
        <CurlTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="cURL Tool"
            description="Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers. Our cURL tool supports all HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.), authentication (Basic, Bearer, API keys), custom headers, request bodies, and advanced options. Perfect for API testing, debugging HTTP requests, generating cURL commands, or learning how HTTP requests work. Essential for developers working with REST APIs, webhooks, or any HTTP-based services."
            features={[
              "Support for all HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.)",
              "Multiple authentication methods (Basic, Bearer, API keys)",
              "Custom headers and request bodies",
              "Generate cURL commands for command-line use",
              "View response headers and status codes",
              "Test API endpoints interactively",
              "Save and reuse request configurations",
              "Works entirely in your browser"
            ]}
            howToUse={[
              "Enter the URL you want to request",
              "Select the HTTP method (GET, POST, etc.)",
              "Add headers if needed (Content-Type, Authorization, etc.)",
              "Configure authentication if required",
              "Add request body for POST/PUT requests",
              "Click 'Send Request' to execute",
              "View the response, headers, and status code",
              "Copy the generated cURL command if needed"
            ]}
            useCases={[
              "Test REST API endpoints",
              "Debug HTTP requests and responses",
              "Generate cURL commands for scripts",
              "Test webhooks and API integrations",
              "Learn HTTP request/response behavior",
              "Verify API authentication and authorization",
              "Test different HTTP methods and status codes",
              "Debug CORS and header issues"
            ]}
            tips={[
              "Use GET for retrieving data, POST for creating resources",
              "Set appropriate Content-Type headers for request bodies",
              "Use authentication headers for protected endpoints",
              "Check response status codes to understand API behavior",
              "Review response headers for additional information",
              "Save successful request configurations for reuse",
              "Test error cases to understand API error handling"
            ]}
            faq={[
              {
                question: "What is cURL?",
                answer: "cURL is a command-line tool for making HTTP requests. Our tool provides a visual interface to build and test HTTP requests, then generates the equivalent cURL command."
              },
              {
                question: "Can I test APIs that require authentication?",
                answer: "Yes, the tool supports various authentication methods including Basic Auth, Bearer tokens, and API keys. Configure authentication in the tool's settings."
              },
              {
                question: "What HTTP methods are supported?",
                answer: "The tool supports all standard HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, and more."
              },
              {
                question: "Can I save request configurations?",
                answer: "Some versions of the tool may support saving request configurations. Check the tool interface for save/load functionality."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </>
  );
};

export default CurlToolPage;
