import './globals.css'

export const metadata = {
  title: 'Online Tools - Free Web Utilities',
  description: 'A collection of free online tools including base64 encoder/decoder, PDF merger, and more useful utilities.',
  keywords: 'online tools, base64, pdf merger, web utilities, free tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Online Tools</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-500 hover:text-gray-900">Home</a>
                <a href="/tools" className="text-gray-500 hover:text-gray-900">Tools</a>
                <a href="/blog" className="text-gray-500 hover:text-gray-900">Blog</a>
              </nav>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-500">© 2024 Online Tools. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
