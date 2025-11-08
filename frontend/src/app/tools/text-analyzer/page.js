"use client";

import React, { useState, useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import ToolContentSection from '../../components/tools/ToolContentSection';

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeText = () => {
    if (!text.trim()) return;

    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    // Calculate average word length
    const avgWordLength = words.length > 0 
      ? (charactersNoSpaces / words.length).toFixed(1) 
      : 0;
    
    // Calculate average sentence length
    const avgSentenceLength = sentences.length > 0 
      ? (words.length / sentences.length).toFixed(1) 
      : 0;
    
    // Calculate average paragraph length
    const avgParagraphLength = paragraphs.length > 0 
      ? (words.length / paragraphs.length).toFixed(1) 
      : 0;

    // Readability scores
    const fleschKincaid = calculateFleschKincaid(words, sentences);
    const gunningFog = calculateGunningFog(words, sentences);
    const colemanLiau = calculateColemanLiau(words, sentences, characters);

    // Sentiment analysis (simple approach)
    const sentiment = analyzeSentiment(text);
    
    

    // Word frequency analysis
    const wordFrequency = analyzeWordFrequency(words);

    setAnalysis({
      basic: {
        characters,
        charactersNoSpaces,
        words: words.length,
        sentences: sentences.length,
        paragraphs: paragraphs.length,
        avgWordLength,
        avgSentenceLength,
        avgParagraphLength
      },
      readability: {
        fleschKincaid,
        gunningFog,
        colemanLiau
      },
      sentiment,
      
      wordFrequency: wordFrequency.slice(0, 10) // Top 10 most frequent words
    });
  };

  const calculateFleschKincaid = (words, sentences) => {
    if (words.length === 0 || sentences.length === 0) return 0;
    
    // Count syllables (simplified)
    const syllables = words.reduce((count, word) => {
      return count + countSyllables(word);
    }, 0);
    
    const score = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length));
    return Math.max(0, Math.min(100, score));
  };

  const calculateGunningFog = (words, sentences) => {
    if (words.length === 0 || sentences.length === 0) return 0;
    
    // Count complex words (words with 3+ syllables)
    const complexWords = words.filter(word => countSyllables(word) >= 3).length;
    
    const score = 0.4 * ((words.length / sentences.length) + (100 * (complexWords / words.length)));
    return Math.max(0, score);
  };

  const calculateColemanLiau = (words, sentences, characters) => {
    if (words.length === 0 || sentences.length === 0) return 0;
    
    const L = (characters / words.length) * 100;
    const S = (sentences.length / words.length) * 100;
    
    const score = 0.0588 * L - 0.296 * S - 15.8;
    return Math.max(0, score);
  };

  const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  const analyzeSentiment = (text) => {
    const positiveWords = [
      'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'joy', 'beautiful', 'perfect', 'awesome', 'brilliant',
      'outstanding', 'superb', 'magnificent', 'delightful', 'thrilled', 'excited', 'ecstatic', 'glorious', 'marvelous', 'splendid', 'terrific',
      'incredible', 'phenomenal', 'extraordinary', 'exceptional', 'superior',
      'successful', 'winning', 'victory', 'triumph', 'achievement', 'accomplishment', 'progress', 'improvement', 'growth', 'development', 'innovation', 'creative', 'inspiring'
    ];
    
    const negativeWords = [
      'terrible', 'awful', 'horrible', 'hate', 'dislike', 'sad', 'angry', 'ugly', 'worst', 'disappointing', 'frustrating', 'annoying', 'painful',
      'complex', 'complicated', 'confusing', 'unclear', 'vague', 'inferior', 'substandard', 'defective', 'broken', 'damaged', 'faulty',
      'sluggish', 'laggy', 'unresponsive', 'crash', 'error', 'bug', 'glitch', 'problem', 'issue', 'trouble', 'difficulty', 'challenge', 'obstacle', 'barrier',
      'failure', 'defeat', 'loss', 'waste', 'useless', 'pointless', 'meaningless', 'boring', 'dull', 'monotonous', 'repetitive', 'tedious', 'irritating'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    let matchedPositiveWords = [];
    let matchedNegativeWords = [];
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
      if (cleanWord.length > 0) {
        if (positiveWords.includes(cleanWord)) {
          positiveCount++;
          matchedPositiveWords.push(cleanWord);
        }
        if (negativeWords.includes(cleanWord)) {
          negativeCount++;
          matchedNegativeWords.push(cleanWord);
        }
      }
    });
    
    const total = positiveCount + negativeCount;
    
    // If no sentiment words found, return neutral
    if (total === 0) {
      return { 
        score: 0, 
        label: 'Neutral', 
        color: 'gray', 
        confidence: 'high',
        positiveCount: 0,
        negativeCount: 0,
        total: 0,
        matchedPositiveWords: [],
        matchedNegativeWords: []
      };
    }
    
    // Calculate sentiment score based on ratio of positive to negative words
    // Use a more balanced approach that considers the intensity of sentiment
    let score;
    if (positiveCount === 0 && negativeCount === 0) {
      score = 0;
    } else if (positiveCount === 0) {
      score = -50; // Pure negative
    } else if (negativeCount === 0) {
      score = 50; // Pure positive
    } else {
      // Mixed sentiment - calculate based on ratio but cap the extremes
      const ratio = (positiveCount - negativeCount) / (positiveCount + negativeCount);
      score = ratio * 50; // Scale to -50 to +50 range
    }
    
    let label, color, confidence;
    
    if (score > 25) {
      label = 'Very Positive';
      color = 'green';
      confidence = positiveCount > 3 ? 'high' : 'medium';
    } else if (score > 10) {
      label = 'Positive';
      color = 'green';
      confidence = positiveCount > 2 ? 'high' : 'medium';
    } else if (score < -25) {
      label = 'Very Negative';
      color = 'red';
      confidence = negativeCount > 3 ? 'high' : 'medium';
    } else if (score < -10) {
      label = 'Negative';
      color = 'red';
      confidence = negativeCount > 2 ? 'high' : 'medium';
    } else {
      label = 'Neutral';
      color = 'gray';
      confidence = 'medium';
    }
    
    // Debug logging
    console.log('Sentiment Analysis Debug:', {
      text: text.substring(0, 100) + '...',
      positiveCount,
      negativeCount,
      total,
      score,
      label,
      matchedPositiveWords,
      matchedNegativeWords
    });
    
    return { 
      score: Math.round(score), 
      label, 
      color, 
      confidence,
      positiveCount,
      negativeCount,
      total,
      matchedPositiveWords,
      matchedNegativeWords
    };
  };



  const analyzeWordFrequency = (words) => {
    const frequency = {};
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (cleanWord.length > 0) {
        frequency[cleanWord] = (frequency[cleanWord] || 0) + 1;
      }
    });
    
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .map(([word, count]) => ({ word, count }));
  };

  const getReadabilityLevel = (score) => {
    if (score >= 90) return { level: 'Very Easy', color: 'green', description: '5th grade level' };
    if (score >= 80) return { level: 'Easy', color: 'green', description: '6th grade level' };
    if (score >= 70) return { level: 'Fairly Easy', color: 'blue', description: '7th grade level' };
    if (score >= 60) return { level: 'Standard', color: 'blue', description: '8th-9th grade level' };
    if (score >= 50) return { level: 'Fairly Difficult', color: 'yellow', description: '10th-12th grade level' };
    if (score >= 30) return { level: 'Difficult', color: 'orange', description: 'College level' };
    return { level: 'Very Difficult', color: 'red', description: 'College graduate level' };
  };

  const clearText = () => {
    setText('');
    setAnalysis(null);
  };

  const copyToClipboard = () => {
    if (analysis) {
             const summary = `Text Analysis Summary:
 - Characters: ${analysis.basic.characters}
 - Words: ${analysis.basic.words}
 - Sentences: ${analysis.basic.sentences}
 - Paragraphs: ${analysis.basic.paragraphs}
 - Readability: ${getReadabilityLevel(analysis.readability.fleschKincaid).level}
 - Sentiment: ${analysis.sentiment.label}`;
      
      navigator.clipboard.writeText(summary);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Text Analyzer</h1>
                         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Analyze your text for readability, sentiment, and linguistic features. 
               Get detailed insights to improve your writing and understand your content better.
             </p>
          </div>

          {/* Input Section */}
          <Card className="mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your text to analyze
              </label>
              
              {/* Example Texts */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">Try these examples to test different features:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setText("I absolutely love this amazing product! It's fantastic and wonderful. The quality is excellent and I'm so happy with my purchase. This is the best thing I've ever bought!")}
                    className="text-left h-auto p-3"
                  >
                    <div className="font-medium text-green-600">😊 Positive Sentiment</div>
                    <div className="text-xs text-gray-500">Test positive sentiment analysis</div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setText("This is terrible and awful. I hate it so much. The quality is bad and disappointing. This is the worst purchase I've ever made. I'm so frustrated and angry.")}
                    className="text-left h-auto p-3"
                  >
                    <div className="font-medium text-red-600">😠 Negative Sentiment</div>
                    <div className="text-xs text-gray-500">Test negative sentiment analysis</div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setText("The weather today is cloudy with temperatures around 15 degrees Celsius. The forecast predicts rain in the afternoon. Traffic on the highway is moving at normal speeds. The meeting is scheduled for 2 PM in conference room B.")}
                    className="text-left h-auto p-3"
                  >
                    <div className="font-medium text-gray-600">😐 Neutral Sentiment</div>
                    <div className="text-xs text-gray-500">Test neutral sentiment analysis</div>
                  </Button>
                  

                </div>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                                 placeholder="Paste or type your text here to analyze readability, sentiment, and word frequency..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                onClick={analyzeText}
                disabled={!text.trim()}
                className="flex items-center gap-2"
              >
                <span>🔍</span>
                Analyze Text
              </Button>
              <Button 
                variant="outline" 
                onClick={clearText}
                className="flex items-center gap-2"
              >
                <span>🗑️</span>
                Clear
              </Button>
              {analysis && (
                <Button 
                  variant="outline" 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  <span>📋</span>
                  Copy Summary
                </Button>
              )}
            </div>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Statistics */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  Basic Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analysis.basic.characters}</div>
                    <div className="text-sm text-gray-600">Characters</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analysis.basic.words}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{analysis.basic.sentences}</div>
                    <div className="text-sm text-gray-600">Sentences</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{analysis.basic.paragraphs}</div>
                    <div className="text-sm text-gray-600">Paragraphs</div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. word length:</span>
                    <span className="font-medium">{analysis.basic.avgWordLength} characters</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. sentence length:</span>
                    <span className="font-medium">{analysis.basic.avgSentenceLength} words</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. paragraph length:</span>
                    <span className="font-medium">{analysis.basic.avgParagraphLength} words</span>
                  </div>
                </div>
              </Card>

              {/* Readability Scores */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📖</span>
                  Readability Analysis
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Flesch-Kincaid Grade Level</span>
                      <Badge variant="primary">{analysis.readability.fleschKincaid.toFixed(1)}</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, analysis.readability.fleschKincaid)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getReadabilityLevel(analysis.readability.fleschKincaid).description}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Gunning Fog Index</span>
                      <Badge variant="outline">{analysis.readability.gunningFog.toFixed(1)}</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, analysis.readability.gunningFog)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Coleman-Liau Index</span>
                      <Badge variant="outline">{analysis.readability.colemanLiau.toFixed(1)}</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, analysis.readability.colemanLiau)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Sentiment Analysis */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>😊</span>
                  Sentiment Analysis
                </h3>
                
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-2xl font-bold mb-4 ${
                    analysis.sentiment.color === 'green' ? 'bg-green-100 text-green-600' :
                    analysis.sentiment.color === 'red' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {analysis.sentiment.score > 0 ? '😊' : analysis.sentiment.score < 0 ? '😞' : '😐'}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{analysis.sentiment.label}</div>
                  <div className="text-sm text-gray-600 mb-3">Sentiment Score: {analysis.sentiment.score}</div>
                  
                  {/* Sentiment Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-700">{analysis.sentiment.positiveCount}</div>
                      <div className="text-xs text-green-600">Positive Words</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-700">{analysis.sentiment.negativeCount}</div>
                      <div className="text-xs text-red-600">Negative Words</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Badge 
                      variant={analysis.sentiment.confidence === 'high' ? 'success' : analysis.sentiment.confidence === 'medium' ? 'warning' : 'error'}
                      className="text-xs"
                    >
                      Confidence: {analysis.sentiment.confidence}
                    </Badge>
                  </div>
                  
                  {/* Show matched words for debugging */}
                  {analysis.sentiment.matchedPositiveWords && analysis.sentiment.matchedPositiveWords.length > 0 && (
                    <div className="mt-3 text-left">
                      <div className="text-xs font-medium text-green-700 mb-1">Positive words detected:</div>
                      <div className="text-xs text-green-600">
                        {analysis.sentiment.matchedPositiveWords.join(', ')}
                      </div>
                    </div>
                  )}
                  
                  {analysis.sentiment.matchedNegativeWords && analysis.sentiment.matchedNegativeWords.length > 0 && (
                    <div className="mt-3 text-left">
                      <div className="text-xs font-medium text-red-700 mb-1">Negative words detected:</div>
                      <div className="text-xs text-red-600">
                        {analysis.sentiment.matchedNegativeWords.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              

              {/* Word Frequency */}
              <Card className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📈</span>
                  Most Frequent Words
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {analysis.wordFrequency.map((item, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{item.word}</div>
                      <div className="text-sm text-gray-600">{item.count} times</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Tips Section */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              Writing Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">For Better Readability:</h4>
                <ul className="space-y-1">
                  <li>• Keep sentences under 20 words</li>
                  <li>• Use simple, common words</li>
                  <li>• Break long paragraphs into shorter ones</li>
                  <li>• Aim for a Flesch-Kincaid score above 60</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">For Better Engagement:</h4>
                <ul className="space-y-1">
                  <li>• Vary sentence structure</li>
                  <li>• Use active voice</li>
                  <li>• Include transition words</li>
                  <li>• Balance positive and negative sentiment</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Text Analyzer"
            description="Analyze your text for readability, sentiment, and linguistic features with comprehensive insights. Our text analyzer provides detailed statistics including word count, character count, sentence analysis, readability scores (Flesch-Kincaid, Gunning Fog, Coleman-Liau), sentiment analysis, and word frequency. Perfect for writers, content creators, students, and professionals who want to understand their writing better, improve readability, analyze sentiment, or optimize content for specific audiences."
            features={[
              "Comprehensive text statistics (words, characters, sentences, paragraphs)",
              "Readability analysis with multiple scoring algorithms",
              "Sentiment analysis (positive, negative, neutral)",
              "Word frequency analysis and keyword extraction",
              "Average word, sentence, and paragraph length calculations",
              "Real-time analysis as you type",
              "Copy analysis summary to clipboard",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Paste or type your text into the input field",
              "Click 'Analyze Text' to process your content",
              "Review basic statistics (words, characters, sentences)",
              "Check readability scores and grade levels",
              "View sentiment analysis results",
              "Review most frequent words",
              "Use insights to improve your writing",
              "Copy the analysis summary if needed"
            ]}
            useCases={[
              "Improve content readability for target audiences",
              "Analyze sentiment in customer feedback or reviews",
              "Optimize content for SEO and engagement",
              "Check writing quality and complexity",
              "Analyze competitor content and writing style",
              "Track writing improvements over time",
              "Ensure content meets readability requirements",
              "Understand linguistic features of your writing"
            ]}
            tips={[
              "Aim for Flesch-Kincaid scores above 60 for general audiences",
              "Shorter sentences improve readability scores",
              "Use sentiment analysis to balance positive and negative content",
              "Word frequency helps identify key themes and topics",
              "Lower grade levels indicate easier-to-read content",
              "Vary sentence length for better engagement",
              "Review readability scores to match your target audience"
            ]}
            faq={[
              {
                question: "What is the Flesch-Kincaid score?",
                answer: "The Flesch-Kincaid score measures readability on a scale of 0-100. Higher scores indicate easier-to-read text. Scores above 60 are considered easily readable for general audiences."
              },
              {
                question: "How accurate is sentiment analysis?",
                answer: "Sentiment analysis uses word-based detection. It's useful for general sentiment but may not capture context or sarcasm. For critical applications, human review is recommended."
              },
              {
                question: "What do readability scores mean?",
                answer: "Readability scores indicate the education level needed to understand the text. Lower scores mean easier reading. For example, a score of 60-70 is readable by 13-15 year olds."
              },
              {
                question: "Can I analyze code or technical content?",
                answer: "Yes, the tool analyzes any text. However, readability scores are designed for natural language and may not be as meaningful for code or highly technical terminology."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default TextAnalyzer;
