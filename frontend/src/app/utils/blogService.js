// Blog service for handling blog data and API calls
// This can be easily replaced with real API endpoints when ready

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
      
      <h2>Advanced Usage</h2>
      <p>For more advanced use cases, you might want to consider:</p>
      <ul>
        <li>Streaming Base64 encoding for large files</li>
        <li>Custom Base64 alphabets for specific requirements</li>
        <li>URL-safe Base64 encoding</li>
        <li>Performance optimization for high-throughput applications</li>
      </ul>
      
      <h2>Common Pitfalls</h2>
      <p>Here are some common mistakes to avoid:</p>
      <ul>
        <li>Forgetting to handle padding characters</li>
        <li>Not considering character encoding issues</li>
        <li>Using Base64 for compression (it actually increases size)</li>
        <li>Not validating input data before encoding</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Base64 encoding is a fundamental tool in web development and data processing. Understanding how it works and when to use it will help you build more robust applications. Remember to always consider the trade-offs and choose the right encoding method for your specific use case.</p>
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
    },
    relatedPosts: [
      {
        slug: 'understanding-url-encoding',
        title: 'Understanding URL Encoding: A Deep Dive',
        excerpt: 'Explore the fundamentals of URL encoding, why it\'s necessary, and how to implement it correctly in your web applications.',
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        slug: 'top-10-productivity-tools-for-developers',
        title: 'Top 10 Productivity Tools Every Developer Should Know',
        excerpt: 'Discover the most effective productivity tools that can streamline your development workflow and boost your coding efficiency.',
        featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ]
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
    },
    relatedPosts: [
      {
        slug: 'getting-started-with-base64-encoding',
        title: 'Getting Started with Base64 Encoding: A Complete Guide',
        excerpt: 'Learn everything you need to know about Base64 encoding, from basic concepts to advanced usage in web development and data transmission.',
        featuredImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        slug: 'understanding-url-encoding',
        title: 'Understanding URL Encoding: A Deep Dive',
        excerpt: 'Explore the fundamentals of URL encoding, why it\'s necessary, and how to implement it correctly in your web applications.',
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ]
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
      
      <h2>When to Use Different Encoding Methods</h2>
      <p>JavaScript provides several encoding methods, each with specific use cases:</p>
      <ul>
        <li><code>encodeURI()</code> - For complete URLs</li>
        <li><code>encodeURIComponent()</code> - For URL components</li>
        <li><code>escape()</code> - Deprecated, avoid using</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Follow these best practices when working with URL encoding:</p>
      <ul>
        <li>Always encode user input before using it in URLs</li>
        <li>Use the appropriate encoding method for your use case</li>
        <li>Handle decoding errors gracefully</li>
        <li>Be consistent with encoding across your application</li>
      </ul>
      
      <h2>Common Pitfalls</h2>
      <p>Avoid these common mistakes:</p>
      <ul>
        <li>Double encoding (encoding already encoded strings)</li>
        <li>Not encoding special characters in query parameters</li>
        <li>Using deprecated methods like <code>escape()</code></li>
        <li>Forgetting to handle encoding in form submissions</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>URL encoding is a fundamental concept in web development. Understanding when and how to use it will help you build more robust web applications that handle user input correctly.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Tutorial',
    tags: ['URL Encoding', 'Web Development', 'JavaScript', 'HTTP'],
    publishedAt: '2024-01-05T09:15:00Z',
    featured: false,
    author: {
      name: 'Alex Rodriguez',
      bio: 'Web developer and technical writer with expertise in frontend technologies. Passionate about creating accessible and user-friendly web experiences.',
      social: {
        twitter: 'https://twitter.com/alexrodriguez',
        linkedin: 'https://linkedin.com/in/alexrodriguez'
      }
    },
    relatedPosts: [
      {
        slug: 'getting-started-with-base64-encoding',
        title: 'Getting Started with Base64 Encoding: A Complete Guide',
        excerpt: 'Learn everything you need to know about Base64 encoding, from basic concepts to advanced usage in web development and data transmission.',
        featuredImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        slug: 'top-10-productivity-tools-for-developers',
        title: 'Top 10 Productivity Tools Every Developer Should Know',
        excerpt: 'Discover the most effective productivity tools that can streamline your development workflow and boost your coding efficiency.',
        featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  }
];

const mockCategories = [
  { slug: 'tutorial', name: 'Tutorial', count: 2 },
  { slug: 'productivity', name: 'Productivity', count: 1 },
  { slug: 'tips', name: 'Tips & Tricks', count: 0 },
  { slug: 'development', name: 'Development', count: 0 }
];

// Blog service class
class BlogService {
  // Get all blog posts
  async getAllPosts() {
    // TODO: Replace with actual API call
    // return fetch('/api/blog/posts').then(res => res.json());
    return mockPosts;
  }

  // Get a single blog post by slug
  async getPostBySlug(slug) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/${slug}`).then(res => res.json());
    return mockPosts.find(post => post.slug === slug);
  }

  // Get featured posts
  async getFeaturedPosts(limit = 3) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/featured?limit=${limit}`).then(res => res.json());
    return mockPosts.filter(post => post.featured).slice(0, limit);
  }

  // Get posts by category
  async getPostsByCategory(category, limit = 10) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/category/${category}?limit=${limit}`).then(res => res.json());
    return mockPosts.filter(post => post.category.toLowerCase() === category.toLowerCase()).slice(0, limit);
  }

  // Get posts by tag
  async getPostsByTag(tag, limit = 10) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/tag/${tag}?limit=${limit}`).then(res => res.json());
    return mockPosts.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    ).slice(0, limit);
  }

  // Search posts
  async searchPosts(query, limit = 10) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/search?q=${encodeURIComponent(query)}&limit=${limit}`).then(res => res.json());
    const searchTerm = query.toLowerCase();
    return mockPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    ).slice(0, limit);
  }

  // Get recent posts
  async getRecentPosts(limit = 5) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/recent?limit=${limit}`).then(res => res.json());
    return mockPosts
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
  }

  // Get all categories
  async getCategories() {
    // TODO: Replace with actual API call
    // return fetch('/api/blog/categories').then(res => res.json());
    return mockCategories;
  }

  // Get related posts
  async getRelatedPosts(postId, limit = 3) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/${postId}/related?limit=${limit}`).then(res => res.json());
    const currentPost = mockPosts.find(post => post.id === postId);
    if (!currentPost) return [];
    
    return mockPosts
      .filter(post => post.id !== postId)
      .filter(post => 
        post.category === currentPost.category ||
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
      .slice(0, limit);
  }

  // Create a new blog post (for admin use)
  async createPost(postData) {
    // TODO: Replace with actual API call
    // return fetch('/api/blog/posts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(postData)
    // }).then(res => res.json());
    console.log('Creating new post:', postData);
    return { success: true, id: Date.now() };
  }

  // Update a blog post (for admin use)
  async updatePost(slug, postData) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/${slug}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(postData)
    // }).then(res => res.json());
    console.log('Updating post:', slug, postData);
    return { success: true };
  }

  // Delete a blog post (for admin use)
  async deletePost(slug) {
    // TODO: Replace with actual API call
    // return fetch(`/api/blog/posts/${slug}`, {
    //   method: 'DELETE'
    // }).then(res => res.json());
    console.log('Deleting post:', slug);
    return { success: true };
  }
}

// Export singleton instance
export const blogService = new BlogService();

// Export individual functions for convenience
export const {
  getAllPosts,
  getPostBySlug,
  getFeaturedPosts,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
  getRecentPosts,
  getCategories,
  getRelatedPosts,
  createPost,
  updatePost,
  deletePost
} = blogService;
