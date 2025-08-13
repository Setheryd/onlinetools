// Blog service for handling blog data and API calls
// This can be easily replaced with real API endpoints when ready

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
      
      <h2>Why Manual Password Creation Fails</h2>
      <p>When people create passwords manually, they often fall into predictable patterns:</p>
      <ul>
        <li>Using personal information (birthdays, names, addresses)</li>
        <li>Creating simple patterns (123456, qwerty, password)</li>
        <li>Reusing passwords across multiple accounts</li>
        <li>Making minor variations (password1, password2)</li>
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
      
      <h2>When to Use a Password Generator</h2>
      <p>You should use a password generator in these situations:</p>
      <ul>
        <li><strong>Creating New Accounts:</strong> Start with a strong password from day one</li>
        <li><strong>Password Updates:</strong> Regularly update existing passwords</li>
        <li><strong>Security Audits:</strong> When reviewing your account security</li>
        <li><strong>Data Breach Response:</strong> After learning your account may be compromised</li>
        <li><strong>High-Value Accounts:</strong> Banking, email, and work accounts</li>
      </ul>
      
      <h2>Best Practices for Password Management</h2>
      <p>Combine password generators with these best practices:</p>
      <ul>
        <li><strong>Use a Password Manager:</strong> Store generated passwords securely</li>
        <li><strong>Enable Two-Factor Authentication:</strong> Add an extra layer of security</li>
        <li><strong>Regular Updates:</strong> Change passwords every 3-6 months</li>
        <li><strong>Monitor for Breaches:</strong> Use services like Have I Been Pwned</li>
        <li><strong>Secure Storage:</strong> Never store passwords in plain text</li>
      </ul>
      
      <h2>Common Password Generator Features</h2>
      <p>Modern password generators offer various features:</p>
      <ul>
        <li><strong>Length Control:</strong> Generate passwords from 8 to 128+ characters</li>
        <li><strong>Character Types:</strong> Uppercase, lowercase, numbers, symbols</li>
        <li><strong>Exclusion Options:</strong> Avoid similar characters (l, 1, I)</li>
        <li><strong>Strength Indicators:</strong> Visual feedback on password strength</li>
        <li><strong>Copy to Clipboard:</strong> Easy copying for immediate use</li>
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
      
      <h2>JSON Best Practices for Developers</h2>
      <p>Follow these guidelines for better JSON handling:</p>
      <ul>
        <li><strong>Always Validate:</strong> Check JSON before using it in production</li>
        <li><strong>Use Descriptive Keys:</strong> Make your data self-documenting</li>
        <li><strong>Consistent Data Types:</strong> Maintain uniform types across similar fields</li>
        <li><strong>Handle Null Values:</strong> Be explicit about missing data</li>
        <li><strong>Escape Special Characters:</strong> Properly escape quotes and backslashes</li>
        <li><strong>Version Your APIs:</strong> Include version information in JSON responses</li>
      </ul>
      
      <h2>Advanced JSON Techniques</h2>
      <p>For more complex scenarios, consider these advanced approaches:</p>
      <ul>
        <li><strong>Schema Validation:</strong> Use JSON Schema for data validation</li>
        <li><strong>Custom Serialization:</strong> Control how objects are converted to JSON</li>
        <li><strong>Streaming Parsing:</strong> Handle large JSON files efficiently</li>
        <li><strong>Compression:</strong> Use gzip or other compression for large payloads</li>
        <li><strong>Binary JSON:</strong> Consider BSON for performance-critical applications</li>
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
      
      <h2>Common Use Cases and Examples</h2>
      <p>Here are real-world scenarios where JSON formatting is crucial:</p>
      <ul>
        <li><strong>API Response Debugging:</strong> Formatting complex API responses for analysis</li>
        <li><strong>Configuration Management:</strong> Organizing application settings</li>
        <li><strong>Data Transformation:</strong> Converting between different data formats</li>
        <li><strong>Log Analysis:</strong> Making log files readable and searchable</li>
        <li><strong>Database Exports:</strong> Formatting exported data for analysis</li>
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
  { slug: 'security', name: 'Security', count: 1 },
  { slug: 'tutorial', name: 'Tutorial', count: 2 },
  { slug: 'development', name: 'Development', count: 1 },
  { slug: 'productivity', name: 'Productivity', count: 1 },
  { slug: 'tips', name: 'Tips & Tricks', count: 0 }
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
