import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import FileSizeConverterTool from '../../components/tools/FileSizeConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'File Size Converter — The Tool Guru',
  description: 'Convert between Bytes, KB, MB, GB, and TB. Free online file size converter tool.',
  keywords: ['file size', 'converter', 'kb', 'mb', 'gb', 'tb', 'bytes'],
  alternates: {
    canonical: 'https://thetool.guru/tools/file-size-converter',
  },
  openGraph: {
    title: 'File Size Converter — The Tool Guru',
    description: 'Convert between Bytes, KB, MB, GB, and TB. Free online file size converter tool.',
    url: 'https://thetool.guru/tools/file-size-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'File Size Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'File Size Converter — The Tool Guru',
    description: 'Convert between Bytes, KB, MB, GB, and TB. Free online file size converter tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const FileSizeConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <FileSizeConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="File Size Converter"
          description="Convert between file size units: Bytes, KB, MB, GB, and TB. Our file size converter uses standard binary (1024) or decimal (1000) conventions so you can quickly translate between bytes, kilobytes, megabytes, gigabytes, and terabytes. Perfect for understanding storage capacity, download sizes, or file size limits. Free, instant conversions in your browser."
          features={[
            "Convert between Bytes, KB, MB, GB, TB",
            "Binary (1024) and decimal (1000) options",
            "Instant conversion as you type",
            "Clear, readable output",
            "Copy result to clipboard",
            "Works entirely in your browser",
            "No signup required"
          ]}
          howToUse={[
            "Enter a file size value",
            "Select the unit of the value (e.g. MB)",
            "Select the unit you want to convert to (e.g. GB)",
            "View the converted result instantly",
            "Switch units to convert in any direction"
          ]}
          useCases={[
            "Understand download or upload sizes",
            "Compare storage capacity (e.g. 512 GB vs 1 TB)",
            "Check file size limits (e.g. 5 MB max)",
            "Convert for documentation or specs",
            "Estimate backup or transfer sizes",
            "Understand cloud storage quotas",
            "Convert for programming (bytes to KB)",
            "Explain file sizes to others"
          ]}
          tips={[
            "1 KB = 1024 bytes (binary) or 1000 bytes (decimal); OS and drives often use binary",
            "1 MB = 1024 KB (binary); 1 GB = 1024 MB",
            "Download speeds are often in Mbps (megabits per second), not MB/s",
            "For strict SI units use decimal (1000); for RAM/storage use binary (1024)"
          ]}
          faq={[
            {
              question: "What's the difference between KB and KiB?",
              answer: "KB (kilobyte) often means 1000 bytes in decimal. KiB (kibibyte) is 1024 bytes. The tool can use either convention; choose based on your context (e.g. storage vs network)."
            },
            {
              question: "Why do my drive and OS show different sizes?",
              answer: "Manufacturers often use decimal (1 GB = 1 billion bytes), while operating systems use binary (1 GB ≈ 1.07 billion bytes). So a '1 TB' drive may show about 931 GB in Windows."
            },
            {
              question: "How do I convert Mbps to MB/s?",
              answer: "Mbps is megabits per second; 8 megabits = 1 megabyte. So 100 Mbps ≈ 12.5 MB/s download speed."
            },
            {
              question: "What is the largest unit supported?",
              answer: "The tool supports up to TB (terabytes). For PB (petabytes) and beyond, the same conversion rules apply: 1024 TB = 1 PB in binary."
            }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="file-size-converter" />
    </Body>
    <Footer />
  </div>
);

export default FileSizeConverterPage;
