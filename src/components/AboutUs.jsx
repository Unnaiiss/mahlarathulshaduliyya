import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AboutUs({ aboutData }) {
  const navigate = useNavigate();

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const milestones = aboutData?.milestones || [];
  const pillars = aboutData?.pillars || [];

  const getPillarIcon = (iconName) => {
    switch (iconName) {
      case 'book':
        return (
          <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        );
      case 'quill':
        return (
          <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.263 15.541A22.883 22.883 0 0112 14.542c2.68 0 5.277.26 7.794.757m-15.53 1.156A22.95 22.95 0 0012 15.542m-7.794 1.156A22.95 22.95 0 0112 15.542m0 0c.08-.03.16-.06.24-.08m-1.12.08a23.22 23.22 0 01-7.794-1.156M12 15.542c-.08-.03-.16-.06-.24-.08m1.12.08a23.22 23.22 0 007.794-1.156M4.263 15.541a22.953 22.953 0 013.437-10.052A22.923 22.923 0 0112 4.542c1.47 0 2.87.14 4.3.408a22.922 22.922 0 013.438 10.59m-15.53 1.156a22.952 22.952 0 003.437 10.052m0 0a22.923 22.923 0 007.794 1.156m0 0a22.923 22.923 0 007.794-1.156m0 0A22.952 22.952 0 0019.794 17.85" />
          </svg>
        );
      case 'spiritual':
        return (
          <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
          </svg>
        );
      case 'globe':
      default:
        return (
          <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 018.716 2.253M12 3a9.004 9.004 0 00-8.716 2.253" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#FDFBF7] min-h-screen pt-28 pb-24 relative overflow-hidden"
    >
      {/* Visual Ornament Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent-saffron/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-accent-gold/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 bg-arabesque-pattern opacity-[0.2] h-[350px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb Back */}
        <motion.button 
          variants={itemVariants}
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }} 
          className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-widest text-accent-gold uppercase hover:text-accent-saffron transition-all mb-8 group"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent-gold group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Home</span>
        </motion.button>

        {/* Header Block */}
        <motion.div variants={itemVariants} className="max-w-3xl mb-16 text-left">
          <span className="text-[11px] tracking-[0.25em] font-semibold text-accent-saffron uppercase block mb-3">
            Heritage & Legacy
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-charcoal font-bold tracking-tight mb-6">
            About the Foundation
          </h1>
          <p className="text-base text-mediumgray leading-relaxed">
            Bridging sacred tradition with modern innovation. Discover our history, mission, core pillars of work, and key milestones.
          </p>
        </motion.div>

        {/* Section 1: Our Story */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24"
        >
          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-bold tracking-tight">
              Our Journey & Heritage
            </h2>
            <div className="w-12 h-[1px] bg-accent-gold/40" />
            <p className="text-mediumgray text-base leading-relaxed whitespace-pre-line">
              {aboutData?.story || 'Loading foundation story...'}
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Elegant framing logo display */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center rounded-full border border-accent-gold/20 bg-white shadow-md p-6 overflow-hidden">
              <div className="absolute inset-2 rounded-full border border-dashed border-accent-gold/30 opacity-60 z-10 pointer-events-none" />
              <img 
                src="/logo.png" 
                alt="Mahlaratushaduliyya Logo" 
                className="w-4/5 h-4/5 object-contain relative z-0"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 2: Mission & Vision */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {/* Mission */}
          <div className="bg-white p-8 rounded-lg border border-accent-gold/15 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-accent-gold" />
            <h3 className="text-xl font-serif text-charcoal font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Our Mission</span>
            </h3>
            <p className="text-mediumgray text-sm leading-relaxed">
              {aboutData?.mission || 'Loading mission statement...'}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-lg border border-accent-gold/15 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-accent-saffron" />
            <h3 className="text-xl font-serif text-charcoal font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Our Vision</span>
            </h3>
            <p className="text-mediumgray text-sm leading-relaxed">
              {aboutData?.vision || 'Loading vision statement...'}
            </p>
          </div>
        </motion.div>

        {/* Section 3: Pillars of MCF */}
        <motion.div variants={itemVariants} className="mb-24 text-left">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-accent-gold uppercase block mb-2">
              Strategic Focus
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-bold tracking-tight">
              Pillars of the Foundation
            </h2>
            <p className="text-sm text-mediumgray mt-3">
              The cornerstone fields of action defining our daily efforts to sustain traditional wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded border border-gray-200 hover:border-accent-gold transition-all duration-300 shadow-sm flex flex-col gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-light border border-accent-gold/25 flex items-center justify-center shrink-0">
                  {getPillarIcon(p.icon)}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal mb-2">{p.title}</h4>
                  <p className="text-xs text-mediumgray leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 4: Timeline Milestones */}
        <motion.div variants={itemVariants} className="text-left">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-accent-gold uppercase block mb-2">
              Historical Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-bold tracking-tight">
              Key Foundation Milestones
            </h2>
            <p className="text-sm text-mediumgray mt-3">
              Trace our institutional development and historical events since inception.
            </p>
          </div>

          {/* Timeline list */}
          <div className="relative border-l border-accent-gold/25 pl-6 sm:pl-8 space-y-12 max-w-4xl">
            {milestones.map((item, index) => (
              <div key={index} className="relative">
                {/* Gold Circle Indicator */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-accent-gold bg-[#FDFBF7] flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-saffron animate-pulse" />
                </div>
                
                {/* Timeline Box Content */}
                <div className="bg-white p-6 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative">
                  <span className="absolute -top-3.5 right-6 px-3 py-0.5 rounded bg-accent-gold text-white font-serif font-bold text-xs shadow-sm">
                    {item.year}
                  </span>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-charcoal mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-mediumgray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
