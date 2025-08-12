import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PasswordGenerator from '../../components/tools/PasswordGenerator';

export const metadata = {
  title: 'Password Generator — OnlineTools',
  description:
    'Generate secure, random passwords with customizable length and character sets. 100% in-browser.',
  keywords: ['password', 'generator', 'secure', 'random', 'security', 'strong password']
};

const PasswordGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PasswordGenerator />
      </Body>
      <Footer />
    </div>
  );
};

export default PasswordGeneratorPage;


