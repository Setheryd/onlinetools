import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RegexTesterTool from '../../components/tools/RegexTesterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Regex Tester — The Tool Guru',
  description: 'Test and debug regular expressions with real-time matching and highlighting. Free online regex tester tool.',
  keywords: ['regex tester', 'regular expression', 'pattern matching', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/regex-tester',
  },
  openGraph: {
    title: 'Regex Tester — The Tool Guru',
    description: 'Test and debug regular expressions with real-time matching and highlighting. Free online regex tester tool.',
    url: 'https://thetool.guru/tools/regex-tester',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Regex Tester — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tester — The Tool Guru',
    description: 'Test and debug regular expressions with real-time matching and highlighting. Free online regex tester tool.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

export default RegexTesterPage;
