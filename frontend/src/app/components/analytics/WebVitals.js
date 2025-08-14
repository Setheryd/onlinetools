'use client'

import { useEffect } from 'react'

export default function WebVitals() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Import web-vitals dynamically with error handling
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Add error handling for each function
      try {
        if (typeof getCLS === 'function') {
          getCLS(console.log)
        }
        if (typeof getFID === 'function') {
          getFID(console.log)
        }
        if (typeof getFCP === 'function') {
          getFCP(console.log)
        }
        if (typeof getLCP === 'function') {
          getLCP(console.log)
        }
        if (typeof getTTFB === 'function') {
          getTTFB(console.log)
        }

        // Send to Google Analytics if available
        if (typeof window.gtag !== 'undefined') {
          if (typeof getCLS === 'function') {
            getCLS(({ value }) => {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'CLS',
                value: Math.round(value * 1000),
                non_interaction: true,
              })
            })
          }

          if (typeof getFID === 'function') {
            getFID(({ value }) => {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'FID',
                value: Math.round(value),
                non_interaction: true,
              })
            })
          }

          if (typeof getFCP === 'function') {
            getFCP(({ value }) => {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'FCP',
                value: Math.round(value),
                non_interaction: true,
              })
            })
          }

          if (typeof getLCP === 'function') {
            getLCP(({ value }) => {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'LCP',
                value: Math.round(value),
                non_interaction: true,
              })
            })
          }

          if (typeof getTTFB === 'function') {
            getTTFB(({ value }) => {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'TTFB',
                value: Math.round(value),
                non_interaction: true,
              })
            })
          }
        }
      } catch (error) {
        console.warn('Web Vitals error:', error)
      }
    }).catch(error => {
      console.warn('Failed to load web-vitals:', error)
    })
  }, [])

  return null
}
