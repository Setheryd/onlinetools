import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JsonFormatterTool from '../../components/tools/JsonFormatterTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: 'JSON Formatter & Validator — The Tool Guru',
  description: 'Format and validate JSON data with proper indentation and syntax highlighting. Free online JSON tool.',
  keywords: ['json formatter', 'json validator', 'json beautifier', 'online tool', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/json-formatter',
  },
  openGraph: {
    title: 'JSON Formatter & Validator — The Tool Guru',
    description: 'Format and validate JSON data with proper indentation and syntax highlighting.',
    url: 'https://thetool.guru/tools/json-formatter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'JSON Formatter & Validator - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Validator — The Tool Guru',
    description: 'Format and validate JSON data with proper indentation and syntax highlighting.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const JsonFormatterPage = async () => {
  // Get the JSON formatter blog post from the service
  const jsonBlogPost = await blogService.getPostBySlug('mastering-json-formatting-and-validation');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <JsonFormatterTool />
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About JSON Formatting
            </h2>
            <p className="text-lg text-gray-600">
              Discover why proper JSON formatting matters and how to validate your data
            </p>
          </div>
          
          <ToolBlogPost 
            post={jsonBlogPost} 
            toolPath="/tools/json-formatter"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default JsonFormatterPage;
