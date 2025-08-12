import './styles/globals.css'
import './styles/layout.css'
import './styles/ui.css'

export const metadata = {
  title: 'Online Tools - Free Web Utilities',
  description: 'A collection of free online tools including base64 encoder/decoder, PDF merger, and more useful utilities.',
  keywords: 'online tools, base64, pdf merger, web utilities, free tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
