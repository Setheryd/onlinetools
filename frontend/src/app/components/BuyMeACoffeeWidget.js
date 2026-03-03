'use client'

import { useEffect } from 'react'

const BMC_SCRIPT_URL = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js'

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    console.log('[BMC] useEffect ran, document:', !!document)
    if (typeof document === 'undefined') return

    const existing = document.querySelector('script[data-name="BMC-Widget"]')
    if (existing) {
      console.log('[BMC] Widget script already in DOM, skipping')
      return
    }

    const script = document.createElement('script')
    script.setAttribute('data-name', 'BMC-Widget')
    script.setAttribute('data-cfasync', 'false')
    script.setAttribute('data-id', 'thetoolguru')
    script.setAttribute('data-description', 'Support me on Buy me a coffee!')
    script.setAttribute('data-message', 'Thanks for stopping by. If these tools helped, a coffee would mean a lot — no pressure.')
    script.setAttribute('data-color', '#BD5FFF')
    script.setAttribute('data-position', 'Right')
    script.setAttribute('data-x_margin', '18')
    script.setAttribute('data-y_margin', '18')
    script.src = BMC_SCRIPT_URL
    script.async = true

    script.onload = () => {
      console.log('[BMC] Script loaded successfully', script.getAttribute('data-id'))
    }
    script.onerror = (e) => {
      console.error('[BMC] Script failed to load', e)
    }

    document.body.appendChild(script)
    console.log('[BMC] Script appended to body', script.outerHTML?.slice(0, 200))
  }, [])

  return null
}
