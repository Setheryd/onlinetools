"use client";

import React, { useState, useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const RandomNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('fantasy');
  const [selectedGender, setSelectedGender] = useState('any');
  const [nameCount, setNameCount] = useState(10);
  const [favorites, setFavorites] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const nameCategories = {
    fantasy: {
      name: 'Fantasy',
      icon: '🐉',
      description: 'Magical and mystical names for fantasy worlds',
      names: {
        male: ['Aethon', 'Baelor', 'Caelum', 'Drakon', 'Eldrin', 'Faelar', 'Gryphon', 'Helios', 'Ignis', 'Jareth', 'Kael', 'Lysander', 'Mystic', 'Nyx', 'Orion', 'Phoenix', 'Quill', 'Raven', 'Shadow', 'Thorne', 'Umber', 'Vale', 'Wraith', 'Xander', 'Ymir', 'Zephyr'],
        female: ['Aria', 'Briar', 'Celeste', 'Dawn', 'Elara', 'Faye', 'Glimmer', 'Haven', 'Iris', 'Jade', 'Kestrel', 'Luna', 'Mystic', 'Nova', 'Opal', 'Pixie', 'Quill', 'Raven', 'Star', 'Thorn', 'Umber', 'Vale', 'Willow', 'Xara', 'Yara', 'Zara'],
        neutral: ['Arcane', 'Blaze', 'Cipher', 'Dusk', 'Echo', 'Frost', 'Gale', 'Haze', 'Ion', 'Jinx', 'Kite', 'Lumen', 'Mist', 'Nexus', 'Onyx', 'Pulse', 'Quill', 'Rift', 'Sage', 'Tide', 'Umber', 'Void', 'Wisp', 'Xen', 'Yin', 'Zen']
      }
    },
    scifi: {
      name: 'Science Fiction',
      icon: '🚀',
      description: 'Futuristic and technological names',
      names: {
        male: ['Axon', 'Blitz', 'Cipher', 'Drift', 'Echo', 'Flux', 'Gear', 'Havoc', 'Ion', 'Jolt', 'Kode', 'Lens', 'Matrix', 'Nexus', 'Orbit', 'Pulse', 'Quark', 'Rift', 'Sync', 'Tech', 'Unit', 'Void', 'Warp', 'Xen', 'Yon', 'Zero'],
        female: ['Aura', 'Blitz', 'Cipher', 'Drift', 'Echo', 'Flux', 'Gear', 'Havoc', 'Ion', 'Jolt', 'Kode', 'Lens', 'Matrix', 'Nexus', 'Orbit', 'Pulse', 'Quark', 'Rift', 'Sync', 'Tech', 'Unit', 'Void', 'Warp', 'Xen', 'Yon', 'Zero'],
        neutral: ['Alpha', 'Beta', 'Delta', 'Echo', 'Foxtrot', 'Gamma', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'Xray', 'Yankee', 'Zulu']
      }
    },
    modern: {
      name: 'Modern',
      icon: '🏙️',
      description: 'Contemporary and trendy names',
      names: {
        male: ['Alex', 'Blake', 'Cameron', 'Dylan', 'Ethan', 'Finn', 'Grayson', 'Harper', 'Ian', 'Jordan', 'Kai', 'Logan', 'Mason', 'Noah', 'Owen', 'Parker', 'Quinn', 'Riley', 'Sawyer', 'Taylor', 'Urban', 'Vaughn', 'Wyatt', 'Xander', 'Zane'],
        female: ['Avery', 'Blake', 'Cameron', 'Dylan', 'Eden', 'Finley', 'Gray', 'Harper', 'Indigo', 'Jordan', 'Kai', 'Logan', 'Mason', 'Noah', 'Ocean', 'Parker', 'Quinn', 'Riley', 'Sage', 'Taylor', 'Urban', 'Vale', 'Willow', 'Xara', 'Zara'],
        neutral: ['Alex', 'Blake', 'Cameron', 'Dylan', 'Eden', 'Finley', 'Gray', 'Harper', 'Indigo', 'Jordan', 'Kai', 'Logan', 'Mason', 'Noah', 'Ocean', 'Parker', 'Quinn', 'Riley', 'Sage', 'Taylor', 'Urban', 'Vale', 'Willow', 'Xara', 'Zara']
      }
    },
    historical: {
      name: 'Historical',
      icon: '🏛️',
      description: 'Classical and traditional names',
      names: {
        male: ['Alexander', 'Augustus', 'Caesar', 'Demetrius', 'Ephraim', 'Frederick', 'Gregory', 'Hector', 'Ignatius', 'Julius', 'Konstantin', 'Leonidas', 'Marcus', 'Nicholas', 'Octavian', 'Perseus', 'Quintus', 'Roman', 'Sebastian', 'Theodore', 'Ulysses', 'Valentine', 'William', 'Xavier', 'Zachary'],
        female: ['Adelaide', 'Beatrice', 'Catherine', 'Dorothea', 'Eleanor', 'Florence', 'Genevieve', 'Helena', 'Isabella', 'Josephine', 'Katherine', 'Louisa', 'Margaret', 'Natalie', 'Octavia', 'Penelope', 'Queenie', 'Rosemary', 'Sophia', 'Theodora', 'Victoria', 'Winifred', 'Xenia', 'Yvette', 'Zelda'],
        neutral: ['Adrian', 'Blair', 'Casey', 'Dana', 'Emery', 'Frankie', 'Gale', 'Harley', 'Indigo', 'Jamie', 'Kendall', 'Lane', 'Morgan', 'Nevada', 'Oakley', 'Peyton', 'Quinn', 'Remy', 'Sage', 'Tatum', 'Urban', 'Vale', 'Wren', 'Xander', 'Zane']
      }
    },
    nature: {
      name: 'Nature',
      icon: '🌿',
      description: 'Names inspired by natural elements',
      names: {
        male: ['Ash', 'Birch', 'Cedar', 'Dawn', 'Echo', 'Flint', 'Gale', 'Haven', 'Iris', 'Jade', 'Kestrel', 'Lark', 'Moss', 'Nova', 'Oak', 'Pine', 'Quill', 'Raven', 'Sage', 'Thorn', 'Umber', 'Vale', 'Wolf', 'Xander', 'Yarrow', 'Zen'],
        female: ['Aurora', 'Blossom', 'Cedar', 'Dawn', 'Echo', 'Flora', 'Gale', 'Haven', 'Iris', 'Jade', 'Kestrel', 'Lark', 'Moss', 'Nova', 'Oak', 'Pine', 'Quill', 'Raven', 'Sage', 'Thorn', 'Umber', 'Vale', 'Willow', 'Xara', 'Yara', 'Zara'],
        neutral: ['Acorn', 'Birch', 'Cedar', 'Dawn', 'Echo', 'Flint', 'Gale', 'Haven', 'Iris', 'Jade', 'Kestrel', 'Lark', 'Moss', 'Nova', 'Oak', 'Pine', 'Quill', 'Raven', 'Sage', 'Thorn', 'Umber', 'Vale', 'Wisp', 'Xen', 'Yin', 'Zen']
      }
    },
    business: {
      name: 'Business',
      icon: '💼',
      description: 'Professional and corporate names',
      names: {
        male: ['Adam', 'Brandon', 'Christopher', 'David', 'Edward', 'Frank', 'George', 'Henry', 'Ian', 'James', 'Kevin', 'Lawrence', 'Michael', 'Nathan', 'Oliver', 'Patrick', 'Quentin', 'Robert', 'Steven', 'Thomas', 'Victor', 'William', 'Xavier', 'Zachary'],
        female: ['Amanda', 'Brittany', 'Christine', 'Danielle', 'Elizabeth', 'Frances', 'Grace', 'Heather', 'Isabella', 'Jennifer', 'Katherine', 'Lauren', 'Michelle', 'Nicole', 'Olivia', 'Patricia', 'Rachel', 'Sarah', 'Stephanie', 'Tiffany', 'Victoria', 'Wendy', 'Xena', 'Zoe'],
        neutral: ['Alex', 'Blake', 'Casey', 'Dana', 'Emery', 'Frankie', 'Gray', 'Harley', 'Indigo', 'Jamie', 'Kendall', 'Lane', 'Morgan', 'Nevada', 'Oakley', 'Peyton', 'Quinn', 'Remy', 'Sage', 'Tatum', 'Urban', 'Vale', 'Wren', 'Xander', 'Zane']
      }
    }
  };

  const generateNames = () => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      const category = nameCategories[selectedCategory];
      const names = category.names[selectedGender === 'any' ? 'neutral' : selectedGender];
      
      const generated = [];
      const usedIndices = new Set();
      
      for (let i = 0; i < Math.min(nameCount, names.length); i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * names.length);
        } while (usedIndices.has(randomIndex));
        
        usedIndices.add(randomIndex);
        const name = names[randomIndex];
        
        generated.push({
          id: Math.random().toString(36).substr(2, 9),
          name,
          category: category.name,
          gender: selectedGender === 'any' ? 'Neutral' : selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1),
          isFavorite: favorites.includes(name)
        });
      }
      
      setGeneratedNames(generated);
      setIsGenerating(false);
    }, 800);
  };

  const toggleFavorite = (name) => {
    setFavorites(prev => 
      prev.includes(name) 
        ? prev.filter(fav => fav !== name)
        : [...prev, name]
    );
  };

  const clearAll = () => {
    setGeneratedNames([]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllToClipboard = () => {
    const allNames = generatedNames.map(item => item.name).join('\n');
    navigator.clipboard.writeText(allNames);
  };

  const regenerateNames = () => {
    if (generatedNames.length > 0) {
      generateNames();
    }
  };

  const getCategoryIcon = (categoryName) => {
    const category = Object.values(nameCategories).find(cat => cat.name === categoryName);
    return category ? category.icon : '📝';
  };

  const getGenderColor = (gender) => {
    switch (gender.toLowerCase()) {
      case 'male': return 'text-blue-600 bg-blue-100';
      case 'female': return 'text-pink-600 bg-pink-100';
      case 'neutral': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Random Name Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generate creative and unique names for characters, projects, businesses, or any creative endeavor. 
              Choose from multiple categories and customize your preferences.
            </p>
          </div>

          {/* Configuration Section */}
          <Card className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Name Category
                </label>
                <div className="space-y-2">
                  {Object.entries(nameCategories).map(([key, category]) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={key}
                        checked={selectedCategory === key}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{category.name}</div>
                          <div className="text-xs text-gray-600">{category.description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gender Preference
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'any', label: 'Any Gender', icon: '🌈' },
                    { value: 'male', label: 'Male Names', icon: '👨' },
                    { value: 'female', label: 'Female Names', icon: '👩' },
                    { value: 'neutral', label: 'Neutral Names', icon: '⚧' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={option.value}
                        checked={selectedGender === option.value}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{option.icon}</span>
                        <span className="font-medium text-gray-900">{option.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Count Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Number of Names
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={nameCount}
                    onChange={(e) => setNameCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">{nameCount}</span>
                    <span className="text-gray-600 ml-2">names</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                onClick={generateNames}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <span>{isGenerating ? '🔄' : '🎲'}</span>
                {isGenerating ? 'Generating...' : 'Generate Names'}
              </Button>
              <Button 
                variant="outline" 
                onClick={regenerateNames}
                disabled={generatedNames.length === 0 || isGenerating}
                className="flex items-center gap-2"
              >
                <span>🔄</span>
                Regenerate
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAll}
                className="flex items-center gap-2"
              >
                <span>🗑️</span>
                Clear All
              </Button>
              {generatedNames.length > 0 && (
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
          {generatedNames.length > 0 && (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Generated Names ({generatedNames.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Category: {nameCategories[selectedCategory].name}
                </div>
              </div>

              {/* Names Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedNames.map((item) => (
                  <Card key={item.id} className="relative group hover:shadow-lg transition-shadow">
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFavorite(item.name)}
                        className={`p-2 rounded-full transition-colors ${
                          item.isFavorite 
                            ? 'text-red-500 bg-red-100 hover:bg-red-200' 
                            : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {item.isFavorite ? '❤️' : '🤍'}
                      </button>
                      <button
                        onClick={() => copyToClipboard(item.name)}
                        className="p-2 text-gray-400 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        📋
                      </button>
                    </div>

                    <div className="text-center p-6">
                      <div className="text-3xl mb-2">{getCategoryIcon(item.category)}</div>
                      <div className="text-2xl font-bold text-gray-900 mb-3 font-mono">
                        {item.name}
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Badge 
                          variant="outline" 
                          className={`px-2 py-1 text-xs ${getGenderColor(item.gender)}`}
                        >
                          {item.gender}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
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
                    Your Favorite Names
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
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              Tips for Great Names
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">For Characters:</h4>
                <ul className="space-y-1">
                  <li>• Consider the character's background</li>
                  <li>• Match the name to the setting</li>
                  <li>• Ensure it's easy to pronounce</li>
                  <li>• Think about cultural significance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">For Projects:</h4>
                <ul className="space-y-1">
                  <li>• Keep it memorable and unique</li>
                  <li>• Consider domain availability</li>
                  <li>• Think about branding potential</li>
                  <li>• Avoid trademark conflicts</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Examples Section */}
          <Card className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📚</span>
              Popular Name Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(nameCategories).map(([key, category]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-600">{category.description}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Sample names: {category.names.neutral.slice(0, 3).join(', ')}...
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default RandomNameGenerator;
