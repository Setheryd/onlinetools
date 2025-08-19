/**
 * Utility function to generate consistent metadata for tool pages
 */

export function generateToolMetadata(tool) {
  const baseUrl = 'https://thetool.guru';
  const toolUrl = `${baseUrl}${tool.path}`;
  
  return {
    title: `${tool.name} — The Tool Guru`,
    description: tool.description,
    keywords: tool.keywords || [],
    alternates: {
      canonical: toolUrl,
    },
    openGraph: {
      title: `${tool.name} — The Tool Guru`,
      description: tool.description,
      url: toolUrl,
      siteName: 'The Tool Guru',
      images: [
        {
          url: '/Brand_Assets/Logo.webp',
          width: 512,
          height: 512,
          alt: `${tool.name} - The Tool Guru`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} — The Tool Guru`,
      description: tool.description,
      images: ['/Brand_Assets/Logo.webp'],
      creator: '@thetoolguru',
      site: '@thetoolguru',
    },
  };
}

/**
 * Generate metadata for static pages
 */
export function generatePageMetadata(page) {
  const baseUrl = 'https://thetool.guru';
  const pageUrl = `${baseUrl}${page.path}`;
  
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords || [],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: pageUrl,
      siteName: 'The Tool Guru',
      images: [
        {
          url: '/Brand_Assets/Logo.webp',
          width: 512,
          height: 512,
          alt: page.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/Brand_Assets/Logo.webp'],
      creator: '@thetoolguru',
      site: '@thetoolguru',
    },
  };
}
