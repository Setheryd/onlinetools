import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import LoremIpsumTool from '../../components/tools/LoremIpsumTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Lorem Ipsum Generator — OnlineTools',
  description:
    'Generate Lorem Ipsum placeholder text with customizable paragraphs, sentences, and words. Perfect for design mockups and content planning.',
  keywords: ['lorem ipsum', 'placeholder text', 'generator', 'design', 'mockup', 'content']
};

const LoremIpsumPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <LoremIpsumTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Lorem Ipsum Generator"
            description="Generate professional Lorem Ipsum placeholder text for design mockups, wireframes, and content planning. Lorem Ipsum has been the industry standard dummy text since the 1500s, providing realistic-looking text that doesn't distract from the design. Our generator creates authentic Latin-based placeholder text with customizable paragraphs, sentences, and word counts."
            features={[
              "Generate customizable Lorem Ipsum text with specific word counts",
              "Control number of paragraphs and sentences per paragraph",
              "Include classic 'Lorem ipsum dolor sit amet...' opening",
              "Generate HTML-wrapped paragraphs for web development",
              "Real-time text generation with instant preview",
              "Copy generated text to clipboard with one click",
              "Professional-quality Latin text for realistic mockups",
              "No limits on text length or generation count"
            ]}
            howToUse={[
              "Set the number of paragraphs you want (1-20)",
              "Specify sentences per paragraph (1-15)",
              "Set your target word count (10-1000 words)",
              "Choose whether to include the classic Lorem Ipsum opening",
              "Select HTML output format if you need paragraph tags",
              "Click 'Generate' to create your Lorem Ipsum text",
              "Copy the generated text to use in your designs or code",
              "Generate new text as many times as needed"
            ]}
            useCases={[
              "Fill design mockups and wireframes with realistic text",
              "Test text rendering and layout behavior in web development",
              "Estimate space requirements for articles and documents",
              "Create placeholder content for content management systems",
              "Design email templates and newsletters with sample text",
              "Test typography and font choices in design projects",
              "Create presentation templates with professional-looking content",
              "Plan content layouts before writing actual copy"
            ]}
            tips={[
              "Use smaller paragraph counts for short content areas like sidebars",
              "Higher sentence counts create more natural-looking text blocks",
              "The word count is approximate and may vary slightly",
              "HTML output is perfect for pasting directly into HTML/CMS editors",
              "Use the classic opening for traditional Lorem Ipsum appearance",
              "Generate multiple versions to find the perfect text length",
              "Combine with design tools to create realistic mockups quickly"
            ]}
            faq={[
              {
                question: "What is Lorem Ipsum?",
                answer: "Lorem Ipsum is dummy text used in the printing and typesetting industry since the 1500s. It's derived from Latin text by Cicero, but scrambled to create nonsensical placeholder text."
              },
              {
                question: "Why use Lorem Ipsum instead of real text?",
                answer: "Lorem Ipsum looks like real text but doesn't distract from design. Real text can draw attention to content rather than layout, typography, and visual design elements."
              },
              {
                question: "Can I customize the word count exactly?",
                answer: "The word count is a target - the generator aims for that count but may vary slightly to create natural-looking paragraphs and sentences."
              },
              {
                question: "Is the generated text random?",
                answer: "The text uses authentic Latin words from the traditional Lorem Ipsum vocabulary, arranged randomly to create realistic-looking placeholder text."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default LoremIpsumPage;
