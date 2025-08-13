import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PasswordGenerator from '../../components/tools/PasswordGenerator';

export const metadata = {
  title: 'Password Generator — The Tool Guru',
  description: 'Generate strong, secure passwords with customizable options. Create random passwords with letters, numbers, and special characters.',
  keywords: ['password generator', 'secure password', 'random password', 'online tool', 'the tool guru'],
  openGraph: {
    title: 'Password Generator — The Tool Guru',
    description: 'Generate strong, secure passwords with customizable options.',
  },
}

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


