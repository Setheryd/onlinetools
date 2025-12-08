import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CoinFlipperTool from '../../components/tools/CoinFlipperTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Coin Flipper — The Tool Guru',
  description: 'Flip a virtual coin with history and simple stats.',
  keywords: ['coin', 'flip', 'heads', 'tails', 'random', 'the tool guru'],
  openGraph: {
    title: 'Coin Flipper — The Tool Guru',
    description: 'Flip a virtual coin with history and simple stats.',
  },
}

const CoinFlipperPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <CoinFlipperTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Coin Flipper"
            description="Flip a virtual coin with history tracking and simple statistics. Our coin flipper provides a fair, random coin flip using cryptographically secure randomness. Track flip history, view statistics (heads vs tails), and use for decision-making, games, or any scenario requiring a random binary choice. The tool maintains flip history and provides accurate statistics over time."
            features={[
              "Flip virtual coins with true randomness",
              "Track flip history",
              "View statistics (heads vs tails count)",
              "Cryptographically secure randomness",
              "Simple and intuitive interface",
              "Clear visual feedback",
              "Reset history option",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Click 'Flip Coin' to flip the coin",
              "View the result (heads or tails)",
              "Check flip history",
              "Review statistics",
              "Continue flipping as needed",
              "Reset history if desired",
              "Use for decision-making or games",
              "Track results over time"
            ]}
            useCases={[
              "Make simple binary decisions",
              "Play coin flip games",
              "Break ties or make random choices",
              "Teach probability and randomness",
              "Use for decision-making",
              "Create random binary outcomes",
              "Test randomness and probability",
              "Add randomness to games or activities"
            ]}
            tips={[
              "Each flip is independent and random",
              "Statistics approach 50/50 over many flips",
              "Use for fair, unbiased decisions",
              "Track history to see patterns",
              "Reset history to start fresh",
              "Use for teaching probability concepts",
              "Trust the randomness for fair outcomes"
            ]}
            faq={[
              {
                question: "Is the coin flip truly random?",
                answer: "Yes, the tool uses cryptographically secure random number generation, providing truly random coin flips with equal probability for heads and tails."
              },
              {
                question: "Why do I sometimes get many heads or tails in a row?",
                answer: "Random sequences can include streaks. While each flip has 50/50 probability, short-term sequences may show patterns. Over many flips, results approach 50/50."
              },
              {
                question: "Can I use this for important decisions?",
                answer: "The coin flipper provides fair, random results suitable for decision-making. However, for important decisions, consider all factors, not just random chance."
              },
              {
                question: "How accurate are the statistics?",
                answer: "Statistics are calculated from actual flip history. Over many flips, they should approach 50/50 for heads and tails, reflecting true probability."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default CoinFlipperPage;


