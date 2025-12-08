import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CssMinifierTool from '../../components/tools/CssMinifierTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'CSS Minifier — The Tool Guru',
  description: 'Minify CSS by removing comments and whitespace. Fast and privacy-friendly.',
  keywords: ['css minifier', 'minify css', 'compress css'],
  openGraph: {
    title: 'CSS Minifier — The Tool Guru',
    description: 'Minify CSS instantly in your browser.',
  },
};

const CssMinifierPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <CssMinifierTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="CSS Minifier"
          description="Minify CSS by removing comments, whitespace, and unnecessary characters to reduce file size. Our CSS minifier optimizes stylesheets for production use, significantly reducing file size while maintaining functionality. Perfect for improving website performance, reducing bandwidth usage, and speeding up page load times. The tool preserves all CSS functionality while removing formatting that's only needed for readability during development."
          features={[
            "Remove comments and whitespace from CSS",
            "Optimize CSS for production use",
            "Significantly reduce file size",
            "Preserve all CSS functionality",
            "Fast minification processing",
            "Copy minified CSS instantly",
            "Compare original and minified sizes",
            "Works entirely in your browser for privacy"
          ]}
          howToUse={[
            "Paste or upload your CSS file",
            "Click 'Minify' to process the CSS",
            "View the minified output",
            "Check file size reduction",
            "Copy the minified CSS",
            "Use minified CSS in production",
            "Keep original CSS for development"
          ]}
          useCases={[
            "Optimize CSS for production websites",
            "Reduce bandwidth usage and improve performance",
            "Speed up page load times",
            "Prepare CSS for deployment",
            "Minify CSS for CDN distribution",
            "Optimize stylesheets for mobile devices",
            "Reduce file sizes for better caching",
            "Improve website performance metrics"
          ]}
          tips={[
            "Always keep original CSS files as backups",
            "Use minified CSS in production, original in development",
            "Test minified CSS to ensure functionality is preserved",
            "Minify CSS as part of your build process",
            "Combine with CSS compression for best results",
            "Check file size reduction to measure optimization",
            "Use source maps for debugging minified CSS"
          ]}
          faq={[
            {
              question: "What does CSS minification do?",
              answer: "CSS minification removes unnecessary characters like comments, whitespace, and line breaks to reduce file size. It preserves all CSS functionality while making files smaller and faster to download."
            },
            {
              question: "Will minification break my CSS?",
              answer: "Proper minification should not break your CSS. However, always test minified CSS to ensure it works correctly. Keep original files as backups."
            },
            {
              question: "How much file size reduction can I expect?",
              answer: "File size reduction varies but typically ranges from 20-50% depending on the original CSS. Files with lots of comments and whitespace see greater reductions."
            },
            {
              question: "Should I minify CSS in development?",
              answer: "Minify CSS for production use only. Keep original, readable CSS for development. Use build tools to automatically minify during deployment."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default CssMinifierPage;


