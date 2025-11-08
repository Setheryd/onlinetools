import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PasswordStrengthCheckerTool from '../../components/tools/PasswordStrengthCheckerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Password Strength Checker — The Tool Guru',
  description: 'Check password strength and get suggestions to improve security.',
  keywords: ['password', 'strength', 'checker', 'security', 'the tool guru'],
  openGraph: {
    title: 'Password Strength Checker — The Tool Guru',
    description: 'Check password strength and get suggestions to improve security.',
  },
}

const PasswordStrengthCheckerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PasswordStrengthCheckerTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Password Strength Checker"
            description="Check password strength and get suggestions to improve security. Our password strength checker analyzes passwords for complexity, length, character variety, and common patterns. Get real-time feedback on password strength, identify weaknesses, and receive suggestions for creating stronger, more secure passwords. Perfect for ensuring account security, creating strong passwords, or educating users about password best practices."
            features={[
              "Real-time password strength analysis",
              "Check password complexity and length",
              "Identify weak password patterns",
              "Suggest improvements for stronger passwords",
              "Check for common passwords",
              "Analyze character variety (uppercase, lowercase, numbers, symbols)",
              "Display strength score and rating",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter your password in the input field",
              "View real-time strength analysis",
              "Check strength score and rating",
              "Review identified weaknesses",
              "Read suggestions for improvement",
              "Use suggestions to create stronger passwords",
              "Verify password meets security requirements",
              "Test different password variations"
            ]}
            useCases={[
              "Check password strength before creating accounts",
              "Verify passwords meet security requirements",
              "Educate users about password security",
              "Test password policies and requirements",
              "Create strong passwords for important accounts",
              "Improve existing weak passwords",
              "Ensure password security best practices",
              "Validate password complexity"
            ]}
            tips={[
              "Use passwords with at least 12 characters",
              "Include uppercase, lowercase, numbers, and symbols",
              "Avoid common words and patterns",
              "Don't use personal information in passwords",
              "Use unique passwords for each account",
              "Consider using passphrases for better security",
              "Use password managers for strong, unique passwords"
            ]}
            faq={[
              {
                question: "What makes a strong password?",
                answer: "Strong passwords are long (12+ characters), include variety (uppercase, lowercase, numbers, symbols), avoid common words or patterns, and are unique to each account."
              },
              {
                question: "Is my password safe to check here?",
                answer: "The tool analyzes passwords locally in your browser without sending them to servers. However, for maximum security, consider checking passwords offline or using trusted tools."
              },
              {
                question: "What's the difference between password strength and security?",
                answer: "Password strength measures complexity and length. Security also depends on factors like uniqueness, not reusing passwords, and using two-factor authentication when available."
              },
              {
                question: "Should I use the same strong password everywhere?",
                answer: "No, use unique passwords for each account. Even a strong password becomes weak if it's reused and one account is compromised. Use a password manager to handle multiple strong passwords."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PasswordStrengthCheckerPage;


