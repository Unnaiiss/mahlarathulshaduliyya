import React from 'react';
import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react';

export default function Footer({ contactData }) {
  const address = contactData?.address || "Mahlaratushaduliyya Cultural Foundation, Kerala, India.";
  const email = contactData?.email || "info@mahlaratushaduliyya.org";
  const phone = contactData?.phone || "+91 XXXX XXX XXX";
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Initiatives', href: '#features' },
    { name: 'Academics', href: '#academics' },
    { name: 'Admissions', href: '#academics' }, // redirects to academics section
    { name: 'Digital Library', href: '#features' }, // library is part of features
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-dark text-white/90 border-t border-accent-gold/25 relative">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-accent-gold/[0.02] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-accent-saffron/[0.02] blur-[80px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Brand (Takes 5 cols on md+) */}
          <div className="md:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              {/* Logo Monogram */}
              <div className="w-10 h-10 rounded-full border border-accent-gold/40 flex items-center justify-center p-1 bg-white/5">
                <svg viewBox="0 0 100 100" className="w-full h-full text-accent-gold" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
                  <path d="M40 65 C 40 45, 50 35, 50 35 C 50 35, 60 45, 60 65" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-base tracking-wider font-semibold text-white">
                  Mahlaratushaduliyya
                </span>
                <span className="text-[9px] tracking-widest text-accent-gold uppercase font-medium">
                  Cultural Foundation
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Preserving legacy, empowering futures through sacred knowledge and modern academic innovation. Committed to global cultural enrichment.
            </p>
            {/* Dynamic Social Media Links */}
            {(contactData?.instagram || contactData?.youtube || contactData?.facebook) && (
              <div className="flex gap-4 items-center">
                {contactData.instagram && (
                  <a 
                    href={contactData.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full border border-gray-800 hover:border-[#E1306C] text-gray-400 hover:text-[#E1306C] flex items-center justify-center transition-colors duration-300"
                    title="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}
                {contactData.youtube && (
                  <a 
                    href={contactData.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full border border-gray-800 hover:border-[#FF0000] text-gray-400 hover:text-[#FF0000] flex items-center justify-center transition-colors duration-300"
                    title="YouTube"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                    </svg>
                  </a>
                )}
                {contactData.facebook && (
                  <a 
                    href={contactData.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full border border-gray-800 hover:border-[#1877F2] text-gray-400 hover:text-[#1877F2] flex items-center justify-center transition-colors duration-300"
                    title="Facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links (Takes 3 cols on md+) */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-white font-serif font-semibold text-base tracking-wider mb-6 relative">
              Quick Links
              <span className="block w-8 h-[1px] bg-accent-gold/40 mt-2" />
            </h4>
            
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 text-sm tracking-wide hover:text-accent-saffron transition-colors duration-300 block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (Takes 4 cols on md+) */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-white font-serif font-semibold text-base tracking-wider mb-6 relative">
              Contact Info
              <span className="block w-8 h-[1px] bg-accent-gold/40 mt-2" />
            </h4>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                <MapPin className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-accent-saffron transition-colors">
                  {email}
                </a>
              </li>
              
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-accent-saffron transition-colors">
                  {phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 text-center sm:text-left tracking-wider">
            &copy; {new Date().getFullYear()} Mahlaratushaduliyya Cultural Foundation. All rights reserved.
          </p>
          
          {/* Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-gray-800 hover:border-accent-gold text-gray-400 hover:text-accent-gold flex items-center justify-center transition-all bg-transparent group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
