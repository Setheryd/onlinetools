import React from 'react';
import Card from '../ui/Card';

const ToolContentSection = ({ 
  toolName, 
  description, 
  features = [], 
  useCases = [], 
  howToUse = [],
  tips = [],
  faq = []
}) => {
  return (
    <div className="mt-12 space-y-8">
      {/* About Section */}
      <Card className="p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              ℹ️
            </div>
            <h2 className="text-3xl font-bold text-gray-900">About this {toolName}</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {description}
          </p>
          
          {features.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Key Features</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 flex-1 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* How to Use Section */}
      {howToUse.length > 0 && (
        <Card className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              📖
            </div>
            <h3 className="text-2xl font-bold text-gray-900">How to Use</h3>
          </div>
          <div className="space-y-4">
            {howToUse.map((step, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Use Cases Section */}
      {useCases.length > 0 && (
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              💡
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Popular Use Cases</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed flex-1">{useCase}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tips Section */}
      {tips.length > 0 && (
        <Card className="p-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full -mr-24 -mt-24 opacity-30"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                💡
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Tips & Best Practices</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200 hover:bg-white hover:shadow-md transition-all group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mt-0.5 group-hover:rotate-12 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* FAQ Section */}
      {faq.length > 0 && (
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              ❓
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="group">
                <div className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                      Q
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.question}</h4>
                      <div className="flex items-start gap-3 mt-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-gray-700 leading-relaxed flex-1">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ToolContentSection;

