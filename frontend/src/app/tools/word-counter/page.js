import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WordCounterTool from '../../components/tools/WordCounterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Word Counter — OnlineTools',
  description:
    'Count words, characters, sentences, and paragraphs in your text. Get detailed statistics and analysis for writing projects.',
  keywords: ['word counter', 'character count', 'text analysis', 'writing', 'statistics', 'content']
};

const WordCounterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <WordCounterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Word Counter"
            description="Get comprehensive text statistics and analysis with our advanced word counter. Count words, characters (with and without spaces), sentences, paragraphs, and reading time. Perfect for writers, students, content creators, and professionals who need accurate text metrics for articles, essays, social media posts, and any written content."
            features={[
              "Count words, characters, characters without spaces, and paragraphs",
              "Calculate sentences and average words per sentence",
              "Estimate reading time based on average reading speed",
              "Real-time statistics as you type or paste text",
              "Support for multiple languages and character sets",
              "Handle large texts efficiently",
              "Copy statistics to clipboard",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Paste your text into the input field or start typing",
              "View real-time statistics in the results panel",
              "Check word count, character count, and other metrics",
              "Review reading time estimates for your content",
              "Use the statistics for your writing goals and requirements",
              "Copy the statistics if needed for documentation"
            ]}
            useCases={[
              "Meet word count requirements for essays and articles",
              "Check character limits for social media posts (Twitter, LinkedIn, etc.)",
              "Estimate reading time for blog posts and articles",
              "Analyze writing style and sentence structure",
              "Track writing progress and goals",
              "Verify content length for SEO and marketing requirements",
              "Check text length for email subject lines and descriptions",
              "Analyze text for content planning and editorial calendars"
            ]}
            tips={[
              "Use word count to ensure your content meets platform requirements",
              "Character count is important for platforms with strict limits (like Twitter)",
              "Reading time helps readers know how long content will take to consume",
              "Average words per sentence indicates writing complexity",
              "Paragraph count helps structure long-form content",
              "Use statistics to optimize content for different platforms",
              "Track your writing progress by monitoring word counts over time"
            ]}
            faq={[
              {
                question: "What's the difference between characters and characters without spaces?",
                answer: "Characters includes all characters including spaces. Characters without spaces excludes spaces, which is useful for platforms that count only visible characters."
              },
              {
                question: "How is reading time calculated?",
                answer: "Reading time is typically calculated based on average reading speed of 200-250 words per minute. This gives an estimate of how long it takes to read the content."
              },
              {
                question: "Does the counter work with multiple languages?",
                answer: "Yes, the word counter works with any language and character set. It counts words based on whitespace separation and handles Unicode characters properly."
              },
              {
                question: "Can I count words in formatted text?",
                answer: "The counter works with plain text. If you paste formatted text, it will count all visible words. Formatting characters are typically not counted as words."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default WordCounterPage;
