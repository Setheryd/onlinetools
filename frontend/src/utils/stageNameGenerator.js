// Funny stage name generator for comment system
const adjectives = [
  'Mysterious', 'Brilliant', 'Clever', 'Witty', 'Charming', 'Adventurous',
  'Curious', 'Daring', 'Energetic', 'Friendly', 'Generous', 'Happy',
  'Imaginative', 'Joyful', 'Kind', 'Lively', 'Magical', 'Noble',
  'Optimistic', 'Playful', 'Quick', 'Radiant', 'Smart', 'Talented',
  'Unique', 'Vibrant', 'Warm', 'Xenial', 'Youthful', 'Zealous',
  'Cosmic', 'Digital', 'Electric', 'Fantastic', 'Galactic', 'Heroic',
  'Infinite', 'Jubilant', 'Kinetic', 'Legendary', 'Mystical', 'Neon',
  'Orbital', 'Phantom', 'Quantum', 'Rocket', 'Stellar', 'Thunder',
  'Ultra', 'Vortex', 'Wizard', 'Zen'
];

const nouns = [
  'Panda', 'Dragon', 'Phoenix', 'Unicorn', 'Wizard', 'Ninja',
  'Explorer', 'Inventor', 'Detective', 'Artist', 'Scientist', 'Chef',
  'Pilot', 'Captain', 'Knight', 'Mage', 'Ranger', 'Warrior',
  'Scholar', 'Merchant', 'Bard', 'Monk', 'Paladin', 'Rogue',
  'Alchemist', 'Engineer', 'Architect', 'Designer', 'Programmer', 'Hacker',
  'Gamer', 'Streamer', 'Creator', 'Builder', 'Maker', 'Coder',
  'Thinker', 'Dreamer', 'Visionary', 'Innovator', 'Pioneer', 'Trailblazer',
  'Voyager', 'Navigator', 'Discoverer', 'Adventurer', 'Explorer', 'Seeker',
  'Guardian', 'Protector', 'Defender', 'Champion', 'Hero', 'Legend',
  'Mystic', 'Sage', 'Oracle', 'Prophet', 'Seer', 'Wanderer'
];

const colors = [
  'Azure', 'Crimson', 'Emerald', 'Golden', 'Indigo', 'Jade',
  'Lavender', 'Magenta', 'Navy', 'Orange', 'Purple', 'Ruby',
  'Sapphire', 'Teal', 'Violet', 'Amber', 'Bronze', 'Copper',
  'Diamond', 'Garnet', 'Jade', 'Onyx', 'Pearl', 'Quartz',
  'Rose', 'Silver', 'Topaz', 'Turquoise', 'Umber', 'Vermilion'
];

const techTerms = [
  'Byte', 'Pixel', 'Vector', 'Matrix', 'Node', 'Cache',
  'Hash', 'Queue', 'Stack', 'Heap', 'Tree', 'Graph',
  'Lambda', 'Function', 'Class', 'Object', 'Array', 'String',
  'Integer', 'Float', 'Boolean', 'Null', 'Void', 'Async',
  'Promise', 'Stream', 'Buffer', 'Socket', 'Port', 'Route',
  'API', 'SDK', 'Framework', 'Library', 'Module', 'Package'
];

export const generateStageName = () => {
  const randomArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Different name patterns for variety
  const patterns = [
    () => `${randomArray(adjectives)} ${randomArray(nouns)}`,
    () => `${randomArray(colors)} ${randomArray(nouns)}`,
    () => `The ${randomArray(adjectives)} ${randomArray(nouns)}`,
    () => `${randomArray(adjectives)} ${randomArray(techTerms)}`,
    () => `${randomArray(techTerms)} ${randomArray(nouns)}`,
    () => `${randomArray(adjectives)} ${randomArray(adjectives)} ${randomArray(nouns)}`,
    () => `${randomArray(colors)} ${randomArray(techTerms)}`,
    () => `${randomArray(techTerms)} ${randomArray(colors)}`,
  ];
  
  const randomPattern = randomArray(patterns);
  return randomPattern();
};

// Generate a unique stage name that hasn't been used recently
export const generateUniqueStageName = (existingNames = []) => {
  let attempts = 0;
  let stageName;
  
  do {
    stageName = generateStageName();
    attempts++;
    
    // Prevent infinite loops
    if (attempts > 50) {
      stageName = `Anonymous_${Math.floor(Math.random() * 1000)}`;
      break;
    }
  } while (existingNames.includes(stageName));
  
  return stageName;
};

// Get a random emoji to go with the stage name
export const getRandomEmoji = () => {
  const emojis = ['🚀', '⭐', '🔥', '💫', '🌟', '✨', '🎯', '🎨', '🎭', '🎪', '🎢', '🎡', '🎠', '🎬', '🎤', '🎧', '🎵', '🎶', '🎹', '🎸', '🎺', '🎻', '🥁', '🎷', '🎺', '🎸', '🎻', '🎹', '🎤', '🎧', '🎵', '🎶', '🎬', '🎭', '🎨', '🎪', '🎢', '🎡', '🎠', '🎯', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎵', '🎶', '🎹', '🎸', '🎺', '🎻', '🥁', '🎷', '🎺', '🎸', '🎻', '🎹', '🎤', '🎧', '🎵', '🎶', '🎬', '🎭', '🎨', '🎪', '🎢', '🎡', '🎠', '🎯'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};
