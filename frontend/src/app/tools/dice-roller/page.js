import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import DiceRollerTool from '../../components/tools/DiceRollerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Dice Roller — The Tool Guru',
  description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
  keywords: ['dice', 'roller', 'd6', 'd20', 'rng', 'the tool guru'],
  openGraph: {
    title: 'Dice Roller — The Tool Guru',
    description: 'Roll dice of various sizes with cryptographically strong randomness where available.',
  },
}

const DiceRollerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <DiceRollerTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Dice Roller"
            description="Roll dice of various sizes with cryptographically strong randomness. Our dice roller supports standard dice (d4, d6, d8, d10, d12, d20) and custom dice sizes. Perfect for tabletop games, role-playing games, decision-making, or any scenario requiring random dice rolls. The tool provides fair, random results with support for multiple dice and custom configurations."
            features={[
              "Roll standard dice (d4, d6, d8, d10, d12, d20)",
              "Support for custom dice sizes",
              "Roll multiple dice at once",
              "Cryptographically secure randomness",
              "View roll history",
              "Calculate totals for multiple dice",
              "Fair and unbiased results",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Select dice type (d6, d20, etc.) or enter custom size",
              "Choose how many dice to roll",
              "Click 'Roll Dice' to generate results",
              "View individual die results",
              "Check total if rolling multiple dice",
              "Review roll history",
              "Roll again as needed",
              "Use for games or decision-making"
            ]}
            useCases={[
              "Play tabletop and role-playing games",
              "Make random decisions",
              "Generate random numbers for games",
              "Use for game mechanics and rules",
              "Create random outcomes",
              "Test probability and randomness",
              "Add randomness to activities",
              "Simulate dice-based systems"
            ]}
            tips={[
              "Each die roll is independent and random",
              "Use standard dice for common games",
              "Custom dice sizes allow flexibility",
              "Roll multiple dice for sum totals",
              "Track history to see patterns",
              "Use for fair game outcomes",
              "Trust the randomness for unbiased results"
            ]}
            faq={[
              {
                question: "What dice sizes are supported?",
                answer: "The tool supports standard dice (d4, d6, d8, d10, d12, d20) and custom dice sizes. You can roll any size die from d2 to very large numbers."
              },
              {
                question: "Can I roll multiple dice at once?",
                answer: "Yes, you can roll multiple dice simultaneously. The tool will show individual results and calculate the total sum."
              },
              {
                question: "Are the dice rolls truly random?",
                answer: "Yes, the tool uses cryptographically secure random number generation, providing truly random dice rolls with equal probability for each face."
              },
              {
                question: "What's the difference between d6 and d20?",
                answer: "d6 is a six-sided die (1-6), commonly used in board games. d20 is a twenty-sided die (1-20), commonly used in role-playing games like Dungeons & Dragons."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default DiceRollerPage;


