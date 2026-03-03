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
          description="Check password strength and get actionable suggestions to improve security. The tool evaluates length, variety of characters (uppercase, lowercase, numbers, symbols), and common weak patterns to give you a strength score and tips. Use it to learn what makes a password strong and to test sample or dummy passwords—never enter a real password you use elsewhere. All checking runs in your browser; nothing is sent to a server. Ideal for security awareness, testing password policies, or verifying a new password before you commit to it on a signup form."
          features={[
            'Strength score so you see how your password rates',
            'Suggestions to improve: add length, mix character types, avoid patterns',
            'Evaluation of length and character variety (uppercase, lowercase, numbers, symbols)',
            'Feedback on common weak patterns (e.g., sequences, repeated chars)',
            'All checks run in your browser; no data sent to servers',
            'Use test or dummy passwords only; never enter real credentials'
          ]}
          howToUse={[
            'Type or paste a sample password (e.g., a test value similar to what you might use)',
            'View the strength score and any suggestions shown',
            'Apply the tips to improve the password (e.g., add symbols, increase length)',
            'Use a password manager to store and generate strong passwords for real accounts'
          ]}
          useCases={[
            'Testing password policy: see if proposed rules produce strong enough passwords',
            'Learning what makes a strong password: experiment with length and character mix',
            'Checking before signup: test a new password idea without submitting it anywhere',
            'Security awareness: demonstrate to teams or students how strength is evaluated'
          ]}
          tips={[
            'Never enter a real password. Use a similar fake one to test (e.g., same length and character types).',
            'Prefer a password manager to generate and store strong, unique passwords for each account.',
            'Aim for at least 12 characters with a mix of letters, numbers, and symbols; avoid dictionary words and personal info.'
          ]}
          faq={[
            { question: 'Is my password sent anywhere?', answer: 'No. Checking runs entirely in your browser. Nothing is sent to a server. Even so, do not enter a real password—use a test value only.' },
            { question: 'What makes a password strong?', answer: 'Length (12+ characters), mix of uppercase, lowercase, numbers, and symbols, and avoiding dictionary words, sequences, or personal information.' },
            { question: 'Can I use this to check my company password policy?', answer: 'Yes. Enter sample passwords that meet or break your policy to see how they score and what suggestions appear. Use the results to refine requirements.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="password-strength-checker" />
    </Body>
    <Footer />
  </div>
);

export default PasswordStrengthCheckerPage;


