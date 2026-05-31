import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Image as ImageIcon } from 'lucide-react';
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

export default function Gallery({ galleryData }) {
  const navigate = useNavigate();
  const [activeMedia, setActiveMedia] = useState(null);
  
  const displayData = galleryData && galleryData.length > 0 ? galleryData : defaultGalleryData;
  const highlightedData = displayData.filter(item => item.showOnHome);
  const slicedData = (highlightedData.length > 0 ? highlightedData : displayData).slice(0, 2);

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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      id="gallery" 
      className="py-24 bg-gray-50/50 border-t border-b border-gray-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.25em] font-semibold text-accent-saffron uppercase block mb-3"
          >
            Gallery & Archives
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif text-charcoal font-bold tracking-tight mb-6"
          >
            Media & Heritage
          </motion.h2>

          {/* Faint geometric separator */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-[1px] bg-accent-gold/20 mx-auto mt-6"
          />
        </div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {slicedData.map((item) => {
            const instagramId = getInstagramPostId(item.image);
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group flex flex-col"
              >
                {/* Image/Video Frame Container */}
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
                        title={`Homepage Gallery Instagram ${instagramId}`}
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
                        <Eye className="w-4.5 h-4.5" />
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

        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              navigate('/gallery');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="px-8 py-3.5 border border-accent-gold hover:bg-accent-gold text-accent-gold hover:text-white text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            View All Archives
          </button>
        </div>
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
                    title={`Homepage Gallery Lightbox ${getInstagramPostId(activeMedia)}`}
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
    </section>
  );
}

