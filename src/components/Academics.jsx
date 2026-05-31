import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const defaultAcademicsData = [
  {
    id: 1,
    name: 'Academy of Cultural Research',
    focus: 'Deep-dive research into Islamic history, local cultural evolution, and socio-religious heritage.',
    status: 'Admissions Open',
  },
  {
    id: 2,
    name: 'Academy of Quran Studies',
    focus: 'Advanced Quranic tafseer, tajweed precision, and contextual applications of the Holy Text.',
    status: 'Admissions Open',
  },
  {
    id: 3,
    name: 'ASIL (Academy of Studies in Islamic Legacy)',
    focus: 'A prestigious wing dedicated to the preservation, translation, and study of classical Islamic manuscripts and legacy.',
    status: 'Admissions Open',
  },
];

export default function Academics({ academicsData, academicsConfig }) {
  const displayData = academicsData && academicsData.length > 0 ? academicsData : defaultAcademicsData;
  const description = academicsConfig?.description || "Hosting premier educational institutes dedicated to deep research, intellectual preservation, and spiritual proficiency.";
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      id="academics" 
      className="py-24 bg-white border-t border-gray-100 relative overflow-hidden"
    >
      {/* Background Ornament */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent-light/35 blur-[70px] pointer-events-none" />

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
            Education & Research
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif text-charcoal font-bold tracking-tight mb-6"
          >
            Academic Wings & Admissions
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-mediumgray text-base leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Simple design rule line separator */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-[1px] bg-accent-gold/20 mx-auto mt-8"
          />
        </div>

        {/* Directory Row Stack */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col border-t border-gray-200"
        >
          {displayData.map((wing) => (
            <motion.div
              key={wing.id}
              variants={rowVariants}
              className="flex flex-col md:flex-row md:items-center md:justify-between py-8 border-b border-gray-200 hover:bg-gray-50/60 transition-colors duration-300 gap-4 md:gap-8 px-4 -mx-4 group rounded"
            >
              {/* Left Column: 30% Width (Institute Name) */}
              <div className="w-full md:w-[30%]">
                <h3 className="text-xl font-serif font-semibold text-charcoal tracking-wide group-hover:text-accent-gold transition-colors duration-300">
                  {wing.name}
                </h3>
              </div>

              {/* Middle Column: 50% Width (Focus & Specialization) */}
              <div className="w-full md:w-[50%]">
                <p className="text-mediumgray text-sm sm:text-base leading-relaxed">
                  {wing.focus}
                </p>
              </div>

              {/* Right Column: 20% Width (Status Badge / CTA) */}
              <div className="w-full md:w-[20%] flex md:justify-end items-center">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-between gap-2 px-5 py-2 border border-accent-saffron text-accent-saffron rounded-full text-xs font-semibold tracking-wider uppercase bg-transparent hover:bg-accent-saffron/10 hover:shadow-sm transition-all duration-300 self-start md:self-auto"
                >
                  <span>{wing.status}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
