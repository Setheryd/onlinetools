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
          description="Generate random numbers within a range you specify. Set a minimum and maximum value, choose how many numbers you need, and optionally require that all numbers be unique (no duplicates). The tool uses strong, unbiased randomness suitable for giveaways, sampling, games, testing, and simulations. Whether you need a single random number or a list of many, all generation happens in your browser—no server involvement—so your use case stays private and results are instant. Useful for educators, developers, event organizers, and anyone who needs fair, random outcomes without installing software."
          features={[
            'Set any minimum and maximum value for the range',
            'Generate one number or many numbers in a single run',
            'Optional "unique only" mode so no number repeats in the result',
            'Uses cryptographically strong randomness where available',
            'Copy the result list to clipboard for use elsewhere',
            'Runs entirely in your browser; no data sent to servers'
          ]}
          howToUse={[
            'Set the minimum and maximum values that define your range',
            'Choose how many random numbers you want to generate',
            'Enable "Unique only" if you need no duplicates (e.g., drawing winners)',
            'Click Generate to produce the numbers',
            'Copy the list or use the numbers as needed'
          ]}
          useCases={[
            'Giveaways and prize draws: pick random winners from a range of entry numbers',
            'Sampling: select random IDs or indices for surveys or testing',
            'Games and dice: simulate rolls or pick random values within a range',
            'Testing and simulations: seed scenarios with random inputs',
            'Education: demonstrate probability or randomness in class'
          ]}
          tips={[
            'Unique means no repeats. If you ask for more unique numbers than the range size (e.g., 10 unique numbers from 1–5), it is impossible; the tool will only return as many as possible.',
            'For giveaways, use a range matching your entries (e.g., 1 to 500 for 500 entries) and unique count 1 for one winner.',
            'For cryptographic or security-sensitive randomness, use a dedicated password or key generator.'
          ]}
          faq={[
            { question: 'Are the numbers truly random?', answer: 'The tool uses cryptographically strong randomness (e.g., Web Crypto API) where available, so outcomes are unbiased and unpredictable for normal use cases.' },
            { question: 'What does "unique" mean?', answer: 'When "unique only" is enabled, each number in the result is different—no duplicates. Disable it if repeats are allowed.' },
            { question: 'Can I use this for giveaways or contests?', answer: 'Yes. Set the range to match your entries (e.g., 1 to 100 for 100 entries), set count to the number of winners, enable unique, and generate. The result is a fair, random selection.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="random-number-generator" />
    </Body>
    <Footer />
  </div>
);

export default RandomNumberGeneratorPage;


