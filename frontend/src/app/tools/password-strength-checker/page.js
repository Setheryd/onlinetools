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

export default PasswordStrengthCheckerPage;


