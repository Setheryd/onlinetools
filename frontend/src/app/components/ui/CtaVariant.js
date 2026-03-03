'use client';

import React, { useState, useEffect } from 'react';

/**
 * Renders one of two CTA variants (A or B) with stable assignment per session.
 * Use for A/B testing CTA copy; assign storageKey per placement (e.g. "related-tools-heading").
 * Optional: send variant to analytics on mount (e.g. gtag or GA4).
 * @param {{ variantA: React.ReactNode, variantB: React.ReactNode, storageKey: string }} props
 */
export default function CtaVariant({ variantA, variantB, storageKey = 'cta-variant' }) {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    const key = `cta_${storageKey}`;
    let value = null;
    try {
      value = sessionStorage.getItem(key);
    } catch (_) {}
    if (value !== 'A' && value !== 'B') {
      value = Math.random() < 0.5 ? 'A' : 'B';
      try {
        sessionStorage.setItem(key, value);
      } catch (_) {}
    }
    setVariant(value);
    // Optional: report to GA for A/B analysis
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', 'cta_variant_view', { variant: value, placement: storageKey });
    // }
  }, [storageKey]);

  if (variant === null) {
    return <>{variantA}</>;
  }
  return <>{variant === 'A' ? variantA : variantB}</>;
}
