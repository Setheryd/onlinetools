# Development Guidelines - The Tool Guru

## 🎯 **Overview**

This document outlines the development standards and best practices for The Tool Guru frontend project.

## 📁 **Project Structure**

### **Directory Organization**
```
frontend/
├── docs/                    # All documentation
├── scripts/                 # Utility scripts
├── src/                     # Source code
│   ├── app/                 # Next.js App Router
│   │   ├── components/      # Shared components
│   │   ├── lib/            # Library functions
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles
├── public/                  # Static assets
└── config/                  # Configuration files
```

### **File Naming Conventions**

#### **Components**
- **React Components**: PascalCase
  - `PasswordGenerator.js`
  - `Base64Tool.js`
  - `JsonFormatter.js`

#### **Pages**
- **Next.js Pages**: kebab-case
  - `password-generator/page.js`
  - `base64/page.js`
  - `json-formatter/page.js`

#### **Utilities**
- **Utility Functions**: camelCase
  - `toolMetadata.js`
  - `blogService.js`
  - `analytics.js`

#### **Configuration**
- **Config Files**: kebab-case
  - `tailwind.config.js`
  - `next.config.mjs`
  - `postcss.config.mjs`

## 🛠️ **Adding New Tools**

### **Step 1: Create Tool Page**
```javascript
// src/app/tools/[tool-name]/page.js
import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import YourToolComponent from '../../components/tools/YourToolComponent';

export const metadata = {
  title: 'Your Tool Name — The Tool Guru',
  description: 'Description of your tool',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  alternates: {
    canonical: 'https://thetool.guru/tools/your-tool-name',
  },
  openGraph: {
    title: 'Your Tool Name — The Tool Guru',
    description: 'Description of your tool',
    url: 'https://thetool.guru/tools/your-tool-name',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Your Tool Name - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Tool Name — The Tool Guru',
    description: 'Description of your tool',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const YourToolPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <YourToolComponent />
      </Body>
      <Footer />
    </div>
  );
};

export default YourToolPage;
```

### **Step 2: Create Tool Component**
```javascript
// src/app/components/tools/YourToolComponent.js
'use client';
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const YourToolComponent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    // Your tool logic here
    const result = processInput(input);
    setOutput(result);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Tool Name</h1>
        <p className="text-lg text-gray-600">Description of what your tool does</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here..."
            className="mb-4"
          />
          <Button onClick={handleProcess} variant="primary">
            Process
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          <div className="bg-gray-100 p-4 rounded-lg min-h-[200px]">
            {output || 'Results will appear here...'}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default YourToolComponent;
```

### **Step 3: Add Tool Configuration**
```javascript
// src/lib/tools.js
export const tools = [
  // ... existing tools
  {
    id: 'your-tool-name',
    name: 'Your Tool Name',
    description: 'Description of your tool',
    path: '/tools/your-tool-name',
    category: 'text', // or 'calculator', 'converter', etc.
    icon: '🔧', // Choose appropriate emoji
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    built: true, // Set to false if not implemented yet
  },
];
```

## 🎨 **Styling Guidelines**

### **Tailwind CSS Classes**
- Use Tailwind utility classes for styling
- Follow mobile-first responsive design
- Use consistent spacing and colors

### **Color Palette**
```css
/* Primary Colors */
bg-blue-600    /* Primary buttons */
bg-gray-50     /* Page backgrounds */
bg-white       /* Card backgrounds */

/* Text Colors */
text-gray-900  /* Primary text */
text-gray-600  /* Secondary text */
text-blue-600  /* Links */

/* Border Colors */
border-gray-200 /* Card borders */
border-blue-600 /* Focus states */
```

### **Spacing**
```css
/* Consistent spacing */
p-4           /* 16px padding */
p-6           /* 24px padding */
p-8           /* 32px padding */
mb-4          /* 16px margin bottom */
mb-8          /* 32px margin bottom */
gap-4         /* 16px gap */
gap-8         /* 32px gap */
```

## 🔍 **SEO Best Practices**

### **Metadata Requirements**
Every tool page must include:
- Unique title tag
- Meta description (150-160 characters)
- Canonical URL
- Open Graph tags
- Twitter Card tags
- Keywords (optional but recommended)

### **Structured Data**
Add appropriate schema markup:
```javascript
// Example for a calculator tool
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tool Name",
  "description": "Tool description",
  "url": "https://thetool.guru/tools/tool-name",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

## 🧪 **Testing Guidelines**

### **Before Committing**
1. **Run SEO Audit**
   ```bash
   node scripts/seo-audit.js
   ```

2. **Check Performance**
   ```bash
   node scripts/performance-check.js
   ```

3. **Test Responsive Design**
   - Test on mobile (320px)
   - Test on tablet (768px)
   - Test on desktop (1024px+)

4. **Accessibility Check**
   - Ensure proper heading hierarchy
   - Add alt text to images
   - Test keyboard navigation
   - Check color contrast

### **Browser Testing**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 **Code Quality**

### **JavaScript/React**
- Use functional components with hooks
- Implement proper error handling
- Add loading states where appropriate
- Use TypeScript for better type safety (optional)

### **Performance**
- Lazy load components when possible
- Optimize images and assets
- Minimize bundle size
- Use proper caching strategies

### **Security**
- Sanitize user inputs
- Validate data on both client and server
- Use HTTPS for all external requests
- Implement proper CORS policies

## 📚 **Documentation**

### **Code Comments**
```javascript
/**
 * Processes user input and returns formatted result
 * @param {string} input - The user input to process
 * @returns {string} The processed result
 */
function processInput(input) {
  // Implementation here
}
```

### **Component Documentation**
```javascript
/**
 * PasswordGenerator Component
 * 
 * A tool for generating secure passwords with customizable options.
 * 
 * @example
 * <PasswordGenerator />
 */
```

## 🚀 **Deployment Checklist**

### **Pre-Deployment**
- [ ] All tests pass
- [ ] SEO audit score > 80%
- [ ] Performance check passes
- [ ] Mobile responsive design verified
- [ ] Accessibility requirements met
- [ ] Documentation updated

### **Post-Deployment**
- [ ] Verify live site functionality
- [ ] Check Google Search Console
- [ ] Monitor performance metrics
- [ ] Test critical user flows
- [ ] Verify analytics tracking

## 🤝 **Code Review Guidelines**

### **What to Look For**
- **Functionality**: Does the code work as expected?
- **Performance**: Are there any performance issues?
- **SEO**: Are all SEO requirements met?
- **Accessibility**: Is the code accessible?
- **Security**: Are there any security concerns?
- **Maintainability**: Is the code easy to understand and maintain?

### **Review Process**
1. **Self-Review**: Review your own code first
2. **Peer Review**: Have a teammate review your code
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update documentation if needed
5. **Deployment**: Deploy to staging for final testing

## 📞 **Getting Help**

### **Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [SEO Guidelines](docs/SEO_IMPLEMENTATION_GUIDE.md)

### **Team Support**
- Check existing documentation first
- Search for similar implementations
- Ask in team chat for quick questions
- Schedule a call for complex issues

---

**Remember**: Quality over speed. Take the time to do it right the first time! 🚀
