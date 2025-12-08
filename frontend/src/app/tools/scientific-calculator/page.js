import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ScientificCalculatorTool from '../../components/tools/ScientificCalculatorTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Scientific Calculator"
            description="An advanced scientific calculator with history, variables, DEG/RAD mode switching, and graphing capabilities. Our scientific calculator provides comprehensive mathematical functions including trigonometry, logarithms, exponentials, and more. Perfect for students, engineers, scientists, or anyone requiring advanced mathematical calculations. The tool supports complex expressions, variable storage, calculation history, and graphical visualization of functions."
            features={[
              "Advanced mathematical functions (trigonometry, logarithms, exponentials)",
              "Calculation history tracking",
              "Variable storage and recall",
              "DEG/RAD mode switching",
              "Graphing capabilities",
              "Complex expression evaluation",
              "Parentheses and operator precedence",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter mathematical expressions using the calculator interface",
              "Use function buttons for trigonometry, logarithms, etc.",
              "Switch between DEG and RAD modes as needed",
              "Store values in variables for later use",
              "View calculation history",
              "Graph functions if supported",
              "Use parentheses for complex expressions",
              "Evaluate expressions and view results"
            ]}
            useCases={[
              "Perform advanced mathematical calculations",
              "Solve trigonometry problems",
              "Calculate logarithms and exponentials",
              "Graph mathematical functions",
              "Store and recall variable values",
              "Track calculation history",
              "Solve engineering problems",
              "Perform scientific calculations"
            ]}
            tips={[
              "Use DEG mode for degrees, RAD mode for radians",
              "Use parentheses to control calculation order",
              "Store frequently used values in variables",
              "Review calculation history for verification",
              "Use graphing to visualize functions",
              "Understand function precedence for accurate results",
              "Use for complex mathematical calculations"
            ]}
            faq={[
              {
                question: "What functions are supported?",
                answer: "The calculator supports trigonometry (sin, cos, tan), logarithms (log, ln), exponentials, powers, roots, and basic arithmetic operations."
              },
              {
                question: "What's the difference between DEG and RAD modes?",
                answer: "DEG mode uses degrees (0-360) for angle measurements, while RAD mode uses radians (0-2π). Use DEG for most practical calculations, RAD for advanced mathematics."
              },
              {
                question: "Can I graph functions?",
                answer: "Yes, the calculator includes graphing capabilities to visualize mathematical functions and understand their behavior."
              },
              {
                question: "How do I use variables?",
                answer: "Store values in variables using the variable storage feature, then recall them later in calculations for convenience and efficiency."
              }
            ]}
          />
        </div>
        
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


