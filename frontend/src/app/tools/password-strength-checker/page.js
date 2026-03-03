import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PasswordStrengthCheckerTool from '../../components/tools/PasswordStrengthCheckerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Password Strength Checker — The Tool Guru',
  description: 'Check password strength and get suggestions to improve security.',
  keywords: ['password', 'strength', 'checker', 'security', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/password-strength-checker',
  },
  openGraph: {
    title: 'Password Strength Checker — The Tool Guru',
    description: 'Check password strength and get suggestions to improve security.',
    url: 'https://thetool.guru/tools/password-strength-checker',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Password Strength Checker — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Strength Checker — The Tool Guru',
    description: 'Check password strength and get suggestions to improve security.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const PasswordStrengthCheckerPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <PasswordStrengthCheckerTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Password Strength Checker"
          description="Check password strength and get suggestions. See how length, variety of characters, and common patterns affect security. For awareness only—never enter a real password you use. All checks run in your browser."
          features={["Strength score", "Suggestions", "Length and character variety", "Runs in browser"]}
          howToUse={["Type or paste a sample password (e.g. a test value)", "View strength and tips", "Use suggestions to improve passwords elsewhere"]}
          useCases={["Testing policy", "Learning what makes a strong password", "Checking before signup"]}
          tips={["Never enter a real password. Use a similar fake one to test. Prefer a password manager for real passwords."]}
          faq={[
            { question: "Is my password sent anywhere?", answer: "No. Checking runs in your browser. Nothing is sent to a server. Still, do not enter a real password—use a test value." },
            { question: "What makes a password strong?", answer: "Length (12+), mix of letters, numbers, symbols, and avoiding dictionary words or personal info." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="password-strength-checker" />
    </Body>
    <Footer />
  </div>
);

export default PasswordStrengthCheckerPage;


