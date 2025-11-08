import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import JwtDecoderTool from '../../components/tools/JwtDecoderTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'JWT Decoder — The Tool Guru',
  description: 'Decode JSON Web Tokens to view header and payload. No verification performed.',
  keywords: ['jwt', 'decoder', 'json web token', 'decode jwt', 'header', 'payload'],
  openGraph: {
    title: 'JWT Decoder — The Tool Guru',
    description: 'Decode JSON Web Tokens to view header and payload.',
  },
}

const JwtDecoderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <JwtDecoderTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="JWT Decoder"
            description="Decode JSON Web Tokens (JWT) to view header and payload information. Our JWT decoder parses JWT tokens and displays the header (algorithm, token type) and payload (claims, user data) in a readable format. Perfect for debugging authentication tokens, understanding JWT structure, inspecting token claims, or learning how JWTs work. Note: This tool decodes but does not verify JWT signatures - it's for inspection purposes only."
            features={[
              "Decode JWT header and payload",
              "Display token information in readable JSON format",
              "Show algorithm and token type from header",
              "Display all claims and user data from payload",
              "Format JSON for easy reading",
              "Copy decoded information",
              "Handle standard JWT format",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Paste your JWT token in the input field",
              "Click 'Decode' to parse the token",
              "View the decoded header (algorithm, type)",
              "Review the decoded payload (claims, data)",
              "Inspect token expiration and other claims",
              "Copy decoded information if needed",
              "Use for debugging or learning JWT structure"
            ]}
            useCases={[
              "Debug authentication tokens",
              "Inspect JWT claims and user data",
              "Understand JWT structure and format",
              "Check token expiration and other claims",
              "Learn how JWTs work",
              "Troubleshoot authentication issues",
              "Verify token contents during development",
              "Inspect tokens for security analysis"
            ]}
            tips={[
              "JWTs consist of three parts: header.payload.signature",
              "The header contains algorithm and token type",
              "The payload contains claims (user data, expiration, etc.)",
              "This tool decodes but doesn't verify signatures",
              "Never share sensitive JWTs publicly",
              "Check expiration claims to see token validity",
              "Use for development and debugging purposes"
            ]}
            faq={[
              {
                question: "What is a JWT?",
                answer: "JWT (JSON Web Token) is a compact, URL-safe token format used for authentication and information exchange. It consists of three parts: header, payload, and signature, separated by dots."
              },
              {
                question: "Does this tool verify JWT signatures?",
                answer: "No, this tool only decodes JWTs to display their contents. It does not verify signatures or validate token authenticity. For verification, you need the secret key and proper verification tools."
              },
              {
                question: "Is it safe to decode JWTs?",
                answer: "Decoding JWTs is safe for inspection purposes, but be careful not to expose sensitive tokens publicly. The decoded information shows what's in the token, which may include user data."
              },
              {
                question: "What information is in a JWT payload?",
                answer: "JWT payloads typically contain claims like user ID, username, expiration time (exp), issued at time (iat), and other custom claims depending on the application."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default JwtDecoderPage;


