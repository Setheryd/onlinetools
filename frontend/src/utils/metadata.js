export function generateMetadata({ title, description, keywords, path, image }) {
  const baseUrl = 'https://onlinetools.com'
  const fullUrl = `${baseUrl}${path}`
  
  return {
    title: title ? `${title} - Online Tools` : 'Online Tools - Free Web Utilities',
    description: description || 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
    keywords: keywords || 'online tools, web utilities, free tools, developer tools',
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: title ? `${title} - Online Tools` : 'Online Tools - Free Web Utilities',
      description: description || 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
      url: fullUrl,
      siteName: 'Online Tools',
      images: [
        {
          url: image || '/og-image.png',
          width: 1200,
          height: 630,
          alt: title || 'Online Tools',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} - Online Tools` : 'Online Tools - Free Web Utilities',
      description: description || 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
      images: [image || '/og-image.png'],
      creator: '@onlinetools',
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
          name: 'Online Tools',
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
        name: 'Online Tools',
        url: 'https://onlinetools.com',
        logo: 'https://onlinetools.com/logo.png',
        sameAs: [
          'https://twitter.com/onlinetools',
          'https://github.com/onlinetools',
        ],
      }
    
    default:
      return baseStructuredData
  }
}
