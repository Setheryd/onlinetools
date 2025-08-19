import Head from 'next/head'

export default function ToolMetaTags({ tool }) {
  const title = `${tool.name} - Free Online Tool | The Tool Guru`
  const description = tool.description || `Free online ${tool.name.toLowerCase()} tool. ${tool.description}`
  const keywords = tool.keywords ? tool.keywords.join(', ') : `${tool.name.toLowerCase()}, online tool, free tool, ${tool.category.toLowerCase()}`
  const url = `https://thetool.guru${tool.path}`
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="The Tool Guru" />
      <meta property="og:image" content="https://thetool.guru/Brand_Assets/Logo.webp" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://thetool.guru/Brand_Assets/Logo.webp" />
      <meta name="twitter:site" content="@thetoolguru" />
      <meta name="twitter:creator" content="@thetoolguru" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="The Tool Guru" />
      <meta name="application-name" content="The Tool Guru" />
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": tool.name,
            "description": tool.description,
            "url": url,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "author": {
              "@type": "Organization",
              "name": "The Tool Guru",
              "url": "https://thetool.guru"
            },
            "creator": {
              "@type": "Organization",
              "name": "The Tool Guru"
            },
            "dateCreated": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "softwareVersion": "1.0",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "ratingCount": "100"
            }
          })
        }}
      />
    </Head>
  )
}
