import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import EmailValidatorTool from '../../components/tools/EmailValidatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Email Validator — The Tool Guru',
  description: 'Validate email address format quickly and easily.',
  keywords: ['email validator', 'validate email', 'email format', 'regex', 'online tool'],
  alternates: {
    canonical: 'https://thetool.guru/tools/email-validator',
  },
  openGraph: {
    title: 'Email Validator — The Tool Guru',
    description: 'Validate email address format quickly and easily.',
    url: 'https://thetool.guru/tools/email-validator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Email Validator — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Validator — The Tool Guru',
    description: 'Validate email address format quickly and easily.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const EmailValidatorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <EmailValidatorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Email Validator"
          description="Validate email address format quickly. Checks syntax (local part, @, domain), common typos, and invalid patterns. Use before sending or storing emails. Does not verify deliverability—only format. All in your browser."
          features={["Format validation", "Syntax check", "Common typo hints", "Instant result", "Works in browser"]}
          howToUse={["Enter or paste an email address", "View valid/invalid and any hints", "Fix and recheck if needed"]}
          useCases={["Form validation", "Data cleaning", "Signup flows", "Contact lists"]}
          tips={["Format valid does not mean the mailbox exists. For deliverability use an email verification service."]}
          faq={[
            { question: "Does this check if the email exists?", answer: "No. This tool only validates format (syntax). It does not send mail or check if the address is deliverable." },
            { question: "What makes an email invalid?", answer: "Missing @, invalid characters, bad domain format, or other syntax issues. The tool will indicate what is wrong." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="email-validator" />
    </Body>
    <Footer />
  </div>
);

export default EmailValidatorPage;


