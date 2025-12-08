import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RegexTesterTool from '../../components/tools/RegexTesterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Regex Tester — The Tool Guru',
  description: 'Test and debug regular expressions with real-time matching and highlighting. Free online regex tester tool.',
  keywords: ['regex tester', 'regular expression', 'pattern matching', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'Regex Tester — The Tool Guru',
    description: 'Test and debug regular expressions with real-time matching and highlighting.',
  },
}

const RegexTesterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <RegexTesterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Regex Tester"
            description="Test and debug regular expressions with real-time matching and highlighting. Our regex tester provides an interactive environment to write, test, and refine regular expressions. See matches highlighted in real-time, test against multiple strings, and understand how your patterns work. Perfect for developers learning regex, debugging complex patterns, or validating regular expressions before using them in code. Essential for anyone working with pattern matching, text processing, or data validation."
            features={[
              "Real-time regex matching and highlighting",
              "Test against multiple input strings",
              "Visual match highlighting",
              "Support for all regex flags (global, case-insensitive, multiline, etc.)",
              "Match groups and capture groups display",
              "Error detection and reporting",
              "Copy regex patterns for use in code",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter your regular expression pattern in the regex field",
              "Add test strings in the input field",
              "Select regex flags (global, case-insensitive, etc.)",
              "View real-time match results",
              "See highlighted matches in the input text",
              "Review match groups and captured groups",
              "Debug and refine your pattern as needed",
              "Copy the final regex for use in your code"
            ]}
            useCases={[
              "Learn and practice regular expressions",
              "Debug complex regex patterns",
              "Test regex before using in code",
              "Validate email, phone, or other data formats",
              "Extract specific patterns from text",
              "Test regex for form validation",
              "Understand how regex patterns work",
              "Create and refine regex for text processing"
            ]}
            tips={[
              "Start with simple patterns and build complexity",
              "Use flags appropriately (global for multiple matches, case-insensitive for flexibility)",
              "Test with various input strings including edge cases",
              "Use capture groups to extract specific parts",
              "Escape special characters when matching literals",
              "Test with both matching and non-matching strings",
              "Review match groups to understand pattern behavior"
            ]}
            faq={[
              {
                question: "What is a regular expression?",
                answer: "A regular expression (regex) is a pattern that describes a set of strings. It's used for pattern matching, searching, and text manipulation in programming and text processing."
              },
              {
                question: "What regex flavors are supported?",
                answer: "The tool typically supports JavaScript regex syntax, which is similar to other common regex flavors. Check the tool documentation for specific syntax support."
              },
              {
                question: "Can I test multiple strings at once?",
                answer: "Yes, you can test your regex against multiple input strings. The tool will show matches for each string separately."
              },
              {
                question: "What are regex flags?",
                answer: "Regex flags modify how the pattern is matched. Common flags include: g (global - find all matches), i (case-insensitive), m (multiline), and s (dotall)."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default RegexTesterPage;
