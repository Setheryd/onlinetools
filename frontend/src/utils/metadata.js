export function generateMetadata({ title, description, keywords, path, image }) {
  const baseUrl = 'https://thetool.guru'
  const fullUrl = `${baseUrl}${path}`
  
  return {
    title: title ? `${title} - The Tool Guru` : 'The Tool Guru - Free Online Tools & Utilities',
    description: description || 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
    keywords: keywords || 'online tools, web utilities, free tools, developer tools, the tool guru',
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: title ? `${title} - The Tool Guru` : 'The Tool Guru - Free Online Tools & Utilities',
      description: description || 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
      url: fullUrl,
      siteName: 'The Tool Guru',
      images: [
        {
          url: image || '/Brand_Assets/Logo.jpg',
          width: 1200,
          height: 630,
          alt: title || 'The Tool Guru',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} - The Tool Guru` : 'The Tool Guru - Free Online Tools & Utilities',
      description: description || 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
      images: [image || '/Brand_Assets/Logo.jpg'],
      creator: '@thetoolguru',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStructuredData({ type, data }) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'WebApplication':
      return {
        ...baseStructuredData,
        name: data.name,
        description: data.description,
        url: data.url,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Organization',
          name: 'The Tool Guru',
        },
      }
    
    case 'FAQPage':
      return {
        ...baseStructuredData,
        mainEntity: data.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    
    case 'BreadcrumbList':
      return {
        ...baseStructuredData,
        itemListElement: data.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    
    case 'Organization':
      return {
        ...baseStructuredData,
        name: 'The Tool Guru',
        url: 'https://thetool.guru',
        logo: 'https://thetool.guru/Brand_Assets/Logo.jpg',
        sameAs: [
          'https://twitter.com/thetoolguru',
          'https://github.com/thetoolguru',
        ],
      }
    
    default:
      return baseStructuredData
  }
}
