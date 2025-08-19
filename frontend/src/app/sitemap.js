import { getAllToolsForSitemap } from '../lib/tools'

export default function sitemap() {
  const baseUrl = 'https://thetool.guru'
  const currentDate = new Date().toISOString()
  
  // Static pages with high priority
  const staticPages = [
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
  
  // Get all tools from the dynamic configuration
  const toolPages = getAllToolsForSitemap()
  
  // Blog pages (you can expand this as you add more blog posts)
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
  
  // Important utility pages
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
  
  // Combine all pages
  return [...staticPages, ...toolPages, ...blogPages, ...utilityPages]
}
