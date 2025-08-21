import { getAllToolsForSitemap } from '../../lib/tools'

export async function GET() {
  const tools = getAllToolsForSitemap()
  
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
