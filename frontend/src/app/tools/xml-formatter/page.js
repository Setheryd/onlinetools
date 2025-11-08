import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import XmlFormatterTool from '../../components/tools/XmlFormatterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'XML Formatter — The Tool Guru',
  description: 'Format and validate XML documents in your browser.',
  keywords: ['xml formatter', 'format xml', 'pretty print xml'],
  openGraph: {
    title: 'XML Formatter — The Tool Guru',
    description: 'Validate and pretty-print XML instantly.',
  },
};

const XmlFormatterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <XmlFormatterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="XML Formatter"
          description="Format and validate XML documents with proper indentation and structure. Our XML formatter makes XML code readable by adding proper indentation, line breaks, and formatting. Perfect for developers, data analysts, and anyone working with XML files, API responses, or configuration files. The tool also validates XML syntax to ensure your documents are well-formed."
          features={[
            "Format XML with proper indentation and line breaks",
            "Validate XML syntax and detect errors",
            "Pretty-print XML for better readability",
            "Minify XML by removing unnecessary whitespace",
            "Copy formatted XML to clipboard",
            "Error detection with line number indicators",
            "Support for large XML files",
            "Works entirely in your browser for privacy"
          ]}
          howToUse={[
            "Paste your XML code into the input field",
            "Click 'Format' to automatically format and validate your XML",
            "Review the formatted output with proper indentation",
            "Check for any validation errors displayed",
            "Use 'Minify' to compress XML by removing whitespace",
            "Copy the formatted XML to your clipboard",
            "Fix any errors and reformat until validation passes"
          ]}
          useCases={[
            "Format XML API responses for debugging",
            "Validate XML configuration files",
            "Beautify minified XML from web services",
            "Check XML syntax before using in applications",
            "Format XML data for documentation",
            "Validate user-submitted XML data",
            "Debug XML parsing errors",
            "Prepare XML for code reviews"
          ]}
          tips={[
            "Always validate XML before using it in production",
            "Well-formatted XML is easier to read and debug",
            "Minify XML for production to reduce file size",
            "Check for unclosed tags and mismatched elements",
            "Ensure all attributes are properly quoted",
            "Validate XML structure matches your expected schema",
            "Use consistent indentation (2 or 4 spaces)"
          ]}
          faq={[
            {
              question: "What makes XML well-formed?",
              answer: "Well-formed XML must have a single root element, all tags must be properly closed, attributes must be quoted, and tags must be properly nested. Our validator checks all these requirements."
            },
            {
              question: "Can I format invalid XML?",
              answer: "The tool will attempt to format XML, but will display validation errors if the XML syntax is incorrect. You must fix errors before the XML can be properly formatted."
            },
            {
              question: "Does formatting change the XML data?",
              answer: "Formatting only changes whitespace and indentation. The actual data values and structure remain unchanged. Minifying removes all unnecessary whitespace."
            },
            {
              question: "What's the difference between XML and HTML?",
              answer: "XML is a markup language for storing and transporting data, while HTML is for displaying data. XML is stricter - all tags must be closed and properly nested, and it's case-sensitive."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default XmlFormatterPage;


