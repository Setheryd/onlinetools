import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JsonFormatterTool from '../../components/tools/JsonFormatterTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: 'JSON Formatter & Validator — The Tool Guru',
  description: 'Format and validate JSON data with proper indentation and syntax highlighting. Free online JSON tool.',
  keywords: ['json formatter', 'json validator', 'json beautifier', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/json-formatter',
  },
  openGraph: {
    title: 'JSON Formatter & Validator — The Tool Guru',
    description: 'Format and validate JSON data with proper indentation and syntax highlighting.',
    url: 'https://thetool.guru/tools/json-formatter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'JSON Formatter & Validator - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Validator — The Tool Guru',
    description: 'Format and validate JSON data with proper indentation and syntax highlighting.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const JsonFormatterPage = async () => {
  // Get the JSON formatter blog post from the service
  const jsonBlogPost = await blogService.getPostBySlug('mastering-json-formatting-and-validation');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <JsonFormatterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="JSON Formatter & Validator"
            description="Format, validate, and beautify JSON data with our comprehensive JSON tool. Whether you're working with API responses, configuration files, or data structures, our formatter ensures your JSON is properly indented, validated, and easy to read. The tool automatically detects and highlights syntax errors, making it perfect for developers, data analysts, and anyone working with JSON data."
            features={[
              "Format JSON with customizable indentation (2 or 4 spaces)",
              "Validate JSON syntax and detect errors instantly",
              "Syntax highlighting for better readability",
              "Minify JSON to reduce file size",
              "Copy formatted JSON to clipboard with one click",
              "Error detection with line number indicators",
              "Support for large JSON files",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Paste your JSON data into the input field or type it directly",
              "Click 'Format' to automatically format and validate your JSON",
              "Review the formatted output with syntax highlighting",
              "Check for any validation errors displayed below the output",
              "Use 'Minify' to compress JSON by removing whitespace",
              "Copy the formatted JSON to your clipboard using the copy button",
              "Fix any errors shown and reformat until validation passes"
            ]}
            useCases={[
              "Format API responses for better readability during development",
              "Validate JSON configuration files before deployment",
              "Beautify minified JSON from web services",
              "Check JSON syntax before sending to APIs",
              "Format JSON data for documentation and presentations",
              "Validate user-submitted JSON data in web applications",
              "Debug JSON parsing errors in applications",
              "Prepare JSON data for code reviews and collaboration"
            ]}
            tips={[
              "Always validate JSON before using it in production code",
              "Use consistent indentation (2 or 4 spaces) across your project",
              "Minify JSON for production to reduce file size and improve performance",
              "Check for trailing commas which are invalid in JSON",
              "Ensure all strings are properly quoted with double quotes",
              "Validate JSON structure matches your expected schema",
              "Use this tool to format JSON before committing to version control"
            ]}
            faq={[
              {
                question: "What's the difference between formatting and validating?",
                answer: "Formatting improves readability by adding proper indentation and spacing. Validation checks if the JSON syntax is correct and identifies errors."
              },
              {
                question: "Can I format invalid JSON?",
                answer: "The tool will attempt to format JSON, but will display validation errors if the JSON syntax is incorrect. You must fix errors before the JSON can be properly formatted."
              },
              {
                question: "Does formatting change the JSON data?",
                answer: "Formatting only changes whitespace and indentation. The actual data values remain unchanged. Minifying removes all unnecessary whitespace."
              },
              {
                question: "What JSON standards does this tool support?",
                answer: "The tool supports standard JSON (RFC 7159) format, including objects, arrays, strings, numbers, booleans, and null values."
              }
            ]}
          />
        </div>
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About JSON Formatting
            </h2>
            <p className="text-lg text-gray-600">
              Discover why proper JSON formatting matters and how to validate your data
            </p>
          </div>
          
          <ToolBlogPost 
            post={jsonBlogPost} 
            toolPath="/tools/json-formatter"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default JsonFormatterPage;
