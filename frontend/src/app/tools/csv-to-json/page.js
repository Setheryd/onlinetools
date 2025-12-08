import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CsvJsonConverterTool from '../../components/tools/CsvJsonConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'CSV ⇄ JSON Converter — The Tool Guru',
  description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
  keywords: ['csv', 'json', 'convert', 'parser', 'delimiter', 'the tool guru'],
  openGraph: {
    title: 'CSV ⇄ JSON Converter — The Tool Guru',
    description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
  },
}

const CsvJsonPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <CsvJsonConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="CSV to JSON Converter"
            description="Convert CSV to JSON and JSON to CSV in your browser with support for custom delimiters and quote handling. Our CSV/JSON converter handles complex CSV files with quotes, escaped characters, and various delimiters. Perfect for data transformation, API integration, data migration, or converting between spreadsheet and JSON formats. The tool supports bidirectional conversion and preserves data structure accurately."
            features={[
              "Convert CSV to JSON format",
              "Convert JSON to CSV format",
              "Support for custom delimiters (comma, semicolon, tab, etc.)",
              "Handle quoted fields and escaped characters",
              "Preserve data structure and types",
              "Real-time conversion preview",
              "Download converted files",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Select conversion direction (CSV to JSON or JSON to CSV)",
              "Paste or upload your CSV or JSON data",
              "Configure delimiter if needed (comma, semicolon, tab)",
              "Set quote handling options",
              "Click 'Convert' to process the data",
              "Preview the converted output",
              "Download or copy the converted data",
              "Use the converted data in your application"
            ]}
            useCases={[
              "Convert spreadsheet data to JSON for APIs",
              "Transform JSON data to CSV for Excel",
              "Migrate data between systems",
              "Prepare data for database import",
              "Convert data for web applications",
              "Transform data for analysis tools",
              "Convert export files between formats",
              "Prepare data for reporting and visualization"
            ]}
            tips={[
              "Use appropriate delimiters for your CSV format",
              "Handle quoted fields correctly to preserve data",
              "Check data structure after conversion",
              "Verify that all data converted correctly",
              "Use for data migration and transformation",
              "Test with sample data first",
              "Ensure proper encoding for special characters"
            ]}
            faq={[
              {
                question: "What delimiters are supported?",
                answer: "The tool supports common delimiters including comma (,), semicolon (;), tab, pipe (|), and custom delimiters. Select the appropriate delimiter for your CSV format."
              },
              {
                question: "How are quoted fields handled?",
                answer: "The tool properly handles quoted fields in CSV, preserving text that contains delimiters or special characters. Quoted fields are correctly parsed and converted."
              },
              {
                question: "Can I convert large files?",
                answer: "The tool works best with reasonably sized files. Very large files may take longer to process or may need to be split into smaller chunks."
              },
              {
                question: "Does it preserve data types?",
                answer: "The tool attempts to preserve data types where possible. Numbers, strings, and other types are converted appropriately, though some type inference may occur."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default CsvJsonPage;


