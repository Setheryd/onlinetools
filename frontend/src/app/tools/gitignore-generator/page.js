import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import GitignoreGeneratorTool from '../../components/tools/GitignoreGeneratorTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName=".gitignore Generator"
            description="Compose .gitignore files from popular templates and custom entries. Our .gitignore generator helps you create comprehensive .gitignore files for your projects by combining templates for common languages, frameworks, and tools. Perfect for setting up new Git repositories, ensuring sensitive files aren't committed, or creating project-specific ignore rules. The tool supports templates for Node.js, Python, Java, C++, and many other technologies."
            features={[
              "Generate .gitignore files from templates",
              "Support for popular languages and frameworks",
              "Add custom ignore patterns",
              "Combine multiple templates",
              "Preview generated .gitignore content",
              "Download .gitignore file",
              "Copy to clipboard",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Select templates for your project (Node.js, Python, etc.)",
              "Add custom ignore patterns if needed",
              "Review the generated .gitignore content",
              "Edit or customize patterns as necessary",
              "Copy the .gitignore content",
              "Save as .gitignore in your project root",
              "Use for new or existing Git repositories",
              "Update .gitignore as your project evolves"
            ]}
            useCases={[
              "Set up .gitignore for new Git repositories",
              "Create project-specific ignore rules",
              "Ensure sensitive files aren't committed",
              "Ignore build artifacts and dependencies",
              "Exclude IDE and editor files",
              "Create comprehensive ignore rules",
              "Standardize .gitignore across projects",
              "Protect API keys and secrets"
            ]}
            tips={[
              "Select templates matching your project type",
              "Add custom patterns for project-specific files",
              "Review generated content before using",
              "Keep .gitignore updated as project evolves",
              "Use for both new and existing repositories",
              "Test .gitignore to ensure it works correctly",
              "Commit .gitignore to share with team"
            ]}
            faq={[
              {
                question: "What is a .gitignore file?",
                answer: ".gitignore is a Git configuration file that specifies which files and directories Git should ignore. Files listed in .gitignore won't be tracked or committed to the repository."
              },
              {
                question: "Why do I need a .gitignore file?",
                answer: ".gitignore prevents committing sensitive files (API keys, passwords), build artifacts, dependencies, and temporary files. It keeps your repository clean and secure."
              },
              {
                question: "Can I use multiple templates?",
                answer: "Yes, you can combine multiple templates. For example, if your project uses Node.js and Python, select both templates to generate a comprehensive .gitignore."
              },
              {
                question: "Where should I place .gitignore?",
                answer: ".gitignore should be placed in the root directory of your Git repository. It applies to that directory and all subdirectories."
              }
            ]}
          />
        </div>
        
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


