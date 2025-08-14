import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ScientificCalculatorTool from '../../components/tools/ScientificCalculatorTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import { blogService } from '../../utils/blogService';

export const metadata = {
  title: 'Scientific Calculator — The Tool Guru',
  description: 'An advanced scientific calculator with history, variables, DEG/RAD, and graphing.',
  keywords: ['scientific calculator', 'graphing calculator', 'math', 'trigonometry', 'algebra'],
  openGraph: {
    title: 'Scientific Calculator — The Tool Guru',
    description: 'Powerful calculator for complex math with graphing support.',
  },
};

const ScientificCalculatorPage = async () => {
  // Get the scientific calculator blog post from the service
  const scientificCalculatorBlogPost = await blogService.getPostBySlug('mastering-scientific-calculators');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <ScientificCalculatorTool />
        
        {/* Blog Post Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About Scientific Calculators
            </h2>
            <p className="text-lg text-gray-600">
              Discover the power of advanced mathematical functions and graphing capabilities
            </p>
          </div>
          
          <ToolBlogPost 
            post={scientificCalculatorBlogPost} 
            toolPath="/tools/scientific-calculator"
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default ScientificCalculatorPage;


