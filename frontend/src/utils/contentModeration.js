// Content moderation utility for filtering inappropriate language
// This is a basic implementation - in production, you'd use more sophisticated tools

// List of words to filter (this is a basic example)
const profanityList = [
  // Common profanity (censored for example)
  'f***', 's***', 'a**', 'b****', 'c***', 'd***', 'p***', 't***',
  // Variations and common misspellings
  'f*ck', 'sh*t', 'a**hole', 'b*tch', 'c*nt', 'd*ck', 'p*ssy', 't*ts',
  // Add more as needed
];

// List of words that might be inappropriate in certain contexts
const questionableWords = [
  'hate', 'kill', 'death', 'suicide', 'murder', 'bomb', 'terrorist',
  // Add more context-dependent words
];

// Function to check if text contains profanity
export const containsProfanity = (text) => {
  const lowerText = text.toLowerCase();
  return profanityList.some(word => lowerText.includes(word.toLowerCase()));
};

// Function to check if text contains questionable content
export const containsQuestionableContent = (text) => {
  const lowerText = text.toLowerCase();
  return questionableWords.some(word => lowerText.includes(word.toLowerCase()));
};

// Main filtering function
export const filterProfanity = (text) => {
  // If text contains obvious profanity, return null to indicate it should be rejected
  if (containsProfanity(text)) {
    return null;
  }
  
  // For questionable content, you might want to flag it for review
  if (containsQuestionableContent(text)) {
    // In production, you might want to flag this for human review
    console.log('Questionable content detected:', text);
  }
  
  // Return the original text if it passes moderation
  return text;
};

// Function to get content severity level
export const getContentSeverity = (text) => {
  if (containsProfanity(text)) {
    return 'high';
  }
  
  if (containsQuestionableContent(text)) {
    return 'medium';
  }
  
  return 'low';
};

// Function to suggest alternative text
export const suggestAlternative = (text) => {
  // In production, you might use AI to suggest alternatives
  // For now, we'll just return a generic message
  
  if (containsProfanity(text)) {
    return 'Please revise your comment to remove inappropriate language.';
  }
  
  if (containsQuestionableContent(text)) {
    return 'Please consider if your comment is appropriate for our community.';
  }
  
  return null;
};

// Rate limiting helper
export const checkRateLimit = (userId, action, timeWindow = 60000) => {
  // In production, you'd implement proper rate limiting with Redis or similar
  // This is a simplified example
  
  const now = Date.now();
  const key = `rate_limit_${userId}_${action}`;
  
  // Get existing rate limit data from storage
  let rateLimitData = null;
  try {
    rateLimitData = JSON.parse(localStorage.getItem(key) || 'null');
  } catch (e) {
    // Ignore localStorage errors
  }
  
  if (!rateLimitData || (now - rateLimitData.timestamp) > timeWindow) {
    // Reset rate limit
    rateLimitData = {
      count: 1,
      timestamp: now
    };
  } else {
    rateLimitData.count++;
  }
  
  // Save updated rate limit data
  try {
    localStorage.setItem(key, JSON.stringify(rateLimitData));
  } catch (e) {
    // Ignore localStorage errors
  }
  
  // Return whether rate limit is exceeded
  return rateLimitData.count <= 5; // Allow 5 actions per time window
};
