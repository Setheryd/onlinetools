import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import NumberBaseConverterTool from '../../components/tools/NumberBaseConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Number Base Converter — The Tool Guru',
  description: 'Convert numbers between bases 2 and 36 (binary, octal, decimal, hexadecimal).',
  keywords: ['number base converter', 'binary', 'hexadecimal', 'octal', 'decimal', 'radix'],
  openGraph: {
    title: 'Number Base Converter — The Tool Guru',
    description: 'Convert numbers between bases 2 and 36.',
  },
}

const NumberBaseConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <NumberBaseConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Number Base Converter"
            description="Convert numbers between bases 2 and 36, including binary, octal, decimal, and hexadecimal. Our number base converter supports conversion between any number base from 2 (binary) to 36, including common bases like binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). Perfect for programming, computer science, mathematics, or any scenario requiring number base conversions."
            features={[
              "Convert between bases 2 and 36",
              "Support for binary, octal, decimal, hexadecimal",
              "Bidirectional conversion",
              "Real-time conversion",
              "Accurate calculations",
              "Support for many number bases",
              "Clear base display",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter the number you want to convert",
              "Select the source base (e.g., decimal)",
              "Select the target base (e.g., hexadecimal)",
              "View the converted number",
              "Convert between any supported bases",
              "Use for programming and development",
              "Copy converted values if needed",
              "Use for any number base conversion needs"
            ]}
            useCases={[
              "Convert numbers for programming",
              "Understand binary and hexadecimal in computing",
              "Convert numbers for computer science",
              "Calculate number bases for mathematics",
              "Convert numbers for debugging",
              "Understand number representations",
              "Convert numbers for encoding",
              "Calculate number bases for any purpose"
            ]}
            tips={[
              "Binary (base 2) uses only 0 and 1",
              "Hexadecimal (base 16) uses 0-9 and A-F",
              "Octal (base 8) uses digits 0-7",
              "Decimal (base 10) is the standard number system",
              "Verify conversions for important calculations",
              "Understand base relationships for better comprehension",
              "Use for accurate number base conversions"
            ]}
            faq={[
              {
                question: "What number bases are supported?",
                answer: "The tool supports conversion between any number base from 2 (binary) to 36, including common bases like binary, octal, decimal, and hexadecimal."
              },
              {
                question: "What is hexadecimal?",
                answer: "Hexadecimal (base 16) uses digits 0-9 and letters A-F to represent numbers. It's commonly used in programming and computing."
              },
              {
                question: "What is binary?",
                answer: "Binary (base 2) uses only digits 0 and 1. It's the fundamental number system used in computers and digital systems."
              },
              {
                question: "How accurate are the conversions?",
                answer: "Conversions are highly accurate, using standard number base conversion algorithms. The tool provides precise conversions between all supported bases."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default NumberBaseConverterPage;


