import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RandomNumberGeneratorTool from '../../components/tools/RandomNumberGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Random Number Generator — The Tool Guru',
  description: 'Generate random numbers within a range, with optional uniqueness and count.',
  keywords: ['random', 'number', 'generator', 'rng', 'the tool guru'],
  openGraph: {
    title: 'Random Number Generator — The Tool Guru',
    description: 'Generate random numbers within a range, with optional uniqueness and count.',
  },
}

const RandomNumberGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <RandomNumberGeneratorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Random Number Generator"
            description="Generate random numbers within a specified range with optional uniqueness and count settings. Our random number generator creates truly random numbers using cryptographically secure methods. Perfect for lotteries, games, statistical sampling, testing, or any scenario requiring random numbers. The tool supports integer ranges, multiple number generation, and optional uniqueness to ensure no duplicates."
            features={[
              "Generate random numbers within a range",
              "Set minimum and maximum values",
              "Generate multiple random numbers",
              "Optional uniqueness (no duplicates)",
              "Copy generated numbers",
              "Cryptographically secure randomness",
              "Support for large number ranges",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Set the minimum value for the range",
              "Set the maximum value for the range",
              "Specify how many numbers to generate",
              "Enable uniqueness if you want no duplicates",
              "Click 'Generate' to create random numbers",
              "View the generated numbers",
              "Copy numbers for use",
              "Generate new numbers as needed"
            ]}
            useCases={[
              "Generate lottery numbers or random selections",
              "Create random test data",
              "Select random samples for statistics",
              "Generate random IDs or codes",
              "Create random game values",
              "Select random winners or participants",
              "Generate random passwords or tokens",
              "Create random sequences for testing"
            ]}
            tips={[
              "Use appropriate ranges for your use case",
              "Enable uniqueness when you need distinct numbers",
              "Generate multiple numbers for sampling",
              "Use for fair random selection processes",
              "Test randomness if needed for critical applications",
              "Copy numbers immediately if needed",
              "Generate new sets for different purposes"
            ]}
            faq={[
              {
                question: "How random are the generated numbers?",
                answer: "The tool uses cryptographically secure random number generation, providing truly random numbers suitable for most applications including security-sensitive uses."
              },
              {
                question: "Can I generate numbers with decimals?",
                answer: "The tool generates integers by default. For decimal numbers, you would need to generate integers and divide, or use a different approach."
              },
              {
                question: "What happens if I request more unique numbers than the range allows?",
                answer: "If you request more unique numbers than possible in the range, the tool will generate all possible numbers in that range. For example, requesting 100 unique numbers from 1-10 will return all 10 numbers."
              },
              {
                question: "Are the numbers truly random?",
                answer: "Yes, the tool uses cryptographically secure random number generation methods that produce truly random numbers, not pseudo-random sequences."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default RandomNumberGeneratorPage;


