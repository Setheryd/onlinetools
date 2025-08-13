import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';

export const metadata = {
  title: 'About — The Tool Guru',
  description: 'Learn about The Tool Guru, our mission to provide free, high-quality web utilities, and the team behind the platform.',
  keywords: ['about', 'mission', 'team', 'online tools', 'web utilities', 'the tool guru']
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About The Tool Guru
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building the most comprehensive collection of free online utilities 
              to help developers, designers, and professionals work more efficiently.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <Card>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To provide high-quality, free online tools that make everyday tasks easier. 
                  We believe that powerful utilities should be accessible to everyone, 
                  regardless of their technical background or budget.
                </p>
              </div>
            </Card>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy First</h3>
                <p className="text-gray-600">
                  Your data never leaves your browser. We believe in complete privacy 
                  and security for all our users.
                </p>
              </Card>
              
              <Card className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance</h3>
                <p className="text-gray-600">
                  Every tool is optimized for speed and efficiency. 
                  We believe fast tools make for happy users.
                </p>
              </Card>
              
              <Card className="text-center">
                <div className="text-4xl mb-4">🆓</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Always Free</h3>
                <p className="text-gray-600">
                  No hidden costs, no premium features. 
                  Everything we build is completely free to use.
                </p>
              </Card>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">2+</div>
                  <div className="text-gray-600">Active Tools</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-gray-600">Coming Soon</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Available</div>
                </div>
              </div>
            </Card>
          </section>

          {/* Technology Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Built with Modern Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Next.js 14 with App Router</li>
                  <li>• React 18 with modern hooks</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Responsive design principles</li>
                </ul>
              </Card>
              
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Python for data processing</li>
                  <li>• Automated content generation</li>
                  <li>• SEO optimization</li>
                  <li>• Scalable architecture</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-6">
                Explore our collection of free online tools and see how they can help you work more efficiently.
              </p>
              <a 
                href="/tools" 
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Tools
              </a>
            </Card>
          </section>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default AboutPage;
