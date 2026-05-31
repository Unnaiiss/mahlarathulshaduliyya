import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin } from 'lucide-react';

export default function EventBanner({ onViewDetails, eventData }) {
  const [isVisible, setIsVisible] = useState(true);

  // Return early if no eventData is passed (defensive check)
  if (!eventData) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, height: 'auto' }}
          exit={{ 
            opacity: 0, 
            height: 0,
            transition: {
              opacity: { duration: 0.2 },
              height: { duration: 0.3, ease: 'easeInOut' }
            }
          }}
          className="bg-[#0B3921] text-white overflow-hidden relative z-50 border-b border-accent-gold/20"
        >
          <div className="max-w-7xl mx-auto px-6 pr-12 py-3 flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left text-xs sm:text-sm tracking-wide">
            
            {/* Pulsing Badge */}
            <span className="inline-flex items-center gap-1 bg-accent-saffron/10 border border-accent-saffron/30 text-accent-saffron px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest animate-pulse shrink-0">
              <span className="w-1 h-1 rounded-full bg-accent-saffron" />
              Upcoming Event
            </span>

            {/* Event Text */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4 flex-wrap text-white/90">
              <span className="font-serif font-medium text-accent-saffron">
                🌙 {eventData.title}
              </span>
              
              <span className="hidden sm:inline text-white/30">|</span>
              
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                <span>Date: {eventData.dates}</span>
              </span>

              <span className="hidden sm:inline text-white/30">|</span>

              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                <span>Location: {eventData.location}</span>
              </span>
            </div>

            {/* Action button to redirect */}
            <button
              onClick={onViewDetails}
              className="inline-flex items-center justify-center px-3.5 py-1.5 bg-accent-saffron hover:bg-white text-emerald-950 font-bold transition-all duration-300 text-xs rounded shadow-sm shrink-0 ml-2 md:ml-4"
            >
              View Details
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-accent-saffron hover:bg-white/5 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
