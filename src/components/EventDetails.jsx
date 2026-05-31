import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Video, Image as ImageIcon, Heart } from 'lucide-react';
import { getInstagramPostId } from '../firebase';

export default function EventDetails({ onBack, eventData }) {
  const [activeMedia, setActiveMedia] = useState(null);

  // Scroll to top when the details page is rendered
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

  // Return early if no eventData is passed (defensive check)
  if (!eventData) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
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

  // Helper to determine poster card descriptions dynamically
  const getPosterMeta = (poster, index) => {
    if (poster.includes('instagram.com')) {
      const id = getInstagramPostId(poster);
      return {
        title: 'Instagram Post Highlight',
        desc: `Linked social highlight (${id}) showcasing spiritual updates and schedules on our Instagram profile.`
      };
    }
    if (poster === '/uroos_poster.png') {
      return {
        title: 'Official 25th Uroos Mubarak Poster',
        desc: 'Commemorative poster detailing the lecture topics and scholars participating in the Mubarak assemblies.'
      };
    }
    if (poster === '/uroos_gathering.png') {
      return {
        title: 'Remembrance Gathering',
        desc: 'Scholars, alumni, and community members gathered in collective prayer and remembrance.'
      };
    }
    return {
      title: `Event Media Highlight #${index + 1}`,
      desc: 'Commemorative photograph or document uploaded via the MCF administrator panel.'
    };
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white min-h-screen pt-28 pb-24 relative overflow-hidden"
    >
      {/* Background Graphic Ornaments */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-saffron/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 bg-arabesque-pattern opacity-[0.25] w-full h-[300px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-gold hover:text-accent-saffron transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </motion.button>

        {/* Event Main Header */}
        <motion.div variants={itemVariants} className="border-b border-gray-100 pb-8 mb-10">
          <span className="text-[10px] tracking-[0.3em] font-bold text-accent-saffron uppercase block mb-3 animate-pulse">
            LIVE COMMEMORATION & EVENT DETAILS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-bold tracking-tight mb-6 leading-tight">
            {eventData.title}
          </h1>
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-mediumgray max-w-xl">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-gold" />
              <span className="font-semibold">Date:</span>
              <span>{eventData.dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-gold" />
              <span className="font-semibold">Location:</span>
              <span>{eventData.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Content Section: What is the Event */}
        <motion.div variants={itemVariants} className="prose prose-lg max-w-none mb-16 text-left">
          <h2 className="text-2xl font-serif text-charcoal font-semibold mb-4">
            About the Event
          </h2>
          <div className="text-mediumgray text-base leading-relaxed whitespace-pre-line space-y-4">
            {eventData.about ? eventData.about : (
              <>
                <p>
                  The event <strong>{eventData.title}</strong> represents a cornerstone spiritual and educational program hosted by the Mahlaratushaduliyya Cultural Foundation. Taking place at <strong>{eventData.location}</strong>, the assemblies gather together prominent scholars, community leaders, and alumni to explore traditional sciences, recite spiritual devotions, and participate in academic panels.
                </p>
                <p>
                  All programs are broadcast in real-time, allowing viewers from across the globe to connect with our heritage archives and actively participate in collective prayer services.
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* YouTube Live Stream Integration */}
        {eventData.youtubeId && (
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="text-left">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-accent-saffron uppercase block mb-1">
                  COMMEMORATION STREAM
                </span>
                <h2 className="text-2xl font-serif text-charcoal font-semibold">
                  Live Broadcast
                </h2>
              </div>
              
              {/* Live Indicator */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Live Now
              </span>
            </div>

            {/* YouTube Embed Player Card */}
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-accent-gold/20 shadow-lg relative bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${eventData.youtubeId}?autoplay=0&mute=0`}
                title="Mahlaratushaduliyya Event Live Broadcast"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-4 flex items-start gap-2.5 text-xs text-mediumgray bg-accent-light border border-accent-gold/10 p-3.5 rounded text-left">
              <Video className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <p>
                <strong>Broadcast Note:</strong> The program is streaming live. Connect virtually to engage with the lectures and recitations. Please refresh the page if the live player does not load immediately.
              </p>
            </div>
          </motion.div>
        )}

        {/* Event-Specific Media Gallery */}
        {eventData.posters && eventData.posters.length > 0 && (
          <motion.div variants={itemVariants} className="border-t border-gray-100 pt-16 text-left">
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-accent-saffron uppercase block mb-1">
                EVENT GALLERY & MEDIA
              </span>
              <h2 className="text-2xl font-serif text-charcoal font-semibold">
                Posters & Highlights
              </h2>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventData.posters.map((poster, index) => {
                const meta = getPosterMeta(poster, index);
                const instagramId = getInstagramPostId(poster);
                
                return (
                  <div key={index} className="group flex flex-col">
                    <div 
                      onClick={() => setActiveMedia(poster)}
                      className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden relative border border-gray-100 group-hover:border-accent-saffron group-hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      {instagramId ? (
                        <>
                          <iframe
                            src={`https://www.instagram.com/p/${instagramId}/embed/`}
                            className="w-full h-full border-0 rounded-lg pointer-events-none"
                            scrolling="no"
                            allowtransparency="true"
                            title={`Instagram Post ${instagramId}`}
                          ></iframe>
                          {/* Invisible overlay to block iframe pointer-events in grid and capture clicks */}
                          <div className="absolute inset-0 z-20 bg-transparent" />
                        </>
                      ) : (
                        <img
                          src={poster}
                          alt={meta.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          loading="lazy"
                        />
                      )}

                      {/* Premium Hover Zoom/Play Overlay */}
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
                      
                      {/* Overlay details */}
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
                            <ImageIcon className="w-3 h-3 text-accent-gold" />
                            <span>Media {index + 1}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <h3 className="text-base font-serif font-semibold text-charcoal mt-4 mb-1">
                      {meta.title}
                    </h3>
                    <p className="text-mediumgray text-xs leading-relaxed">
                      {meta.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>

      {/* Lightbox / Distraction-free Immersive Viewer Modal */}
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
              onClick={(e) => e.stopPropagation()} // prevent closing on inner card click
            >
              {getInstagramPostId(activeMedia) ? (
                <div className="w-full max-w-[420px] aspect-[4/5] bg-white rounded-lg shadow-2xl overflow-hidden relative border border-white/10">
                  <iframe
                    src={`https://www.instagram.com/p/${getInstagramPostId(activeMedia)}/embed/`}
                    className="w-full h-full border-0"
                    scrolling="no"
                    allowtransparency="true"
                    title={`Instagram Lightbox ${getInstagramPostId(activeMedia)}`}
                  ></iframe>
                </div>
              ) : (
                <img
                  src={activeMedia}
                  alt="Enlarged Highlight"
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
