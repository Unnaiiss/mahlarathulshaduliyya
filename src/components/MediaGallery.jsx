import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getInstagramPostId } from '../firebase';

const defaultGalleryData = [
  {
    id: "1",
    title: 'The Living History',
    description: "Archival photos and biographical highlights of Kerala's historical scholars.",
    image: '/scholar_heritage.png',
  },
  {
    id: "2",
    title: 'Preserving the Written Word',
    description: 'Glimpses of rare Kitabs and historical manuscripts digitized for our library.',
    image: '/rare_manuscripts.png',
  },
  {
    id: "3",
    title: 'Mahlara in Action',
    description: 'Capturing the spiritual essence, prayers, and community gatherings.',
    image: '/spiritual_gathering.png',
  },
];

export default function MediaGallery({ galleryData }) {
  const navigate = useNavigate();
  const [activeMedia, setActiveMedia] = useState(null);
  const displayData = galleryData && galleryData.length > 0 ? galleryData : defaultGalleryData;

  // Scroll to top when page is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Body scroll locking when lightbox is active
  useEffect(() => {
    if (activeMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMedia]);

  // Key listeners (Escape key to close modal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMedia(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-28 pb-24 relative overflow-hidden"
    >
      {/* Background Graphic Ornaments */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-saffron/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 bg-arabesque-pattern opacity-[0.25] w-full h-[300px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Back Link */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-gold hover:text-accent-saffron transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </motion.button>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 text-left md:text-center">
          <span className="text-[11px] tracking-[0.25em] font-semibold text-accent-saffron uppercase block mb-3">
            Media & Heritage
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-bold tracking-tight mb-6">
            Foundation Archives
          </h1>
          <p className="text-mediumgray text-base leading-relaxed max-w-2xl mx-auto">
            Explore our curated catalog of lectures, historical manuscripts, educational publications, and spiritual gatherings captured over decades of operations.
          </p>
          
          <div className="w-16 h-[1px] bg-accent-gold/20 mx-auto mt-8" />
        </div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayData.map((item) => {
            const instagramId = getInstagramPostId(item.image);
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group flex flex-col"
              >
                <div 
                  onClick={() => setActiveMedia(item.image)}
                  className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden relative border border-gray-100 group-hover:border-accent-saffron group-hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {instagramId ? (
                    <>
                      <iframe
                        src={`https://www.instagram.com/p/${instagramId}/embed/`}
                        className="w-full h-full border-0 rounded-lg pointer-events-none"
                        scrolling="no"
                        allowtransparency="true"
                        title={`Instagram Gallery ${instagramId}`}
                      ></iframe>
                      {/* Invisible overlay blocker to capture clicks */}
                      <div className="absolute inset-0 z-20 bg-transparent" />
                    </>
                  ) : (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Premium Hover Overlay */}
                  <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none z-30">
                    <div className="w-10 h-10 rounded-full bg-white/95 text-accent-gold flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {instagramId ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#E1306C] ml-0.5">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Corner Accent Ornaments */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-white/95 text-[8px] tracking-wider text-accent-gold uppercase font-bold flex items-center gap-1 shadow-sm z-30">
                    {instagramId ? (
                      <>
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="w-3 h-3 text-[#E1306C]"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <span>Instagram</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Archive</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Text Meta Content */}
                <div className="mt-6 flex flex-col text-left">
                  <h3 className="text-lg font-serif font-semibold text-charcoal tracking-wide mb-2 group-hover:text-accent-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-mediumgray text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Viewer Modal */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setActiveMedia(null)}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
              onClick={() => setActiveMedia(null)}
              aria-label="Close viewer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Content Box */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg overflow-hidden flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {getInstagramPostId(activeMedia) ? (
                <div className="w-full max-w-[420px] aspect-[4/5] bg-white rounded-lg shadow-2xl overflow-hidden relative border border-white/10">
                  <iframe
                    src={`https://www.instagram.com/p/${getInstagramPostId(activeMedia)}/embed/`}
                    className="w-full h-full border-0"
                    scrolling="no"
                    allowtransparency="true"
                    title={`Instagram Gallery Lightbox ${getInstagramPostId(activeMedia)}`}
                  ></iframe>
                </div>
              ) : (
                <img
                  src={activeMedia}
                  alt="Enlarged Archive"
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/5 bg-charcoal"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
