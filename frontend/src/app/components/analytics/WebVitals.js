'use client'

import { useEffect } from 'react'

export default function WebVitals() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Import web-vitals dynamically
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)

      // Send to Google Analytics if available
      if (typeof window.gtag !== 'undefined') {
        getCLS(({ value }) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(value * 1000),
            non_interaction: true,
          })
        })

        getFID(({ value }) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round(value),
            non_interaction: true,
          })
        })

        getFCP(({ value }) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FCP',
            value: Math.round(value),
            non_interaction: true,
          })
        })

        getLCP(({ value }) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(value),
            non_interaction: true,
          })
        })

        getTTFB(({ value }) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'TTFB',
            value: Math.round(value),
            non_interaction: true,
          })
        })
      }
    })
  }, [])

  return null
}
