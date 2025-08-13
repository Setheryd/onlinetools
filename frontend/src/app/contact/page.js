import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export const metadata = {
  title: 'Contact — The Tool Guru',
  description: 'Get in touch with The Tool Guru team. We\'d love to hear your feedback, suggestions, or questions.',
  keywords: ['contact', 'support', 'feedback', 'help', 'online tools', 'the tool guru']
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question, suggestion, or just want to say hello? 
              We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us what's on your mind..."
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📧</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@thetool.guru</p>
                      <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🌐</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Website</h3>
                      <p className="text-gray-600">thetool.guru</p>
                      <p className="text-sm text-gray-500">Visit our main site</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Social Media</h3>
                      <p className="text-gray-600">Follow us for updates</p>
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-blue-600 hover:text-blue-700">Twitter</a>
                        <a href="#" className="text-blue-600 hover:text-blue-700">LinkedIn</a>
                        <a href="#" className="text-blue-600 hover:text-blue-700">GitHub</a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Are the tools really free?</h3>
                    <p className="text-gray-600 text-sm">
                      Yes! All our tools are completely free to use with no hidden costs or premium features.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
                    <p className="text-gray-600 text-sm">
                      Absolutely. All processing happens in your browser - your data never leaves your device.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Can I suggest a new tool?</h3>
                    <p className="text-gray-600 text-sm">
                      We'd love to hear your suggestions! Use the contact form above to let us know what tools you'd like to see.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Response Time Section */}
          <section className="mt-16">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Quick Response Guarantee</h2>
              <p className="text-blue-100 mb-6">
                We strive to respond to all inquiries within 24 hours during business days. 
                For urgent matters, please include "URGENT" in your subject line.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">24h</div>
                  <div className="text-blue-100">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-blue-100">Free Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Tools Available</div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default ContactPage;
