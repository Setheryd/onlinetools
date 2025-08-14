'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function EnhancedAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return

    // Track page views with enhanced data
    const trackPageView = () => {
      const pageType = pathname.startsWith('/tools/') ? 'tool_page' : 
                      pathname.startsWith('/blog/') ? 'blog_page' : 'static_page'
      
      const toolCategory = pathname.startsWith('/tools/') ? pathname.split('/')[2] : 'none'
      
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_type: pageType,
        tool_category: toolCategory,
        custom_map: {
          'dimension1': 'user_type',
          'dimension2': 'tool_category',
          'dimension3': 'page_type'
        }
      })
    }

    // Track tool usage
    const trackToolUsage = () => {
      if (pathname.startsWith('/tools/')) {
        const toolName = pathname.split('/')[2]
        window.gtag('event', 'tool_used', {
          tool_name: toolName,
          event_category: 'Tool Usage',
          event_label: toolName,
          value: 1
        })
      }
    }

    // Track user engagement
    const trackEngagement = () => {
      let startTime = Date.now()
      let hasInteracted = false
      
      // Track user interactions
      const interactionEvents = ['click', 'scroll', 'input', 'submit']
      interactionEvents.forEach(eventType => {
        document.addEventListener(eventType, () => {
          if (!hasInteracted) {
            hasInteracted = true
            window.gtag('event', 'user_interaction', {
              event_category: 'User Engagement',
              event_label: eventType,
              interaction_type: eventType
            })
          }
        }, { once: true })
      })
      
      // Track time on page
      window.addEventListener('beforeunload', () => {
        const timeSpent = Date.now() - startTime
        if (timeSpent > 5000) { // Only track if user spent more than 5 seconds
          window.gtag('event', 'user_engagement', {
            engagement_time_msec: timeSpent,
            event_category: 'User Engagement',
            event_label: 'time_on_page'
          })
        }
      })
    }

    // Track form submissions
    const trackFormSubmissions = () => {
      document.addEventListener('submit', (e) => {
        const form = e.target
        const formId = form.id || form.className || 'unknown_form'
        
        window.gtag('event', 'form_submit', {
          event_category: 'Form Interaction',
          event_label: formId,
          form_name: formId
        })
      })
    }

    // Track external link clicks
    const trackExternalLinks = () => {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a')
        if (link && link.hostname !== window.location.hostname) {
          window.gtag('event', 'external_link_click', {
            event_category: 'External Links',
            event_label: link.hostname,
            link_url: link.href
          })
        }
      })
    }

    // Track search queries
    const trackSearch = () => {
      const searchQuery = searchParams.get('q') || searchParams.get('search')
      if (searchQuery) {
        window.gtag('event', 'search', {
          event_category: 'Search',
          event_label: searchQuery,
          search_term: searchQuery
        })
      }
    }

    trackPageView()
    trackToolUsage()
    trackEngagement()
    trackFormSubmissions()
    trackExternalLinks()
    trackSearch()
  }, [pathname, searchParams])

  return null
}
