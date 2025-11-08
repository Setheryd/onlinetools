import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TextCaseConverterTool from '../../components/tools/TextCaseConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Text Case Converter — The Tool Guru',
  description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Free online text converter.',
  keywords: ['text case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'Text Case Converter — The Tool Guru',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more.',
  },
}

const TextCaseConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TextCaseConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Text Case Converter"
            description="Transform text between different case styles instantly with our comprehensive case converter. Whether you need to convert to uppercase, lowercase, title case, camelCase, PascalCase, snake_case, kebab-case, or any other text format, this tool handles all common case conversions. Perfect for developers, writers, and anyone working with text formatting, our converter ensures consistent text styling across documents, code, and content."
            features={[
              "Convert to uppercase, lowercase, and title case instantly",
              "Transform to camelCase and PascalCase for programming",
              "Convert to snake_case and kebab-case for file naming",
              "Sentence case conversion with proper capitalization",
              "Alternating case and inverse case transformations",
              "Real-time preview of converted text",
              "Copy to clipboard with one click",
              "Handle multiple lines and paragraphs correctly"
            ]}
            howToUse={[
              "Paste or type your text into the input field",
              "Select the desired case format from the conversion options",
              "View the converted text in the output area instantly",
              "Use the copy button to copy the converted text to your clipboard",
              "Clear both fields to start a new conversion",
              "Switch between different case formats to find the perfect style"
            ]}
            useCases={[
              "Format code variable names to camelCase or PascalCase",
              "Convert file names to snake_case or kebab-case for web compatibility",
              "Transform headings to title case for consistent document formatting",
              "Convert database column names to different naming conventions",
              "Format API endpoint names to kebab-case or camelCase",
              "Transform user input to proper case for display",
              "Convert CSS class names to different naming conventions",
              "Format JSON keys to match project style guidelines"
            ]}
            tips={[
              "Use camelCase for JavaScript variables and functions",
              "Use PascalCase for class names and constructor functions",
              "Use snake_case for Python variables and database columns",
              "Use kebab-case for CSS classes, HTML attributes, and URLs",
              "Title case is ideal for headings and document titles",
              "Remember that case conversion preserves special characters and numbers",
              "For code, ensure your converted text follows your project's style guide"
            ]}
            faq={[
              {
                question: "What's the difference between camelCase and PascalCase?",
                answer: "camelCase starts with a lowercase letter (e.g., 'myVariable'), while PascalCase starts with an uppercase letter (e.g., 'MyVariable'). Both capitalize the first letter of subsequent words."
              },
              {
                question: "Can I convert multiple paragraphs at once?",
                answer: "Yes, the tool handles multiple lines and paragraphs. Each line will be converted according to the selected case format."
              },
              {
                question: "Does the converter preserve special characters?",
                answer: "Yes, special characters, numbers, and punctuation are preserved during conversion. Only letters are affected by case transformation."
              },
              {
                question: "What is kebab-case used for?",
                answer: "kebab-case (also called hyphen-case) uses hyphens to separate words (e.g., 'my-variable-name'). It's commonly used for CSS classes, HTML attributes, and URL slugs."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default TextCaseConverterPage;
