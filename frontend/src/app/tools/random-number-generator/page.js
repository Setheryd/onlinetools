import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RandomNumberGeneratorTool from '../../components/tools/RandomNumberGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Random Number Generator — The Tool Guru',
  description: 'Generate random numbers within a range, with optional uniqueness and count.',
  keywords: ['random', 'number', 'generator', 'rng', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/random-number-generator',
  },
  openGraph: {
    title: 'Random Number Generator — The Tool Guru',
    description: 'Generate random numbers within a range, with optional uniqueness and count.',
    url: 'https://thetool.guru/tools/random-number-generator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Random Number Generator — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Number Generator — The Tool Guru',
    description: 'Generate random numbers within a range, with optional uniqueness and count.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const RandomNumberGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RandomNumberGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Random Number Generator"
          description="Generate random numbers within a range. Choose min/max, how many numbers, and whether they should be unique. Uses strong randomness. Perfect for giveaways, sampling, or any use that needs unbiased random numbers. All in your browser."
          features={["Set min and max range", "Generate one or many numbers", "Optional unique-only", "Strong randomness", "Copy results", "Works in browser"]}
          howToUse={["Set min and max", "Choose count and unique option", "Click Generate", "Copy or use the numbers"]}
          useCases={["Giveaways and draws", "Sampling", "Games", "Testing", "Simulations"]}
          tips={["Unique = no repeats. For a range smaller than count, not all can be unique."]}
          faq={[
            { question: "Are the numbers truly random?", answer: "The tool uses cryptographically strong randomness where available, so outcomes are unbiased and unpredictable." },
            { question: "What does unique mean?", answer: "When unique is enabled, each number in the result is different (no duplicates)." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="random-number-generator" />
    </Body>
    <Footer />
  </div>
);

export default RandomNumberGeneratorPage;


