import './styles/globals.css'
import './styles/layout.css'
import './styles/ui.css'
import WebVitals from './components/analytics/WebVitals'
import EnhancedAnalytics from './components/analytics/EnhancedAnalytics'
import StructuredData from './components/StructuredData'
import Script from 'next/script'
import { Suspense } from 'react'

export const metadata = {
  title: 'The Tool Guru - Free Online Tools & Utilities',
  description: 'A comprehensive collection of free online tools including base64 encoder/decoder, password generator, image processors, calculators, and more useful utilities for developers and professionals. All tools are free to use with no registration required.',
  keywords: 'online tools, base64, password generator, web utilities, free tools, developer tools, encoder, decoder, the tool guru, calculators, image processing, text tools',
  authors: [{ name: 'The Tool Guru' }],
  creator: 'The Tool Guru',
  publisher: 'The Tool Guru',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thetool.guru'),
  openGraph: {
    title: 'The Tool Guru - Free Online Tools & Utilities',
    description: 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
    url: 'https://thetool.guru',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'The Tool Guru - Free Online Tools & Utilities',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Tool Guru - Free Online Tools & Utilities',
    description: 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
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
      'noarchive': false,
      'nositelinkssearchbox': false,
    },
    bingbot: {
      index: true,
      follow: true,
    }
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    bing: 'your-bing-verification-code',
    facebook: 'your-facebook-verification-code',
  },
  other: {
    // Schema.org structured data
    'application-name': 'The Tool Guru',
    'msapplication-TileColor': '#8B5CF6',
    'msapplication-config': '/browserconfig.xml',
    
    // Security headers
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Performance hints
    'dns-prefetch': '//www.google-analytics.com',
    'dns-prefetch': '//www.googletagmanager.com',
    'preconnect': 'https://fonts.googleapis.com',
    'preconnect': 'https://fonts.gstatic.com',
    
    // Social media enhancements
    'og:site_name': 'The Tool Guru',
    'og:locale': 'en_US',
    'og:type': 'website',
    
    // Additional verification codes
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
    
    // Content security policy
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;"
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PFK4LZLT');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Enhanced Google Analytics with IP Filtering */}
        <Script id="gtag-src" src="https://www.googletagmanager.com/gtag/js?id=G-Q035RE4CRQ" strategy="afterInteractive" />
        <Script id="gtag-inline" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            
            // Enhanced configuration with custom dimensions
            gtag('config', 'G-Q035RE4CRQ', {
              // Custom dimensions for better tracking
              custom_map: {
                'dimension1': 'user_type',
                'dimension2': 'tool_category',
                'dimension3': 'page_type'
              },
              // Enhanced ecommerce tracking
              send_page_view: true,
              // Debug mode for development
              debug_mode: ${process.env.NODE_ENV === 'development' ? 'true' : 'false'}
            });
            
            // Filter out internal traffic
            const internalIPs = ['127.0.0.1', '::1', 'localhost'];
            const currentIP = window.location.hostname;
            
            if (!internalIPs.includes(currentIP)) {
              // Set user type dimension
              gtag('event', 'set_user_property', {
                user_type: 'external_visitor'
              });
            }
          `}
        </Script>
        {/* End Google tag (gtag.js) */}



        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6750848330594832"
          crossOrigin="anonymous"
        />
        {/* End Google AdSense */}
        
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="The Tool Guru" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS Prefetch and Preconnect for Performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PFK4LZLT"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <WebVitals />
        <Suspense fallback={null}>
          <EnhancedAnalytics />
        </Suspense>
        <StructuredData 
          type="website" 
          data={{
            name: "The Tool Guru",
            description: "A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.",
            url: "https://thetool.guru"
          }}
        />
        <StructuredData 
          type="organization" 
          data={{
            name: "The Tool Guru",
            description: "A collection of free online tools and utilities for developers and professionals.",
            url: "https://thetool.guru"
          }}
        />
      </body>
    </html>
  )
}
