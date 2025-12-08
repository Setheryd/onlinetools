import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UuidGeneratorTool from '../../components/tools/UuidGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'UUID Generator — The Tool Guru',
  description: 'Generate RFC 4122 v4 UUIDs. Free online UUID generator tool.',
  keywords: ['uuid', 'guid', 'generator', 'rfc4122', 'unique id', 'online tool'],
  openGraph: {
    title: 'UUID Generator — The Tool Guru',
    description: 'Generate RFC 4122 v4 UUIDs.',
  },
}

const UuidGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <UuidGeneratorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="UUID Generator"
            description="Generate RFC 4122 compliant UUIDs (Universally Unique Identifiers) instantly. UUIDs are 128-bit identifiers that are guaranteed to be unique across time and space, making them perfect for database primary keys, distributed systems, API identifiers, and any application requiring unique identifiers without central coordination."
            features={[
              "Generate RFC 4122 version 4 (random) UUIDs",
              "Cryptographically secure random number generation",
              "Generate single or multiple UUIDs at once",
              "Copy UUIDs to clipboard with one click",
              "Standard UUID format (8-4-4-4-12 hexadecimal format)",
              "Guaranteed uniqueness across all generated UUIDs",
              "No registration or coordination required",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Click 'Generate UUID' to create a new random UUID",
              "The UUID will be displayed in standard format (e.g., 550e8400-e29b-41d4-a716-446655440000)",
              "Use the copy button to copy the UUID to your clipboard",
              "Generate multiple UUIDs if you need several unique identifiers",
              "Each generated UUID is guaranteed to be unique",
              "Use the UUIDs directly in your applications, databases, or APIs"
            ]}
            useCases={[
              "Create unique primary keys for database records",
              "Generate unique identifiers for distributed systems",
              "Create unique IDs for API endpoints and resources",
              "Generate unique identifiers for file uploads and storage",
              "Create unique session IDs and transaction identifiers",
              "Generate unique identifiers for microservices and containers",
              "Create unique IDs for user accounts and profiles",
              "Generate unique identifiers for event tracking and analytics"
            ]}
            tips={[
              "UUIDs are 128 bits long and represented as 32 hexadecimal digits in 5 groups",
              "Version 4 UUIDs use random numbers, ensuring no collisions",
              "UUIDs are case-insensitive but typically displayed in lowercase",
              "Store UUIDs as strings or binary data depending on your database",
              "Use UUIDs when you need globally unique identifiers without a central authority",
              "Consider using UUIDs for distributed systems where sequential IDs won't work",
              "UUIDs are larger than sequential integers, so consider storage implications"
            ]}
            faq={[
              {
                question: "What is a UUID?",
                answer: "A UUID (Universally Unique Identifier) is a 128-bit identifier standardized by RFC 4122. Version 4 UUIDs use random numbers, ensuring uniqueness without coordination."
              },
              {
                question: "Are UUIDs really unique?",
                answer: "While collisions are theoretically possible, the probability is astronomically low (about 1 in 5.3 × 10^36). For practical purposes, UUIDs can be considered unique."
              },
              {
                question: "What's the difference between UUID and GUID?",
                answer: "UUID and GUID (Globally Unique Identifier) are essentially the same thing. GUID is Microsoft's term for UUID, but they follow the same RFC 4122 standard."
              },
              {
                question: "Can I use UUIDs as database primary keys?",
                answer: "Yes, UUIDs are commonly used as primary keys, especially in distributed systems. However, they're larger than integers and may impact performance in some databases, so consider your specific use case."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default UuidGeneratorPage;


