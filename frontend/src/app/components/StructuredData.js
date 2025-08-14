export default function StructuredData({ type, data }) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "The Tool Guru",
          "description": "A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.",
          "url": "https://thetool.guru",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://thetool.guru/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Tool Guru",
            "logo": {
              "@type": "ImageObject",
              "url": "https://thetool.guru/Brand_Assets/Logo.webp",
              "width": 512,
              "height": 512
            },
            "sameAs": [
              "https://twitter.com/thetoolguru",
              "https://facebook.com/thetoolguru"
            ]
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }
      
      case 'tool':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": data.name,
          "description": data.description,
          "url": `https://thetool.guru/tools/${data.slug}`,
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
          "dateCreated": data.createdAt || new Date().toISOString(),
          "dateModified": data.updatedAt || new Date().toISOString(),
          "softwareVersion": "1.0",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": data.rating || "4.5",
            "ratingCount": data.ratingCount || "100"
          }
        }
      
      case 'blog':
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": data.title,
          "description": data.description,
          "author": {
            "@type": "Organization",
            "name": "The Tool Guru",
            "url": "https://thetool.guru"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Tool Guru",
            "logo": {
              "@type": "ImageObject",
              "url": "https://thetool.guru/Brand_Assets/Logo.webp",
              "width": 512,
              "height": 512
            }
          },
          "datePublished": data.publishedAt,
          "dateModified": data.updatedAt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://thetool.guru/blog/${data.slug}`
          },
          "image": data.featuredImage ? {
            "@type": "ImageObject",
            "url": data.featuredImage,
            "width": 1200,
            "height": 630
          } : undefined,
          "keywords": data.keywords || data.tags?.join(', '),
          "articleSection": data.category || "Tools & Utilities",
          "wordCount": data.wordCount || "1000"
        }
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "The Tool Guru",
          "description": "A collection of free online tools and utilities for developers and professionals.",
          "url": "https://thetool.guru",
          "logo": {
            "@type": "ImageObject",
            "url": "https://thetool.guru/Brand_Assets/Logo.webp",
            "width": 512,
            "height": 512
          },
          "sameAs": [
            "https://twitter.com/thetoolguru",
            "https://facebook.com/thetoolguru",
            "https://linkedin.com/company/thetoolguru"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@thetool.guru"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        }
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }
      
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.questions.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          }))
        }
      
      default:
        return null
    }
  }

  const structuredData = getStructuredData()
  
  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
