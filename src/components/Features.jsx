import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Library, 
  Printer, 
  GraduationCap, 
  FileText, 
  BookOpen, 
  Users 
} from 'lucide-react';

const featuresData = [
  {
    id: 1,
    title: 'Real-Time Event Updates',
    description: 'Stay synchronized with our spiritual calendar and live majlises.',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Comprehensive Digital Library',
    description: 'Curated digital repository of Maala, Moulid, and Darsi Kitabs.',
    icon: Library,
  },
  {
    id: 3,
    title: 'Print-on-Demand Service',
    description: 'Order printed copies of library texts delivered to your doorstep.',
    icon: Printer,
  },
  {
    id: 4,
    title: 'Certified Educational Programs',
    description: 'Specialized certificate courses with national/international foundations.',
    icon: GraduationCap,
  },
  {
    id: 5,
    title: 'Research & Publications',
    description: 'Archive of academic papers on Islamic History, Culture, and Education.',
    icon: FileText,
  },
  {
    id: 6,
    title: 'Legacy of Kerala Ulama',
    description: 'Biographical studies tracking the impact of Kerala’s Muslim scholars.',
    icon: BookOpen,
  },
  {
    id: 7,
    title: '1-to-1 Career Counseling',
    description: 'Personalized academic guidance sessions with experts.',
    icon: Users,
  },
];

export default function Features() {
  // Stagger container for scroll animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Individual card animation settings
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // premium ease-out
      },
    },
  };

  return (
    <section 
      id="features" 
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative background accent (very faint) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-light/40 blur-[80px] pointer-events-none" />

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
            Our Initiatives
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif text-charcoal font-bold tracking-tight mb-6"
          >
            Features & Objectives
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-mediumgray text-base leading-relaxed"
          >
            The Mahlaratushaduliyya Cultural Foundation is dedicated to bridging traditional scholarship with digital access, making sacred Islamic knowledge and research globally accessible.
          </motion.p>
          
          {/* Faint geometric separator */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-[1px] bg-accent-gold/20 mx-auto mt-8"
          />
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuresData.map((feature, idx) => {
            const IconComponent = feature.icon;
            
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                // Center the 7th card on large screens for a balanced grid layout
                className={`bg-white p-8 rounded border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group ${
                  idx === 6 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                }`}
              >
                {/* Custom Saffron Left Accent Border - Expands/Slides Down on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-saffron transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                {/* Card Content */}
                <div className="flex flex-col h-full">
                  {/* Icon Container with Hover Fill effect */}
                  <div className="w-12 h-12 rounded bg-accent-saffron/5 flex items-center justify-center text-accent-saffron mb-6 group-hover:bg-accent-saffron group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif text-charcoal font-semibold mb-3 tracking-wide">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-mediumgray text-sm leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Decorative Bottom Divider Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/15 to-transparent" />
    </section>
  );
}
