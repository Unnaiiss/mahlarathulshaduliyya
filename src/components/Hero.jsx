import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Users } from 'lucide-react';

export default function Hero({ eventData }) {
  // Extract slideshow images from eventData
  const rawSlides = eventData?.heroImages || [];
  const slides = rawSlides.filter(img => img && img.trim() !== "");
  
  // Fallback to heroBgImage or static default photos if slideshow is empty
  const activeSlides = slides.length > 0 
    ? slides 
    : (eventData?.heroBgImage 
        ? [eventData.heroBgImage] 
        : ["/spiritual_gathering.png", "/uroos_poster.png", "/uroos_gathering.png"]
      );

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 4 seconds (4000ms)
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  // Ensure index remains in bounds if activeSlides length changes dynamically
  useEffect(() => {
    if (currentSlide >= activeSlides.length) {
      setCurrentSlide(0);
    }
  }, [activeSlides.length, currentSlide]);

  // Stagger animation container for left column
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Fade up and in item variant for left column
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] md:min-h-[80vh] lg:min-h-[85vh] xl:min-h-[90vh] flex flex-col md:flex-row items-stretch overflow-hidden bg-white text-charcoal border-b border-accent-gold/10"
    >
      
      {/* LEFT COLUMN: TEXT CONTENT (50% Width on MD+) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 xl:px-20 z-10 relative bg-white">
        
        {/* Drifting Arabesque Grid Lines Overlay (Subtle background decoration in light mode) */}
        <motion.div 
          animate={{ 
            x: [0, 5, -5, 0],
            y: [0, -5, 5, 0] 
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-arabesque-pattern pointer-events-none opacity-[0.08]" 
        />

        {/* Soft Gold Glow behind text */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-accent-gold/[0.02] blur-[80px] pointer-events-none" />

        {/* Content Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-start text-left max-w-xl md:max-w-none w-full mx-auto"
        >
          {/* Subheading */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-gold/15 max-w-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider sm:tracking-[0.18em] uppercase text-accent-gold">
              Bridging Sacred Tradition with Modern Innovation
            </span>
          </motion.div>

          {/* Main Academic Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold font-serif tracking-tight leading-[1.2] mb-6 text-charcoal"
          >
            MAHLARATUSHADULIYYA <br />
            <span className="text-gradient-gold font-normal italic">CULTURAL FOUNDATION</span>
          </motion.h1>

          {/* Elegant Tagline */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg font-serif italic text-mediumgray mb-8"
          >
            "Preserving Legacy. Empowering Futures."
            <span className="block w-12 h-[1px] bg-accent-gold/25 mt-5" />
          </motion.p>

          {/* Call-To-Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a 
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-accent-gold text-white font-medium text-xs tracking-widest uppercase hover:bg-accent-saffron transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 text-center"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-transparent border border-accent-gold text-accent-gold font-medium text-xs tracking-widest uppercase transition-all duration-300 hover:bg-accent-light hover:-translate-y-0.5 text-center"
            >
              <Users className="w-4 h-4" />
              <span>About Us</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: DYNAMIC SLIDESHOW (50% Width on MD+) */}
      <div className="w-full md:w-1/2 relative min-h-[320px] sm:min-h-[400px] md:min-h-auto overflow-hidden bg-gray-50 flex-grow border-t md:border-t-0 md:border-l border-accent-gold/10">
        
        {/* Slideshow Image Component */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={activeSlides[currentSlide]}
              alt={`Slide Image ${currentSlide + 1}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover origin-center"
            />
          </AnimatePresence>
        </div>

        {/* Premium Light-Themed Overlay & Blends */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-white/60 via-transparent to-white/10 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/10 to-transparent hidden md:block pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/60 via-transparent to-transparent md:hidden pointer-events-none" />
        
        {/* Radial light protection to soft fade borders */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(255,255,255,0.4)_95%)] pointer-events-none" />

        {/* Slideshow Progress Indicator Dots */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide 
                    ? 'bg-accent-gold w-5' 
                    : 'bg-charcoal/30 hover:bg-charcoal/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Decorative Bottom Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white via-accent-gold/15 to-white z-25" />
    </section>
  );
}
