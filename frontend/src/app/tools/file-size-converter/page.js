import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import FileSizeConverterTool from '../../components/tools/FileSizeConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'File Size Converter — The Tool Guru',
  description: 'Convert between Bytes, KB, MB, GB, and TB. Free online file size converter tool.',
  keywords: ['file size', 'converter', 'kb', 'mb', 'gb', 'tb', 'bytes'],
  openGraph: {
    title: 'File Size Converter — The Tool Guru',
    description: 'Convert between Bytes, KB, MB, GB, and TB.',
  },
}

const FileSizeConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <FileSizeConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="File Size Converter"
            description="Convert between Bytes, KB, MB, GB, TB, and PB. Our file size converter supports all common digital storage units used in computing and data storage. Perfect for understanding file sizes, storage capacities, or any scenario requiring file size conversions. The tool provides accurate conversions using binary (1024-based) or decimal (1000-based) calculations."
            features={[
              "Convert between Bytes, KB, MB, GB, TB, and PB",
              "Support for binary (1024-based) and decimal (1000-based) units",
              "Real-time conversion as you type",
              "Bidirectional conversion",
              "Accurate calculations",
              "Support for all common file size units",
              "Easy unit switching",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the file size value you want to convert",
              "Select the source unit (e.g., MB)",
              "Select the target unit (e.g., GB)",
              "View the converted value automatically",
              "Switch units to convert in reverse",
              "Use for any file size conversion needs",
              "Copy converted values if needed",
              "Convert between any supported units"
            ]}
            useCases={[
              "Convert file sizes between units",
              "Calculate storage capacities",
              "Understand file sizes in different units",
              "Convert sizes for data transfer",
              "Calculate disk space requirements",
              "Convert sizes for cloud storage",
              "Understand storage specifications",
              "Calculate file size requirements"
            ]}
            tips={[
              "1 KB = 1,024 Bytes (binary) or 1,000 Bytes (decimal)",
              "1 MB = 1,024 KB (binary) or 1,000 KB (decimal)",
              "1 GB = 1,024 MB (binary) or 1,000 MB (decimal)",
              "Operating systems typically use binary (1024-based) units",
              "Storage manufacturers often use decimal (1000-based) units",
              "Verify which system is used for accurate conversions",
              "Use for accurate file size calculations"
            ]}
            faq={[
              {
                question: "What file size units are supported?",
                answer: "The tool supports common file size units including Bytes, KB (kilobytes), MB (megabytes), GB (gigabytes), TB (terabytes), and PB (petabytes)."
              },
              {
                question: "What's the difference between binary and decimal units?",
                answer: "Binary units use 1024 as the base (1 KB = 1024 Bytes), while decimal units use 1000 as the base (1 KB = 1000 Bytes). Operating systems typically use binary, while storage manufacturers often use decimal."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard conversion factors. The tool provides precise calculations for all supported units."
              },
              {
                question: "Which system should I use?",
                answer: "Use binary (1024-based) for operating system file sizes and memory. Use decimal (1000-based) for storage device capacities and network speeds."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default FileSizeConverterPage;


