'use client';
import React, { useState, useMemo } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import BlogHero from '../components/blog/BlogHero';
import BlogCard from '../components/blog/BlogCard';
import BlogSidebar from '../components/blog/BlogSidebar';
import Button from '../components/ui/Button';

import { blogService } from '../utils/blogService';

// Mock data - replace with API calls
const mockPosts = [
  {
    id: 1,
    slug: 'ultimate-guide-to-password-generators',
    title: 'The Ultimate Guide to Password Generators: Why You Need Strong Passwords',
    excerpt: 'Discover why strong passwords are crucial in today\'s digital world and how password generators can protect your online accounts from cyber threats.',
    content: `
      <h2>Why Strong Passwords Matter More Than Ever</h2>
      <p>In today's interconnected digital landscape, your online security is only as strong as your weakest password. With cyber attacks becoming increasingly sophisticated and data breaches making headlines regularly, having strong, unique passwords for each of your accounts is no longer optional—it's essential.</p>
      
      <h2>The Hidden Dangers of Weak Passwords</h2>
      <p>Weak passwords are the primary entry point for cybercriminals. Here's what can happen when you use weak passwords:</p>
      <ul>
        <li><strong>Account Takeover:</strong> Hackers can gain access to your personal accounts</li>
        <li><strong>Identity Theft:</strong> Your personal information can be stolen and misused</li>
        <li><strong>Financial Loss:</strong> Banking and payment accounts can be compromised</li>
        <li><strong>Data Breach:</strong> Sensitive information can be exposed to malicious actors</li>
        <li><strong>Reputation Damage:</strong> Compromised social media accounts can damage your online reputation</li>
      </ul>
      
      <h2>What Makes a Password Strong?</h2>
      <p>A strong password should meet these criteria:</p>
      <ul>
        <li><strong>Length:</strong> At least 12 characters (16+ is even better)</li>
        <li><strong>Complexity:</strong> Mix of uppercase and lowercase letters, numbers, and special characters</li>
        <li><strong>Uniqueness:</strong> Different password for each account</li>
        <li><strong>Randomness:</strong> Avoid predictable patterns or personal information</li>
      </ul>
      
      <h2>How Password Generators Solve These Problems</h2>
      <p>Password generators create truly random, complex passwords that are virtually impossible to guess or crack through brute force attacks. Here's how they work:</p>
      <ul>
        <li><strong>True Randomness:</strong> Uses cryptographically secure random number generators</li>
        <li><strong>Customizable Length:</strong> Generate passwords of any desired length</li>
        <li><strong>Character Set Control:</strong> Include or exclude specific character types</li>
        <li><strong>Instant Generation:</strong> Create multiple passwords quickly</li>
        <li><strong>No Patterns:</strong> Eliminates human bias and predictable patterns</li>
      </ul>
      
      <h2>Who Needs Password Generators?</h2>
      <p>Password generators are essential for:</p>
      <ul>
        <li><strong>Individuals:</strong> Anyone with online accounts</li>
        <li><strong>Businesses:</strong> IT administrators and security teams</li>
        <li><strong>Developers:</strong> Creating secure application credentials</li>
        <li><strong>Security Professionals:</strong> Testing and auditing systems</li>
        <li><strong>Privacy-Conscious Users:</strong> Those who value online security</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>In today's digital age, strong passwords are your first line of defense against cyber threats. Password generators eliminate the guesswork and human error that often leads to weak passwords. By using a reliable password generator and following security best practices, you can significantly improve your online security posture.</p>
      
      <p>Ready to improve your password security? Try our <a href="/tools/password-generator" class="text-blue-600 hover:text-blue-800 underline">Password Generator tool</a> to create strong, secure passwords for all your accounts.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Security',
    tags: ['Password Generator', 'Security', 'Cybersecurity', 'Online Safety', 'Password Management'],
    publishedAt: '2024-01-20T10:00:00Z',
    featured: true,
    author: {
      name: 'David Chen',
      bio: 'Cybersecurity expert with 10+ years of experience in digital security and password management. Passionate about helping users protect their online identities.',
      social: {
        twitter: 'https://twitter.com/davidchen',
        linkedin: 'https://linkedin.com/in/davidchen'
      }
    }
  },
  {
    id: 2,
    slug: 'getting-started-with-base64-encoding',
    title: 'Getting Started with Base64 Encoding: A Complete Guide',
    excerpt: 'Learn everything you need to know about Base64 encoding, from basic concepts to advanced usage in web development and data transmission.',
    content: `
      <h2>What is Base64 Encoding?</h2>
      <p>Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. The term Base64 originates from a specific MIME content transfer encoding.</p>
      
      <h2>Why Use Base64?</h2>
      <p>Base64 encoding is commonly used when there is a need to encode binary data, especially when that data needs to be stored and transferred over media that are designed to deal with textual data. This encoding helps to ensure that the data remains intact without modification during transport.</p>
      
      <h2>Common Use Cases</h2>
      <ul>
        <li>Email attachments</li>
        <li>Embedding images in HTML/CSS</li>
        <li>Storing binary data in JSON</li>
        <li>Data URLs</li>
        <li>Basic authentication headers</li>
      </ul>
      
      <h2>How Base64 Works</h2>
      <p>The Base64 encoding process involves:</p>
      <ol>
        <li>Converting the input data to binary</li>
        <li>Grouping the binary data into 6-bit chunks</li>
        <li>Converting each 6-bit chunk to a corresponding character from the Base64 alphabet</li>
        <li>Adding padding if necessary</li>
      </ol>
      
      <h2>Example Implementation</h2>
      <p>Here's a simple example of how to encode and decode Base64 in JavaScript:</p>
      <pre><code>// Encoding
const text = "Hello, World!";
const encoded = btoa(text);
console.log(encoded); // SGVsbG8sIFdvcmxkIQ==

// Decoding
const decoded = atob(encoded);
console.log(decoded); // Hello, World!</code></pre>
      
      <h2>Best Practices</h2>
      <p>When working with Base64 encoding, consider these best practices:</p>
      <ul>
        <li>Always handle encoding errors gracefully</li>
        <li>Be aware that Base64 increases data size by approximately 33%</li>
        <li>Use appropriate character encoding for your use case</li>
        <li>Consider security implications when encoding sensitive data</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Base64 encoding is a fundamental tool in web development and data processing. Understanding how it works and when to use it will help you build more robust applications. Remember to always consider the trade-offs and choose the right encoding method for your specific use case.</p>
      
      <p>Ready to try Base64 encoding? Use our <a href="/tools/base64" class="text-blue-600 hover:text-blue-800 underline">Base64 Encoder/Decoder tool</a> to convert your data instantly.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Tutorial',
    tags: ['Base64', 'Encoding', 'Web Development', 'JavaScript'],
    publishedAt: '2024-01-15T10:00:00Z',
    featured: true,
    author: {
      name: 'Sarah Johnson',
      bio: 'Full-stack developer with 8+ years of experience in web technologies and data processing. Passionate about creating efficient and scalable solutions.',
      social: {
        twitter: 'https://twitter.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson'
      }
    }
  },
  {
    id: 3,
    slug: 'mastering-json-formatting-and-validation',
    title: 'Mastering JSON Formatting and Validation: A Developer\'s Essential Guide',
    excerpt: 'Learn why proper JSON formatting matters, how to validate JSON data, and discover best practices for working with JSON in modern applications.',
    content: `
      <h2>Why JSON Formatting Matters in Modern Development</h2>
      <p>JSON (JavaScript Object Notation) has become the de facto standard for data exchange in web applications, APIs, and modern software systems. While JSON is human-readable by design, properly formatted JSON is crucial for debugging, collaboration, and maintaining code quality.</p>
      
      <h2>The Hidden Costs of Poorly Formatted JSON</h2>
      <p>Working with unformatted or invalid JSON can lead to numerous problems:</p>
      <ul>
        <li><strong>Debugging Nightmares:</strong> Hard-to-read JSON makes troubleshooting nearly impossible</li>
        <li><strong>Syntax Errors:</strong> Missing commas, brackets, or quotes cause parsing failures</li>
        <li><strong>Team Collaboration Issues:</strong> Poor formatting makes code reviews difficult</li>
        <li><strong>API Integration Problems:</strong> Invalid JSON breaks API communications</li>
        <li><strong>Performance Issues:</strong> Malformed JSON can cause unexpected application behavior</li>
      </ul>
      
      <h2>What Makes JSON Well-Formatted?</h2>
      <p>Properly formatted JSON should have:</p>
      <ul>
        <li><strong>Consistent Indentation:</strong> Usually 2 or 4 spaces for readability</li>
        <li><strong>Proper Structure:</strong> Correct nesting of objects and arrays</li>
        <li><strong>Valid Syntax:</strong> All brackets, braces, and quotes properly closed</li>
        <li><strong>Logical Organization:</strong> Related data grouped together</li>
        <li><strong>Clear Naming:</strong> Descriptive key names that explain the data</li>
      </ul>
      
      <h2>Common JSON Validation Issues</h2>
      <p>Here are the most frequent problems developers encounter:</p>
      <ul>
        <li><strong>Missing Commas:</strong> Forgetting commas between object properties</li>
        <li><strong>Trailing Commas:</strong> Extra commas at the end of objects or arrays</li>
        <li><strong>Unquoted Keys:</strong> Object keys must be in double quotes</li>
        <li><strong>Invalid Characters:</strong> Special characters not properly escaped</li>
        <li><strong>Mismatched Brackets:</strong> Unclosed objects or arrays</li>
      </ul>
      
      <h2>When You Need JSON Formatting and Validation</h2>
      <p>JSON tools are essential in these scenarios:</p>
      <ul>
        <li><strong>API Development:</strong> Creating and testing API responses</li>
        <li><strong>Data Migration:</strong> Converting between different data formats</li>
        <li><strong>Configuration Files:</strong> Managing application settings</li>
        <li><strong>Debugging:</strong> Analyzing API responses and data structures</li>
        <li><strong>Code Reviews:</strong> Ensuring consistent formatting across teams</li>
        <li><strong>Documentation:</strong> Creating readable examples for APIs</li>
      </ul>
      
      <h2>Benefits of Using JSON Formatters</h2>
      <p>Professional JSON formatters provide several advantages:</p>
      <ul>
        <li><strong>Instant Validation:</strong> Catch syntax errors immediately</li>
        <li><strong>Consistent Formatting:</strong> Apply uniform indentation and spacing</li>
        <li><strong>Syntax Highlighting:</strong> Color-coded elements for better readability</li>
        <li><strong>Error Detection:</strong> Pinpoint exact locations of syntax issues</li>
        <li><strong>Minification Options:</strong> Reduce file size for production</li>
        <li><strong>Copy-Paste Support:</strong> Easy integration with your workflow</li>
      </ul>
      
      <h2>Who Benefits from JSON Tools?</h2>
      <p>JSON formatting and validation tools are valuable for:</p>
      <ul>
        <li><strong>Frontend Developers:</strong> Working with API responses and data binding</li>
        <li><strong>Backend Developers:</strong> Creating and testing API endpoints</li>
        <li><strong>Full-Stack Developers:</strong> Managing data flow between layers</li>
        <li><strong>DevOps Engineers:</strong> Configuring services and infrastructure</li>
        <li><strong>QA Engineers:</strong> Testing API integrations and data validation</li>
        <li><strong>Technical Writers:</strong> Documenting APIs and data structures</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Proper JSON formatting and validation are fundamental skills for modern developers. Whether you're building APIs, working with configuration files, or debugging data issues, having reliable JSON tools in your toolkit will save time and prevent errors.</p>
      
      <p>Ready to improve your JSON workflow? Try our <a href="/tools/json-formatter" class="text-blue-600 hover:text-blue-800 underline">JSON Formatter & Validator tool</a> to format, validate, and beautify your JSON data instantly.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Development',
    tags: ['JSON', 'Formatting', 'Validation', 'Web Development', 'API Development'],
    publishedAt: '2024-01-18T14:30:00Z',
    featured: true,
    author: {
      name: 'Emily Watson',
      bio: 'Senior software engineer specializing in API development and data processing. Expert in JSON, REST APIs, and modern web technologies.',
      social: {
        twitter: 'https://twitter.com/emilywatson',
        linkedin: 'https://linkedin.com/in/emilywatson'
      }
    }
  },
  {
    id: 6,
    slug: 'understanding-url-encoding',
    title: 'Understanding URL Encoding: A Deep Dive',
    excerpt: 'Explore the fundamentals of URL encoding, why it\'s necessary, and how to implement it correctly in your web applications.',
    content: `
      <h2>What is URL Encoding?</h2>
      <p>URL encoding, also known as percent-encoding, is a method to encode special characters in URLs so they can be transmitted over the internet. It replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.</p>
      
      <h2>Why URL Encoding is Necessary</h2>
      <p>URLs can only contain a limited set of ASCII characters. When you need to include special characters, spaces, or non-ASCII characters in a URL, they must be encoded to ensure proper transmission and interpretation.</p>
      
      <h2>Common Characters That Need Encoding</h2>
      <ul>
        <li>Spaces become %20</li>
        <li>Exclamation marks become %21</li>
        <li>Quotes become %22</li>
        <li>Hash symbols become %23</li>
        <li>And many more...</li>
      </ul>
      
      <h2>JavaScript Implementation</h2>
      <p>JavaScript provides built-in methods for URL encoding:</p>
      <pre><code>// Encoding
const text = "Hello World!";
const encoded = encodeURIComponent(text);
console.log(encoded); // Hello%20World!

// Decoding
const decoded = decodeURIComponent(encoded);
console.log(decoded); // Hello World!</code></pre>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Tutorial',
    tags: ['URL Encoding', 'Web Development', 'JavaScript', 'HTTP'],
    publishedAt: '2024-01-05T09:15:00Z',
    featured: false,
    author: {
      name: 'Alex Rodriguez',
      bio: 'Web developer and technical writer with expertise in frontend technologies.',
      social: {
        twitter: 'https://twitter.com/alexrodriguez',
        linkedin: 'https://linkedin.com/in/alexrodriguez'
      }
    }
  },
  {
    id: 5,
    slug: 'top-10-productivity-tools-for-developers',
    title: 'Top 10 Productivity Tools Every Developer Should Know',
    excerpt: 'Discover the most effective productivity tools that can streamline your development workflow and boost your coding efficiency.',
    content: `
      <h2>Why Productivity Tools Matter</h2>
      <p>In today's fast-paced development environment, having the right tools can make the difference between meeting deadlines and falling behind. The right productivity tools can automate repetitive tasks, improve code quality, and enhance collaboration.</p>
      
      <h2>1. VS Code Extensions</h2>
      <p>Visual Studio Code is already a powerful editor, but with the right extensions, it becomes even more powerful. Essential extensions include:</p>
      <ul>
        <li>Prettier - Code formatter</li>
        <li>ESLint - JavaScript linting</li>
        <li>GitLens - Git integration</li>
        <li>Auto Rename Tag - HTML/XML tag management</li>
      </ul>
      
      <h2>2. Git Tools</h2>
      <p>Version control is essential for any development project. Consider these Git tools:</p>
      <ul>
        <li>GitKraken - Visual Git client</li>
        <li>SourceTree - Free Git GUI</li>
        <li>GitHub Desktop - Simple Git workflow</li>
      </ul>
      
      <h2>3. API Testing Tools</h2>
      <p>Testing APIs is crucial for backend development:</p>
      <ul>
        <li>Postman - API development platform</li>
        <li>Insomnia - REST API client</li>
        <li>Thunder Client - VS Code extension for API testing</li>
      </ul>
      
      <h2>4. Database Tools</h2>
      <p>Efficient database management is key:</p>
      <ul>
        <li>TablePlus - Modern database GUI</li>
        <li>DBeaver - Universal database tool</li>
        <li>MongoDB Compass - MongoDB GUI</li>
      </ul>
      
      <h2>5. Design Tools</h2>
      <p>For frontend developers, design tools are essential:</p>
      <ul>
        <li>Figma - Collaborative design tool</li>
        <li>Sketch - Mac-based design tool</li>
        <li>Adobe XD - UI/UX design</li>
      </ul>
      
      <h2>6. Terminal Tools</h2>
      <p>Enhance your terminal experience:</p>
      <ul>
        <li>Oh My Zsh - Terminal customization</li>
        <li>Powerlevel10k - Fast prompt</li>
        <li>tmux - Terminal multiplexer</li>
      </ul>
      
      <h2>7. Documentation Tools</h2>
      <p>Good documentation is crucial:</p>
      <ul>
        <li>Swagger - API documentation</li>
        <li>Storybook - Component documentation</li>
        <li>GitBook - Project documentation</li>
      </ul>
      
      <h2>8. Monitoring Tools</h2>
      <p>Keep track of your applications:</p>
      <ul>
        <li>Sentry - Error tracking</li>
        <li>LogRocket - Session replay</li>
        <li>New Relic - Application monitoring</li>
      </ul>
      
      <h2>9. Code Quality Tools</h2>
      <p>Maintain high code standards:</p>
      <ul>
        <li>SonarQube - Code quality platform</li>
        <li>CodeClimate - Automated code review</li>
        <li>Coveralls - Code coverage</li>
      </ul>
      
      <h2>10. Time Management Tools</h2>
      <p>Stay organized and productive:</p>
      <ul>
        <li>RescueTime - Time tracking</li>
        <li>Forest - Focus timer</li>
        <li>Notion - All-in-one workspace</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The right tools can significantly improve your development workflow and productivity. Start with the tools that address your most pressing needs, and gradually build up your toolkit as you discover new requirements.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Productivity',
    tags: ['Productivity', 'Development', 'Tools', 'Workflow'],
    publishedAt: '2024-01-10T14:30:00Z',
    featured: false,
    author: {
      name: 'Mike Chen',
      bio: 'Senior software engineer specializing in developer experience and tooling. Loves optimizing workflows and sharing knowledge with the community.',
      social: {
        twitter: 'https://twitter.com/mikechen',
        linkedin: 'https://linkedin.com/in/mikechen'
      }
    }
  }
];

const mockCategories = [
  { slug: 'security', name: 'Security', count: 1 },
  { slug: 'tutorial', name: 'Tutorial', count: 2 },
  { slug: 'development', name: 'Development', count: 1 },
  { slug: 'productivity', name: 'Productivity', count: 1 },
  { slug: 'tips', name: 'Tips & Tricks', count: 0 }
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return mockPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === '' || post.category.toLowerCase() === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const recentPosts = mockPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BlogHero 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={mockCategories}
      />
      
      <Body>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'} Found
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 mt-1">
                    Showing results for "{searchQuery}"
                  </p>
                )}
                {selectedCategory && (
                  <p className="text-gray-600 mt-1">
                    Filtered by category: {mockCategories.find(c => c.slug === selectedCategory)?.name}
                  </p>
                )}
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>

            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or category filter
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar 
              categories={mockCategories}
              recentPosts={recentPosts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>
      </Body>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
