import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Base64Tool from '../../components/tools/Base64Tool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: 'Base64 Encoder/Decoder — The Tool Guru',
  description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 back to text instantly. No registration required.',
  keywords: ['base64', 'encoder', 'decoder', 'online tool', 'text encoding', 'data encoding', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/base64',
  },
  openGraph: {
    title: 'Base64 Encoder/Decoder — The Tool Guru',
    description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 back to text instantly.',
    url: 'https://thetool.guru/tools/base64',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Base64 Encoder/Decoder - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder/Decoder — The Tool Guru',
    description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 back to text instantly.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const Base64Page = async () => {
  // Get the Base64 blog post from the service
  const base64BlogPost = await blogService.getPostBySlug('getting-started-with-base64-encoding');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <Base64Tool />
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About Base64 Encoding
            </h2>
            <p className="text-lg text-gray-600">
              Discover how Base64 encoding works and when to use it in your projects
            </p>
          </div>
          
          <ToolBlogPost 
            post={base64BlogPost} 
            toolPath="/tools/base64"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default Base64Page;


