/**
 * Local copy of shared tool constants to avoid cross-package import issues in dev
 */

export const tools = [
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 to text. Fast, secure, and free online tool.',
    path: '/tools/base64',
    category: 'encoding',
    keywords: 'base64, encode, decode, text, converter, online tool',
    icon: '🔤',
    featured: true,
    priority: 0.9,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords with customizable length and character sets.',
    path: '/tools/password-generator',
    category: 'security',
    keywords: 'password generator, secure password, random password, strong password',
    icon: '🔐',
    featured: true,
    priority: 0.9,
  },
  // Add new tools here - they will automatically be included in:
  // - Sitemap generation
  // - Navigation menus
  // - Related tools suggestions
  // - SEO metadata
]

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
  // Add new categories as needed
]

export function getToolById(id) {
  return tools.find(tool => tool.id === id)
}

export function getToolsByCategory(category) {
  return tools.filter(tool => tool.category === category)
}

export function getFeaturedTools() {
  return tools.filter(tool => tool.featured)
}

export function getRelatedTools(currentToolId, limit = 3) {
  const currentTool = getToolById(currentToolId)
  if (!currentTool) return []
  
  return tools
    .filter(tool => tool.id !== currentToolId && tool.category === currentTool.category)
    .slice(0, limit)
}

export function getAllToolsForSitemap() {
  return tools.map(tool => ({
    url: `https://onlinetools.com${tool.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: tool.priority,
  }))
}


