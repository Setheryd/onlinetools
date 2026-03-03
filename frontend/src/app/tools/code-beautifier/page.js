import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CodeBeautifierTool from '../../components/tools/CodeBeautifierTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';

export const metadata = {
  title: 'Code Beautifier — Format JSON, JS, HTML, CSS, XML | The Tool Guru',
  description: 'Format and beautify code in JSON, JavaScript, HTML, CSS, and XML. Adjust indentation and make code readable. No signup required.',
  keywords: ['code beautifier', 'format code', 'json formatter', 'javascript formatter', 'html formatter', 'css formatter', 'xml formatter', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/code-beautifier',
  },
  openGraph: {
    title: 'Code Beautifier — Format JSON, JS, HTML, CSS, XML | The Tool Guru',
    description: 'Format and beautify code in JSON, JavaScript, HTML, CSS, and XML. Adjust indentation and make code readable.',
    url: 'https://thetool.guru/tools/code-beautifier',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Code Beautifier — The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Beautifier — Format JSON, JS, HTML, CSS, XML | The Tool Guru',
    description: 'Format and beautify code in JSON, JavaScript, HTML, CSS, and XML.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const CodeBeautifierPage = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Code Beautifier',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    url: 'https://thetool.guru/tools/code-beautifier',
    description: 'Format and beautify code in JSON, JavaScript, HTML, CSS, and XML. Adjust indentation and make code readable. No signup required.',
    browserRequirements: 'Requires JavaScript. Works in modern browsers.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Format JSON, JavaScript, HTML, CSS, XML',
      'Configurable indentation size',
      'Copy formatted output',
      'Works in browser for privacy',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <Body>
        <CodeBeautifierTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Code Beautifier"
            description="Format and beautify code in multiple languages with consistent indentation and readable structure. Our code beautifier supports JSON, JavaScript, HTML, CSS, and XML. Paste minified or messy code and get properly indented, formatted output. Perfect for developers reviewing API responses, cleaning up exported code, or preparing code for documentation. All processing happens in your browser for complete privacy."
            features={[
              'Format JSON, JavaScript, HTML, CSS, and XML',
              'Configurable indentation (spaces)',
              'Syntax-aware formatting where applicable',
              'Copy formatted output to clipboard',
              'Clear and reset in one click',
              'Works entirely in your browser for privacy',
            ]}
            howToUse={[
              'Select the language (JSON, JavaScript, HTML, CSS, or XML)',
              'Paste your code into the input area',
              'Set indentation size if desired (default 2 spaces)',
              'Click Beautify to format the code',
              'Copy the formatted output or use it in your project',
            ]}
            useCases={[
              'Format minified JSON from APIs',
              'Beautify compressed JavaScript or HTML',
              'Prepare code for documentation or reviews',
              'Reformat CSS for readability',
              'Clean up XML configuration or data',
              'Make pasted code readable before editing',
            ]}
            tips={[
              'JSON formatting will validate and show errors on invalid input',
              'Use 2 or 4 spaces for indentation depending on project style',
              'For complex JavaScript, consider a full AST-based formatter for best results',
            ]}
            faq={[
              {
                question: 'Which languages are supported?',
                answer: 'The tool supports JSON, JavaScript, HTML, CSS, and XML. Select the language that matches your code for the best formatting result.',
              },
              {
                question: 'Is my code sent to a server?',
                answer: 'No. Formatting runs entirely in your browser. Your code is never uploaded or stored.',
              },
              {
                question: 'Why does JavaScript formatting look basic?',
                answer: 'This tool uses a lightweight formatter suitable for most cases. For complex or minified JavaScript with unusual syntax, an AST-based formatter (e.g. in your IDE) may produce more precise results.',
              },
            ]}
          />
        </div>
        <RelatedToolsSection toolId="code-beautifier" />
      </Body>
      <Footer />
    </div>
  );
};

export default CodeBeautifierPage;
