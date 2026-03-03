import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import NumberBaseConverterTool from '../../components/tools/NumberBaseConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Number Base Converter — Binary, Hex, Decimal, Octal | The Tool Guru',
  description: 'Free number base converter. Convert between binary, hexadecimal, decimal, octal (bases 2–36). Instant results in your browser.',
  keywords: ['number base converter', 'binary to decimal', 'hex to decimal', 'decimal to hex', 'octal', 'radix', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/number-base-converter',
  },
  openGraph: {
    title: 'Number Base Converter — Binary, Hex, Decimal, Octal | The Tool Guru',
    description: 'Free number base converter. Convert between binary, hex, decimal, octal (bases 2–36).',
    url: 'https://thetool.guru/tools/number-base-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Number Base Converter - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Number Base Converter — Binary, Hex, Decimal, Octal | The Tool Guru',
    description: 'Free number base converter. Convert between binary, hex, decimal, octal.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const NumberBaseConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <NumberBaseConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Number Base Converter"
          description="Convert numbers between different bases (radixes) from 2 to 36. Our number base converter supports binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16), and any base up to 36. Essential for programmers, computer science students, and anyone working with low-level data. Convert binary to decimal, hex to decimal, decimal to hex, and more—all in your browser with instant results."
          features={[
            "Convert between bases 2 (binary) through 36",
            "Support for binary, octal, decimal, hexadecimal",
            "Instant conversion as you type",
            "Handles large numbers",
            "Clear error messages for invalid input",
            "Copy result to clipboard",
            "Works entirely in your browser",
            "No signup or installation required"
          ]}
          howToUse={[
            "Enter a number in the source base (e.g. decimal or hex)",
            "Select the source base (2–36)",
            "Select the target base",
            "View the converted result instantly",
            "Use copy to clipboard if needed",
            "Switch bases to convert in any direction"
          ]}
          useCases={[
            "Convert binary to decimal for readability",
            "Convert hex to decimal for debugging",
            "Convert decimal to hex for programming",
            "Convert between octal and other bases",
            "Teach or learn number systems",
            "Debug low-level and embedded systems",
            "Work with color hex codes and RGB",
            "Convert IP addresses or bit masks"
          ]}
          tips={[
            "Hexadecimal uses 0–9 and A–F (e.g. FF = 255)",
            "Binary uses only 0 and 1",
            "Leading zeros are often allowed (e.g. 0x1A for hex)",
            "For programming, hex (base 16) and binary (base 2) are most common",
            "Base 36 uses 0–9 and A–Z"
          ]}
          faq={[
            {
              question: "What is a number base (radix)?",
              answer: "The base is how many distinct digits are used. Decimal is base 10 (0–9), binary is base 2 (0–1), hexadecimal is base 16 (0–9, A–F)."
            },
            {
              question: "Why use hexadecimal?",
              answer: "Hex is compact and maps neatly to binary (each hex digit = 4 bits). It's used in programming, colors (e.g. #FF0000), and memory addresses."
            },
            {
              question: "What is the maximum base supported?",
              answer: "The tool supports bases 2 through 36. Base 36 uses digits 0–9 and letters A–Z."
            },
            {
              question: "Can I convert fractional numbers?",
              answer: "This tool converts integers only. For fractional values, you would need to handle integer and fractional parts separately."
            }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="number-base-converter" />
    </Body>
    <Footer />
  </div>
);

export default NumberBaseConverterPage;
