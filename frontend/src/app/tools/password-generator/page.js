import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PasswordGenerator from '../../components/tools/PasswordGenerator';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: 'Password Generator — The Tool Guru',
  description: 'Generate strong, secure passwords with customizable options. Create random passwords with letters, numbers, and special characters.',
  keywords: ['password generator', 'secure password', 'random password', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/password-generator',
  },
  openGraph: {
    title: 'Password Generator — The Tool Guru',
    description: 'Generate strong, secure passwords with customizable options.',
    url: 'https://thetool.guru/tools/password-generator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Password Generator - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator — The Tool Guru',
    description: 'Generate strong, secure passwords with customizable options.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const PasswordGeneratorPage = async () => {
  // Get the password generator blog post from the service
  const passwordBlogPost = await blogService.getPostBySlug('ultimate-guide-to-password-generators');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PasswordGenerator />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Password Generator"
            description="Create strong, secure passwords instantly with our advanced password generator. Generate random passwords with customizable length, character types, and complexity options. Our tool uses cryptographically secure random number generation to ensure your passwords are truly random and secure. Perfect for creating passwords for online accounts, API keys, session tokens, and any application requiring secure authentication."
            features={[
              "Generate passwords from 4 to 128 characters in length",
              "Include or exclude uppercase letters, lowercase letters, numbers, and special characters",
              "Exclude similar characters (0, O, l, 1, I) to avoid confusion",
              "Exclude ambiguous characters for better readability",
              "Generate multiple passwords at once",
              "Copy passwords to clipboard with one click",
              "Password strength indicator shows security level",
              "Cryptographically secure random generation"
            ]}
            howToUse={[
              "Adjust the password length slider to your desired length (recommended: 12-16 characters)",
              "Select which character types to include: uppercase, lowercase, numbers, and special characters",
              "Enable 'Exclude similar' to avoid confusing characters like 0 and O",
              "Enable 'Exclude ambiguous' to remove characters that might be hard to read",
              "Click 'Generate Password' to create a new random password",
              "Use the copy button to copy the password to your clipboard",
              "Generate multiple passwords if you need several at once"
            ]}
            useCases={[
              "Create strong passwords for new online accounts",
              "Generate secure API keys and access tokens",
              "Create passwords for team accounts and shared services",
              "Generate temporary passwords for password resets",
              "Create passwords for database users and system accounts",
              "Generate secure keys for encryption and authentication",
              "Create passwords for development and testing environments",
              "Generate secure passwords for IoT devices and smart home systems"
            ]}
            tips={[
              "Use passwords at least 12-16 characters long for maximum security",
              "Include a mix of uppercase, lowercase, numbers, and special characters",
              "Don't reuse passwords across different accounts",
              "Consider using a password manager to store generated passwords securely",
              "Avoid using dictionary words or personal information in passwords",
              "Change passwords regularly, especially for sensitive accounts",
              "Use two-factor authentication in addition to strong passwords",
              "Never share your passwords or store them in plain text"
            ]}
            faq={[
              {
                question: "How secure are the generated passwords?",
                answer: "Our password generator uses cryptographically secure random number generation, ensuring that each password is truly random and unpredictable. This makes the passwords highly secure against brute-force attacks."
              },
              {
                question: "What's the recommended password length?",
                answer: "For most accounts, 12-16 characters is recommended. For highly sensitive accounts, consider 20+ characters. Longer passwords are exponentially more secure."
              },
              {
                question: "Should I include special characters?",
                answer: "Yes, including special characters significantly increases password complexity and security. However, make sure the system you're using accepts the special characters you generate."
              },
              {
                question: "Can I use these passwords for all my accounts?",
                answer: "While the passwords are secure, you should use a unique password for each account. Consider using a password manager to help you remember and organize multiple strong passwords."
              }
            ]}
          />
        </div>
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About Password Security
            </h2>
            <p className="text-lg text-gray-600">
              Discover why strong passwords are essential and how to protect your online accounts
            </p>
          </div>
          
          <ToolBlogPost 
            post={passwordBlogPost} 
            toolPath="/tools/password-generator"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PasswordGeneratorPage;


