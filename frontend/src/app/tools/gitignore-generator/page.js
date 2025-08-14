import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import GitignoreGeneratorTool from '../../components/tools/GitignoreGeneratorTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: '.gitignore Generator — The Tool Guru',
  description: 'Compose .gitignore files from popular templates and custom entries.',
  keywords: ['gitignore', 'generator', 'git', 'templates'],
  openGraph: {
    title: '.gitignore Generator — The Tool Guru',
    description: 'Generate .gitignore easily.',
  },
};

const GitignoreGeneratorPage = async () => {
  // Get the gitignore generator blog post from the service
  const gitignoreBlogPost = await blogService.getPostBySlug('ultimate-guide-to-gitignore-files');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <GitignoreGeneratorTool />
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About .gitignore Files
            </h2>
            <p className="text-lg text-gray-600">
              Master the art of creating clean, secure, and professional Git repositories
            </p>
          </div>
          
          <ToolBlogPost 
            post={gitignoreBlogPost} 
            toolPath="/tools/gitignore-generator"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default GitignoreGeneratorPage;


