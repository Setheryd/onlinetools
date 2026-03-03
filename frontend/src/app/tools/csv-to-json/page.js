import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CsvJsonConverterTool from '../../components/tools/CsvJsonConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'CSV ⇄ JSON Converter — The Tool Guru',
  description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
  keywords: ['csv', 'json', 'convert', 'parser', 'delimiter', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/csv-to-json',
  },
  openGraph: {
    title: 'CSV ⇄ JSON Converter — The Tool Guru',
    description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
    url: 'https://thetool.guru/tools/csv-to-json',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'CSV ⇄ JSON Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSV ⇄ JSON Converter — The Tool Guru',
    description: 'Convert CSV to JSON and JSON to CSV in your browser. Handles quotes and custom delimiters.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const CsvJsonPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <CsvJsonConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="CSV ⇄ JSON Converter"
          description="Convert between CSV and JSON in your browser. Paste CSV to get JSON (e.g. array of objects), or paste JSON to get CSV. Handles quoted fields, commas inside values, and custom delimiters. Perfect for data migration, API integration, or spreadsheet workflows. No data is sent to servers."
          features={[
            "Convert CSV to JSON (array of objects)",
            "Convert JSON to CSV",
            "Handles quoted fields and commas in values",
            "Custom delimiter option",
            "First row as headers for CSV→JSON",
            "Copy result to clipboard",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Paste CSV or JSON into the input area",
            "For CSV→JSON: ensure first row is headers",
            "For JSON→CSV: use array of objects with consistent keys",
            "Adjust delimiter if your CSV uses semicolon or tab",
            "Click Convert and copy the result"
          ]}
          useCases={[
            "Import CSV into apps that expect JSON",
            "Export JSON API results to CSV for Excel",
            "Transform data between systems",
            "Generate CSV from configuration or logs",
            "Prepare data for databases or spreadsheets",
            "Debug or inspect CSV/JSON structure"
          ]}
          tips={[
            "CSV with commas inside fields must have those fields in quotes",
            "JSON should be an array of objects; keys become CSV column headers",
            "For tab-separated values, choose tab as delimiter",
            "Large files may take a moment; processing is all client-side"
          ]}
          faq={[
            {
              question: "How are CSV headers handled?",
              answer: "For CSV to JSON, the first row is treated as property names; each following row becomes an object with those keys. For JSON to CSV, object keys become the header row."
            },
            {
              question: "What if my CSV uses semicolons instead of commas?",
              answer: "Use the delimiter option to select semicolon (or tab). The converter will split rows using your chosen delimiter."
            },
            {
              question: "Can I convert nested JSON to CSV?",
              answer: "The tool works best with flat JSON (array of objects with simple values). Nested objects or arrays are typically stringified; for complex nesting you may need to flatten first."
            },
            {
              question: "Is my data sent to a server?",
              answer: "No. Conversion runs entirely in your browser. Your CSV and JSON never leave your device."
            }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="csv-to-json" />
    </Body>
    <Footer />
  </div>
);

export default CsvJsonPage;


