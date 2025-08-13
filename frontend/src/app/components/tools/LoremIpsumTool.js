"use client";
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const LoremIpsumTool = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(5);
  const [output, setOutput] = useState('');
  const [includeStart, setIncludeStart] = useState(true);
  const [includeHTML, setIncludeHTML] = useState(false);

  // Re-wrap or unwrap current output when toggling HTML option
  useEffect(() => {
    if (!output) return;
    const hasPTags = /<p(\s|>)/i.test(output);
    if (includeHTML && !hasPTags) {
      const parts = output.split(/\r?\n{2,}/);
      const wrapped = parts
        .map(p => `<p>${p.replace(/\r?\n/g, ' ').trim()}</p>`)
        .join('\n');
      setOutput(wrapped);
    } else if (!includeHTML && hasPTags) {
      const text = output
        .replace(/<p[^>]*>/gi, '')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<br\s*\/?>(\r?\n)?/gi, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      setOutput(text);
    }
  }, [includeHTML, output]);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    'duis', 'aute', 'irure', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum',
    'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
    'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
    'est', 'laborum', 'et', 'harum', 'quidem', 'rerum', 'facilis', 'est', 'expedita',
    'distinctio', 'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'eligendi',
    'optio', 'cumque', 'nihil', 'impedit', 'quo', 'minus', 'id', 'quod', 'maxime',
    'placeat', 'facere', 'possimus', 'omnis', 'voluptas', 'assumenda', 'est', 'omnis',
    'dolor', 'repellendus', 'temporibus', 'autem', 'quibusdam', 'aut', 'officiis',
    'debitis', 'aut', 'rerum', 'necessitatibus', 'saepe', 'eveniet', 'ut', 'et',
    'voluptates', 'repudiandae', 'sint', 'molestiae', 'non', 'recusandae', 'itaque',
    'earum', 'rerum', 'hic', 'tenetur', 'sapiente', 'delectus', 'ut', 'aut',
    'reiciendis', 'voluptatibus', 'maiores', 'alias', 'consequatur', 'aut', 'perferendis'
  ];

  const generateSentence = (wordCount) => {
    const sentenceWords = [];
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * loremWords.length);
      sentenceWords.push(loremWords[randomIndex]);
    }
    
    // Capitalize first word
    if (sentenceWords.length > 0) {
      sentenceWords[0] = sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1);
    }
    
    return sentenceWords.join(' ') + '.';
  };

  const generateParagraph = (sentenceCount, avgWordsPerSentence) => {
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      const wordCount = Math.max(5, Math.floor(avgWordsPerSentence * (0.8 + Math.random() * 0.4)));
      sentences.push(generateSentence(wordCount));
    }
    return sentences.join(' ');
  };

  const generateLoremIpsum = () => {
    const avgWordsPerSentence = 12;
    const paragraphList = [];
    
    for (let i = 0; i < paragraphs; i++) {
      paragraphList.push(generateParagraph(sentences, avgWordsPerSentence));
    }
    
    let result = paragraphList.join('\n\n');
    
    if (includeStart) {
      result = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' + result;
    }
    
    if (includeHTML) {
      result = result.split('\n\n').map(p => `<p>${p}</p>`).join('\n');
    }
    
    setOutput(result);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClear = () => {
    setOutput('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lorem Ipsum Generator</h1>
            <p className="text-gray-600">
              Generate professional Lorem Ipsum placeholder text for design mockups and content planning.
            </p>
          </div>
			<div className="flex items-center gap-2">
				{output && (
					<span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
						{(
							includeHTML
								? ((output.match(/<p(\s|>)/gi) || []).length || (output ? 1 : 0))
								: (output.trim() ? output.split(/\n{2,}/).length : 0)
						)} paragraphs
					</span>
				)}
			</div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="paragraphs" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Paragraphs
          </label>
          <input
            id="paragraphs"
            type="number"
            min="1"
            max="20"
            value={paragraphs}
            onChange={(e) => setParagraphs(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-900"
          />
        </div>
        
        <div>
          <label htmlFor="sentences" className="block text-sm font-medium text-gray-700 mb-2">
            Sentences per Paragraph
          </label>
          <input
            id="sentences"
            type="number"
            min="1"
            max="15"
            value={sentences}
            onChange={(e) => setSentences(Math.max(1, Math.min(15, parseInt(e.target.value) || 1)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-900"
          />
        </div>
        
        
      </div>

      {/* Options */}
      <div className="mb-6 flex flex-wrap gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeStart}
            onChange={(e) => setIncludeStart(e.target.checked)}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Include "Lorem ipsum dolor sit amet..." start</span>
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeHTML}
            onChange={(e) => setIncludeHTML(e.target.checked)}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Wrap in HTML &lt;p&gt; tags</span>
        </label>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={generateLoremIpsum}>
          Generate Lorem Ipsum
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!output}>
          Clear Output
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!output}>
          Copy to Clipboard
        </Button>
      </div>

      {/* Output */}
      {output && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Generated Text
            </label>
				<div className="text-xs text-gray-500">
					{(
						includeHTML
							? ((output.match(/<p(\s|>)/gi) || []).length || (output ? 1 : 0))
							: (output.trim() ? output.split(/\n{2,}/).length : 0)
					)} paragraphs, ~{(() => {
						const textOnly = output.replace(/<[^>]*>/g, ' ');
						const tokens = textOnly.trim().match(/\S+/g);
						return tokens ? tokens.length : 0;
					})()} words
				</div>
          </div>
			<div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
				<div
					className={`text-sm text-gray-800 whitespace-pre-wrap ${
						includeHTML ? 'font-mono' : 'leading-relaxed'
					}`}
				>
					{output}
				</div>
			</div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Lorem Ipsum</h3>
        <p className="text-sm text-blue-700">
          Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries. 
          It helps designers focus on layout and visual elements without being distracted by meaningful content. 
          This generator creates realistic-looking placeholder text that maintains proper sentence structure and paragraph formatting.
        </p>
      </div>
    </div>
  );
};

export default LoremIpsumTool;
