import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PasswordStrengthCheckerTool from '../../components/tools/PasswordStrengthCheckerTool';

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
      </Body>
      <Footer />
    </div>
  );
};

export default PasswordStrengthCheckerPage;


