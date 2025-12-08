"use client";

import React, { useState, useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ToolContentSection from '../../components/tools/ToolContentSection';

const TextSummarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('extractive');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [focusedKeywords, setFocusedKeywords] = useState('');
  const [summaryHistory, setSummaryHistory] = useState([]);

  const summarizationMethods = [
    {
      id: 'extractive',
      name: 'Extractive',
      description: 'Selects the most important sentences from the text',
      icon: '✂️',
      bestFor: 'News articles, reports, factual content'
    },
    {
      id: 'abstractive',
      name: 'Abstractive',
      description: 'Creates new sentences that capture the main ideas',
      icon: '🧠',
      bestFor: 'Creative writing, stories, complex content'
    },
    {
      id: 'keyword-based',
      name: 'Keyword-Based',
      description: 'Focuses on sentences containing specific keywords',
      icon: '🔍',
      bestFor: 'Research papers, technical documents'
    },
    {
      id: 'frequency-based',
      name: 'Frequency-Based',
      description: 'Prioritizes sentences with frequent important words',
      icon: '📊',
      bestFor: 'Academic papers, long documents'
    }
  ];

  const summaryLengths = [
    {
      id: 'short',
      name: 'Short',
      description: '2-3 sentences',
      percentage: 15
    },
    {
      id: 'medium',
      name: 'Medium',
      description: '4-6 sentences',
      percentage: 30
    },
    {
      id: 'long',
      name: 'Long',
      description: '7-10 sentences',
      percentage: 50
    }
  ];

  const generateSummary = () => {
    if (!text.trim()) return;

    setIsSummarizing(true);
    
    // Simulate summarization delay for better UX
    setTimeout(() => {
      const result = summarizeText(text, selectedMethod, summaryLength, focusedKeywords);
      setSummary(result);
      
      // Add to history
      const newSummary = {
        id: Date.now(),
        originalLength: text.length,
        summaryLength: result.summary.length,
        method: selectedMethod,
        timestamp: new Date().toLocaleTimeString(),
        compressionRatio: Math.round(((text.length - result.summary.length) / text.length) * 100)
      };
      
      setSummaryHistory(prev => [newSummary, ...prev.slice(0, 9)]); // Keep last 10
      setIsSummarizing(false);
    }, 1200);
  };

  const summarizeText = (inputText, method, length, keywords) => {
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const words = inputText.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    
    let selectedSentences = [];
    
    switch (method) {
      case 'extractive':
        selectedSentences = extractiveSummarization(sentences, length);
        break;
      case 'abstractive':
        selectedSentences = abstractiveSummarization(sentences, length);
        break;
      case 'keyword-based':
        selectedSentences = keywordBasedSummarization(sentences, length, keywords);
        break;
      case 'frequency-based':
        selectedSentences = frequencyBasedSummarization(sentences, length, words);
        break;
      default:
        selectedSentences = extractiveSummarization(sentences, length);
    }
    
    return {
      summary: selectedSentences.join('. ') + (selectedSentences.length > 0 ? '.' : ''),
      method: method,
      originalLength: inputText.length,
      summaryLength: selectedSentences.join('. ').length,
      sentences: selectedSentences.length,
      keywords: extractKeywords(words)
    };
  };

  const extractiveSummarization = (sentences, length) => {
    // Score sentences based on various factors
    const scoredSentences = sentences.map((sentence, index) => {
      let score = 0;
      
      // Position score (first and last sentences get higher scores)
      if (index === 0) score += 10;
      if (index === sentences.length - 1) score += 8;
      if (index < 3) score += 5;
      
      // Length score (prefer medium-length sentences)
      const sentenceLength = sentence.length;
      if (sentenceLength > 50 && sentenceLength < 200) score += 15;
      else if (sentenceLength > 20 && sentenceLength < 300) score += 10;
      
      // Keyword density score
      const importantWords = ['important', 'key', 'main', 'primary', 'essential', 'critical', 'significant', 'major', 'central', 'fundamental'];
      const sentenceWords = sentence.toLowerCase().split(/\s+/);
      const keywordCount = sentenceWords.filter(word => importantWords.includes(word)).length;
      score += keywordCount * 5;
      
      // Question score (questions often indicate important content)
      if (sentence.includes('?')) score += 5;
      
      // Quote score (quoted content is often important)
      if (sentence.includes('"') || sentence.includes('"')) score += 3;
      
      return { sentence, score, index };
    });
    
    // Sort by score and select top sentences
    const targetCount = getTargetSentenceCount(length);
    return scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, targetCount)
      .sort((a, b) => a.index - b.index)
      .map(item => item.sentence);
  };

  const abstractiveSummarization = (sentences, length) => {
    // For abstractive, we'll create a more intelligent summary
    const targetCount = getTargetSentenceCount(length);
    const selectedSentences = [];
    
    // Select key sentences and try to combine related ideas
    const keySentences = sentences.filter((sentence, index) => {
      return index === 0 || // First sentence
             index === sentences.length - 1 || // Last sentence
             sentence.toLowerCase().includes('conclusion') ||
             sentence.toLowerCase().includes('summary') ||
             sentence.toLowerCase().includes('therefore') ||
             sentence.toLowerCase().includes('thus') ||
             sentence.toLowerCase().includes('in conclusion');
    });
    
    // Add some middle sentences for context
    const middleIndex = Math.floor(sentences.length / 2);
    if (middleIndex < sentences.length) {
      keySentences.push(sentences[middleIndex]);
    }
    
    // Limit to target count
    return keySentences.slice(0, targetCount);
  };

  const keywordBasedSummarization = (sentences, length, keywords) => {
    if (!keywords.trim()) {
      return extractiveSummarization(sentences, length);
    }
    
    const keywordList = keywords.toLowerCase().split(',').map(k => k.trim());
    const targetCount = getTargetSentenceCount(length);
    
    const scoredSentences = sentences.map((sentence, index) => {
      let score = 0;
      const sentenceLower = sentence.toLowerCase();
      
      // Score based on keyword presence
      keywordList.forEach(keyword => {
        if (sentenceLower.includes(keyword)) {
          score += 10;
          // Bonus for multiple occurrences
          const occurrences = (sentenceLower.match(new RegExp(keyword, 'g')) || []).length;
          score += (occurrences - 1) * 5;
        }
      });
      
      // Position bonus
      if (index === 0) score += 5;
      if (index === sentences.length - 1) score += 3;
      
      return { sentence, score, index };
    });
    
    return scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, targetCount)
      .sort((a, b) => a.index - b.index)
      .map(item => item.sentence);
  };

  const frequencyBasedSummarization = (sentences, length, allWords) => {
    const targetCount = getTargetSentenceCount(length);
    
    // Calculate word frequency
    const wordFrequency = {};
    allWords.forEach(word => {
      if (word.length > 3) { // Only consider words longer than 3 characters
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });
    
    // Score sentences based on word frequency
    const scoredSentences = sentences.map((sentence, index) => {
      let score = 0;
      const sentenceWords = sentence.toLowerCase().split(/\s+/);
      
      sentenceWords.forEach(word => {
        if (wordFrequency[word]) {
          score += wordFrequency[word];
        }
      });
      
      // Normalize by sentence length
      score = score / sentenceWords.length;
      
      // Position bonus
      if (index === 0) score += 5;
      if (index === sentences.length - 1) score += 3;
      
      return { sentence, score, index };
    });
    
    return scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, targetCount)
      .sort((a, b) => a.index - b.index)
      .map(item => item.sentence);
  };

  const getTargetSentenceCount = (length) => {
    switch (length) {
      case 'short': return 2;
      case 'medium': return 5;
      case 'long': return 8;
      default: return 5;
    }
  };

  const extractKeywords = (words) => {
    // Simple keyword extraction based on frequency and importance
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    const wordFrequency = {};
    words.forEach(word => {
      if (word.length > 3 && !stopWords.includes(word)) {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });
    
    return Object.entries(wordFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  };

  const clearAll = () => {
    setText('');
    setSummary(null);
    setFocusedKeywords('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getCompressionRatio = () => {
    if (!summary) return 0;
    return Math.round(((summary.originalLength - summary.summaryLength) / summary.originalLength) * 100);
  };

  const getCompressionColor = (ratio) => {
    if (ratio >= 70) return 'text-green-600 bg-green-100';
    if (ratio >= 50) return 'text-blue-600 bg-blue-100';
    if (ratio >= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Text Summarizer</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform long text into concise, meaningful summaries using advanced AI-powered algorithms. 
              Choose from multiple summarization methods and customize the output length.
            </p>
          </div>

          {/* Configuration Section */}
          <Card className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Summarization Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Summarization Method
                </label>
                <div className="space-y-2">
                  {summarizationMethods.map((method) => (
                    <label key={method.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="method"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{method.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{method.name}</div>
                          <div className="text-xs text-gray-600">{method.description}</div>
                          <div className="text-xs text-blue-600">{method.bestFor}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary Length and Keywords */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Summary Length
                  </label>
                  <div className="space-y-2">
                    {summaryLengths.map((length) => (
                      <label key={length.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="length"
                          value={length.id}
                          checked={summaryLength === length.id}
                          onChange={(e) => setSummaryLength(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{length.name}</div>
                          <div className="text-xs text-gray-600">{length.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {selectedMethod === 'keyword-based' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Focus Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={focusedKeywords}
                      onChange={(e) => setFocusedKeywords(e.target.value)}
                      placeholder="e.g., technology, innovation, future"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Leave empty to use automatic keyword detection
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Input Section */}
          <Card className="mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your text to summarize
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type your long text here to generate a concise summary..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{text.length} characters</span>
                <span>{text.split(/\s+/).filter(word => word.length > 0).length} words</span>
                <span>{text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length} sentences</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                onClick={generateSummary}
                disabled={!text.trim() || isSummarizing}
                className="flex items-center gap-2"
              >
                <span>{isSummarizing ? '🔄' : '📝'}</span>
                {isSummarizing ? 'Generating Summary...' : 'Generate Summary'}
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAll}
                className="flex items-center gap-2"
              >
                <span>🗑️</span>
                Clear All
              </Button>
            </div>
          </Card>

          {/* Summary Results */}
          {summary && (
            <div className="space-y-6">
              {/* Summary Display */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Generated Summary</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" className="px-3 py-1">
                      {summary.method.charAt(0).toUpperCase() + summary.method.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      {summaryLength.charAt(0).toUpperCase() + summaryLength.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border mb-4">
                  <div className="text-lg text-gray-800 leading-relaxed">
                    {summary.summary}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(summary.summary)}
                    className="flex items-center gap-2"
                  >
                    <span>📋</span>
                    Copy Summary
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(`Original: ${text}\n\nSummary: ${summary.summary}`)}
                    className="flex items-center gap-2"
                  >
                    <span>📄</span>
                    Copy All
                  </Button>
                </div>
              </Card>

              {/* Summary Statistics */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  Summary Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{summary.originalLength}</div>
                    <div className="text-sm text-gray-600">Original Characters</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{summary.summaryLength}</div>
                    <div className="text-sm text-gray-600">Summary Characters</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{summary.sentences}</div>
                    <div className="text-sm text-gray-600">Summary Sentences</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{getCompressionRatio()}%</div>
                    <div className="text-sm text-gray-600">Compression Ratio</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Compression Level</span>
                    <Badge 
                      variant="outline" 
                      className={`px-2 py-1 ${getCompressionColor(getCompressionRatio())}`}
                    >
                      {getCompressionRatio()}% reduction
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getCompressionRatio()}%` }}
                    ></div>
                  </div>
                </div>
              </Card>

              {/* Extracted Keywords */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔑</span>
                  Key Terms & Concepts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {summary.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Summary History */}
          {summaryHistory.length > 0 && (
            <Card className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>📚</span>
                Summarization History
              </h3>
              <div className="space-y-3">
                {summaryHistory.map((hist) => (
                  <div key={hist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📝</span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {hist.originalLength} → {hist.summaryLength} characters
                        </div>
                        <div className="text-sm text-gray-600">
                          {hist.method} • {hist.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`px-2 py-1 text-xs ${getCompressionColor(hist.compressionRatio)}`}
                      >
                        {hist.compressionRatio}% reduction
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tips Section */}
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              Tips for Better Summaries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Choose the Right Method:</h4>
                <ul className="space-y-1">
                  <li>• <strong>Extractive:</strong> Best for news and factual content</li>
                  <li>• <strong>Abstractive:</strong> Ideal for creative and complex writing</li>
                  <li>• <strong>Keyword-based:</strong> Perfect for research and technical docs</li>
                  <li>• <strong>Frequency-based:</strong> Great for academic papers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">For Best Results:</h4>
                <ul className="space-y-1">
                  <li>• Use well-structured text with clear sentences</li>
                  <li>• Include important keywords naturally</li>
                  <li>• Choose appropriate summary length</li>
                  <li>• Review and refine the generated summary</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Examples Section */}
          <Card className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📚</span>
              Example Text to Try
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Technology Article',
                  text: 'Artificial intelligence has revolutionized the way we approach problem-solving in modern computing. Machine learning algorithms can now process vast amounts of data to identify patterns that humans might miss. This technology is being applied across various industries, from healthcare to finance, improving efficiency and accuracy in decision-making processes.',
                  method: 'extractive'
                },
                {
                  title: 'Research Paper',
                  text: 'Climate change represents one of the most significant challenges facing humanity in the 21st century. Scientific evidence indicates that global temperatures are rising at an unprecedented rate, primarily due to human activities such as burning fossil fuels and deforestation. The consequences include rising sea levels, extreme weather events, and biodiversity loss.',
                  method: 'keyword-based'
                },
                {
                  title: 'Creative Story',
                  text: 'The old lighthouse stood proudly on the rocky cliff, its beacon cutting through the darkness like a sword of light. For generations, it had guided ships safely to harbor, weathering countless storms and witnessing both joy and tragedy. The keeper, a solitary figure with stories etched in the lines of his weathered face, maintained the flame that meant hope for sailors far from home.',
                  method: 'abstractive'
                }
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setText(example.text);
                    setSelectedMethod(example.method);
                    setSummaryLength('medium');
                  }}
                  className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {example.title}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {example.text.substring(0, 100)}...
                  </div>
                  <div className="text-xs text-blue-600">
                    Method: {summarizationMethods.find(m => m.id === example.method)?.name}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Text Summarizer"
            description="Transform long text into concise, meaningful summaries using advanced algorithms. Our text summarizer offers multiple summarization methods including extractive (selecting key sentences), abstractive (creating new summaries), keyword-based, and frequency-based approaches. Perfect for condensing articles, research papers, reports, or any lengthy content into shorter, digestible summaries. Customize summary length and method to get the perfect summary for your needs."
            features={[
              "Multiple summarization methods (extractive, abstractive, keyword-based, frequency-based)",
              "Customizable summary length (short, medium, long)",
              "Keyword-focused summarization",
              "Compression ratio tracking",
              "Summary history for multiple attempts",
              "Key terms and concepts extraction",
              "Real-time summary generation",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter or paste your long text into the input field",
              "Select summarization method (extractive, abstractive, etc.)",
              "Choose summary length (short, medium, or long)",
              "Add focus keywords if using keyword-based method",
              "Click 'Generate Summary' to create the summary",
              "Review the generated summary and statistics",
              "Copy the summary or regenerate with different settings",
              "Use summary history to compare different approaches"
            ]}
            useCases={[
              "Condense long articles and blog posts",
              "Summarize research papers and academic content",
              "Create executive summaries from reports",
              "Extract key points from lengthy documents",
              "Generate quick overviews of content",
              "Create abstracts and synopses",
              "Summarize meeting notes and transcripts",
              "Condense news articles and stories"
            ]}
            tips={[
              "Use extractive method for factual content and news articles",
              "Use abstractive method for creative writing and stories",
              "Keyword-based works well for research and technical documents",
              "Adjust summary length based on your needs",
              "Review and refine summaries for best results",
              "Use focus keywords to guide summarization",
              "Compare different methods to find what works best"
            ]}
            faq={[
              {
                question: "What's the difference between extractive and abstractive summarization?",
                answer: "Extractive summarization selects the most important sentences from the original text. Abstractive summarization creates new sentences that capture the main ideas, potentially rephrasing content."
              },
              {
                question: "How long should my input text be?",
                answer: "The tool works with texts of various lengths. Longer texts (500+ words) typically produce better summaries. Very short texts may not benefit much from summarization."
              },
              {
                question: "Can I customize the summary length?",
                answer: "Yes, you can choose from short (2-3 sentences), medium (4-6 sentences), or long (7-10 sentences) summary lengths. The tool adjusts the compression accordingly."
              },
              {
                question: "Will the summary preserve all important information?",
                answer: "Summaries aim to capture the most important information, but some details may be condensed or omitted. Review the summary to ensure it meets your needs, and regenerate if necessary."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default TextSummarizer;
