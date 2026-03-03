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

const RegexTesterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RegexTesterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Regex Tester"
          description="Test and debug regular expressions with real-time matching and highlighting. Enter a pattern and sample text to see matches, groups, and errors. Essential for developers. All processing in your browser."
          features={["Real-time match highlighting", "Capture groups", "Error messages", "Sample text", "Copy pattern", "Works in browser"]}
          howToUse={["Enter a regex pattern", "Enter or paste test text", "View matches and groups", "Fix pattern and retest"]}
          useCases={["Debug regex", "Validate patterns", "Learn regex", "Extract data patterns"]}
          tips={["Use flags (g, i, m) as needed. Escape special chars in the pattern (e.g. \\. for a dot)."]}
          faq={[
            { question: "What regex flavor is used?", answer: "JavaScript's RegExp (ECMAScript). Supports standard syntax: ., *, +, ?, [], (), |, \\d, \\w, etc." },
            { question: "Why is my regex not matching?", answer: "Check escaping (e.g. . matches any char; \\. matches a literal dot). Ensure flags (g for global) if you expect multiple matches." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="regex-tester" />
    </Body>
    <Footer />
  </div>
);

export default RegexTesterPage;
