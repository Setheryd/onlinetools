import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WebsiteScreenshotTool from '../../components/tools/WebsiteScreenshotTool';
import ToolBlogPost from '../../components/blog/ToolBlogPost';
import ToolContentSection from '../../components/tools/ToolContentSection';
import { blogService } from '../../utils/blogService';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'Website Screenshot Tool — The Tool Guru',
  description: 'Capture full-page screenshots of websites in high resolution. Choose from multiple formats (PNG, JPG, WebP) and customize viewport width for perfect screenshots.',
  keywords: ['website screenshot', 'webpage capture', 'full page screenshot', 'png', 'jpg', 'webp', '4k resolution', 'the tool guru'],
  openGraph: {
    title: 'Website Screenshot Tool — The Tool Guru',
    description: 'Capture full-page screenshots of websites in high resolution. Choose from multiple formats and customize viewport width.',
    type: 'website',
    url: 'https://thetool.guru/tools/website-screenshot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Screenshot Tool — The Tool Guru',
    description: 'Capture full-page screenshots of websites in high resolution.',
  },
};

const WebsiteScreenshotPage = async () => {
  // Try to get a related blog post (you can create one later)
  let blogPost = null;
  try {
    blogPost = await blogService.getPostBySlug('complete-guide-to-website-screenshots');
  } catch (error) {
    // Blog post doesn't exist yet, that's fine
    console.log('Blog post not found, continuing without it');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <WebsiteScreenshotTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Website Screenshot Tool"
            description="Capture full-page screenshots of websites in high resolution. Our website screenshot tool allows you to take screenshots of entire web pages, not just the visible viewport. Choose from multiple formats (PNG, JPG, WebP) and customize viewport width for perfect screenshots. Perfect for documentation, design references, website portfolios, competitive analysis, or archiving web content. All screenshots are generated server-side for accurate rendering."
            features={[
              "Capture full-page screenshots of websites",
              "Customize viewport width for different device sizes",
              "Support for PNG, JPG, and WebP formats",
              "High-resolution output up to 4K",
              "Handle dynamic content and JavaScript",
              "Capture entire pages including below-the-fold content",
              "Fast screenshot generation",
              "Download screenshots instantly"
            ]}
            howToUse={[
              "Enter the website URL you want to screenshot",
              "Select the viewport width (desktop, tablet, or mobile)",
              "Choose output format (PNG, JPG, or WebP)",
              "Set resolution/quality if available",
              "Click 'Capture Screenshot' to generate",
              "Wait for the screenshot to be generated",
              "Download the screenshot when ready"
            ]}
            useCases={[
              "Create documentation screenshots for websites",
              "Capture website designs for portfolios",
              "Generate screenshots for presentations",
              "Archive web content as images",
              "Create visual references for design projects",
              "Capture website states for comparison",
              "Generate thumbnails for website galleries",
              "Create screenshots for social media sharing"
            ]}
            tips={[
              "Use desktop viewport for full-width screenshots",
              "PNG format preserves quality best for screenshots",
              "JPG format reduces file size for large screenshots",
              "Wait for pages to fully load before capturing",
              "Some dynamic content may require JavaScript to render",
              "Use appropriate viewport sizes for your use case",
              "Test screenshots to ensure they capture what you need"
            ]}
            faq={[
              {
                question: "Can I screenshot password-protected pages?",
                answer: "The tool can screenshot publicly accessible pages. Password-protected or login-required pages typically cannot be screenshotted unless you provide authentication credentials."
              },
              {
                question: "Will JavaScript and dynamic content be captured?",
                answer: "The tool waits for pages to load and renders JavaScript, but some highly dynamic content may not be fully captured. Static content is always captured accurately."
              },
              {
                question: "What's the maximum resolution?",
                answer: "The tool supports high-resolution screenshots up to 4K. Resolution depends on the viewport width and format selected."
              },
              {
                question: "Can I screenshot localhost or private websites?",
                answer: "The tool can only screenshot publicly accessible websites. Localhost and private networks are not accessible from the server."
              }
            ]}
          />
        </div>
        
        {/* Blog Post Section - only show if blog post exists */}
        {blogPost && (
          <div className="max-w-4xl mx-auto mt-16 px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Master Website Screenshots
              </h2>
              <p className="text-lg text-gray-600">
                Learn advanced techniques for capturing perfect website screenshots for documentation, presentations, and more
              </p>
            </div>
            
            <ToolBlogPost 
              post={blogPost} 
              toolPath="/tools/website-screenshot"
            />
          </div>
        )}

        {/* Comment Section */}
        <CommentSection 
          toolId="website-screenshot"
          toolName="Website Screenshot Tool"
        />
      </Body>
      <Footer />
    </div>
  );
};

export default WebsiteScreenshotPage;
