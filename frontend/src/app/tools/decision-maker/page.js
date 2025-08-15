"use client";

import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const DecisionMaker = () => {
  const [options, setOptions] = useState(['']);
  const [decision, setDecision] = useState(null);
  const [isDeciding, setIsDeciding] = useState(false);
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [selectedMode, setSelectedMode] = useState('random');
  const [customWeight, setCustomWeight] = useState({});
  const [showWeights, setShowWeights] = useState(false);
  const [eliminationSteps, setEliminationSteps] = useState([]);
  const [currentEliminationStep, setCurrentEliminationStep] = useState(0);


  const decisionModes = [
    {
      id: 'random',
      name: 'Random Choice',
      description: 'Equal probability for all options',
      icon: '🎲'
    },
    {
      id: 'weighted',
      name: 'Weighted Random',
      description: 'Custom probability for each option',
      icon: '⚖️'
    },
    {
      id: 'elimination',
      name: 'Elimination',
      description: 'Remove options one by one',
      icon: '🗑️'
    },

  ];

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      
      // Remove corresponding weight
      const newWeights = { ...customWeight };
      delete newWeights[index];
      setCustomWeight(newWeights);
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const updateWeight = (index, weight) => {
    const newWeights = { ...customWeight };
    newWeights[index] = Math.max(1, Math.min(100, parseInt(weight) || 1));
    setCustomWeight(newWeights);
  };

  const makeDecision = () => {
    const validOptions = options.filter(option => option.trim() !== '');
    if (validOptions.length === 0) return;

    setIsDeciding(true);
    

    
    // Simulate decision making delay for other modes
    setTimeout(() => {
      let selectedOption;
      let method;

      switch (selectedMode) {
        case 'random':
          selectedOption = validOptions[Math.floor(Math.random() * validOptions.length)];
          method = 'Random Selection';
          break;
        
        case 'weighted':
          selectedOption = makeWeightedDecision(validOptions);
          method = 'Weighted Random';
          break;
        
        case 'elimination':
          // For elimination, we'll handle it step by step
          const steps = makeEliminationSteps(validOptions);
          setEliminationSteps(steps);
          setCurrentEliminationStep(0);
          setIsDeciding(false);
          return; // Don't proceed with the normal decision flow
        

        
        default:
          selectedOption = validOptions[Math.floor(Math.random() * validOptions.length)];
          method = 'Random Selection';
      }

      const newDecision = {
        id: Date.now(),
        option: selectedOption,
        method,
        timestamp: new Date().toLocaleTimeString(),
        options: [...validOptions]
      };

      setDecision(newDecision);
      setDecisionHistory(prev => [newDecision, ...prev.slice(0, 9)]); // Keep last 10
      setIsDeciding(false);
    }, 1500);
  };

  const makeWeightedDecision = (validOptions) => {
    const weights = validOptions.map((_, index) => customWeight[index] || 1);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    
    let random = Math.random() * totalWeight;
    for (let i = 0; i < validOptions.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return validOptions[i];
      }
    }
    return validOptions[validOptions.length - 1];
  };

  const makeEliminationSteps = (validOptions) => {
    let remainingOptions = [...validOptions];
    const steps = [];
    
    while (remainingOptions.length > 1) {
      const eliminatedIndex = Math.floor(Math.random() * remainingOptions.length);
      const eliminatedOption = remainingOptions[eliminatedIndex];
      remainingOptions = remainingOptions.filter((_, i) => i !== eliminatedIndex);
      
      steps.push({
        eliminated: eliminatedOption,
        remaining: [...remainingOptions],
        step: steps.length + 1
      });
    }
    
    return steps;
  };

  const makeEliminationDecision = (validOptions) => {
    // Simulate elimination process
    let remainingOptions = [...validOptions];
    const eliminated = [];
    
    while (remainingOptions.length > 1) {
      const eliminatedIndex = Math.floor(Math.random() * remainingOptions.length);
      eliminated.push(remainingOptions[eliminatedIndex]);
      remainingOptions = remainingOptions.filter((_, i) => i !== eliminatedIndex);
    }
    
    return remainingOptions[0];
  };

  const clearAll = () => {
    setOptions(['']);
    setDecision(null);
    setCustomWeight({});
    setEliminationSteps([]);
    setCurrentEliminationStep(0);
  };

  const nextEliminationStep = () => {
    if (currentEliminationStep < eliminationSteps.length - 1) {
      // Move to next step
      setCurrentEliminationStep(prev => prev + 1);
    } else {
      // Final step - show the winner immediately
      const finalStep = eliminationSteps[eliminationSteps.length - 1];
      const winner = finalStep.remaining[0];
      
      const newDecision = {
        id: Date.now(),
        option: winner,
        method: 'Elimination Process',
        timestamp: new Date().toLocaleTimeString(),
        options: [...options.filter(opt => opt.trim())]
      };
      
      setDecision(newDecision);
      setDecisionHistory(prev => [newDecision, ...prev.slice(0, 9)]);
      setEliminationSteps([]);
      setCurrentEliminationStep(0);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getWeightColor = (weight) => {
    if (weight >= 80) return 'text-green-600 bg-green-100';
    if (weight >= 60) return 'text-blue-600 bg-blue-100';
    if (weight >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getWeightLabel = (weight) => {
    if (weight >= 80) return 'Very High';
    if (weight >= 60) return 'High';
    if (weight >= 40) return 'Medium';
    if (weight >= 20) return 'Low';
    return 'Very Low';
  };

  const getTotalWeight = () => {
    return options.reduce((total, _, index) => total + (customWeight[index] || 1), 0);
  };

  const getWeightPercentage = (index) => {
    const weight = customWeight[index] || 1;
    const total = getTotalWeight();
    return total > 0 ? Math.round((weight / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Decision Maker</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Can't decide? Let our intelligent decision maker help you choose from multiple options. 
              Use different modes including random, weighted, and elimination for the perfect choice.
            </p>
          </div>

          {/* Configuration Section */}
          <Card className="mb-8">
            {/* Decision Mode Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Decision Mode
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {decisionModes.map((mode) => (
                  <label key={mode.id} className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      name="mode"
                      value={mode.id}
                      checked={selectedMode === mode.id}
                      onChange={(e) => setSelectedMode(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{mode.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{mode.name}</div>
                        <div className="text-xs text-gray-600">{mode.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Options Input */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Your Options
                </label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={addOption}
                  className="flex items-center gap-2"
                >
                  <span>➕</span>
                  Add Option
                </Button>
              </div>
              
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {selectedMode === 'weighted' && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Badge 
                            variant="outline" 
                            className={`px-2 py-1 text-xs ${getWeightColor(customWeight[index] || 1)}`}
                          >
                            {customWeight[index] || 1}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {selectedMode === 'weighted' && (
                      <div className="w-24">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={customWeight[index] || 1}
                          onChange={(e) => updateWeight(index, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-center text-sm"
                          placeholder="Weight"
                        />
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeOption(index)}
                      disabled={options.length <= 1}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <span>🗑️</span>
                    </Button>
                  </div>
                ))}
              </div>

              {/* Weight Information */}
              {selectedMode === 'weighted' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Weight Distribution</span>
                    <span className="text-sm text-blue-600">Total: {getTotalWeight()}</span>
                  </div>
                  <div className="space-y-2">
                    {options.map((option, index) => {
                      if (option.trim()) {
                        const percentage = getWeightPercentage(index);
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <span className="text-sm text-blue-700 w-32 truncate">{option || `Option ${index + 1}`}</span>
                            <div className="flex-1 bg-blue-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-blue-600 w-12 text-right">{percentage}%</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Elimination Process Visualization */}
            {selectedMode === 'elimination' && eliminationSteps.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <span>🗑️</span>
                  Elimination Process
                </h3>
                
                                 <div className="text-center">
                   <div className="text-2xl mb-4">Step {currentEliminationStep + 1} of {eliminationSteps.length}</div>
                   
                   <div className="mb-6">
                     <div className="text-lg font-medium text-red-700 mb-2">Eliminated:</div>
                     <div className="text-2xl font-bold text-red-600 bg-red-100 px-4 py-2 rounded-lg inline-block">
                       {eliminationSteps[currentEliminationStep].eliminated}
                     </div>
                   </div>
                   
                   <div className="mb-6">
                     <div className="text-lg font-medium text-green-700 mb-2">Remaining Options:</div>
                     <div className="flex flex-wrap gap-2 justify-center">
                       {eliminationSteps[currentEliminationStep].remaining.map((option, index) => (
                         <Badge key={index} variant="primary" className="px-3 py-2 text-base">
                           {option}
                         </Badge>
                       ))}
                     </div>
                   </div>
                   
                   <Button 
                     variant="primary" 
                     onClick={nextEliminationStep}
                     className="flex items-center gap-2"
                   >
                     <span>➡️</span>
                     {currentEliminationStep === eliminationSteps.length - 1 ? 'Show Winner!' : 'Next Step'}
                   </Button>
                 </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-3">
                             <Button 
                 variant="primary" 
                 onClick={makeDecision}
                 disabled={options.filter(opt => opt.trim()).length < 2 || isDeciding || (selectedMode === 'elimination' && eliminationSteps.length > 0)}
                 className="flex items-center gap-2"
               >
                 <span>{isDeciding ? '🔄' : '🎯'}</span>
                 {isDeciding ? 'Making Decision...' : 'Make Decision'}
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

          {/* Decision Result */}
          {decision && (
            <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Decision Made!</h2>
                <div className="text-xl text-gray-700 mb-4">
                  The choice is: <span className="font-bold text-green-600">{decision.option}</span>
                </div>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Badge variant="primary" className="px-4 py-2">
                    {decision.method}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    {decision.timestamp}
                  </Badge>
                </div>
                <div className="flex justify-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(decision.option)}
                    className="flex items-center gap-2"
                  >
                    <span>📋</span>
                    Copy Result
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={makeDecision}
                    className="flex items-center gap-2"
                  >
                    <span>🔄</span>
                    Decide Again
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Decision History */}
          {decisionHistory.length > 0 && (
            <Card className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>📚</span>
                Decision History
              </h3>
              <div className="space-y-3">
                {decisionHistory.map((hist) => (
                  <div key={hist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">✅</span>
                      <div>
                        <div className="font-medium text-gray-900">{hist.option}</div>
                        <div className="text-sm text-gray-600">
                          {hist.method} • {hist.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {hist.options.length} options
                      </Badge>
                      <button
                        onClick={() => copyToClipboard(hist.option)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tips Section */}
          <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              Tips for Better Decisions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">When to Use Each Mode:</h4>
                <ul className="space-y-1">
                  <li>• <strong>Random:</strong> When all options are equally good</li>
                  <li>• <strong>Weighted:</strong> When some options are better than others</li>
                  <li>• <strong>Elimination:</strong> When you want to narrow down choices</li>

                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Best Practices:</h4>
                <ul className="space-y-1">
                  <li>• Keep options clear and specific</li>
                  <li>• Use weighted mode for important decisions</li>
                  <li>• Consider using elimination for complex choices</li>
                  <li>• Trust the process and accept the result</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Examples Section */}
          <Card className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📚</span>
              Example Decision Scenarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'What to eat?',
                  options: ['Pizza', 'Sushi', 'Burger', 'Salad', 'Pasta'],
                  mode: 'random'
                },
                {
                  title: 'Which movie?',
                  options: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance'],
                  mode: 'weighted'
                },
                {
                  title: 'Weekend plans?',
                  options: ['Stay home', 'Go hiking', 'Visit friends', 'Shopping', 'Movie'],
                  mode: 'elimination'
                }
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setOptions(example.options);
                    setSelectedMode(example.mode);
                    setCustomWeight({});
                  }}
                  className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {example.title}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {example.options.join(', ')}
                  </div>
                  <div className="text-xs text-blue-600">
                    Mode: {decisionModes.find(m => m.id === example.mode)?.name}
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

export default DecisionMaker;
