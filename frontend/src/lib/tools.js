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

export const TOOLS = [
  // HIGHEST PRIORITY - Most searched and used tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable length and character sets.',
    icon: '🔐',
    category: TOOL_CATEGORIES.SECURITY_TOOLS,
    url: '/tools/password-generator',
    keywords: ['password', 'generate', 'secure', 'random', 'security', 'strong password'],
    status: 'active',
    priority: 1
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 back to text. Useful for encoding binary data or simple text obfuscation.',
    icon: '🔤',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/base64',
    keywords: ['base64', 'encode', 'decode', 'text', 'binary', 'encoding'],
    status: 'active',
    priority: 2
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format and validate JSON data with proper indentation and syntax highlighting.',
    icon: '📋',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/json-formatter',
    keywords: ['json', 'format', 'validate', 'developer', 'code', 'beautify'],
    status: 'active',
    priority: 3
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs to handle special characters and ensure proper web compatibility.',
    icon: '🔗',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/url-encoder',
    keywords: ['url', 'encode', 'decode', 'web', 'link', 'percent encoding'],
    status: 'active',
    priority: 4
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, or contact information.',
    icon: '📱',
    category: TOOL_CATEGORIES.CONVERSION_TOOLS,
    url: '/tools/qr-code-generator',
    keywords: ['qr code', 'generate', 'barcode', 'mobile', 'scan', 'quick response'],
    status: 'active',
    priority: 5
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size while maintaining quality.',
    icon: '🖼️',
    category: TOOL_CATEGORIES.IMAGE_TOOLS,
    url: '/tools/image-compressor',
    keywords: ['image', 'compress', 'optimize', 'file size', 'quality', 'jpg', 'png'],
    status: 'active',
    priority: 6
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document. Upload your PDFs and merge them easily.',
    icon: '📄',
    category: TOOL_CATEGORIES.DOCUMENT_TOOLS,
    url: '/tools/pdf-merger',
    keywords: ['pdf', 'merge', 'combine', 'document', 'files'],
    status: 'active',
    priority: 7
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between different color formats: HEX, RGB, HSL, and more.',
    icon: '🎨',
    category: TOOL_CATEGORIES.DESIGN_TOOLS,
    url: '/tools/color-converter',
    keywords: ['color', 'convert', 'hex', 'rgb', 'hsl', 'design', 'picker'],
    status: 'active',
    priority: 8
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate various hash values (MD5, SHA1, SHA256) for text or files.',
    icon: '🔒',
    category: TOOL_CATEGORIES.SECURITY_TOOLS,
    url: '/tools/hash-generator',
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'generate', 'security', 'checksum'],
    status: 'active',
    priority: 9
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases: UPPERCASE, lowercase, Title Case, and more.',
    icon: '🔤',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/text-case-converter',
    keywords: ['text', 'case', 'convert', 'uppercase', 'lowercase', 'title', 'capitalize'],
    status: 'active',
    priority: 10
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON format and vice versa.',
    icon: '📊',
    category: TOOL_CATEGORIES.CONVERSION_TOOLS,
    url: '/tools/csv-to-json',
    keywords: ['csv', 'json', 'convert', 'data', 'format', 'excel'],
    status: 'active',
    priority: 11
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Write and preview Markdown content with real-time rendering.',
    icon: '✍️',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/markdown-editor',
    keywords: ['markdown', 'editor', 'write', 'preview', 'text', 'github'],
    status: 'active',
    priority: 12
  },
  // ADDITIONAL HIGH-DEMAND TOOLS
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUIDs) for databases, APIs, and applications.',
    icon: '🆔',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/uuid-generator',
    keywords: ['uuid', 'guid', 'generate', 'unique', 'identifier', 'database'],
    status: 'active',
    priority: 13
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and verify JSON Web Tokens to view their payload and headers.',
    icon: '🎫',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/jwt-decoder',
    keywords: ['jwt', 'token', 'decode', 'verify', 'json web token', 'authentication'],
    status: 'active',
    priority: 14
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching and highlighting.',
    icon: '🔍',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/regex-tester',
    keywords: ['regex', 'regular expression', 'test', 'pattern', 'match', 'debug'],
    status: 'active',
    priority: 15
  },
  {
    id: 'diff-checker',
    name: 'Text Diff Checker',
    description: 'Compare two texts and highlight the differences between them.',
    icon: '📝',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/diff-checker',
    keywords: ['diff', 'compare', 'text', 'difference', 'merge', 'version control'],
    status: 'active',
    priority: 16
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text.',
    icon: '📊',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/word-counter',
    keywords: ['word count', 'character count', 'text analysis', 'writing', 'essay'],
    status: 'active',
    priority: 17
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates.',
    icon: '⏰',
    category: TOOL_CATEGORIES.CONVERSION_TOOLS,
    url: '/tools/timestamp-converter',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert', 'epoch'],
    status: 'active',
    priority: 18
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design mockups and content testing.',
    icon: '📄',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    url: '/tools/lorem-ipsum-generator',
    keywords: ['lorem ipsum', 'placeholder', 'text', 'generate', 'mockup', 'design'],
    status: 'active',
    priority: 19
  },
  {
    id: 'html-encoder',
    name: 'HTML Encoder/Decoder',
    description: 'Encode or decode HTML entities and special characters.',
    icon: '🌐',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/html-encoder',
    keywords: ['html', 'encode', 'decode', 'entities', 'special characters', 'web'],
    status: 'active',
    priority: 20
  },
  {
    id: 'file-size-converter',
    name: 'File Size Converter',
    description: 'Convert between different file size units (KB, MB, GB, TB).',
    icon: '💾',
    category: TOOL_CATEGORIES.CONVERSION_TOOLS,
    url: '/tools/file-size-converter',
    keywords: ['file size', 'convert', 'kb', 'mb', 'gb', 'tb', 'bytes'],
    status: 'active',
    priority: 21
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert numbers between different bases (binary, decimal, hexadecimal, octal).',
    icon: '🔢',
    category: TOOL_CATEGORIES.CONVERSION_TOOLS,
    url: '/tools/number-base-converter',
    keywords: ['number', 'base', 'convert', 'binary', 'hex', 'decimal', 'octal'],
    status: 'active',
    priority: 22
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    description: 'Minify CSS code to reduce file size and improve loading speed.',
    icon: '🎨',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/css-minifier',
    keywords: ['css', 'minify', 'compress', 'optimize', 'web', 'performance'],
    status: 'active',
    priority: 23
  },
  {
    id: 'js-minifier',
    name: 'JavaScript Minifier',
    description: 'Minify JavaScript code to reduce file size and improve loading speed.',
    icon: '⚡',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/js-minifier',
    keywords: ['javascript', 'js', 'minify', 'compress', 'optimize', 'web'],
    status: 'active',
    priority: 24
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and validate XML documents with proper indentation.',
    icon: '📋',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/xml-formatter',
    keywords: ['xml', 'format', 'validate', 'beautify', 'indent', 'document'],
    status: 'active',
    priority: 25
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format SQL queries with proper indentation and syntax highlighting.',
    icon: '🗄️',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/sql-formatter',
    keywords: ['sql', 'format', 'query', 'database', 'beautify', 'indent'],
    status: 'active',
    priority: 26
  },
  {
    id: 'email-validator',
    name: 'Email Validator',
    description: 'Validate email addresses and check their format and deliverability.',
    icon: '📧',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/email-validator',
    keywords: ['email', 'validate', 'check', 'format', 'deliverability', 'spam'],
    status: 'active',
    priority: 27
  },
  {
    id: 'ip-lookup',
    name: 'IP Address Lookup',
    description: 'Get detailed information about IP addresses including location and ISP.',
    icon: '🌍',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/ip-lookup',
    keywords: ['ip', 'address', 'lookup', 'location', 'isp', 'geolocation'],
    status: 'active',
    priority: 28
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    description: 'Perform DNS lookups to find IP addresses, MX records, and other DNS information.',
    icon: '🔍',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/dns-lookup',
    keywords: ['dns', 'lookup', 'domain', 'ip', 'mx', 'records', 'resolve'],
    status: 'active',
    priority: 29
  },
  {
    id: 'ssl-checker',
    name: 'SSL Certificate Checker',
    description: 'Check SSL certificate validity, expiration, and security details.',
    icon: '🔒',
    category: TOOL_CATEGORIES.SECURITY_TOOLS,
    url: '/tools/ssl-checker',
    keywords: ['ssl', 'certificate', 'check', 'security', 'https', 'expiration'],
    status: 'active',
    priority: 30
  },
  {
    id: 'website-speed-test',
    name: 'Website Speed Test',
    description: 'Test website loading speed and performance metrics.',
    icon: '⚡',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/website-speed-test',
    keywords: ['speed', 'test', 'website', 'performance', 'loading', 'page speed'],
    status: 'active',
    priority: 31
  },
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Generate SEO-friendly meta tags for your website.',
    icon: '🏷️',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/meta-tag-generator',
    keywords: ['meta', 'tags', 'seo', 'generate', 'website', 'social media'],
    status: 'active',
    priority: 32
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Generate favicons for your website in multiple sizes and formats.',
    icon: '🎯',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/favicon-generator',
    keywords: ['favicon', 'generate', 'website', 'icon', 'browser', 'tab'],
    status: 'active',
    priority: 33
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap Generator',
    description: 'Generate XML sitemaps for better search engine indexing.',
    icon: '🗺️',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/sitemap-generator',
    keywords: ['sitemap', 'xml', 'generate', 'seo', 'search engine', 'indexing'],
    status: 'active',
    priority: 34
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    description: 'Generate robots.txt files to control search engine crawling.',
    icon: '🤖',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/robots-txt-generator',
    keywords: ['robots.txt', 'generate', 'seo', 'crawling', 'search engine'],
    status: 'active',
    priority: 35
  },
  {
    id: 'htaccess-generator',
    name: '.htaccess Generator',
    description: 'Generate .htaccess files for Apache server configuration.',
    icon: '⚙️',
    category: TOOL_CATEGORIES.WEB_TOOLS,
    url: '/tools/htaccess-generator',
    keywords: ['htaccess', 'apache', 'server', 'configuration', 'redirect', 'rewrite'],
    status: 'active',
    priority: 36
  },
  {
    id: 'cron-job-generator',
    name: 'Cron Job Generator',
    description: 'Generate cron job expressions for task scheduling.',
    icon: '⏰',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/cron-job-generator',
    keywords: ['cron', 'job', 'schedule', 'task', 'expression', 'linux'],
    status: 'active',
    priority: 37
  },
  {
    id: 'gitignore-generator',
    name: '.gitignore Generator',
    description: 'Generate .gitignore files for various programming languages and frameworks.',
    icon: '📁',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/gitignore-generator',
    keywords: ['gitignore', 'git', 'ignore', 'files', 'repository', 'version control'],
    status: 'active',
    priority: 38
  },
  {
    id: 'dockerfile-generator',
    name: 'Dockerfile Generator',
    description: 'Generate Dockerfile templates for containerizing applications.',
    icon: '🐳',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/dockerfile-generator',
    keywords: ['dockerfile', 'docker', 'container', 'generate', 'template'],
    status: 'active',
    priority: 39
  },
  {
    id: 'api-doc-generator',
    name: 'API Documentation Generator',
    description: 'Generate API documentation from OpenAPI/Swagger specifications.',
    icon: '📚',
    category: TOOL_CATEGORIES.DEVELOPER_TOOLS,
    url: '/tools/api-doc-generator',
    keywords: ['api', 'documentation', 'generate', 'openapi', 'swagger', 'docs'],
    status: 'active',
    priority: 40
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

// New utility functions for priority-based sorting and filtering
export const getToolsByPriority = (limit = null) => {
  const sortedTools = [...TOOLS].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  return limit ? sortedTools.slice(0, limit) : sortedTools;
};

export const getTopTools = (count = 10) => {
  return getToolsByPriority(count);
};

export const getToolsBySearchVolume = () => {
  // Returns tools sorted by estimated search volume (priority)
  return getToolsByPriority();
};

export const getMostPopularTools = (count = 20) => {
  // Returns the most popular tools based on priority
  return getToolsByPriority(count);
};

export const searchTools = (query) => {
  const searchTerm = query.toLowerCase();
  return TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
  );
};

export const getToolsByStatus = (status) => {
  return TOOLS.filter(tool => tool.status === status);
};

export const getCategoryStats = () => {
  const stats = {};
  TOOL_CATEGORIES.forEach(category => {
    stats[category] = TOOLS.filter(tool => tool.category === category).length;
  });
  return stats;
};


