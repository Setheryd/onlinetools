import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TextDiffTool from '../../components/tools/TextDiffTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Text Diff Checker — OnlineTools',
  description:
    'Compare two texts and see the differences highlighted. Perfect for code reviews, document comparisons, and content analysis.',
  keywords: ['text diff', 'difference checker', 'compare text', 'code review', 'document comparison']
};

const TextDiffPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TextDiffTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Text Diff Checker"
            description="Compare two texts and see the differences highlighted side-by-side. Our text diff checker uses advanced algorithms to identify additions, deletions, and modifications between two text versions. Perfect for code reviews, document comparisons, version control, content analysis, and tracking changes. The tool highlights differences with color coding, making it easy to spot what changed between two versions of text."
            features={[
              "Compare two texts side-by-side",
              "Highlight additions, deletions, and modifications",
              "Color-coded difference visualization",
              "Line-by-line and word-by-word comparison",
              "Support for code, documents, and plain text",
              "Copy differences to clipboard",
              "Handle large text files efficiently",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter or paste the original text in the first field",
              "Enter or paste the modified text in the second field",
              "Click 'Compare' to analyze differences",
              "View highlighted differences in the output",
              "Review additions (green), deletions (red), and changes",
              "Use the results for code reviews or document comparison",
              "Copy the diff output if needed"
            ]}
            useCases={[
              "Compare code versions during code reviews",
              "Track changes in documents and content",
              "Compare configuration files",
              "Review edits and revisions",
              "Verify changes in text files",
              "Compare API responses or data outputs",
              "Review document versions and updates",
              "Analyze differences in logs or outputs"
            ]}
            tips={[
              "Use consistent formatting for better comparison",
              "Compare similar text structures for accurate results",
              "Review both additions and deletions carefully",
              "Use diff results to understand what changed",
              "Save diff outputs for documentation",
              "Compare text in the same format for best results",
              "Use diff for version control and change tracking"
            ]}
            faq={[
              {
                question: "How does text diff work?",
                answer: "Text diff uses algorithms to compare two texts character by character or word by word, identifying what was added, removed, or modified. Differences are highlighted with colors for easy visualization."
              },
              {
                question: "Can I compare code files?",
                answer: "Yes, the tool works with any text including code. It will highlight differences in code, comments, and formatting between two versions."
              },
              {
                question: "What's the difference between line-by-line and word-by-word diff?",
                answer: "Line-by-line compares entire lines, while word-by-word compares individual words. Word-by-word is more precise but can be more detailed."
              },
              {
                question: "Can I compare very large texts?",
                answer: "The tool can handle reasonably large texts. Very large files (over several MB) may take longer to process or may need to be compared in sections."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default TextDiffPage;
