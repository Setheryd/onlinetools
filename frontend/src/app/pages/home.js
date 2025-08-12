import React from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Home = () => {
  const featuredTools = [
    {
      id: 'base64',
      name: 'Base64 Encoder/Decoder',
      description: 'Encode text to Base64 or decode Base64 back to text.',
      icon: '🔤',
      category: 'Text Tools',
      url: '/tools/base64'
    },
    {
      id: 'pdf-merger',
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into a single document.',
      icon: '📄',
      category: 'Document Tools',
      url: '/tools/pdf-merger'
    },
    {
      id: 'url-encoder',
      name: 'URL Encoder/Decoder',
      description: 'Encode or decode URLs to handle special characters.',
      icon: '🔗',
      category: 'Text Tools',
      url: '/tools/url-encoder'
    }
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'All tools are optimized for speed and efficiency.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data never leaves your browser. Complete privacy guaranteed.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Works perfectly on all devices and screen sizes.'
    },
    {
      icon: '🆓',
      title: '100% Free',
      description: 'No hidden costs, no premium features. Everything is free.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <Body>
        {/* Featured Tools Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular utilities that help thousands of users every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <Card key={tool.id} hover className="text-center">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>
                <Badge variant="primary" className="mb-4">
                  {tool.category}
                </Badge>
                <Link href={tool.url}>
                  <Button variant="primary" className="w-full">
                    Use Tool
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/tools">
              <Button variant="outline" size="lg">
                View All Tools
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Tools?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technology and user experience in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of users who trust our tools for their daily tasks
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools">
                  <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Explore Tools
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Read Blog
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Free Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
          </div>
        </section>
      </Body>
      
      <Footer />
    </div>
  );
};

export default Home;
