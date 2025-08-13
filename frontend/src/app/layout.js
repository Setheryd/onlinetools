import './styles/globals.css'
import './styles/layout.css'
import './styles/ui.css'
import WebVitals from './components/analytics/WebVitals'

export const metadata = {
  title: 'The Tool Guru - Free Online Tools & Utilities',
  description: 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
  keywords: 'online tools, base64, password generator, web utilities, free tools, developer tools, encoder, decoder, the tool guru',
  authors: [{ name: 'The Tool Guru' }],
  creator: 'The Tool Guru',
  publisher: 'The Tool Guru',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thetool.guru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The Tool Guru - Free Online Tools & Utilities',
    description: 'A collection of free online tools including base64 encoder/decoder, password generator, and more useful utilities for developers and professionals.',
    url: 'https://thetool.guru',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Profile_Photo.png',
        width: 1200,
        height: 630,
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
    images: ['/Brand_Assets/Profile_Photo.png'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PFK4LZLT');`
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q035RE4CRQ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q035RE4CRQ');
            `
          }}
        />
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
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="The Tool Guru" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-gray-50">
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
      </body>
    </html>
  )
}
