"use client";
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const WordCounterTool = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    calculateStats();
  }, [text]);

  const calculateStats = () => {
    if (!text.trim()) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: 0,
        speakingTime: 0
      });
      return;
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    const lines = text.split('\n').length;
    
    // Reading time: average 200 words per minute
    const readingTime = Math.ceil(words / 200);
    
    // Speaking time: average 150 words per minute
    const speakingTime = Math.ceil(words / 150);

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime
    });
  };

  const handleClear = () => {
    setText('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSampleLoad = () => {
    const sample = `This is a sample text for the word counter tool.

It contains multiple paragraphs with various types of content. You can see how the tool analyzes text and provides detailed statistics.

The tool counts words, characters, sentences, and more. It's useful for writers, students, and content creators who need to meet specific word count requirements.`;
    setText(sample);
  };

  const getTopWords = () => {
    if (!text.trim()) return [];
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  };

  const topWords = getTopWords();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Word Counter</h1>
            <p className="text-gray-600">
              Analyze your text with comprehensive word counting and statistics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {stats.words > 0 && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {stats.words} words
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Text Input */}
      <div className="mb-6">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
          Enter or paste your text
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here to see real-time statistics..."
          className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="outline" onClick={handleSampleLoad}>
          Load Sample Text
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!text}>
          Clear Text
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!text}>
          Copy Text
        </Button>
      </div>

      {/* Statistics Grid */}
      {stats.words > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Text Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-blue-600">{stats.words}</div>
              <div className="text-xs text-blue-600">Words</div>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-green-600">{stats.characters}</div>
              <div className="text-xs text-green-600">Characters</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-purple-600">{stats.charactersNoSpaces}</div>
              <div className="text-xs text-purple-600">Characters (no spaces)</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-orange-600">{stats.sentences}</div>
              <div className="text-xs text-orange-600">Sentences</div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-indigo-600">{stats.paragraphs}</div>
              <div className="text-xs text-indigo-600">Paragraphs</div>
            </div>
            <div className="bg-pink-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-pink-600">{stats.lines}</div>
              <div className="text-xs text-pink-600">Lines</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-yellow-600">{stats.readingTime}</div>
              <div className="text-xs text-yellow-600">Reading time (min)</div>
            </div>
            <div className="bg-red-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-red-600">{stats.speakingTime}</div>
              <div className="text-xs text-red-600">Speaking time (min)</div>
            </div>
          </div>
        </div>
      )}

      {/* Top Words */}
      {topWords.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Most Common Words</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {topWords.map((item, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md text-center">
                <div className="text-sm font-medium text-gray-900">{item.word}</div>
                <div className="text-xs text-gray-600">{item.count} times</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Word Counting</h3>
        <p className="text-sm text-blue-700">
          This tool provides comprehensive text analysis including word count, character count (with and without spaces), 
          sentence count, paragraph count, and estimated reading/speaking times. Perfect for writers, students, 
          and content creators who need to meet specific length requirements or analyze their writing patterns.
        </p>
      </div>
    </div>
  );
};

export default WordCounterTool;
