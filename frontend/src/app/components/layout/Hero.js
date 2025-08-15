'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { getBuiltTools } from '@/lib/tools';

const Hero = () => {
  const toolsCount = getBuiltTools().length;
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Generate particle positions once, outside of render cycle
  const particles = React.useMemo(() => {
    // Use deterministic values to avoid hydration mismatch
    const positions = [
      { left: '10%', top: '20%', delay: '0.5s', duration: '4s' },
      { left: '85%', top: '15%', delay: '1.2s', duration: '5s' },
      { left: '25%', top: '80%', delay: '0.8s', duration: '6s' },
      { left: '70%', top: '60%', delay: '2.1s', duration: '3.5s' },
      { left: '45%', top: '30%', delay: '1.5s', duration: '4.5s' },
      { left: '90%', top: '85%', delay: '0.3s', duration: '5.5s' },
      { left: '15%', top: '45%', delay: '2.8s', duration: '4.2s' },
      { left: '60%', top: '10%', delay: '1.8s', duration: '6.2s' },
      { left: '35%', top: '70%', delay: '0.7s', duration: '3.8s' },
      { left: '80%', top: '40%', delay: '2.3s', duration: '5.8s' },
      { left: '5%', top: '90%', delay: '1.1s', duration: '4.7s' },
      { left: '95%', top: '25%', delay: '0.9s', duration: '6.5s' },
      { left: '50%', top: '55%', delay: '2.6s', duration: '3.3s' },
      { left: '20%', top: '35%', delay: '1.4s', duration: '5.1s' },
      { left: '75%', top: '75%', delay: '0.6s', duration: '4.9s' },
      { left: '40%', top: '5%', delay: '2.9s', duration: '6.8s' },
      { left: '65%', top: '95%', delay: '1.7s', duration: '3.1s' },
      { left: '30%', top: '50%', delay: '0.4s', duration: '5.3s' },
      { left: '55%', top: '65%', delay: '2.4s', duration: '4.6s' },
      { left: '10%', top: '80%', delay: '1.9s', duration: '6.1s' }
    ];
    
    return positions.map((pos, i) => ({
      id: i,
      left: pos.left,
      top: pos.top,
      animationDelay: pos.delay,
      animationDuration: pos.duration
    }));
  }, []);

  useEffect(() => {
    setIsVisible(true);
    
    let timeoutId;
    const handleMouseMove = (e) => {
      // Throttle mouse movement updates to reduce jarring effect
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }, 50); // Update every 50ms instead of on every mouse movement
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white/5 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 transition-all duration-300 ease-out" style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05) 0%, transparent 80%)`
          }}></div>
        </div>
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="text-center">
          {/* Animated Badge */}
          <div className={`inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-blue-100 mb-8 border border-white/20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="mr-2">✨</span>
            {toolsCount}+ Free Tools Available
            <span className="ml-2">✨</span>
          </div>

          {/* Main Heading with Advanced Typography */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block">Free Online Tools</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 animate-gradient-x">
              from The Tool Guru
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className={`text-xl md:text-2xl lg:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Powerful, fast, and completely free utilities to help you with everyday tasks. 
            <span className="block mt-2 text-lg md:text-xl text-blue-200">
              No registration required • No data collection • Just simple tools that work
            </span>
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/tools">
              <Button 
                variant="primary" 
                size="lg" 
                className="px-10 py-5 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="mr-2">🚀</span>
                Explore Tools
                <span className="ml-2">→</span>
              </Button>
            </Link>
            <Link href="/blog">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-5 text-xl font-bold border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/25"
              >
                <span className="mr-2">📚</span>
                Read Blog
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
          
          {/* Enhanced Stats with Hover Effects */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">{toolsCount}</div>
              <div className="text-blue-200 text-sm md:text-base font-medium">Free Tools</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-green-300 transition-colors duration-300">10K+</div>
              <div className="text-blue-200 text-sm md:text-base font-medium">Happy Users</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">99.9%</div>
              <div className="text-blue-200 text-sm md:text-base font-medium">Uptime</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">24/7</div>
              <div className="text-blue-200 text-sm md:text-base font-medium">Available</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col items-center text-blue-200">
              <span className="text-sm font-medium mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-blue-200 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-blue-200 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-20 text-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
            </linearGradient>
          </defs>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="url(#waveGradient)"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="url(#waveGradient)"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="url(#waveGradient)"></path>
        </svg>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
