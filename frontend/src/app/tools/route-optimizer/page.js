import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RouteOptimizerTool from '../../components/tools/RouteOptimizerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'Route Optimizer — The Tool Guru',
  description: 'Paste multiple addresses and get the optimal visit order to save time and distance. See distance and time between each stop and a map. Perfect for deliveries, errands, and road trips.',
  keywords: ['route optimizer', 'delivery routes', 'multi-stop', 'route planning', 'addresses', 'best order', 'logistics', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/route-optimizer',
  },
  openGraph: {
    title: 'Route Optimizer — The Tool Guru',
    description: 'Paste multiple addresses and get the optimal visit order to save time and distance. See distance and time between each stop and a map.',
    url: 'https://thetool.guru/tools/route-optimizer',
    siteName: 'The Tool Guru',
    images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Route Optimizer — The Tool Guru' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Route Optimizer — The Tool Guru',
    description: 'Paste multiple addresses and get the optimal visit order to save time and distance.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const RouteOptimizerPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RouteOptimizerTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Route Optimizer"
          description="Enter 2–25 addresses (one per line) and get the best order to visit them to minimize driving time and distance. Uses geocoding and OpenStreetMap routing. You can choose to return to the start (round trip) or fix the first address as your start and end. The report shows the ordered list, distance and time for each leg, totals, and a map with stop markers."
          features={[
            'Paste 2–25 addresses (one per line)',
            'Optional round trip (return to start)',
            'Optional “start at first address” to fix start/end',
            'Optimal visit order to minimize time and distance',
            'Distance and time between each step',
            'Total miles and total time',
            'Interactive map with stop markers and route line',
          ]}
          howToUse={[
            'Paste or type addresses, one per line (2–25 addresses)',
            'Check “Return to start” if you want to end where you started',
            'Check “Start at first address” to keep the first address as start (and end if round trip)',
            'Click Optimize route',
            'Wait for the result (may take up to a minute for many stops)',
            'Review the ordered list, legs, totals, and map',
          ]}
          useCases={[
            'Delivery and pickup route planning',
            'Errand runs with multiple stops',
            'Road trip waypoint order',
            'Sales or service visit scheduling',
            'Multi-stop logistics',
          ]}
          tips={[
            'Use full addresses (street, city, state/region, country) for better geocoding.',
            'Rates are limited to 20 requests per minute per IP; if you see “Too many requests,” wait a minute.',
            'For 20+ stops, the request can take 30–60 seconds.',
          ]}
        />
      </div>
      <CommentSection toolId="route-optimizer" toolName="Route Optimizer" />
      <RelatedToolsSection toolId="route-optimizer" />
    </Body>
    <Footer />
  </div>
);

export default RouteOptimizerPage;
