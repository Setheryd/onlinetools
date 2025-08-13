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
  CONVERSION_TOOLS: 'Conversion Tools',
  FILE_TOOLS: 'File Tools',
  WEB_TOOLS: 'Web Tools',
  CALCULATOR_TOOLS: 'Calculator Tools'
};

export const tools = [
  // HIGHEST PRIORITY - Most searched and used tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable length and character sets.',
    path: '/tools/password-generator',
    category: 'security',
    keywords: ['password', 'generate', 'secure', 'random', 'security', 'strong password'],
    icon: '🔐',
    featured: true,
    priority: 0.9,
    built: true,
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 back to text. Useful for encoding binary data or simple text obfuscation.',
    path: '/tools/base64',
    category: 'encoding',
    keywords: ['base64', 'encode', 'decode', 'text', 'binary', 'encoding'],
    icon: '🔤',
    featured: true,
    priority: 0.9,
    built: true,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format and validate JSON data with proper indentation and syntax highlighting.',
    path: '/tools/json-formatter',
    category: 'developer',
    keywords: ['json', 'format', 'validate', 'developer', 'code', 'beautify'],
    icon: '📋',
    featured: true,
    priority: 0.8,
    built: true,
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs to handle special characters and ensure proper web compatibility.',
    path: '/tools/url-encoder',
    category: 'encoding',
    keywords: ['url', 'encode', 'decode', 'web', 'link', 'percent encoding'],
    icon: '🔗',
    featured: true,
    priority: 0.8,
    built: false,
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, or contact information.',
    path: '/tools/qr-code-generator',
    category: 'conversion',
    keywords: ['qr code', 'generate', 'barcode', 'mobile', 'scan', 'quick response'],
    icon: '📱',
    featured: true,
    priority: 0.8,
    built: false,
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size while maintaining quality.',
    path: '/tools/image-compressor',
    category: 'image',
    keywords: ['image', 'compress', 'optimize', 'file size', 'quality', 'jpg', 'png'],
    icon: '🖼️',
    featured: true,
    priority: 0.8,
    built: false,
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document. Upload your PDFs and merge them easily.',
    path: '/tools/pdf-merger',
    category: 'document',
    keywords: ['pdf', 'merge', 'combine', 'document', 'files'],
    icon: '📄',
    featured: true,
    priority: 0.7,
    built: false,
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between different color formats: HEX, RGB, HSL, and more.',
    path: '/tools/color-converter',
    category: 'design',
    keywords: ['color', 'convert', 'hex', 'rgb', 'hsl', 'design', 'picker'],
    icon: '🎨',
    featured: true,
    priority: 0.7,
    built: false,
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate various hash values (MD5, SHA1, SHA256) for text or files.',
    path: '/tools/hash-generator',
    category: 'security',
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'generate', 'security', 'checksum'],
    icon: '🔒',
    featured: true,
    priority: 0.7,
    built: false,
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, and more.',
    path: '/tools/text-case-converter',
    category: 'text',
    keywords: ['text', 'case', 'convert', 'uppercase', 'lowercase', 'title', 'capitalize'],
    icon: '🔤',
    featured: false,
    priority: 0.6,
    built: false,
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON format and vice versa.',
    path: '/tools/csv-to-json',
    category: 'conversion',
    keywords: ['csv', 'json', 'convert', 'data', 'format', 'excel'],
    icon: '📊',
    featured: false,
    priority: 0.6,
    built: false,
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Write and preview Markdown content with real-time rendering.',
    path: '/tools/markdown-editor',
    category: 'developer',
    keywords: ['markdown', 'editor', 'write', 'preview', 'text', 'github'],
    icon: '✍️',
    featured: false,
    priority: 0.6,
    built: false,
  },
  // ADDITIONAL HIGH-DEMAND TOOLS
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUIDs) for databases, APIs, and applications.',
    path: '/tools/uuid-generator',
    category: 'developer',
    keywords: ['uuid', 'guid', 'generate', 'unique', 'identifier', 'database'],
    icon: '🆔',
    featured: false,
    priority: 0.6,
    built: false,
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and verify JSON Web Tokens to view their payload and headers.',
    path: '/tools/jwt-decoder',
    category: 'developer',
    keywords: ['jwt', 'token', 'decode', 'verify', 'json web token', 'authentication'],
    icon: '🎫',
    featured: false,
    priority: 0.6,
    built: false,
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching and highlighting.',
    path: '/tools/regex-tester',
    category: 'developer',
    keywords: ['regex', 'regular expression', 'test', 'pattern', 'match', 'debug'],
    icon: '🔍',
    featured: false,
    priority: 0.6,
    built: false,
  },
  {
    id: 'diff-checker',
    name: 'Text Diff Checker',
    description: 'Compare two texts and highlight the differences between them.',
    path: '/tools/diff-checker',
    category: 'text',
    keywords: ['diff', 'compare', 'text', 'difference', 'merge', 'version control'],
    icon: '📝',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text.',
    path: '/tools/word-counter',
    category: 'text',
    keywords: ['word count', 'character count', 'text analysis', 'writing', 'essay'],
    icon: '📊',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates.',
    path: '/tools/timestamp-converter',
    category: 'conversion',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert', 'epoch'],
    icon: '⏰',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design mockups and content testing.',
    path: '/tools/lorem-ipsum-generator',
    category: 'text',
    keywords: ['lorem ipsum', 'placeholder', 'text', 'generate', 'mockup', 'design'],
    icon: '📄',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'html-encoder',
    name: 'HTML Encoder/Decoder',
    description: 'Encode or decode HTML entities and special characters.',
    path: '/tools/html-encoder',
    category: 'web',
    keywords: ['html', 'encode', 'decode', 'entities', 'special characters', 'web'],
    icon: '🌐',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'file-size-converter',
    name: 'File Size Converter',
    description: 'Convert between different file size units (KB, MB, GB, TB).',
    path: '/tools/file-size-converter',
    category: 'conversion',
    keywords: ['file size', 'convert', 'kb', 'mb', 'gb', 'tb', 'bytes'],
    icon: '💾',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert numbers between different bases (binary, decimal, hexadecimal, octal).',
    path: '/tools/number-base-converter',
    category: 'conversion',
    keywords: ['number', 'base', 'convert', 'binary', 'hex', 'decimal', 'octal'],
    icon: '🔢',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    description: 'Minify CSS code to reduce file size and improve loading speed.',
    path: '/tools/css-minifier',
    category: 'developer',
    keywords: ['css', 'minify', 'compress', 'optimize', 'web', 'performance'],
    icon: '🎨',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'js-minifier',
    name: 'JavaScript Minifier',
    description: 'Minify JavaScript code to reduce file size and improve loading speed.',
    path: '/tools/js-minifier',
    category: 'developer',
    keywords: ['javascript', 'js', 'minify', 'compress', 'optimize', 'web'],
    icon: '⚡',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and validate XML documents with proper indentation.',
    path: '/tools/xml-formatter',
    category: 'developer',
    keywords: ['xml', 'format', 'validate', 'beautify', 'indent', 'document'],
    icon: '📋',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format SQL queries with proper indentation and syntax highlighting.',
    path: '/tools/sql-formatter',
    category: 'developer',
    keywords: ['sql', 'format', 'query', 'database', 'beautify', 'indent'],
    icon: '🗄️',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'email-validator',
    name: 'Email Validator',
    description: 'Validate email addresses and check their format and deliverability.',
    path: '/tools/email-validator',
    category: 'web',
    keywords: ['email', 'validate', 'check', 'format', 'deliverability', 'spam'],
    icon: '📧',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'ip-lookup',
    name: 'IP Address Lookup',
    description: 'Get detailed information about IP addresses including location and ISP.',
    path: '/tools/ip-lookup',
    category: 'web',
    keywords: ['ip', 'address', 'lookup', 'location', 'isp', 'geolocation'],
    icon: '🌍',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    description: 'Perform DNS lookups to find IP addresses, MX records, and other DNS information.',
    path: '/tools/dns-lookup',
    category: 'web',
    keywords: ['dns', 'lookup', 'domain', 'ip', 'mx', 'records', 'resolve'],
    icon: '🔍',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'ssl-checker',
    name: 'SSL Certificate Checker',
    description: 'Check SSL certificate validity, expiration, and security details.',
    path: '/tools/ssl-checker',
    category: 'security',
    keywords: ['ssl', 'certificate', 'check', 'security', 'https', 'expiration'],
    icon: '🔒',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'website-speed-test',
    name: 'Website Speed Test',
    description: 'Test website loading speed and performance metrics.',
    path: '/tools/website-speed-test',
    category: 'web',
    keywords: ['speed', 'test', 'website', 'performance', 'loading', 'page speed'],
    icon: '⚡',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Generate SEO-friendly meta tags for your website.',
    path: '/tools/meta-tag-generator',
    category: 'web',
    keywords: ['meta', 'tags', 'seo', 'generate', 'website', 'social media'],
    icon: '🏷️',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Generate favicons for your website in multiple sizes and formats.',
    path: '/tools/favicon-generator',
    category: 'web',
    keywords: ['favicon', 'generate', 'website', 'icon', 'browser', 'tab'],
    icon: '🎯',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap Generator',
    description: 'Generate XML sitemaps for better search engine indexing.',
    path: '/tools/sitemap-generator',
    category: 'web',
    keywords: ['sitemap', 'xml', 'generate', 'seo', 'search engine', 'indexing'],
    icon: '🗺️',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    description: 'Generate robots.txt files to control search engine crawling.',
    path: '/tools/robots-txt-generator',
    category: 'web',
    keywords: ['robots.txt', 'generate', 'seo', 'crawling', 'search engine'],
    icon: '🤖',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'htaccess-generator',
    name: '.htaccess Generator',
    description: 'Generate .htaccess files for Apache server configuration.',
    path: '/tools/htaccess-generator',
    category: 'web',
    keywords: ['htaccess', 'apache', 'server', 'configuration', 'redirect', 'rewrite'],
    icon: '⚙️',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'cron-job-generator',
    name: 'Cron Job Generator',
    description: 'Generate cron job expressions for task scheduling.',
    path: '/tools/cron-job-generator',
    category: 'developer',
    keywords: ['cron', 'job', 'schedule', 'task', 'expression', 'linux'],
    icon: '⏰',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'gitignore-generator',
    name: '.gitignore Generator',
    description: 'Generate .gitignore files for various programming languages and frameworks.',
    path: '/tools/gitignore-generator',
    category: 'developer',
    keywords: ['gitignore', 'git', 'ignore', 'files', 'repository', 'version control'],
    icon: '📁',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'dockerfile-generator',
    name: 'Dockerfile Generator',
    description: 'Generate Dockerfile templates for containerizing applications.',
    path: '/tools/dockerfile-generator',
    category: 'developer',
    keywords: ['dockerfile', 'docker', 'container', 'generate', 'template'],
    icon: '🐳',
    featured: false,
    priority: 0.5,
    built: false,
  },
  {
    id: 'api-doc-generator',
    name: 'API Documentation Generator',
    description: 'Generate API documentation from OpenAPI/Swagger specifications.',
    path: '/tools/api-doc-generator',
    category: 'developer',
    keywords: ['api', 'documentation', 'generate', 'openapi', 'swagger', 'docs'],
    icon: '📚',
    featured: false,
    priority: 0.5,
    built: false,
  }
];

