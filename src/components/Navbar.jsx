import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Academics', href: '#academics' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/');
      // Delay slightly to allow homepage mounting before scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-accent-saffron/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo and Brand Name (Click goes back to homepage) */}
          <div 
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-3 cursor-pointer"
          >
            {/* Logo Monogram Placeholder (SVG calligraphic gold mark) */}
            <div className="relative w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-accent-gold/40 bg-accent-light p-1 shrink-0">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full text-accent-gold" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                {/* Arabesque geometric medallion */}
                <circle cx="50" cy="50" r="45" strokeDasharray="3 3" className="opacity-60" />
                <polygon points="50,15 80,75 20,75" strokeWidth="1.5" className="opacity-50" />
                <polygon points="50,85 80,25 20,25" strokeWidth="1.5" className="opacity-50" />
                {/* Central elegant Arabic-inspired monogram character/shape */}
                <path 
                  d="M40 65 C 40 45, 50 35, 50 35 C 50 35, 60 45, 60 65" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <circle cx="50" cy="30" r="3" fill="currentColor" />
                <path d="M30 50 Q 50 60 70 50" strokeWidth="1.5" />
              </svg>
            </div>
            
            {/* Typography brand name */}
            <div className="flex flex-col">
              <span className="font-serif text-xs min-[360px]:text-sm min-[400px]:text-base md:text-lg tracking-wider text-charcoal font-semibold leading-tight whitespace-nowrap">
                Mahlaratushaduliyya
              </span>
              <span className="text-[7px] min-[360px]:text-[8px] min-[400px]:text-[9px] md:text-[10px] tracking-widest text-accent-gold font-medium uppercase whitespace-nowrap">
                Cultural Foundation
              </span>
            </div>
          </div>

          {/* Center/Right: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-sm tracking-widest uppercase font-medium text-charcoal/80 hover:text-accent-gold transition-colors duration-300 py-2 group"
              >
                {link.name}
                {/* Subtle under-line hover animation */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
            
            {/* Arabic / Language Toggle Button */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-charcoal/10 text-xs tracking-wider text-charcoal hover:bg-accent-light hover:border-accent-gold transition-all duration-300 ml-4">
              <Globe className="w-3.5 h-3.5 text-accent-gold" />
              <span>العربية</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-charcoal/80 hover:text-accent-gold focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-accent-saffron/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className="flex items-center justify-between text-sm tracking-widest uppercase font-medium text-charcoal hover:text-accent-gold py-2 transition-colors border-b border-gray-50"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-accent-gold/60" />
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 space-y-3"
              >
                <button className="flex items-center justify-center gap-2 w-full py-3 rounded border border-accent-gold/40 text-sm tracking-widest text-accent-gold font-medium hover:bg-accent-light transition-all">
                  <Globe className="w-4 h-4" />
                  <span>العربية (ARABIC)</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
