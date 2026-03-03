import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TextCaseConverterTool from '../../components/tools/TextCaseConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Text Case Converter — The Tool Guru',
  description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text converter.',
  keywords: ['text case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/text-case-converter',
  },
  openGraph: {
    title: 'Text Case Converter — The Tool Guru',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text converter.',
    url: 'https://thetool.guru/tools/text-case-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Text Case Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Case Converter — The Tool Guru',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text converter.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default TextCaseConverterPage;
