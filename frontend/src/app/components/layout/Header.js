'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { getBuiltTools, searchTools } from '@/lib/tools';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const closeTimerRef = useRef(null);
  const searchTimerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    if (searchQuery.trim().length > 0) {
      searchTimerRef.current = setTimeout(() => {
        const results = searchTools(searchQuery);
        setSearchResults(results.slice(0, 8)); // Limit to 8 results for better UX
        setIsSearchOpen(true);
      }, 150); // Debounce search by 150ms
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !isSearchOpen) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const navigation = [
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const visibleTools = useMemo(() => getBuiltTools(), []);
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
    <>
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="mr-2 rounded-xl p-[2px] transition-transform duration-200 group-hover:scale-105">
                <img 
                  src="/Brand_Assets/Logo.webp" 
                  alt="The Tool Guru logo" 
                  width="32"
                  height="32"
                  className="h-8 w-8 rounded-lg bg-white"
                />
              </span>
              <span 
                className="text-2xl font-extrabold tracking-tight leading-none transition-opacity duration-200 group-hover:opacity-90"
                style={{ 
                  fontFamily: "'Sora', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial",
                  background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 50%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                The Tool Guru
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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
                <div className="dropdown-menu absolute left-1/2 top-full -translate-x-1/2 transform w-[min(100vw-1rem,80rem)] max-w-[calc(100vw-1rem)] max-h-[70vh] overflow-auto bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {Object.entries(categoriesInUse).map(([category, tools]) => (
                        <div key={category} className="">
                          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">{category}</div>
                          <ul className="space-y-1">
                            {tools.slice(0, 5).map(tool => (
                              <li key={tool.id}>
                                <Link
                                  href={tool.path}
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

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Expandable Search */}
            <div className="relative">
              <div 
                className={`flex items-center transition-all duration-300 ease-in-out ${
                  isSearchOpen ? 'w-64' : 'w-8'
                }`}
                style={{
                  background: isSearchOpen ? 'white' : '#f3f4f6',
                  borderRadius: '20px',
                  border: isSearchOpen ? '1px solid #e5e7eb' : 'none',
                  boxShadow: isSearchOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                <button
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    if (!isSearchOpen) {
                      setTimeout(() => searchInputRef.current?.focus(), 100);
                    }
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-colors group flex-shrink-0"
                  style={{
                    background: isSearchOpen ? 'transparent' : '#f3f4f6',
                    margin: isSearchOpen ? '2px' : '0'
                  }}
                  title="Search tools (Press / to focus)"
                >
                  <svg 
                    className="h-4 w-4 transition-colors" 
                    style={{
                      color: isSearchOpen ? '#6b7280' : '#9ca3af'
                    }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                {isSearchOpen && (
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.trim().length > 0 && setIsSearchOpen(true)}
                    onBlur={() => {
                      setTimeout(() => {
                        if (searchQuery.trim().length === 0) {
                          setIsSearchOpen(false);
                        }
                      }, 200);
                    }}
                    className="flex-1 px-2 py-1 text-sm bg-transparent border-none outline-none placeholder-gray-400"
                    placeholder="Search tools..."
                    style={{ color: '#374151' }}
                  />
                )}
                
                {isSearchOpen && searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors mr-1"
                  >
                    <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div 
                  className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto"
                  style={{
                    width: '320px',
                    animation: 'fadeInDown 0.2s ease-out'
                  }}
                >
                  <div className="py-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quick Search
                    </div>
                    {searchResults.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        className="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors group"
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchOpen(false);
                        }}
                      >
                        <span className="text-lg mr-3 group-hover:scale-110 transition-transform">{tool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {tool.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {tool.description}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 capitalize bg-gray-100 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </Link>
                    ))}
                    {searchResults.length === 8 && (
                      <div className="px-3 py-2 border-t border-gray-100">
                        <Link
                          href={`/tools?search=${encodeURIComponent(searchQuery)}`}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                          onClick={() => {
                            setSearchQuery('');
                            setIsSearchOpen(false);
                          }}
                        >
                          View all results for "{searchQuery}" →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* No Results */}
              {isSearchOpen && searchQuery.trim().length > 0 && searchResults.length === 0 && (
                <div 
                  className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                  style={{
                    width: '320px',
                    animation: 'fadeInDown 0.2s ease-out'
                  }}
                >
                  <div className="px-4 py-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">No tools found</p>
                    <p className="text-xs text-gray-400 mb-3">Try searching for "pdf", "password", or "qr"</p>
                    <Link
                      href="/tools"
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                    >
                      Browse all tools →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href="/tools">
              <Button variant="primary" size="sm" className="text-sm px-4 py-1.5">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
          <div className="md:hidden" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
                    placeholder="🔍 Search tools..."
                  />
                </div>
                
                {/* Mobile Search Results */}
                {searchQuery.trim().length > 0 && (
                  <div className="mt-3 space-y-1 max-h-60 overflow-y-auto">
                    {searchResults.slice(0, 4).map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        className="flex items-center px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                        onClick={() => {
                          setSearchQuery('');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <span className="text-lg mr-3 group-hover:scale-110 transition-transform">{tool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{tool.name}</div>
                          <div className="text-xs text-gray-500 truncate">{tool.description}</div>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </Link>
                    ))}
                    {searchResults.length > 4 && (
                      <Link
                        href={`/tools?search=${encodeURIComponent(searchQuery)}`}
                        className="block px-3 py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                        onClick={() => {
                          setSearchQuery('');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        View all results ({searchResults.length}) →
                      </Link>
                    )}
                    {searchResults.length === 0 && (
                      <div className="px-3 py-4 text-center">
                        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-500">No tools found</p>
                        <p className="text-xs text-gray-400 mt-1">Try "pdf" or "password"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
                {/* Mobile Tools collapsible */}
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileToolsOpen(prev => !prev)}
                >
                  <span>Tools</span>
                  <span className={`transition-transform duration-200 ${isMobileToolsOpen ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {isMobileToolsOpen && (
                  <div className="pl-3 pb-4">
                    {Object.entries(categoriesInUse).map(([category, tools]) => (
                      <div key={category} className="mt-2">
                        <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{category}</div>
                        <ul className="space-y-1">
                          {tools.slice(0, 5).map(tool => (
                            <li key={tool.id}>
                              <Link
                                href={tool.path}
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
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6750848330594832"
     crossorigin="anonymous"></script>
      <meta name="google-adsense-account" content="ca-pub-6750848330594832"></meta>
    </header>
    </>
  );
};

export default Header;
