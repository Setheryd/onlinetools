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
    `,
    featuredImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Tutorial',
    tags: ['Base64', 'Encoding', 'Web Development', 'JavaScript'],
    publishedAt: '2024-01-15T10:00:00Z',
    featured: true,
    author: {
      name: 'Sarah Johnson',
      bio: 'Full-stack developer with 8+ years of experience in web technologies and data processing.',
      social: {
        twitter: 'https://twitter.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson'
      }
    }
  },
  {
    id: 2,
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
    `,
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Productivity',
    tags: ['Productivity', 'Development', 'Tools', 'Workflow'],
    publishedAt: '2024-01-10T14:30:00Z',
    featured: false,
    author: {
      name: 'Mike Chen',
      bio: 'Senior software engineer specializing in developer experience and tooling.',
      social: {
        twitter: 'https://twitter.com/mikechen',
        linkedin: 'https://linkedin.com/in/mikechen'
      }
    }
  },
  {
    id: 3,
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
  }
];

const mockCategories = [
  { slug: 'tutorial', name: 'Tutorial', count: 2 },
  { slug: 'productivity', name: 'Productivity', count: 1 },
  { slug: 'tips', name: 'Tips & Tricks', count: 0 },
  { slug: 'development', name: 'Development', count: 0 }
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
