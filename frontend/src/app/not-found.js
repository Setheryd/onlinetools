import Link from 'next/link'
import { Button } from './components/ui/Button'

export const metadata = {
  title: 'Page Not Found - Online Tools',
  description: 'The page you are looking for could not be found. Browse our collection of free online tools.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              Go to Homepage
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500">
            Or try one of our popular tools:
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Link href="/tools/base64">
              <Button variant="outline" className="w-full">
                Base64 Encoder/Decoder
              </Button>
            </Link>
            <Link href="/tools/password-generator">
              <Button variant="outline" className="w-full">
                Password Generator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
