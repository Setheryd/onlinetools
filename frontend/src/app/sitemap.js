import { getAllToolsForSitemap, tools } from '../lib/tools'

export default function sitemap() {
  const baseUrl = 'https://thetool.guru'
  const currentDate = new Date().toISOString()
  
  // TIER 1: Critical pages (highest priority)
  const criticalPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
  
  // TIER 2: Important static pages
  const importantPages = [
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
  
  // TIER 3: Blog posts (high value content)
  const blogPages = [
    {
      url: `${baseUrl}/blog/complete-guide-to-qr-code-generation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/mastering-scientific-calculators`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/ultimate-guide-to-gitignore-files`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
  
  // TIER 4: Featured tools only (reduce crawl burden)
  const featuredTools = getAllToolsForSitemap().filter(tool => {
    // Only include tools with priority >= 0.7 (high-value tools)
    const toolId = tool.url.split('/').pop()
    const toolData = tools.find(t => t.id === toolId)
    return toolData && (toolData.priority >= 0.7 || toolData.featured)
  })
  
  // TIER 5: Utility pages
  const utilityPages = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/robots.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/ads.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.1,
    },
  ]
  
  // Combine all pages in priority order
  return [...criticalPages, ...importantPages, ...blogPages, ...featuredTools, ...utilityPages]
}
