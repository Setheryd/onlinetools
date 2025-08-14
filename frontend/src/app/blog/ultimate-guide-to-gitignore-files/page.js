'use client';
import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BlogPost from '../../components/blog/BlogPost';
import BlogSidebar from '../../components/blog/BlogSidebar';
import Link from 'next/link';
import Button from '../../components/ui/Button';

const GitignoreBlogPost = () => {
  const post = {
    id: 1,
    slug: 'ultimate-guide-to-gitignore-files',
    title: 'The Ultimate Guide to .gitignore Files: Best Practices for Clean Repositories',
    excerpt: 'Master the art of .gitignore files and learn how to keep your Git repositories clean, secure, and professional. Discover best practices, common patterns, and advanced techniques.',
    content: `
      <div class="prose prose-lg max-w-none">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Why .gitignore Files Are Essential for Professional Development</h2>
          <p class="text-lg text-gray-700 leading-relaxed">A well-crafted .gitignore file is the foundation of a clean, professional Git repository. It prevents sensitive information, build artifacts, and temporary files from cluttering your version control system, ensuring that only meaningful source code and configuration files are tracked. Whether you're a solo developer or part of a large team, understanding .gitignore best practices is crucial for maintaining repository hygiene and security.</p>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">What Should Be Ignored: A Comprehensive Guide</h2>
        <p class="text-gray-700 mb-6">Understanding what to ignore is the first step toward creating effective .gitignore files. Here's a systematic approach to categorizing files that should typically be excluded:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Build Artifacts & Dependencies</h3>
            <ul class="space-y-2 text-gray-700">
              <li><strong>node_modules/</strong> - JavaScript dependencies</li>
              <li><strong>dist/</strong> - Distribution/build folders</li>
              <li><strong>target/</strong> - Java/Maven build output</li>
              <li><strong>*.class</strong> - Compiled Java files</li>
              <li><strong>vendor/</strong> - PHP dependencies</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">IDE & Editor Files</h3>
            <ul class="space-y-2 text-gray-700">
              <li><strong>.vscode/</strong> - VS Code settings</li>
              <li><strong>.idea/</strong> - IntelliJ IDEA files</li>
              <li><strong>*.swp</strong> - Vim swap files</li>
              <li><strong>*.sublime-*</strong> - Sublime Text files</li>
              <li><strong>.DS_Store</strong> - macOS system files</li>
            </ul>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Language-Specific .gitignore Patterns</h2>
        <p class="text-gray-700 mb-6">Different programming languages and frameworks have their own specific files and directories that should be ignored:</p>

        <div class="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Programming Languages</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">JavaScript/Node.js</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li><code>node_modules/</code></li>
                <li><code>npm-debug.log*</code></li>
                <li><code>yarn-debug.log*</code></li>
                <li><code>.next/</code></li>
                <li><code>dist/</code></li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Python</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li><code>__pycache__/</code></li>
                <li><code>*.py[cod]</code></li>
                <li><code>.venv/</code></li>
                <li><code>venv/</code></li>
                <li><code>*.egg-info/</code></li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Java</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li><code>*.class</code></li>
                <li><code>target/</code></li>
                <li><code>.gradle/</code></li>
                <li><code>build/</code></li>
                <li><code>*.jar</code></li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Framework-Specific Considerations</h2>
        <p class="text-gray-700 mb-6">Modern frameworks often have their own build processes and temporary files that need special attention:</p>

        <div class="space-y-6 mb-8">
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Frontend Frameworks</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium text-gray-900 mb-2">React/Next.js</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li><code>.next/</code> - Next.js build output</li>
                  <li><code>out/</code> - Static export</li>
                  <li><code>.cache/</code> - Build cache</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Vue.js</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li><code>dist/</code> - Build output</li>
                  <li><code>.cache/</code> - Cache files</li>
                  <li><code>node_modules/</code> - Dependencies</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Mobile Development</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Android</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li><code>*.iml</code> - IntelliJ files</li>
                  <li><code>.gradle/</code> - Gradle cache</li>
                  <li><code>/build</code> - Build output</li>
                  <li><code>/captures</code> - Debug captures</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-2">iOS</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li><code>xcuserdata/</code> - User data</li>
                  <li><code>DerivedData/</code> - Build data</li>
                  <li><code>build/</code> - Build output</li>
                  <li><code>*.mode1v3</code> - Xcode files</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Security Considerations: What Never to Commit</h2>
        <p class="text-gray-700 mb-6">Security should be your top priority when creating .gitignore files. These items should never be committed to version control:</p>

        <div class="bg-red-50 p-6 rounded-lg mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Critical Security Exclusions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Environment Variables</h4>
              <ul class="space-y-2 text-gray-700">
                <li><strong>.env</strong> - Environment variables</li>
                <li><strong>.env.local</strong> - Local environment</li>
                <li><strong>.env.production</strong> - Production secrets</li>
                <li><strong>config/secrets.yml</strong> - Rails secrets</li>
                <li><strong>application.properties</strong> - Java config</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Credentials & Keys</h4>
              <ul class="space-y-2 text-gray-700">
                <li><strong>*.pem</strong> - Private keys</li>
                <li><strong>*.key</strong> - Encryption keys</li>
                <li><strong>id_rsa</strong> - SSH private keys</li>
                <li><strong>*.p12</strong> - Certificate files</li>
                <li><strong>GoogleService-Info.plist</strong> - Firebase config</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced .gitignore Techniques</h2>
        <p class="text-gray-700 mb-6">Beyond basic patterns, .gitignore supports powerful features for complex scenarios:</p>

        <div class="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Pattern Matching & Negation</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Advanced Patterns</h4>
              <ul class="space-y-2 text-gray-700">
                <li><strong>*.log</strong> - All log files</li>
                <li><strong>logs/*.log</strong> - Logs in specific directory</li>
                <li><strong>**/node_modules</strong> - node_modules anywhere</li>
                <li><strong>temp/**/*</strong> - Everything in temp subdirectories</li>
                <li><strong>*.{log,tmp,temp}</strong> - Multiple extensions</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Negation Patterns</h4>
              <ul class="space-y-2 text-gray-700">
                <li><strong>!important.log</strong> - Keep specific log</li>
                <li><strong>!config/</strong> - Keep config directory</li>
                <li><strong>!*.example</strong> - Keep example files</li>
                <li><strong>!.vscode/settings.json</strong> - Keep specific settings</li>
                <li><strong>!docs/</strong> - Keep documentation</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Practices for Team Development</h2>
        <p class="text-gray-700 mb-6">When working in teams, .gitignore files become even more important for consistency and collaboration:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Team Guidelines</h3>
            <ul class="space-y-2 text-gray-700">
              <li><strong>Document patterns:</strong> Add comments explaining complex rules</li>
              <li><strong>Use templates:</strong> Start with language-specific templates</li>
              <li><strong>Review regularly:</strong> Update as project evolves</li>
              <li><strong>Test thoroughly:</strong> Verify patterns work as expected</li>
              <li><strong>Share knowledge:</strong> Educate team on best practices</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Common Mistakes</h3>
            <ul class="space-y-2 text-gray-700">
              <li><strong>Over-ignoring:</strong> Excluding necessary files</li>
              <li><strong>Inconsistent patterns:</strong> Mixing different styles</li>
              <li><strong>Missing security:</strong> Forgetting sensitive files</li>
              <li><strong>No documentation:</strong> Unclear pattern purposes</li>
              <li><strong>Platform bias:</strong> Ignoring cross-platform needs</li>
            </ul>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Tools and Resources for .gitignore Management</h2>
        <p class="text-gray-700 mb-6">Leverage modern tools and resources to create and maintain effective .gitignore files:</p>

        <div class="bg-indigo-50 p-6 rounded-lg mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Essential Tools</h3>
          <ul class="space-y-3 text-gray-700">
            <li><strong>GitHub's .gitignore templates:</strong> Comprehensive templates for popular languages and frameworks</li>
            <li><strong>gitignore.io:</strong> Generate .gitignore files based on your tech stack</li>
            <li><strong>IDE integrations:</strong> Built-in .gitignore support in modern editors</li>
            <li><strong>Linting tools:</strong> Validate .gitignore syntax and effectiveness</li>
            <li><strong>Version control:</strong> Track .gitignore changes alongside code</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Monitoring and Maintenance</h2>
        <p class="text-gray-700 mb-6">Regular maintenance ensures your .gitignore files remain effective as projects evolve:</p>

        <div class="bg-green-50 p-6 rounded-lg mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Maintenance Checklist</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Regular Reviews</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>Check for new file types in commits</li>
                <li>Review ignored files for false positives</li>
                <li>Update patterns for new dependencies</li>
                <li>Remove obsolete patterns</li>
                <li>Test patterns with git status</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Performance Optimization</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>Use specific patterns over wildcards</li>
                <li>Order patterns from specific to general</li>
                <li>Group related patterns together</li>
                <li>Use negation sparingly</li>
                <li>Monitor .gitignore file size</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common .gitignore Issues</h2>
        <p class="text-gray-700 mb-6">Even with the best .gitignore files, issues can arise. Here's how to diagnose and fix common problems:</p>

        <div class="bg-orange-50 p-6 rounded-lg mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Common Problems</h3>
              <ul class="space-y-2 text-gray-700">
                <li><strong>Files still tracked:</strong> Already committed files won't be ignored</li>
                <li><strong>Pattern not matching:</strong> Check syntax and path structure</li>
                <li><strong>Case sensitivity:</strong> Git is case-sensitive on some systems</li>
                <li><strong>Hidden files:</strong> Remember to include dotfiles</li>
                <li><strong>Subdirectories:</strong> Use ** for recursive matching</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Debugging Commands</h3>
              <ul class="space-y-2 text-gray-700">
                <li><code>git status --ignored</code> - Show ignored files</li>
                <li><code>git check-ignore -v file</code> - Test specific file</li>
                <li><code>git clean -n</code> - Preview cleanup</li>
                <li><code>git rm --cached file</code> - Remove tracked file</li>
                <li><code>git ls-files --others --ignored</code> - List ignored files</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Conclusion: Building Better Repositories</h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-4">A well-crafted .gitignore file is more than just a technical necessity—it's a reflection of your development practices and attention to detail. By following these best practices, you'll create repositories that are clean, secure, and professional, making collaboration easier and reducing the risk of accidentally committing sensitive information.</p>
          <p class="text-lg text-gray-700 leading-relaxed">Remember that .gitignore files should evolve with your project. Regular review and updates ensure they remain effective as your codebase grows and technologies change. The investment in proper .gitignore management pays dividends in repository hygiene, team productivity, and security.</p>
        </div>

        <div class="bg-gray-100 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Ready to Create Professional .gitignore Files?</h3>
          <p class="text-gray-700 mb-4">Try our comprehensive .gitignore Generator tool that provides templates for all major programming languages, frameworks, and platforms. Whether you're starting a new project or cleaning up an existing repository, our tool helps you create professional .gitignore files quickly and accurately.</p>
          <div class="text-center">
            <a href="/tools/gitignore-generator" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Generate Your .gitignore File
            </a>
          </div>
        </div>
      </div>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Development',
    tags: ['.gitignore', 'Git', 'Version Control', 'Development', 'Best Practices', 'Repository Management', 'Security', 'Team Collaboration'],
    publishedAt: '2024-01-27T10:00:00Z',
    featured: true,
    author: {
      name: 'Sarah Johnson',
      bio: 'Senior software engineer and DevOps specialist with 10+ years of experience in version control systems and development workflows. Expert in Git, CI/CD pipelines, and development best practices.',
      social: {
        twitter: 'https://twitter.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson'
      }
    },
    relatedPosts: [
      {
        slug: 'mastering-scientific-calculators',
        title: 'Mastering Scientific Calculators: From Basic Math to Advanced Graphing',
        excerpt: 'Discover the power of scientific calculators and learn how to leverage advanced mathematical functions, graphing capabilities, and programming features for complex problem-solving.',
        featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        slug: 'complete-guide-to-qr-code-generation',
        title: 'The Complete Guide to QR Code Generation: Everything You Need to Know',
        excerpt: 'Discover the power of QR codes, from basic concepts to advanced customization. Learn how QR codes work, their applications, and how to create professional QR codes for your business.',
        featuredImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  };

  const recentPosts = [
    {
      slug: 'mastering-scientific-calculators',
      title: 'Mastering Scientific Calculators: From Basic Math to Advanced Graphing',
      excerpt: 'Discover the power of scientific calculators and learn how to leverage advanced mathematical functions.',
      featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      publishedAt: '2024-01-26T10:00:00Z'
    },
    {
      slug: 'complete-guide-to-qr-code-generation',
      title: 'The Complete Guide to QR Code Generation: Everything You Need to Know',
      excerpt: 'Discover the power of QR codes, from basic concepts to advanced customization.',
      featuredImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      publishedAt: '2024-01-25T10:00:00Z'
    },
    {
      slug: 'ultimate-guide-to-password-generators',
      title: 'The Ultimate Guide to Password Generators: Why You Need Strong Passwords',
      excerpt: 'Discover why strong passwords are crucial in today\'s digital world.',
      featuredImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      publishedAt: '2024-01-20T10:00:00Z'
    }
  ];

  const mockCategories = [
    { slug: 'development', name: 'Development', count: 2 },
    { slug: 'technology', name: 'Technology', count: 1 },
    { slug: 'security', name: 'Security', count: 1 },
    { slug: 'tutorial', name: 'Tutorial', count: 2 },
    { slug: 'productivity', name: 'Productivity', count: 1 },
    { slug: 'tips', name: 'Tips & Tricks', count: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogPost post={post} />
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar
              categories={mockCategories}
              recentPosts={recentPosts}
              searchQuery=""
              onSearchChange={() => {}}
            />
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default GitignoreBlogPost;
