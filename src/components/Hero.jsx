import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Compass } from 'lucide-react';

export default function Hero() {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  // Fade up and in item variant
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white"
    >
      {/* 95% White Background with Subtle Radial Glow & Arabesque Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Gold Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent-saffron/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-accent-gold/[0.03] blur-[100px] pointer-events-none" />
        
        {/* Drifting Arabesque Grid Lines Overlay */}
        <motion.div 
          animate={{ 
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0] 
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-arabesque-pattern opacity-[0.4] pointer-events-none" 
        />
        
        {/* Subtle geometric framing line */}
        <div className="absolute left-6 right-6 top-24 bottom-6 border border-accent-gold/[0.05] pointer-events-none hidden md:block">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent-gold/20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent-gold/20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent-gold/20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent-gold/20" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Subheading */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-6 px-3 sm:px-4 py-1.5 rounded-lg sm:rounded-full bg-accent-light border border-accent-gold/15 max-w-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider sm:tracking-[0.25em] uppercase text-accent-gold text-center">
              Bridging Sacred Tradition with Modern Innovation
            </span>
          </motion.div>

          {/* Main Academic Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-2xl min-[360px]:text-[28px] min-[400px]:text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-charcoal tracking-tight leading-[1.15] max-w-4xl mb-6"
          >
            MAHLARATUSHADULIYYA <br />
            <span className="text-gradient-gold font-normal italic">CULTURAL FOUNDATION</span>
          </motion.h1>

          {/* Elegant Tagline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl font-serif italic text-mediumgray max-w-2xl mb-12 relative"
          >
            "Preserving Legacy. Empowering Futures."
            <span className="block w-12 h-[1px] bg-accent-gold/30 mx-auto mt-6" />
          </motion.p>

          {/* Minimal Call-To-Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-sm sm:max-w-none"
          >
            <a 
              href="#academics"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-accent-gold text-white font-medium text-sm tracking-widest uppercase hover:bg-accent-saffron transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-transparent border border-accent-gold text-accent-gold font-medium text-sm tracking-widest uppercase hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              <span>Our Vision</span>
            </a>
          </motion.div>

          {/* Arabic Typography Graphic Element (Elegant backdrop overlay) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-arabic text-[120px] select-none pointer-events-none text-accent-gold whitespace-nowrap hidden lg:block"
          >
            المدرسة الشاذلية
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Divider Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/15 to-transparent" />
    </section>
  );
}
