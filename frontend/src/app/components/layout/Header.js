'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { TOOLS, TOOL_CATEGORIES } from '@/lib/tools';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const navigation = [
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const enabledToolIds = ['base64'];
  const visibleTools = useMemo(() => TOOLS.filter(t => enabledToolIds.includes(t.id)), []);
  const categoriesInUse = useMemo(() => {
    const map = {};
    visibleTools.forEach(tool => {
      const category = tool.category || 'Other';
      if (!map[category]) map[category] = [];
      map[category].push(tool);
    });
    return map;
  }, [visibleTools]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold" style={{ color: '#3A7BD5' }}>OnlineTools</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {/* Tools dropdown trigger */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                setIsToolsOpen(true);
              }}
              onMouseLeave={() => {
                closeTimerRef.current = setTimeout(() => setIsToolsOpen(false), 200);
              }}
            >
              <button
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                  isToolsOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                aria-haspopup="true"
                aria-expanded={isToolsOpen}
              >
                Tools
                <span className={`ml-1 inline-block transition-transform ${isToolsOpen ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </button>

              {isToolsOpen && (
                <div className="dropdown-menu absolute left-0 top-full w-[520px] lg:w-[720px] bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(categoriesInUse).map(([category, tools]) => (
                        <div key={category} className="">
                          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">{category}</div>
                          <ul className="space-y-1">
                            {tools.map(tool => (
                              <li key={tool.id}>
                                <Link
                                  href={tool.url}
                                  className="group flex items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-base">{tool.icon}</span>
                                    {tool.name}
                                  </span>
                                  <span className="opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity">→</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 p-3 flex items-center justify-between bg-gray-50 rounded-b-lg">
                    <span className="text-xs text-gray-500">More tools coming soon</span>
                    <Link href="/tools" className="text-xs font-medium text-blue-600 hover:text-blue-700">View all tools</Link>
                  </div>
                </div>
              )}
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link href="/tools">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

          {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                {/* Mobile Tools collapsible */}
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileToolsOpen(prev => !prev)}
                >
                  <span>Tools</span>
                  <span className={`transition-transform ${isMobileToolsOpen ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {isMobileToolsOpen && (
                  <div className="pl-3">
                    {Object.entries(categoriesInUse).map(([category, tools]) => (
                      <div key={category} className="mt-2">
                        <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{category}</div>
                        <ul className="space-y-1">
                          {tools.map(tool => (
                            <li key={tool.id}>
                              <Link
                                href={tool.url}
                                className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {tool.icon} <span className="ml-2">{tool.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="mt-3">
                      <Link
                        href="/tools"
                        className="block px-3 py-2 text-sm text-blue-600 hover:text-blue-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        View all tools
                      </Link>
                    </div>
                  </div>
                )}

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              <div className="pt-4">
                <Link href="/tools">
                  <Button variant="primary" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
