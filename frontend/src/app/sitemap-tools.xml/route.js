import { getBuiltTools } from '../../lib/tools'

const BASE_URL = 'https://thetool.guru'

export async function GET() {
  // Only include built tools so Google does not discover 404 URLs (unbuilt "coming soon" tools)
  const tools = getBuiltTools().map(tool => ({
    url: `${BASE_URL}${tool.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: tool.priority ?? 0.5,
  }))
  
  // Create XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${tools.map(tool => `  <url>
    <loc>${tool.url}</loc>
    <lastmod>${tool.lastModified}</lastmod>
    <changefreq>${tool.changeFrequency}</changefreq>
    <priority>${tool.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
