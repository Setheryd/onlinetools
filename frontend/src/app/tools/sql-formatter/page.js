import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SqlFormatterTool from '../../components/tools/SqlFormatterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';

export const metadata = {
  title: 'SQL Formatter — Format SQL Queries Online | The Tool Guru',
  description: 'Format SQL with consistent indentation and uppercase keywords. Client-side only.',
  keywords: ['sql formatter', 'format sql', 'sql beautify', 'sql query', 'database', 'the tool guru'],
  alternates: { canonical: 'https://thetool.guru/tools/sql-formatter' },
  openGraph: { title: 'SQL Formatter — The Tool Guru', description: 'Format SQL with consistent indentation.', url: 'https://thetool.guru/tools/sql-formatter', siteName: 'The Tool Guru', images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'SQL Formatter' }], locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'SQL Formatter — The Tool Guru', images: ['/Brand_Assets/Logo.webp'], creator: '@thetoolguru', site: '@thetoolguru' },
};

const structuredData = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'SQL Formatter', applicationCategory: 'DeveloperApplication', operatingSystem: 'Any', url: 'https://thetool.guru/tools/sql-formatter', description: 'Format SQL with consistent indentation and uppercase keywords.', browserRequirements: 'Requires JavaScript.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Format SQL', 'Uppercase keywords', 'Configurable indent', 'Copy formatted SQL'] };

const SqlFormatterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <Header />
    <Body>
      <SqlFormatterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="SQL Formatter"
          description="Format and beautify SQL queries with consistent indentation, line breaks, and optional keyword casing. Poorly formatted SQL is hard to read, debug, and review. This tool takes raw or minified SQL—whether from logs, legacy code, or copy-paste—and outputs clean, readable statements with configurable indent size and optional uppercase keywords (SELECT, FROM, WHERE, etc.). All formatting runs in your browser; your queries are never sent to a server, so you can safely format sensitive or proprietary SQL. Ideal for developers, DBAs, and anyone who works with database queries daily."
          features={[
            'Format SQL with consistent indentation and line breaks',
            'Optional uppercase conversion for reserved keywords (SELECT, FROM, JOIN, etc.)',
            'Configurable indent size (spaces) to match your style guide',
            'One-click copy of the formatted SQL to clipboard',
            'All processing in your browser; no server uploads',
            'Handles SELECT, INSERT, UPDATE, DELETE, and common clauses'
          ]}
          howToUse={[
            'Paste your SQL query into the input area (minified or already formatted)',
            'Choose your preferred indent size (e.g., 2 or 4 spaces)',
            'Enable or disable "Uppercase keywords" depending on your convention',
            'Click "Format SQL" to reformat the query',
            'Copy the result to paste into your editor, documentation, or ticket'
          ]}
          useCases={[
            'Make SQL from application logs or error messages readable before debugging',
            'Format queries for documentation, wikis, or code reviews',
            'Standardize SQL style across a team or codebase',
            'Quickly tidy one-off queries from support tickets or analytics'
          ]}
          tips={[
            'Use uppercase keywords in shared docs to make SQL structure stand out.',
            'Keep indent size consistent with your project (often 2 or 4 spaces).',
            'Format before sharing in pull requests so reviewers can focus on logic, not style.'
          ]}
          faq={[
            { question: 'Is my SQL sent to a server?', answer: 'No. Formatting runs entirely in your browser. Your queries never leave your device.' },
            { question: 'Does it support all SQL dialects?', answer: 'The formatter handles standard SELECT, INSERT, UPDATE, DELETE, and common clauses. Very dialect-specific syntax may not be perfectly structured but will remain intact.' },
            { question: 'Can I format multiple statements at once?', answer: 'Yes. Paste multiple statements separated by semicolons; the formatter will process them and output formatted SQL.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="sql-formatter" />
    </Body>
    <Footer />
  </div>
);

export default SqlFormatterPage;
