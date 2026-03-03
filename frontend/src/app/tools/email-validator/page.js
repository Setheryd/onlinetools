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

export default EmailValidatorPage;


