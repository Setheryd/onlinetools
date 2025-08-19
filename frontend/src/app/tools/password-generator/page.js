import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PasswordGenerator from '../../components/tools/PasswordGenerator';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
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


