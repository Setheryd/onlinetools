import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import EmailValidatorTool from '../../components/tools/EmailValidatorTool';

export const metadata = {
  title: 'Email Validator — The Tool Guru',
  description: 'Validate email address format quickly and easily.',
  keywords: ['email validator', 'validate email', 'email format', 'regex', 'online tool'],
  openGraph: {
    title: 'Email Validator — The Tool Guru',
    description: 'Validate email address format quickly and easily.',
  },
}

const EmailValidatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <EmailValidatorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default EmailValidatorPage;


