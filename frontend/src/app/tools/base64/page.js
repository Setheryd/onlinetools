import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Base64Tool from '../../components/tools/Base64Tool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Base64 Encoder/Decoder"
            description="Encode text to Base64 and decode Base64 back to text instantly. Base64 encoding converts binary data into ASCII text format, making it safe for transmission across text-based protocols like email, HTTP, and JSON. Essential for web developers, system administrators, and anyone working with data encoding and transmission."
            features={[
              "Encode text and binary data to Base64 format",
              "Decode Base64 strings back to original text",
              "Handle Unicode characters and special characters",
              "Real-time encoding and decoding as you type",
              "Copy encoded or decoded text to clipboard",
              "Support for large text inputs",
              "Works entirely in your browser for privacy",
              "No data sent to servers - all processing is local"
            ]}
            howToUse={[
              "Enter or paste the text you want to encode or decode",
              "Click 'Encode' to convert text to Base64 format",
              "Click 'Decode' to convert Base64 back to readable text",
              "View the result in the output field",
              "Use the copy button to copy the encoded or decoded text",
              "Switch between encode and decode modes as needed"
            ]}
            useCases={[
              "Encode data for transmission in JSON APIs",
              "Encode images and files as data URLs in HTML",
              "Encode credentials and tokens for HTTP authentication",
              "Decode Base64 data received from APIs or services",
              "Encode binary data for storage in text-only systems",
              "Encode email attachments in MIME messages",
              "Encode configuration data in text-based config files",
              "Decode Base64 strings from logs and debugging output"
            ]}
            tips={[
              "Base64 encoding increases data size by approximately 33%",
              "Use Base64 for data transmission, not for encryption or security",
              "Base64 is commonly used in data URLs (data:image/png;base64,...)",
              "Decode Base64 when debugging API responses or logs",
              "Use Base64 for embedding small images directly in HTML/CSS",
              "Remember that Base64 is encoding, not encryption - it's easily reversible",
              "Base64 strings always end with = or == for padding"
            ]}
            faq={[
              {
                question: "What is Base64 encoding?",
                answer: "Base64 is an encoding scheme that converts binary data into ASCII text using 64 characters (A-Z, a-z, 0-9, +, /). It's used to transmit binary data over text-based protocols."
              },
              {
                question: "Is Base64 encryption?",
                answer: "No, Base64 is encoding, not encryption. It's easily reversible and provides no security. Anyone can decode Base64 data."
              },
              {
                question: "Why does Base64 output have = at the end?",
                answer: "The = characters are padding to ensure the Base64 string length is a multiple of 4. This is required by the Base64 standard."
              },
              {
                question: "Can I encode images with Base64?",
                answer: "Yes, images can be encoded to Base64 and used in data URLs. However, Base64 increases file size by about 33%, so it's best for small images."
              }
            ]}
          />
        </div>
        
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


