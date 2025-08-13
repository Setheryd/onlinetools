import { getAllToolsForSitemap } from '../lib/tools'

export default function sitemap() {
  const baseUrl = 'https://thetool.guru'
  const currentDate = new Date().toISOString()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]
  
  // Get all tools from the dynamic configuration
  const toolPages = getAllToolsForSitemap()
  
  // Combine all pages
  return [...staticPages, ...toolPages]
}
