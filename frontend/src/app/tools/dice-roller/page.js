import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import DiceRollerTool from '../../components/tools/DiceRollerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Dice Roller — The Tool Guru',
  description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
  keywords: ['dice', 'roller', 'd6', 'd20', 'rng', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/dice-roller',
  },
  openGraph: {
    title: 'Dice Roller — The Tool Guru',
    description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
    url: 'https://thetool.guru/tools/dice-roller',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Dice Roller — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dice Roller — The Tool Guru',
    description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const DiceRollerPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <DiceRollerTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Dice Roller"
          description="Roll dice of various sizes (d4, d6, d8, d10, d12, d20) with cryptographically strong randomness. Track rolls and totals. Perfect for tabletop games, RPGs, or any random number need. All rolls happen in your browser."
          features={[
            "Roll d4, d6, d8, d10, d12, d20",
            "Cryptographically random",
            "Roll multiple dice at once",
            "Track history and totals",
            "Copy or share results",
            "Works in your browser"
          ]}
          howToUse={[
            "Choose dice type and count",
            "Click Roll",
            "View result and history",
            "Roll again or change dice"
          ]}
          useCases={[
            "Tabletop and RPG games",
            "Random number generation",
            "Teaching probability",
            "Decisions and games"
          ]}
          tips={[
            "Each roll is independent. d20 = 20-sided; d6 = standard cube.",
            "Use multiple dice for sums (e.g. 2d6 for 2–12)."
          ]}
          faq={[
            { question: "Are the rolls random?", answer: "Yes. The tool uses cryptographically strong randomness where available (Web Crypto API), so outcomes are fair and unpredictable." },
            { question: "What do d4, d6, d20 mean?", answer: "The number is how many sides the die has. d6 = standard cube (1–6), d20 = twenty-sided (1–20), etc." },
            { question: "Can I roll multiple dice?", answer: "Yes. Select how many dice to roll; you'll see each result and usually a total where it makes sense." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="dice-roller" />
    </Body>
    <Footer />
  </div>
);

export default DiceRollerPage;
