"use client";

import React, { useState, useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const AcronymGenerator = () => {
  const [phrase, setPhrase] = useState('');
  const [acronyms, setAcronyms] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('first-letter');
  const [maxLength, setMaxLength] = useState(10);
  const [favorites, setFavorites] = useState([]);

  const acronymStyles = [
    {
      id: 'first-letter',
      name: 'First Letter',
      description: 'Use the first letter of each word',
      icon: '🔤'
    },
    {
      id: 'first-two-letters',
      name: 'First Two Letters',
      description: 'Use the first two letters of each word',
      icon: '🔤🔤'
    },
    {
      id: 'consonants',
      name: 'Consonants Only',
      description: 'Use only consonant letters',
      icon: '🔇'
    },
    {
      id: 'vowels',
      name: 'Vowels Only',
      description: 'Use only vowel letters',
      icon: '🔊'
    },
    {
      id: 'smart',
      name: 'Smart Selection',
      description: 'Intelligently select letters for better acronyms',
      icon: '🧠'
    }
  ];

  const generateAcronyms = () => {
    if (!phrase.trim()) return;

    const words = phrase.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length < 2) return;

    const results = [];
    
    // Generate acronyms based on selected style
    switch (selectedStyle) {
      case 'first-letter':
        results.push(...generateFirstLetterAcronyms(words));
        break;
      case 'first-two-letters':
        results.push(...generateFirstTwoLettersAcronyms(words));
        break;
      case 'consonants':
        results.push(...generateConsonantAcronyms(words));
        break;
      case 'vowels':
        results.push(...generateVowelAcronyms(words));
        break;
      case 'smart':
        results.push(...generateSmartAcronyms(words));
        break;
    }

    // Filter by max length and add metadata
    const filteredResults = results
      .filter(acronym => acronym.text.length <= maxLength)
      .map(acronym => ({
        ...acronym,
        id: Math.random().toString(36).substr(2, 9),
        isFavorite: favorites.includes(acronym.text)
      }));

    setAcronyms(filteredResults);
  };

  const generateFirstLetterAcronyms = (words) => {
    const basic = words.map(word => word[0].toUpperCase()).join('');
    const results = [{ text: basic, type: 'Basic', score: calculateAcronymScore(basic) }];

    // Generate variations with different word combinations
    if (words.length > 3) {
      // Skip some words for shorter acronyms
      for (let i = 2; i <= Math.min(words.length, 6); i++) {
        const selectedWords = words.slice(0, i);
        const acronym = selectedWords.map(word => word[0].toUpperCase()).join('');
        results.push({ 
          text: acronym, 
          type: `First ${i} words`, 
          score: calculateAcronymScore(acronym) 
        });
      }
    }

    return results;
  };

  const generateFirstTwoLettersAcronyms = (words) => {
    const results = [];
    
    words.forEach((word, index) => {
      if (word.length >= 2) {
        const twoLetters = word.substring(0, 2).toUpperCase();
        results.push({ 
          text: twoLetters, 
          type: `First 2 letters of "${word}"`, 
          score: calculateAcronymScore(twoLetters) 
        });
      }
    });

    // Combine first two letters from multiple words
    if (words.length >= 2) {
      const combined = words.slice(0, 3).map(word => 
        word.length >= 2 ? word.substring(0, 2).toUpperCase() : word[0].toUpperCase()
      ).join('');
      results.push({ 
        text: combined, 
        type: 'Combined first 2 letters', 
        score: calculateAcronymScore(combined) 
      });
    }

    return results;
  };

  const generateConsonantAcronyms = (words) => {
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
    const results = [];
    
    words.forEach(word => {
      const consonantLetters = word.toUpperCase().split('').filter(char => 
        consonants.includes(char)
      );
      if (consonantLetters.length > 0) {
        results.push({ 
          text: consonantLetters.join(''), 
          type: `Consonants from "${word}"`, 
          score: calculateAcronymScore(consonantLetters.join('')) 
        });
      }
    });

    // Combined consonants from all words
    const allConsonants = phrase.toUpperCase().split('').filter(char => 
      consonants.includes(char)
    ).join('');
    if (allConsonants.length > 0) {
      results.push({ 
        text: allConsonants, 
        type: 'All consonants combined', 
        score: calculateAcronymScore(allConsonants) 
      });
    }

    return results;
  };

  const generateVowelAcronyms = (words) => {
    const vowels = 'AEIOU';
    const results = [];
    
    words.forEach(word => {
      const vowelLetters = word.toUpperCase().split('').filter(char => 
        vowels.includes(char)
      );
      if (vowelLetters.length > 0) {
        results.push({ 
          text: vowelLetters.join(''), 
          type: `Vowels from "${word}"`, 
          score: calculateAcronymScore(vowelLetters.join('')) 
        });
      }
    });

    // Combined vowels from all words
    const allVowels = phrase.toUpperCase().split('').filter(char => 
      vowels.includes(char)
    ).join('');
    if (allVowels.length > 0) {
      results.push({ 
        text: allVowels, 
        type: 'All vowels combined', 
        score: calculateAcronymScore(allVowels) 
      });
    }

    return results;
  };

  const generateSmartAcronyms = (words) => {
    const results = [];
    
    // Try to create meaningful acronyms by selecting letters strategically
    words.forEach((word, index) => {
      if (word.length >= 3) {
        // Look for letters that could form common words
        const smartLetters = [];
        for (let i = 0; i < word.length; i++) {
          if (i === 0 || word[i].toLowerCase().match(/[aeiou]/)) {
            smartLetters.push(word[i].toUpperCase());
          }
        }
        if (smartLetters.length > 0) {
          results.push({ 
            text: smartLetters.join(''), 
            type: `Smart selection from "${word}"`, 
            score: calculateAcronymScore(smartLetters.join('')) 
          });
        }
      }
    });

    // Create acronyms that might be pronounceable
    const pronounceable = words.map(word => {
      const first = word[0];
      const last = word[word.length - 1];
      return (first + last).toUpperCase();
    }).join('');
    
    if (pronounceable.length > 0) {
      results.push({ 
        text: pronounceable, 
        type: 'First + Last letters', 
        score: calculateAcronymScore(pronounceable) 
      });
    }

    return results;
  };

  const calculateAcronymScore = (acronym) => {
    let score = 0;
    
    // Length score (prefer 3-6 characters)
    if (acronym.length >= 3 && acronym.length <= 6) score += 30;
    else if (acronym.length >= 2 && acronym.length <= 8) score += 20;
    else score += 10;

    // Pronounceability score
    const vowels = acronym.match(/[AEIOU]/g);
    if (vowels && vowels.length >= 1) score += 25;
    
    // Common word score
    const commonWords = ['THE', 'AND', 'FOR', 'YOU', 'ARE', 'CAN', 'GET', 'HER', 'HIS', 'ITS', 'OUR', 'THEY', 'WAS', 'WILL', 'WITH'];
    if (commonWords.includes(acronym)) score += 40;
    
    // Repetition penalty
    const uniqueChars = new Set(acronym).size;
    if (uniqueChars < acronym.length) score -= 10;

    return Math.max(0, Math.min(100, score));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const toggleFavorite = (acronymText) => {
    setFavorites(prev => 
      prev.includes(acronymText) 
        ? prev.filter(fav => fav !== acronymText)
        : [...prev, acronymText]
    );
  };

  const clearAll = () => {
    setPhrase('');
    setAcronyms([]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllToClipboard = () => {
    const allAcronyms = acronyms.map(acronym => `${acronym.text} (${acronym.type})`).join('\n');
    navigator.clipboard.writeText(allAcronyms);
  };

  const sortedAcronyms = useMemo(() => {
    return [...acronyms].sort((a, b) => b.score - a.score);
  }, [acronyms]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Acronym Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generate creative acronyms and abbreviations from your phrases. 
              Choose from multiple generation styles and get quality scores for each result.
            </p>
          </div>

          {/* Input Section */}
          <Card className="mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your phrase
              </label>
              <textarea
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="Type or paste a phrase to generate acronyms from..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Generation Style
                </label>
                <div className="space-y-2">
                  {acronymStyles.map((style) => (
                    <label key={style.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="style"
                        value={style.id}
                        checked={selectedStyle === style.id}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{style.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{style.name}</div>
                          <div className="text-sm text-gray-600">{style.description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Maximum Length
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="2"
                    max="15"
                    value={maxLength}
                    onChange={(e) => setMaxLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">{maxLength}</span>
                    <span className="text-gray-600 ml-2">characters</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                onClick={generateAcronyms}
                disabled={!phrase.trim()}
                className="flex items-center gap-2"
              >
                <span>🔤</span>
                Generate Acronyms
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAll}
                className="flex items-center gap-2"
              >
                <span>🗑️</span>
                Clear All
              </Button>
              {acronyms.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={copyAllToClipboard}
                  className="flex items-center gap-2"
                >
                  <span>📋</span>
                  Copy All
                </Button>
              )}
            </div>
          </Card>

          {/* Results Section */}
          {acronyms.length > 0 && (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Generated Acronyms ({acronyms.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Sorted by quality score
                </div>
              </div>

              {/* Acronyms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedAcronyms.map((acronym) => (
                  <Card key={acronym.id} className="relative group hover:shadow-lg transition-shadow">
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFavorite(acronym.text)}
                        className={`p-2 rounded-full transition-colors ${
                          acronym.isFavorite 
                            ? 'text-red-500 bg-red-100 hover:bg-red-200' 
                            : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {acronym.isFavorite ? '❤️' : '🤍'}
                      </button>
                      <button
                        onClick={() => copyToClipboard(acronym.text)}
                        className="p-2 text-gray-400 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        📋
                      </button>
                    </div>

                    <div className="text-center p-6">
                      <div className="text-4xl font-bold text-gray-900 mb-3 font-mono">
                        {acronym.text}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        {acronym.type}
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Badge 
                          variant="primary" 
                          className={`px-3 py-1 ${getScoreColor(acronym.score)}`}
                        >
                          {acronym.score}/100
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getScoreLabel(acronym.score)}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${acronym.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Favorites Section */}
              {favorites.length > 0 && (
                <Card className="bg-gradient-to-r from-pink-50 to-red-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>❤️</span>
                    Your Favorite Acronyms
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {favorites.map((favorite, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
                        <span className="text-lg font-mono font-bold">{favorite}</span>
                        <button
                          onClick={() => copyToClipboard(favorite)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => toggleFavorite(favorite)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Tips Section */}
          <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              Tips for Great Acronyms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">For Better Results:</h4>
                <ul className="space-y-1">
                  <li>• Use phrases with 3-8 words</li>
                  <li>• Include meaningful words</li>
                  <li>• Avoid very short or very long phrases</li>
                  <li>• Try different generation styles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Quality Factors:</h4>
                <ul className="space-y-1">
                  <li>• Pronounceability (includes vowels)</li>
                  <li>• Appropriate length (3-6 characters)</li>
                  <li>• Meaningful combinations</li>
                  <li>• Avoid excessive repetition</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Examples Section */}
          <Card className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📚</span>
              Example Phrases to Try
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'National Aeronautics and Space Administration',
                'United Nations Educational Scientific and Cultural Organization',
                'International Organization for Standardization',
                'North Atlantic Treaty Organization',
                'World Health Organization',
                'United Nations Children\'s Fund'
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPhrase(example)}
                  className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {example.split(' ').slice(0, 3).join(' ')}...
                  </div>
                  <div className="text-xs text-gray-600">
                    Click to try this example
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default AcronymGenerator;
