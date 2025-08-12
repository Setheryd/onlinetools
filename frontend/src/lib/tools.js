/**
 * Local copy of shared tool constants to avoid cross-package import issues in dev
 */

export const TOOL_CATEGORIES = {
  TEXT_TOOLS: 'Text Tools',
  DOCUMENT_TOOLS: 'Document Tools',
  DEVELOPER_TOOLS: 'Developer Tools',
  DESIGN_TOOLS: 'Design Tools',
  SECURITY_TOOLS: 'Security Tools',
  IMAGE_TOOLS: 'Image Tools',
  CONVERSION_TOOLS: 'Conversion Tools'
};

export const TOOLS = [
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 back to text. Useful for encoding binary data or simple text obfuscation.',
    icon: '🔤',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/base64',
    keywords: ['base64', 'encode', 'decode', 'text', 'binary', 'encoding'],
    status: 'active'
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document. Upload your PDFs and merge them easily.',
    icon: '📄',
    category: TOOL_CATEGORIES.DOCUMENT_TOOLS,
    url: '/tools/pdf-merger',
    keywords: ['pdf', 'merge', 'combine', 'document', 'files'],
    status: 'active'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs to handle special characters and ensure proper web compatibility.',
    icon: '🔗',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/url-encoder',
    keywords: ['url', 'encode', 'decode', 'web', 'link'],
    status: 'active'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data with proper indentation and syntax highlighting.',
    icon: '📋',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/json-formatter',
    keywords: ['json', 'format', 'validate', 'developer', 'code'],
    status: 'active'
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between different color formats: HEX, RGB, HSL, and more.',
    icon: '🎨',
    category: TOOL_CATEGORIES.DESIGN_TOOLS,
    url: '/tools/color-converter',
    keywords: ['color', 'convert', 'hex', 'rgb', 'hsl', 'design'],
    status: 'active'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable length and character sets.',
    icon: '🔐',
    category: TOOL_CATEGORIES.SECURITY_TOOLS,
    url: '/tools/password-generator',
    keywords: ['password', 'generate', 'secure', 'random', 'security'],
    status: 'active'
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size while maintaining quality.',
    icon: '🖼️',
    category: TOOL_CATEGORIES.IMAGE_TOOLS,
    url: '/tools/image-compressor',
    keywords: ['image', 'compress', 'optimize', 'file size', 'quality'],
    status: 'coming-soon'
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, or contact information.',
    icon: '📱',
    category: TOOL_CATEGORIES.CONVERSION_TOOLS,
    url: '/tools/qr-code-generator',
    keywords: ['qr code', 'generate', 'barcode', 'mobile', 'scan'],
    status: 'coming-soon'
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Write and preview Markdown content with real-time rendering.',
    icon: '✍️',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/markdown-editor',
    keywords: ['markdown', 'editor', 'write', 'preview', 'text'],
    status: 'coming-soon'
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON format and vice versa.',
    icon: '📊',
    category: TOOL_CATEGORIES.CONVERSION_TOOLS,
    url: '/tools/csv-to-json',
    keywords: ['csv', 'json', 'convert', 'data', 'format'],
    status: 'coming-soon'
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, and more.',
    icon: '🔤',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/text-case-converter',
    keywords: ['text', 'case', 'convert', 'uppercase', 'lowercase', 'title'],
    status: 'coming-soon'
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate various hash values (MD5, SHA1, SHA256) for text or files.',
    icon: '🔒',
    category: TOOL_CATEGORIES.SECURITY_TOOLS,
    url: '/tools/hash-generator',
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'generate', 'security'],
    status: 'coming-soon'
  }
];

export const getToolsByCategory = (category) => {
  return TOOLS.filter(tool => tool.category === category);
};

export const getActiveTools = () => {
  return TOOLS.filter(tool => tool.status === 'active');
};

export const getComingSoonTools = () => {
  return TOOLS.filter(tool => tool.status === 'coming-soon');
};

export const getToolById = (id) => {
  return TOOLS.find(tool => tool.id === id);
};

export const getAllKeywords = () => {
  const keywords = [];
  TOOLS.forEach(tool => {
    keywords.push(...tool.keywords);
  });
  return [...new Set(keywords)];
};


