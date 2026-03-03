import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JwtDecoderTool from '../../components/tools/JwtDecoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'JWT Decoder — The Tool Guru',
  description: 'Decode JSON Web Tokens to view header and payload. No verification performed.',
  keywords: ['jwt', 'decoder', 'json web token', 'decode jwt', 'header', 'payload'],
  alternates: {
    canonical: 'https://thetool.guru/tools/jwt-decoder',
  },
  openGraph: {
    title: 'JWT Decoder — The Tool Guru',
    description: 'Decode JSON Web Tokens to view header and payload. No verification performed.',
    url: 'https://thetool.guru/tools/jwt-decoder',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'JWT Decoder — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder — The Tool Guru',
    description: 'Decode JSON Web Tokens to view header and payload. No verification performed.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const JwtDecoderPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <JwtDecoderTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="JWT Decoder"
          description="Decode JSON Web Tokens to view header and payload. JWTs are base64url-encoded; this tool decodes and pretty-prints the JSON. No verification or signature check—use for inspection and debugging only. All processing in your browser."
          features={[
            "Decode JWT header and payload",
            "Pretty-print JSON",
            "Show standard claims (exp, iat, sub, etc.)",
            "Copy decoded JSON",
            "Works in your browser"
          ]}
          howToUse={[
            "Paste a JWT (header.payload.signature)",
            "View decoded header and payload",
            "Check claims and expiry",
            "Copy if needed"
          ]}
          useCases={[
            "Debug auth tokens",
            "Inspect claims and expiry",
            "Understand API or OAuth tokens",
            "Verify token structure"
          ]}
          tips={[
            "This tool does not verify the signature. Never trust decoded content for security decisions without verification.",
            "exp = expiry (Unix time), iat = issued at, sub = subject."
          ]}
          faq={[
            { question: "Does this verify the JWT?", answer: "No. The tool only decodes and displays the payload. It does not check the signature or validate the token. Use for inspection and debugging only." },
            { question: "Is my token sent to a server?", answer: "No. Decoding runs in your browser. The JWT never leaves your device." },
            { question: "What are common JWT claims?", answer: "exp (expiry), iat (issued at), sub (subject), iss (issuer), aud (audience). Many APIs add custom claims." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="jwt-decoder" />
    </Body>
    <Footer />
  </div>
);

export default JwtDecoderPage;
