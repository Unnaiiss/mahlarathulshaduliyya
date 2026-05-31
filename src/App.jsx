import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Academics from './components/Academics';
import EventBanner from './components/EventBanner';
import EventHighlights from './components/EventHighlights';
import { 
  subscribeToEvent, 
  subscribeToGallery, 
  updateEvent, 
  addGalleryItem, 
  deleteGalleryItem,
  updateGalleryItem,
  subscribeToContact,
  updateContact,
  subscribeToAcademicsConfig,
  updateAcademicsConfig,
  subscribeToAcademics,
  addAcademicWing,
  deleteAcademicWing,
  updateAcademicWing,
  subscribeToAbout,
  updateAbout
} from './firebase';

// Lazy load below-the-fold components and page views
const Gallery = lazy(() => import('./components/Gallery'));
const Footer = lazy(() => import('./components/Footer'));
const EventDetails = lazy(() => import('./components/EventDetails'));
const Admin = lazy(() => import('./components/Admin'));
const MediaGallery = lazy(() => import('./components/MediaGallery'));
const AboutUs = lazy(() => import('./components/AboutUs'));

// Sleek loading fallback spinner matching the design system
function LoadingPlaceholder() {
  return (
    <div className="w-full py-24 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        {/* Pulsing gold spinner */}
        <div className="w-8 h-8 rounded-full border-2 border-accent-gold/25 border-t-accent-gold animate-spin" />
        <span className="text-[10px] font-semibold tracking-[0.2em] text-accent-gold uppercase animate-pulse">
          Loading Content...
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [eventData, setEventData] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [contactData, setContactData] = useState(null);
  const [academicsData, setAcademicsData] = useState([]);
  const [academicsConfig, setAcademicsConfig] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const navigate = useNavigate();

  // Listen to Firebase Real-time updates (or LocalStorage Mock updates)
  useEffect(() => {
    const unsubscribeEvent = subscribeToEvent((data) => {
      setEventData(data);
    });
    const unsubscribeGallery = subscribeToGallery((data) => {
      setGalleryData(data);
    });
    const unsubscribeContact = subscribeToContact((data) => {
      setContactData(data);
    });
    const unsubscribeAcademicsConfig = subscribeToAcademicsConfig((data) => {
      setAcademicsConfig(data);
    });
    const unsubscribeAcademics = subscribeToAcademics((data) => {
      setAcademicsData(data);
    });
    const unsubscribeAbout = subscribeToAbout((data) => {
      setAboutData(data);
    });

    return () => {
      unsubscribeEvent();
      unsubscribeGallery();
      unsubscribeContact();
      unsubscribeAcademicsConfig();
      unsubscribeAcademics();
      unsubscribeAbout();
    };
  }, []);

  // Show placeholder while fetching initial state from DB
  if (!eventData || !contactData || !academicsConfig || !aboutData) {
    return <LoadingPlaceholder />;
  }

  // Wrapper handlers that route updates to Firebase
  const handleUpdateEvent = async (updatedData) => {
    await updateEvent(updatedData);
  };

  const handleAddGalleryItem = async (newItem) => {
    await addGalleryItem(newItem);
  };

  const handleDeleteGalleryItem = async (id) => {
    await deleteGalleryItem(id);
  };

  const handleUpdateGalleryItem = async (id, updatedData) => {
    await updateGalleryItem(id, updatedData);
  };

  const handleUpdateContact = async (updatedData) => {
    await updateContact(updatedData);
  };

  const handleUpdateAcademicsConfig = async (updatedConfig) => {
    await updateAcademicsConfig(updatedConfig);
  };

  const handleAddAcademicWing = async (newWing) => {
    await addAcademicWing(newWing);
  };

  const handleDeleteAcademicWing = async (id) => {
    await deleteAcademicWing(id);
  };

  const handleUpdateAcademicWing = async (id, updatedWing) => {
    await updateAcademicWing(id, updatedWing);
  };

  const handleUpdateAbout = async (updatedData) => {
    await updateAbout(updatedData);
  };

  return (
    <Routes>
      {/* Admin Panel Route (Fullscreen layout, fully decoupled from user styling) */}
      <Route path="/admin" element={
        <Suspense fallback={<LoadingPlaceholder />}>
          <Admin
            eventData={eventData}
            onUpdateEvent={handleUpdateEvent}
            galleryData={galleryData}
            onAddGallery={handleAddGalleryItem}
            onDeleteGallery={handleDeleteGalleryItem}
            onUpdateGalleryItem={handleUpdateGalleryItem}
            contactData={contactData}
            onUpdateContact={handleUpdateContact}
            academicsData={academicsData}
            academicsConfig={academicsConfig}
            onUpdateAcademicsConfig={handleUpdateAcademicsConfig}
            onAddAcademicWing={handleAddAcademicWing}
            onDeleteAcademicWing={handleDeleteAcademicWing}
            onUpdateAcademicWing={handleUpdateAcademicWing}
            aboutData={aboutData}
            onUpdateAbout={handleUpdateAbout}
            onLogout={() => navigate('/')}
          />
        </Suspense>
      } />

      {/* Public Client Site Routes */}
      <Route path="*" element={
        <div className="min-h-screen bg-white text-charcoal flex flex-col font-sans overflow-x-hidden">
          {/* Event Announcement Banner */}
          <EventBanner 
            onViewDetails={() => {
              navigate('/event');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }} 
            eventData={eventData} 
          />

          {/* Header / Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              {/* Homepage */}
              <Route path="/" element={
                <>
                  {/* Hero Section */}
                  <Hero eventData={eventData} />

                  {/* Event Posters & Highlights Carousel */}
                  <EventHighlights eventData={eventData} />

                  {/* Features & Objectives Section */}
                  <Features />


                  {/* Media & Heritage Gallery Section (Lazy loaded) */}
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <Gallery galleryData={galleryData} />
                  </Suspense>

                  {/* Contact Section */}
                  <section 
                    id="contact" 
                    className="py-24 max-w-7xl mx-auto px-6 lg:px-12 relative overflow-hidden bg-white"
                  >
                    {/* Subtle background detail */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-saffron/[0.02] blur-[80px] pointer-events-none" />

                    <div className="text-center max-w-3xl mx-auto relative z-10">
                      <span className="text-[11px] tracking-[0.25em] font-semibold text-accent-saffron uppercase block mb-3">
                        Get In Touch
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-bold tracking-tight mb-6">
                        Contact the Foundation
                      </h2>
                      <p className="text-mediumgray text-base leading-relaxed mb-10">
                        Reach out to learn more about our courses, enrollment opportunities, cultural events, and how to support our mission.
                      </p>
                      <div className="inline-flex">
                        <a
                          href={`mailto:${contactData?.email || 'info@mahlaratushaduliyya.org'}`}
                          className="px-8 py-3.5 bg-accent-gold hover:bg-accent-saffron text-white text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                        >
                          Send Email Message
                        </a>
                      </div>
                    </div>
                  </section>
                </>
              } />

              {/* Event Details Page */}
              <Route path="/event" element={
                <Suspense fallback={<LoadingPlaceholder />}>
                  <EventDetails 
                    onBack={() => {
                      navigate('/');
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }} 
                    eventData={eventData} 
                  />
                </Suspense>
              } />

              {/* Dedicated Media Gallery Page */}
              <Route path="/gallery" element={
                <Suspense fallback={<LoadingPlaceholder />}>
                  <MediaGallery 
                    galleryData={galleryData} 
                  />
                </Suspense>
              } />

              {/* Dedicated About Us Page */}
              <Route path="/about" element={
                <Suspense fallback={<LoadingPlaceholder />}>
                  <AboutUs aboutData={aboutData} />
                </Suspense>
              } />

              {/* Dedicated Academics Page */}
              <Route path="/academics" element={
                <Academics academicsData={academicsData} academicsConfig={academicsConfig} />
              } />
            </Routes>
          </main>

          {/* Footer (Lazy loaded) */}
          <Suspense fallback={<div className="h-20 bg-[#111827]" />}>
            <Footer contactData={contactData} />
          </Suspense>
        </div>
      } />
    </Routes>
  );
}
