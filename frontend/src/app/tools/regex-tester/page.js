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
          description="Test and debug regular expressions with real-time matching and highlighting. Enter a regex pattern and sample text to see which parts match, capture groups, and any syntax errors. Essential for developers and anyone learning or using regex in code, configs, or search. The tool uses JavaScript's RegExp (ECMAScript) flavor, so patterns are compatible with JS, Node, and many other environments. All processing runs in your browser—your patterns and text never leave your device. Use it to validate patterns before deploying, learn how regex works, or extract and verify data-matching logic."
          features={[
            'Real-time match highlighting so you see exactly what the pattern matches',
            'Capture groups displayed so you can verify (group1), (?:non-capture), etc.',
            'Clear error messages when the pattern has syntax errors',
            'Sample text area to paste or type test strings',
            'Support for flags: global (g), case-insensitive (i), multiline (m)',
            'Runs in your browser; no server uploads'
          ]}
          howToUse={[
            'Enter your regular expression in the pattern field',
            'Add flags (g, i, m) if you need global, case-insensitive, or multiline matching',
            'Enter or paste sample text in the test area',
            'View matches and capture groups in the output',
            'If the pattern is invalid, read the error message and fix the syntax, then retest'
          ]}
          useCases={[
            'Debug regex: quickly see why a pattern does or does not match',
            'Validate patterns before adding them to code or configs',
            'Learn regex: experiment with ., *, +, ?, [], (), and character classes',
            'Extract data patterns: test that your regex captures the right parts of a string'
          ]}
          tips={[
            'Use flags as needed: g for all matches, i for ignore case, m for ^ and $ per line. Escape special characters (e.g. \\. for a literal dot, \\( for parenthesis).',
            'In character classes [], many symbols lose special meaning—but - and ] may need escaping.',
            'Test with edge cases: empty string, long text, and strings with special characters.'
          ]}
          faq={[
            { question: 'What regex flavor is used?', answer: "JavaScript's RegExp (ECMAScript). Supports standard syntax: ., *, +, ?, [], (), |, \\d, \\w, \\s, anchors ^ and $, and common modifiers." },
            { question: 'Why is my regex not matching?', answer: 'Check escaping: . matches any character; \\. matches a literal dot. Use the g flag if you expect multiple matches. Ensure character classes and quantifiers are correct.' },
            { question: 'Can I test capture groups?', answer: 'Yes. Use parentheses in your pattern (e.g., (\\d+)) and the tool will show matched groups so you can verify extraction.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="regex-tester" />
    </Body>
    <Footer />
  </div>
);

export default RegexTesterPage;
