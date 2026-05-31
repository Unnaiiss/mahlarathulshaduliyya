import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, X, ZoomIn } from 'lucide-react';
import { getInstagramPostId } from '../firebase';

function InstagramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function EventHighlights({ eventData }) {
  const highlights = (eventData?.homePosters?.length > 0 ? eventData.homePosters : eventData?.posters) || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = highlights.length;

  const goTo = useCallback((index, dir = 1) => {
    setDirection(dir);
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % totalSlides, 1);
  }, [activeIndex, totalSlides, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + totalSlides) % totalSlides, -1);
  }, [activeIndex, totalSlides, goTo]);

  // Auto-advance — pause on Instagram slides
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;
    if (getInstagramPostId(highlights[activeIndex])) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext, totalSlides, isPaused, activeIndex, highlights]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (lightbox !== null) {
        if (e.key === 'Escape') setLightbox(null);
        if (e.key === 'ArrowRight') setLightbox(n => (n + 1) % totalSlides);
        if (e.key === 'ArrowLeft') setLightbox(n => (n - 1 + totalSlides) % totalSlides);
        return;
      }
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, lightbox, totalSlides]);

  // Body scroll lock for lightbox
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  if (!highlights || highlights.length === 0) return null;

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: {
      x: 0, opacity: 1,
      transition: { x: { type: 'spring', stiffness: 280, damping: 30 }, opacity: { duration: 0.3 } },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%', opacity: 0,
      transition: { x: { type: 'spring', stiffness: 280, damping: 30 }, opacity: { duration: 0.2 } },
    }),
  };

  return (
    <>
      {/* ── SECTION ── */}
      <section
        id="event-highlights"
        className="relative bg-[#0c1018] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Decorative edges */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-gold/[0.04] blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-arabesque-pattern opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24">

          {/* Mobile-only Header (Hidden on lg+ desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:hidden"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase text-accent-saffron">
              <Sparkles className="w-3 h-3 shrink-0" />
              Posters &amp; Highlights
              <Sparkles className="w-3 h-3 shrink-0" />
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {eventData?.title || 'Current Event'}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-[12px] text-white/45">
              {eventData?.dates && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-accent-gold/60 shrink-0" />
                  {eventData.dates}
                </span>
              )}
              {eventData?.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-accent-gold/60 shrink-0" />
                  {eventData.location}
                </span>
              )}
            </div>
            <div className="w-10 h-[1px] bg-accent-gold/30 mx-auto mt-4" />
          </motion.div>

          {/* Responsive Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left Column: Event details (visible on lg+ desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="hidden lg:flex flex-col lg:col-span-6 text-left"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase text-accent-saffron mb-4">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                Posters &amp; Highlights
              </span>

              <h2 className="text-3xl xl:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-5">
                {eventData?.title || 'Current Event'}
              </h2>

              {/* Event Quick Details Card */}
              <div className="grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm max-w-lg">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/40">Dates</h4>
                    <p className="text-xs text-white/80 font-medium mt-0.5">{eventData?.dates || 'TBD'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/40">Location</h4>
                    <p className="text-xs text-white/80 font-medium mt-0.5">{eventData?.location || 'TBD'}</p>
                  </div>
                </div>
              </div>

              {/* Elegant About Text */}
              {eventData?.about && (
                <div className="text-white/70 text-sm leading-relaxed mb-6 font-sans max-w-lg space-y-4">
                  {eventData.about.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              )}

              {/* Visual Bullets for Features */}
              <div className="space-y-3 mb-8 max-w-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-accent-gold">🕌</span>
                  </div>
                  <span className="text-xs text-white/80 font-medium font-sans">Spiritual Assemblies &amp; Devotional Recitations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-accent-gold">🎓</span>
                  </div>
                  <span className="text-xs text-white/80 font-medium font-sans">Scholarly Panels &amp; Academic Legacy Discussions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-accent-gold">📡</span>
                  </div>
                  <span className="text-xs text-white/80 font-medium font-sans">Global Real-time Broadcast Coverage</span>
                </div>
              </div>

              {/* View Details Link Styled as Elegant Outline Button */}
              <div>
                <a
                  href="/event"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent-gold/45 hover:border-accent-gold text-accent-gold hover:text-white bg-transparent hover:bg-accent-gold/10 transition-all duration-300 font-semibold tracking-[0.15em] text-[10px] uppercase shadow-lg shadow-black/20 hover:scale-[1.02]"
                >
                  View Full Event Details
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Slideshow (Centered on mobile, fits right column on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="lg:col-span-6 flex flex-col justify-center w-full"
            >
              {/* Slide viewport */}
              <div
                className="relative overflow-hidden rounded-2xl bg-[#181f2b] shadow-2xl border border-white/[0.06] mx-auto select-none w-full"
                style={{ aspectRatio: '4/5', maxWidth: '420px', maxHeight: '80vh' }}
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    {(() => {
                      const igId = getInstagramPostId(highlights[activeIndex]);
                      if (igId) {
                        return (
                          <>
                            <iframe
                              src={`https://www.instagram.com/p/${igId}/embed/`}
                              className="w-full h-full border-0"
                              scrolling="no"
                              allowTransparency="true"
                              title={`Instagram Post ${igId}`}
                            />
                            {/* Click-through overlay so slide click opens lightbox */}
                            <div
                              className="absolute inset-0 z-10 cursor-pointer"
                              onClick={() => setLightbox(activeIndex)}
                            />
                            {/* IG badge */}
                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold border border-white/10 pointer-events-none">
                              <InstagramIcon className="w-3 h-3 text-[#E1306C]" />
                              Instagram
                            </div>
                          </>
                        );
                      }
                      return (
                        <div
                          className="absolute inset-0 cursor-zoom-in group"
                          onClick={() => setLightbox(activeIndex)}
                        >
                          <img
                            src={highlights[activeIndex]}
                            alt={`Event highlight ${activeIndex + 1}`}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-medium tracking-wider whitespace-nowrap pointer-events-none">
                            <ZoomIn className="w-3 h-3" />
                            Click to expand
                          </div>
                        </div>
                      );
                    })()}

                    {/* Slide counter */}
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-[10px] font-semibold border border-white/10 tracking-wider pointer-events-none">
                      {activeIndex + 1} / {totalSlides}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      aria-label="Previous"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-accent-gold border border-white/10 hover:border-accent-gold text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm shadow-lg"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goNext}
                      aria-label="Next"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-accent-gold border border-white/10 hover:border-accent-gold text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm shadow-lg"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators (Mobile only, hidden on desktop since desktop has interactive thumbnails) */}
              {totalSlides > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5 lg:hidden">
                  {highlights.map((src, i) => {
                    const isIg = !!getInstagramPostId(src);
                    return (
                      <button
                        key={i}
                        onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          i === activeIndex
                            ? 'w-7 h-2 bg-accent-gold'
                            : isIg
                            ? 'w-2 h-2 bg-[#E1306C]/50 hover:bg-[#E1306C]'
                            : 'w-2 h-2 bg-white/20 hover:bg-white/45'
                        }`}
                      />
                    );
                  })}
                </div>
              )}

              {/* Interactive thumbnails (Desktop only) */}
              {totalSlides > 1 && (
                <div className="hidden lg:flex items-center justify-center gap-3 mt-6">
                  {highlights.map((src, i) => {
                    const isIg = !!getInstagramPostId(src);
                    return (
                      <button
                        key={i}
                        onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                        className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          i === activeIndex
                            ? 'border-accent-gold scale-105 shadow-[0_0_10px_rgba(180,150,70,0.35)]'
                            : 'border-white/10 opacity-40 hover:opacity-80'
                        }`}
                      >
                        {isIg ? (
                          <div className="w-full h-full bg-[#181f2b] flex flex-col items-center justify-center p-1">
                            <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                            <span className="text-[7px] text-white/50 mt-0.5 font-semibold">Post</span>
                          </div>
                        ) : (
                          <img
                            src={src}
                            alt={`Thumbnail ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* View all link (Mobile only, hidden on desktop since the button is in the left column) */}
              <div className="text-center mt-6 lg:hidden">
                <a
                  href="/event"
                  className="inline-flex items-center gap-1.5 text-accent-gold text-[11px] font-semibold tracking-[0.2em] uppercase hover:text-accent-saffron transition-colors group"
                >
                  View Full Event Details
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/25 to-transparent" />
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/93 backdrop-blur-lg p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-full bg-black/50 text-white text-[11px] font-semibold tracking-wider border border-white/10">
              {lightbox + 1} / {totalSlides}
            </div>

            {totalSlides > 1 && (
              <>
                <button
                  aria-label="Previous"
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-accent-gold text-white flex items-center justify-center transition-all"
                  onClick={(e) => { e.stopPropagation(); setLightbox(n => (n - 1 + totalSlides) % totalSlides); }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Next"
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-accent-gold text-white flex items-center justify-center transition-all"
                  onClick={(e) => { e.stopPropagation(); setLightbox(n => (n + 1) % totalSlides); }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 230 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const igId = getInstagramPostId(highlights[lightbox]);
                if (igId) {
                  return (
                    <div className="w-[min(420px,90vw)] aspect-[4/5] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                      <iframe
                        src={`https://www.instagram.com/p/${igId}/embed/`}
                        className="w-full h-full border-0"
                        scrolling="no"
                        allowTransparency="true"
                        title={`Instagram Lightbox ${igId}`}
                      />
                    </div>
                  );
                }
                return (
                  <img
                    src={highlights[lightbox]}
                    alt={`Event highlight ${lightbox + 1}`}
                    className="max-h-[86vh] max-w-[88vw] object-contain rounded-xl shadow-2xl border border-white/10"
                  />
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