export const categories = [
  {
    id: 'encoding',
    name: 'Encoding & Decoding',
    description: 'Tools for encoding and decoding various formats',
  },
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Tools for password generation and security',
  },
  {
    id: 'document',
    name: 'Document Tools',
    description: 'Tools for working with documents and files',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Tools for developers and programmers',
  },
  {
    id: 'design',
    name: 'Design Tools',
    description: 'Tools for designers and creatives',
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Tools for image processing and manipulation',
  },
  {
    id: 'conversion',
    name: 'Conversion Tools',
    description: 'Tools for converting between different formats',
  },
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Tools for text processing and manipulation',
  },
  {
    id: 'web',
    name: 'Web Tools',
    description: 'Tools for web development and analysis',
  },
  {
    id: 'file',
    name: 'File Tools',
    description: 'Tools for file management and processing',
  },
  {
    id: 'calculator',
    name: 'Calculator Tools',
    description: 'Various calculators and computational tools',
  }
];

// Core utility functions
export function getToolById(id) {
  return tools.find(tool => tool.id === id);
}

export function getToolsByCategory(category) {
  return tools.filter(tool => tool.category === category);
}

export function getFeaturedTools() {
  return tools.filter(tool => tool.featured);
}

export function getRelatedTools(currentToolId, limit = 3) {
  const currentTool = getToolById(currentToolId);
  if (!currentTool) return [];
  
  return tools
    .filter(tool => tool.id !== currentToolId && tool.category === currentTool.category)
    .slice(0, limit);
}

export function getAllToolsForSitemap() {
  return tools.map(tool => ({
    url: `https://onlinetools.com${tool.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: tool.priority,
  }));
}

// Built vs unbuilt tools (driven by which routes are implemented)
export function getBuiltTools() {
  return tools.filter(tool => tool.built === true);
}

export function getUnbuiltTools() {
  return tools.filter(tool => tool.built !== true);
}

// Priority-based sorting and filtering
export function getToolsByPriority(limit = null) {
  const sortedTools = [...tools].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  return limit ? sortedTools.slice(0, limit) : sortedTools;
}

export function getTopTools(count = 10) {
  return getToolsByPriority(count);
}

export function getMostPopularTools(count = 20) {
  return getToolsByPriority(count);
}

// Search functionality
export function searchTools(query) {
  const searchTerm = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
  );
}

// Status-based filtering
export function getToolsByStatus(status) {
  return tools.filter(tool => tool.status === status);
}

// Category statistics
export function getCategoryStats() {
  const stats = {};
  categories.forEach(category => {
    stats[category.id] = tools.filter(tool => tool.category === category.id).length;
  });
  return stats;
}

// Add new tools here - they will automatically be included in:
// - Sitemap generation
// - Navigation menus
// - Related tools suggestions
// - SEO metadata





