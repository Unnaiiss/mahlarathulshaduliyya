import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Image as ImageIcon, 
  LogOut, 
  Eye, 
  Trash2, 
  Plus, 
  Upload, 
  Check, 
  Loader2,
  X,
  Lock,
  Mail,
  AlertCircle
} from 'lucide-react';
import { 
  signInUser, 
  signUpUser, 
  signOutUser, 
  subscribeToAuth, 
  uploadImage, 
  isFirebaseConfigured,
  getInstagramPostId,
  isValidInstagramUrl
} from '../firebase';

export default function Admin({ 
  eventData, 
  onUpdateEvent, 
  galleryData, 
  onAddGallery, 
  onDeleteGallery, 
  contactData,
  onUpdateContact,
  academicsData,
  academicsConfig,
  onUpdateAcademicsConfig,
  onAddAcademicWing,
  onDeleteAcademicWing,
  onUpdateAcademicWing,
  onLogout 
}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Auth Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Local state for Events Form
  const [eventTitle, setEventTitle] = useState(eventData.title);
  const [eventDates, setEventDates] = useState(eventData.dates);
  const [eventLocation, setEventLocation] = useState(eventData.location);
  const [eventYoutubeId, setEventYoutubeId] = useState(eventData.youtubeId);
  const [eventAbout, setEventAbout] = useState(eventData.about || '');
  const [eventPosters, setEventPosters] = useState(eventData.posters || []);
  const [eventNewFiles, setEventNewFiles] = useState([]); // holds { file, previewUrl }
  const [eventHeroBg, setEventHeroBg] = useState(eventData?.heroBgImage || '');
  const [eventHeroBgFile, setEventHeroBgFile] = useState(null);
  const [eventHeroBgPreview, setEventHeroBgPreview] = useState('');
  const [isEventSaving, setIsEventSaving] = useState(false);
  const [eventSaveSuccess, setEventSaveSuccess] = useState(false);

  // Local state for Contact Form
  const [contactAddress, setContactAddress] = useState(contactData?.address || '');
  const [contactEmail, setContactEmail] = useState(contactData?.email || '');
  const [contactPhone, setContactPhone] = useState(contactData?.phone || '');
  const [socialInstagram, setSocialInstagram] = useState(contactData?.instagram || '');
  const [socialYoutube, setSocialYoutube] = useState(contactData?.youtube || '');
  const [socialFacebook, setSocialFacebook] = useState(contactData?.facebook || '');
  const [isContactSaving, setIsContactSaving] = useState(false);
  const [contactSaveSuccess, setContactSaveSuccess] = useState(false);

  // Local state for Academics Form
  const [academicsDescription, setAcademicsDescription] = useState(academicsConfig?.description || '');
  const [isAcademicsConfigSaving, setIsAcademicsConfigSaving] = useState(false);
  const [academicsConfigSaveSuccess, setAcademicsConfigSaveSuccess] = useState(false);

  const [newWingName, setNewWingName] = useState('');
  const [newWingFocus, setNewWingFocus] = useState('');
  const [newWingStatus, setNewWingStatus] = useState('Admissions Open');
  const [isWingAdding, setIsWingAdding] = useState(false);
  const [wingAddSuccess, setWingAddSuccess] = useState(false);

  // Instagram states
  const [instagramUrl, setInstagramUrl] = useState('');
  const [instagramError, setInstagramError] = useState('');

  // Subscribe to Auth status on mount
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Update form inputs when eventData loaded from DB changes
  useEffect(() => {
    if (eventData) {
      setEventTitle(eventData.title);
      setEventDates(eventData.dates);
      setEventLocation(eventData.location);
      setEventYoutubeId(eventData.youtubeId);
      setEventAbout(eventData.about || '');
      setEventPosters(eventData.posters || []);
      setEventHeroBg(eventData.heroBgImage || '');
      setEventHeroBgFile(null);
      setEventHeroBgPreview('');
    }
  }, [eventData]);

  // Update form inputs when contactData loaded from DB changes
  useEffect(() => {
    if (contactData) {
      setContactAddress(contactData.address || '');
      setContactEmail(contactData.email || '');
      setContactPhone(contactData.phone || '');
      setSocialInstagram(contactData.instagram || '');
      setSocialYoutube(contactData.youtube || '');
      setSocialFacebook(contactData.facebook || '');
    }
  }, [contactData]);

  // Update form inputs when academicsConfig loaded from DB changes
  useEffect(() => {
    if (academicsConfig) {
      setAcademicsDescription(academicsConfig.description || '');
    }
  }, [academicsConfig]);

  const handleLinkInstagram = (e) => {
    e.preventDefault();
    setInstagramError('');

    if (!instagramUrl.trim()) return;

    if (!isValidInstagramUrl(instagramUrl)) {
      setInstagramError('Invalid Instagram URL. Must contain /p/, /reel/, or /tv/ and a valid post code.');
      return;
    }

    // Check if already in queue
    if (eventPosters.includes(instagramUrl)) {
      setInstagramError('This Instagram post is already in the queue.');
      return;
    }

    setEventPosters(prev => [...prev, instagramUrl]);
    setInstagramUrl('');
  };

  // Local state for Gallery Add Form
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');
  const [galleryMediaType, setGalleryMediaType] = useState('file'); // 'file' or 'instagram'
  const [newGalleryFile, setNewGalleryFile] = useState(null);
  const [newGalleryPreview, setNewGalleryPreview] = useState('');
  const [newGalleryInstagramUrl, setNewGalleryInstagramUrl] = useState('');
  const [galleryInstagramError, setGalleryInstagramError] = useState('');
  const [isGalleryAdding, setIsGalleryAdding] = useState(false);
  const [galleryAddSuccess, setGalleryAddSuccess] = useState(false);

  // Subscribe to Auth status on mount
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Update form inputs when eventData loaded from DB changes
  useEffect(() => {
    if (eventData) {
      setEventTitle(eventData.title);
      setEventDates(eventData.dates);
      setEventLocation(eventData.location);
      setEventYoutubeId(eventData.youtubeId);
      setEventPosters(eventData.posters || []);
    }
  }, [eventData]);

  // Auth Handler
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthSubmitting(true);
    setAuthError('');

    try {
      if (isRegistering) {
        await signUpUser(loginEmail, loginPassword);
        // Automatically switch back to login or set session
        alert("Admin account registered successfully! You can now log in.");
        setIsRegistering(false);
      } else {
        await signInUser(loginEmail, loginPassword);
      }
    } catch (err) {
      setAuthError(err.message || "An authentication error occurred.");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await signOutUser();
      onLogout();
    }
  };

  // Image Upload Queuing (Stores files locally for fast feedback, uploads on submit)
  const handleEventImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      setEventNewFiles(prev => [...prev, { file, previewUrl }]);
      setEventPosters(prev => [...prev, previewUrl]);
    });
  };

  const handleRemoveEventPoster = (indexToRemove) => {
    const posterToRemove = eventPosters[indexToRemove];
    setEventPosters(prev => prev.filter((_, idx) => idx !== indexToRemove));
    // Clear from new upload queue if it was pending
    setEventNewFiles(prev => prev.filter(f => f.previewUrl !== posterToRemove));
  };

  const handleHeroBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventHeroBgFile(file);
      setEventHeroBgPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveHeroBgPreview = () => {
    setEventHeroBgFile(null);
    setEventHeroBgPreview('');
  };

  const handleClearHeroBg = () => {
    setEventHeroBg('');
    setEventHeroBgFile(null);
    setEventHeroBgPreview('');
  };

  const handleGalleryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGalleryFile(file);
      setNewGalleryPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveGalleryPreview = () => {
    setNewGalleryFile(null);
    setNewGalleryPreview('');
  };

  // Save Event Settings to database (Firestore + Storage upload)
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setIsEventSaving(true);
    setEventSaveSuccess(false);

    try {
      // 1. Separate existing online URLs from local preview blobs/data URLs
      const existingUrls = eventPosters.filter(p => !p.startsWith('blob:') && !p.startsWith('data:'));

      // 2. Upload any new files to Cloud Storage
      const uploadPromises = eventNewFiles.map(item => uploadImage(item.file, "events"));
      const newlyUploadedUrls = await Promise.all(uploadPromises);

      // 2b. Upload new Hero Background Image if present
      let heroBgUrl = eventHeroBg;
      if (eventHeroBgFile) {
        heroBgUrl = await uploadImage(eventHeroBgFile, "hero");
      }

      // 3. Save combined array back to Firestore
      const finalPostersList = [...existingUrls, ...newlyUploadedUrls];

      await onUpdateEvent({
        title: eventTitle,
        dates: eventDates,
        location: eventLocation,
        youtubeId: eventYoutubeId,
        about: eventAbout,
        posters: finalPostersList,
        heroBgImage: heroBgUrl
      });

      // Reset local file queues
      setEventNewFiles([]);
      setEventHeroBgFile(null);
      setEventHeroBgPreview('');
      setEventSaveSuccess(true);
      setTimeout(() => setEventSaveSuccess(false), 3000);
    } catch (error) {
      alert("Failed to save event updates: " + error.message);
    } finally {
      setIsEventSaving(false);
    }
  };

  // Save Contact & Social details to database
  const handleSaveContact = async (e) => {
    e.preventDefault();
    setIsContactSaving(true);
    setContactSaveSuccess(false);
    try {
      await onUpdateContact({
        address: contactAddress,
        email: contactEmail,
        phone: contactPhone,
        instagram: socialInstagram,
        youtube: socialYoutube,
        facebook: socialFacebook
      });
      setContactSaveSuccess(true);
      setTimeout(() => setContactSaveSuccess(false), 3000);
    } catch (error) {
      alert("Failed to save contact details: " + error.message);
    } finally {
      setIsContactSaving(false);
    }
  };

  // Save Academics Config description
  const handleSaveAcademicsConfig = async (e) => {
    e.preventDefault();
    setIsAcademicsConfigSaving(true);
    setAcademicsConfigSaveSuccess(false);
    try {
      await onUpdateAcademicsConfig({
        description: academicsDescription
      });
      setAcademicsConfigSaveSuccess(true);
      setTimeout(() => setAcademicsConfigSaveSuccess(false), 3000);
    } catch (error) {
      alert("Failed to save description: " + error.message);
    } finally {
      setIsAcademicsConfigSaving(false);
    }
  };

  // Add Academic Wing Item
  const handleAddWing = async (e) => {
    e.preventDefault();
    if (!newWingName.trim() || !newWingFocus.trim()) return;
    setIsWingAdding(true);
    setWingAddSuccess(false);
    try {
      await onAddAcademicWing({
        id: Date.now().toString(),
        name: newWingName,
        focus: newWingFocus,
        status: newWingStatus
      });
      setNewWingName('');
      setNewWingFocus('');
      setNewWingStatus('Admissions Open');
      setWingAddSuccess(true);
      setTimeout(() => setWingAddSuccess(false), 3000);
    } catch (error) {
      alert("Failed to add wing: " + error.message);
    } finally {
      setIsWingAdding(false);
    }
  };

  // Delete Academic Wing Item
  const handleDeleteWing = async (id) => {
    if (confirm("Are you sure you want to permanently delete this academic wing?")) {
      try {
        await onDeleteAcademicWing(id);
      } catch (error) {
        alert("Failed to delete wing: " + error.message);
      }
    }
  };

  // Add Item to Media Gallery (Firestore + Storage upload or Instagram Link)
  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryDesc) return;

    if (galleryMediaType === 'file' && !newGalleryFile) {
      alert("Please upload an image file first.");
      return;
    }
    if (galleryMediaType === 'instagram') {
      if (!newGalleryInstagramUrl.trim()) {
        setGalleryInstagramError("Please enter an Instagram post/reel URL.");
        return;
      }
      if (!isValidInstagramUrl(newGalleryInstagramUrl)) {
        setGalleryInstagramError("Invalid Instagram URL. Must contain /p/, /reel/, or /tv/ and a valid post code.");
        return;
      }
    }

    setIsGalleryAdding(true);
    setGalleryAddSuccess(false);
    setGalleryInstagramError('');

    try {
      let mediaUrl = '';
      if (galleryMediaType === 'file') {
        // 1. Upload thumbnail image to Cloud Storage
        mediaUrl = await uploadImage(newGalleryFile, "gallery");
      } else {
        mediaUrl = newGalleryInstagramUrl.trim();
      }

      // 2. Write entry details to Cloud Firestore collection
      await onAddGallery({
        id: Date.now().toString(), // local mock id (Firestore will assign its own doc key)
        title: newGalleryTitle,
        description: newGalleryDesc,
        image: mediaUrl
      });

      // 3. Clear form states
      setNewGalleryTitle('');
      setNewGalleryDesc('');
      setNewGalleryFile(null);
      setNewGalleryPreview('');
      setNewGalleryInstagramUrl('');
      setGalleryAddSuccess(true);
      setTimeout(() => setGalleryAddSuccess(false), 3000);
    } catch (error) {
      alert("Failed to add gallery item: " + error.message);
    } finally {
      setIsGalleryAdding(false);
    }
  };

  // Delete Item from Gallery Database
  const handleDeleteGalleryItem = async (id) => {
    if (confirm("Are you sure you want to permanently delete this gallery item?")) {
      try {
        await onDeleteGallery(id);
      } catch (error) {
        alert("Failed to delete item: " + error.message);
      }
    }
  };

  // Loading spinner during auth check on initial load
  if (authLoading) {
    return (
      <div className="w-full min-h-screen py-24 flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent-gold/25 border-t-accent-gold animate-spin" />
          <span className="text-[10px] font-semibold tracking-[0.2em] text-accent-gold uppercase animate-pulse">
            Verifying Authentication...
          </span>
        </div>
      </div>
    );
  }

  // Render Login Gate UI if not authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-6 lg:px-8 relative overflow-hidden font-sans">
        {/* Ornaments */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-saffron/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 bg-arabesque-pattern opacity-[0.05] w-full h-[300px] pointer-events-none" />

        <div className="max-w-md w-full space-y-8 bg-[#111827] border border-gray-800 p-8 sm:p-10 rounded-lg shadow-xl relative z-10 text-left">
          
          <div className="text-center flex flex-col items-center">
            {/* Medallion */}
            <div className="w-16 h-16 rounded-full border border-accent-gold/40 flex items-center justify-center p-2.5 bg-white/5 mb-6 shadow-md">
              <svg viewBox="0 0 100 100" className="w-full h-full text-accent-gold" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="50" cy="50" r="45" strokeDasharray="3 3" className="opacity-60" />
                <path d="M40 65 C 40 45, 50 35, 50 35 C 50 35, 60 45, 60 65" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="50" cy="30" r="3" fill="currentColor" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
              {isRegistering ? "Register Admin Account" : "MCF Portal Access"}
            </h2>
            <p className="mt-2 text-xs text-gray-400 font-medium tracking-wide">
              {isRegistering ? "Create a new administrator login profile" : "Sign in to manage events & archives"}
            </p>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs px-4 py-3 rounded flex items-start gap-2.5 animate-fade-in-slow">
              <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleAuthSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded border border-gray-800 bg-black/35 focus:border-accent-gold focus:outline-none text-xs text-white transition-all font-mono"
                  placeholder="admin@mahlaratushaduliyya.org"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded border border-gray-800 bg-black/35 focus:border-accent-gold focus:outline-none text-xs text-white transition-all font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-accent-gold hover:bg-accent-saffron disabled:bg-accent-gold/40 text-white text-xs font-bold tracking-widest uppercase shadow transition-all cursor-pointer mt-4"
            >
              {authSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isRegistering ? "Registering..." : "Verifying..."}</span>
                </>
              ) : (
                <span>{isRegistering ? "Create Profile" : "Authenticate Access"}</span>
              )}
            </button>
          </form>

          {/* Toggle Register / Login */}
          <div className="pt-4 flex flex-col items-center gap-3 border-t border-gray-800">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setAuthError('');
              }}
              className="text-[10px] text-accent-gold hover:text-accent-saffron font-bold uppercase tracking-wider transition-colors"
            >
              {isRegistering ? "Back to Login Portal" : "Configure New Credentials?"}
            </button>

            <button
              onClick={onLogout}
              className="text-[10px] text-gray-500 hover:text-gray-400 uppercase tracking-wider transition-colors"
            >
              Return to Website
            </button>
          </div>

          {/* Mock credentials tip */}
          {!isFirebaseConfigured && (
            <div className="mt-4 bg-amber-500/10 border border-amber-500/25 p-3.5 rounded text-[10px] text-amber-200 leading-relaxed font-sans">
              <strong>Developer Note:</strong> Firebase environment is empty. Running in bypass mode. You can log in using 
              <code className="text-accent-gold font-mono mx-1">admin@mcf.org</code> / 
              <code className="text-accent-gold font-mono mx-1">adminpassword</code> or register any mock account.
            </div>
          )}

        </div>
      </div>
    );
  }

  // authenticated layout
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-charcoal">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#111827] text-white flex flex-col shrink-0 border-r border-accent-gold/20">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-accent-gold/40 flex items-center justify-center p-1 bg-white/5 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-accent-gold" fill="none" stroke="currentColor" strokeWidth="3.5">
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <path d="M40 65 C 40 45, 50 35, 50 35 C 50 35, 60 45, 60 65" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-sm tracking-wider font-semibold text-white">MCF Control</span>
            <span className="text-[8px] tracking-widest text-accent-gold uppercase font-medium">Administrator</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow p-4 space-y-1.5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all duration-200 ${
              activeTab === 'dashboard' 
                ? 'bg-accent-gold text-white shadow-sm' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all duration-200 ${
              activeTab === 'events' 
                ? 'bg-accent-gold text-white shadow-sm' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Events</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all duration-200 ${
              activeTab === 'gallery' 
                ? 'bg-accent-gold text-white shadow-sm' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Manage Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('academics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all duration-200 ${
              activeTab === 'academics' 
                ? 'bg-accent-gold text-white shadow-sm' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>Manage Academics</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all duration-200 ${
              activeTab === 'contact' 
                ? 'bg-accent-gold text-white shadow-sm' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Manage Contact & Socials</span>
          </button>
        </nav>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          {/* View Live Site Trigger */}
          <button
            onClick={onLogout} // returns to homepage view
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold tracking-wider uppercase border border-gray-800 text-gray-400 hover:text-accent-gold hover:border-accent-gold transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </button>

          {/* Logout Trigger */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold tracking-wider uppercase text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto max-h-screen">
        
        {/* HEADER PANEL */}
        <header className="mb-10 flex items-center justify-between flex-wrap gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal tracking-tight capitalize">
              {activeTab} Management
            </h1>
            <p className="text-sm text-mediumgray mt-1">
              {activeTab === 'dashboard' && "Control center overview for live content indicators."}
              {activeTab === 'events' && "Edit upcoming events details, active YouTube streams, and event banners."}
              {activeTab === 'gallery' && "Upload media archives, add heritage documents, or delete posts."}
              {activeTab === 'academics' && "Manage educational wings, admissions status, and academics description."}
              {activeTab === 'contact' && "Configure organization address, phone, email, and social networks."}
            </p>
          </div>
          <div className="text-xs text-mediumgray bg-white border border-gray-200 px-3 py-1.5 rounded shadow-sm shrink-0">
            System Live Status: <span className="text-emerald-600 font-bold ml-1 animate-pulse">● Connected</span>
          </div>
        </header>

        {/* TAB WORKSPACE CONTENT */}
        
        {/* TAB 0: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-slow">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col">
                <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase mb-2">Active Event</span>
                <h3 className="text-lg font-serif font-semibold text-charcoal leading-snug flex-grow">
                  {eventData.title}
                </h3>
                <span className="text-xs text-mediumgray mt-4 block">Status: Published</span>
              </div>

              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col">
                <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase mb-2">Gallery Items</span>
                <h3 className="text-3xl font-bold font-serif text-charcoal flex-grow mt-2">
                  {galleryData.length}
                </h3>
                <span className="text-xs text-mediumgray mt-4 block">Active Archives</span>
              </div>

              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col">
                <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase mb-2">Live Stream ID</span>
                <h3 className="text-lg font-mono text-mediumgray font-semibold leading-snug flex-grow mt-2">
                  {eventData.youtubeId || "None"}
                </h3>
                <span className="text-xs text-emerald-600 font-semibold mt-4 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  YouTube Active
                </span>
              </div>

            </div>

            {/* Live Event Banner Preview Card */}
            <div className="bg-[#0B3921]/5 border border-emerald-950/10 p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl text-left">
                <span className="inline-block bg-accent-saffron/15 border border-accent-saffron/30 text-accent-saffron text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded mb-2">
                  Live Banner Preview
                </span>
                <h4 className="text-base font-serif font-semibold text-[#0B3921] mb-1">
                  🌙 {eventData.title}
                </h4>
                <p className="text-xs text-mediumgray">
                  <strong>Date:</strong> {eventData.dates} | <strong>Location:</strong> {eventData.location}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('events')}
                className="px-5 py-2 rounded bg-[#0B3921] hover:bg-emerald-900 text-white font-semibold text-xs tracking-wider uppercase shadow transition-all shrink-0 self-start md:self-auto"
              >
                Change Event Info
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: MANAGE EVENTS FORM */}
        {activeTab === 'events' && (
          <form onSubmit={handleSaveEvent} className="bg-white p-8 rounded border border-gray-200 shadow-sm space-y-6 max-w-3xl animate-fade-in-slow text-left">
            <h2 className="text-xl font-serif font-semibold text-charcoal border-b border-gray-100 pb-3 mb-4">
              Upcoming Event Landing Info
            </h2>

            {/* Event Title Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                Event Title
              </label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                placeholder="e.g., C.P. Ustad 25th Uroos Mubarak"
              />
            </div>

            {/* Event Dates & Venue Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Event Dates */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                  Event Dates
                </label>
                <input
                  type="text"
                  value={eventDates}
                  onChange={(e) => setEventDates(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                  placeholder="e.g., June 01 & 02, 2026"
                />
              </div>

              {/* Event Venue */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                  Event Venue / Location
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                  placeholder="e.g., Mahlaratushaduliyya, Avilora"
                />
              </div>

            </div>

            {/* YouTube Link ID */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase flex items-center justify-between">
                <span>YouTube Live ID / URL</span>
                <span className="text-[10px] text-mediumgray font-normal lowercase">(e.g., dQw4w9WgXcQ or full link)</span>
              </label>
              <input
                type="text"
                value={eventYoutubeId}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.includes("v=")) {
                    val = val.split("v=")[1].split("&")[0];
                  } else if (val.includes("youtu.be/")) {
                    val = val.split("youtu.be/")[1].split("?")[0];
                  } else if (val.includes("embed/")) {
                    val = val.split("embed/")[1].split("?")[0];
                  }
                  setEventYoutubeId(val);
                }}
                required
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white font-mono"
                placeholder="e.g., dQw4w9WgXcQ"
              />
            </div>

            {/* Event About Text Description */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                About the Event (Description)
              </label>
              <textarea
                value={eventAbout}
                onChange={(e) => setEventAbout(e.target.value)}
                required
                rows="6"
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white resize-y"
                placeholder="Provide event details, description, schedule summaries..."
              />
            </div>

            {/* Hero Background Image Uploader */}
            <div className="flex flex-col gap-2 border-t border-gray-150 pt-6">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase flex items-center justify-between">
                <span>Hero Section Background Image</span>
                {(eventHeroBg || eventHeroBgPreview) && (
                  <button
                    type="button"
                    onClick={handleClearHeroBg}
                    className="text-[10px] text-red-650 hover:text-red-700 font-bold uppercase tracking-wider transition-colors"
                  >
                    Clear Image (Use Fallback White Theme)
                  </button>
                )}
              </label>
              <p className="text-[11px] text-mediumgray -mt-1 leading-relaxed">
                Add an immersive background photo to the landing screen. An overlay will automatically protect text legibility.
              </p>
              
              {eventHeroBgPreview || eventHeroBg ? (
                <div className="relative rounded-lg border border-gray-200 overflow-hidden aspect-[21/9] bg-gray-100 max-w-xl group">
                  <img
                    src={eventHeroBgPreview || eventHeroBg}
                    alt="Hero Background Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                    <label className="p-2 bg-white text-charcoal rounded-full hover:bg-gray-100 cursor-pointer shadow transition-all hover:scale-105">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroBgImageUpload}
                        className="hidden"
                      />
                      <Upload className="w-4 h-4" />
                    </label>
                    <button
                      type="button"
                      onClick={eventHeroBgPreview ? handleRemoveHeroBgPreview : handleClearHeroBg}
                      className="p-2 bg-red-650 text-white rounded-full hover:bg-red-750 shadow transition-all hover:scale-105"
                      title={eventHeroBgPreview ? "Cancel upload" : "Clear background image"}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {eventHeroBgPreview && (
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-accent-gold text-white text-[9px] font-bold tracking-widest uppercase rounded">
                      New Pending Upload
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 hover:border-accent-gold rounded-lg p-6 flex flex-col items-center justify-center transition-all bg-gray-50 relative cursor-pointer group max-w-xl">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroBgImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-7 h-7 text-mediumgray group-hover:text-accent-gold transition-colors mb-2" />
                  <span className="text-xs font-semibold text-charcoal mb-0.5">
                    Click or Drag Image to Upload Hero Cover
                  </span>
                  <span className="text-[10px] text-mediumgray">
                    Recommended ratio: 16:9 or wider (JPG, PNG).
                  </span>
                </div>
              )}
            </div>

            {/* Event Images Uploader */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                Upload Event Posters & Photos
              </label>
              <div className="border-2 border-dashed border-gray-300 hover:border-accent-gold rounded-lg p-6 flex flex-col items-center justify-center transition-all bg-gray-50 relative cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleEventImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-mediumgray group-hover:text-accent-gold transition-colors mb-2" />
                <span className="text-xs font-semibold text-charcoal mb-1">
                  Drag & Drop or Click to Upload
                </span>
                <span className="text-[10px] text-mediumgray">
                  Supports JPG, PNG formats. Multiple files allowed.
                </span>
              </div>
            </div>

            {/* Instagram Link Field */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase flex items-center justify-between">
                <span>Link Instagram Post / Reel URL</span>
                <span className="text-[10px] text-mediumgray font-normal lowercase">(e.g., https://www.instagram.com/p/CODE/)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="flex-grow px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                  placeholder="Paste Instagram link here..."
                />
                <button
                  type="button"
                  onClick={handleLinkInstagram}
                  className="px-5 py-2.5 bg-accent-gold hover:bg-accent-saffron text-white text-xs font-bold tracking-widest uppercase transition-all rounded shadow-sm shrink-0"
                >
                  Link Post
                </button>
              </div>
              {instagramError && (
                <span className="text-xs text-red-600 font-semibold mt-1">
                  {instagramError}
                </span>
              )}
            </div>

            {/* Uploaded Queue Preview */}
            {eventPosters.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-charcoal uppercase block mb-1">
                  Posters & Highlights Queue ({eventPosters.length})
                </span>
                <div className="border border-gray-100 p-4 rounded-lg bg-gray-50/50">
                  <div className="flex flex-wrap gap-4">
                    {eventPosters.map((poster, index) => {
                      const instagramId = getInstagramPostId(poster);
                      return (
                        <div key={index} className="w-20 h-24 rounded border border-gray-200 relative overflow-hidden bg-white shrink-0 group flex flex-col items-center justify-center text-center p-1">
                          {instagramId ? (
                            <>
                              <svg 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-6 h-6 text-[#E1306C] mb-1 shrink-0 animate-pulse"
                              >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                              </svg>
                              <span className="text-[9px] font-bold text-charcoal truncate w-full px-1">
                                {instagramId}
                              </span>
                              <span className="text-[7px] text-mediumgray uppercase tracking-widest font-semibold mt-0.5">
                                Instagram
                              </span>
                            </>
                          ) : (
                            <img
                              src={poster}
                              alt={`Poster ${index}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveEventPoster(index)}
                            className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Save Buttons */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
              <button
                type="submit"
                disabled={isEventSaving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accent-gold hover:bg-accent-saffron disabled:bg-accent-gold/40 text-white text-xs font-bold tracking-widest uppercase shadow transition-all cursor-pointer"
              >
                {isEventSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Save & Publish Event</span>
                )}
              </button>

              {eventSaveSuccess && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold animate-fade-in-slow">
                  <Check className="w-4 h-4" />
                  <span>Updates pushed to live site successfully!</span>
                </span>
              )}
            </div>
          </form>
        )}

        {/* TAB 3: MANAGE GALLERY */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fade-in-slow">
            
            {/* Form Column: Add Item (Takes 5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded border border-gray-200 shadow-sm h-fit self-start">
              <h2 className="text-lg font-serif font-semibold text-charcoal border-b border-gray-100 pb-3 mb-6">
                Add New Gallery Item
              </h2>

              <form onSubmit={handleAddGalleryItem} className="space-y-4">
                
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newGalleryTitle}
                    onChange={(e) => setNewGalleryTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-xs transition-all bg-white"
                    placeholder="e.g., The Living History"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                    Description
                  </label>
                  <textarea
                    value={newGalleryDesc}
                    onChange={(e) => setNewGalleryDesc(e.target.value)}
                    required
                    rows="3"
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-xs transition-all bg-white resize-y"
                    placeholder="Provide short context..."
                  />
                </div>

                {/* Gallery Content Type Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                    Content Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded border border-gray-250">
                    <button
                      type="button"
                      onClick={() => setGalleryMediaType('file')}
                      className={`py-1.5 text-[10px] font-bold tracking-wider uppercase rounded transition-all ${
                        galleryMediaType === 'file'
                          ? 'bg-white text-charcoal shadow-sm'
                          : 'text-mediumgray hover:text-charcoal'
                      }`}
                    >
                      File Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryMediaType('instagram')}
                      className={`py-1.5 text-[10px] font-bold tracking-wider uppercase rounded transition-all ${
                        galleryMediaType === 'instagram'
                          ? 'bg-white text-charcoal shadow-sm'
                          : 'text-mediumgray hover:text-charcoal'
                      }`}
                    >
                      Instagram Link
                    </button>
                  </div>
                </div>

                {/* Conditional Media Input Area */}
                {galleryMediaType === 'file' ? (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                      Image File
                    </label>
                    {newGalleryPreview ? (
                      <div className="relative rounded overflow-hidden aspect-[4/3] border border-gray-200 bg-gray-50">
                        <img
                          src={newGalleryPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveGalleryPreview}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="border border-dashed border-gray-300 hover:border-accent-gold rounded p-4 flex flex-col items-center justify-center transition-all bg-gray-50 cursor-pointer relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGalleryImageUpload}
                          required
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-6 h-6 text-mediumgray group-hover:text-accent-gold transition-colors mb-1" />
                        <span className="text-[10px] font-semibold text-charcoal">
                          Upload Thumbnail
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                      Instagram Post / Reel URL
                    </label>
                    <input
                      type="text"
                      value={newGalleryInstagramUrl}
                      onChange={(e) => {
                        setNewGalleryInstagramUrl(e.target.value);
                        setGalleryInstagramError('');
                      }}
                      required
                      className="w-full px-3 py-2 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-xs transition-all bg-white"
                      placeholder="e.g., https://www.instagram.com/p/CODE/"
                    />
                    {galleryInstagramError && (
                      <span className="text-xs text-red-650 font-semibold mt-1">
                        {galleryInstagramError}
                      </span>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isGalleryAdding}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-accent-gold hover:bg-accent-saffron disabled:bg-accent-gold/40 text-white text-[10px] font-bold tracking-widest uppercase shadow transition-all cursor-pointer"
                  >
                    {isGalleryAdding ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Gallery</span>
                      </>
                    )}
                  </button>

                  {galleryAddSuccess && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold animate-fade-in-slow">
                      <Check className="w-3 h-3" />
                      <span>Added!</span>
                    </span>
                  )}
                </div>

              </form>
            </div>

            {/* List Column: View and Delete (Takes 7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded border border-gray-200 shadow-sm">
              <h2 className="text-lg font-serif font-semibold text-charcoal border-b border-gray-100 pb-3 mb-6">
                Active Gallery Items ({galleryData.length})
              </h2>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {galleryData.map((item) => (
                  <div 
                    key={item.id}
                    className="flex gap-4 p-3 border border-gray-150 rounded hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-16 rounded overflow-hidden bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center">
                      {getInstagramPostId(item.image) ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white p-1 select-none">
                          <svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-4 h-4"
                          >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                          <span className="text-[7px] font-mono tracking-wider font-bold truncate max-w-full mt-0.5">
                            {getInstagramPostId(item.image)}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-serif font-bold text-charcoal truncate mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-mediumgray line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="shrink-0 flex items-center">
                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MANAGE CONTACT & SOCIALS */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSaveContact} className="bg-white p-8 rounded border border-gray-200 shadow-sm space-y-6 max-w-3xl animate-fade-in-slow text-left">
            <h2 className="text-xl font-serif font-semibold text-charcoal border-b border-gray-100 pb-3 mb-4">
              Organization Contact Info
            </h2>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                Physical Address
              </label>
              <input
                type="text"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                placeholder="e.g., Mahlaratushaduliyya Cultural Foundation, Kerala, India."
              />
            </div>

            {/* Email and Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                  placeholder="e.g., info@mahlaratushaduliyya.org"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                  placeholder="e.g., +91 98765 43210"
                />
              </div>
            </div>

            <h2 className="text-xl font-serif font-semibold text-charcoal border-b border-gray-100 pb-3 mt-8 mb-4">
              Social Media Connections
            </h2>

            {/* Instagram URL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                Instagram Link
              </label>
              <input
                type="url"
                value={socialInstagram}
                onChange={(e) => setSocialInstagram(e.target.value)}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                placeholder="e.g., https://instagram.com/profile"
              />
            </div>

            {/* YouTube Link */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                YouTube Channel Link
              </label>
              <input
                type="url"
                value={socialYoutube}
                onChange={(e) => setSocialYoutube(e.target.value)}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                placeholder="e.g., https://youtube.com/channel"
              />
            </div>

            {/* Facebook Link */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                Facebook Link
              </label>
              <input
                type="url"
                value={socialFacebook}
                onChange={(e) => setSocialFacebook(e.target.value)}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white"
                placeholder="e.g., https://facebook.com/page"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
              <button
                type="submit"
                disabled={isContactSaving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accent-gold hover:bg-accent-saffron disabled:bg-accent-gold/40 text-white text-xs font-bold tracking-widest uppercase shadow transition-all cursor-pointer"
              >
                {isContactSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Contact Details</span>
                )}
              </button>

              {contactSaveSuccess && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold animate-fade-in-slow">
                  <Check className="w-4 h-4" />
                  <span>Contact info updated successfully!</span>
                </span>
              )}
            </div>
          </form>
        )}

        {/* TAB 5: MANAGE ACADEMICS */}
        {activeTab === 'academics' && (
          <div className="space-y-8 animate-fade-in-slow text-left">
            {/* Section Description Settings Form */}
            <form onSubmit={handleSaveAcademicsConfig} className="bg-white p-8 rounded border border-gray-200 shadow-sm space-y-6 max-w-3xl">
              <h2 className="text-xl font-serif font-semibold text-charcoal border-b border-gray-100 pb-3 mb-4">
                Education & Research Section Text
              </h2>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                  Section Description / Intro
                </label>
                <textarea
                  value={academicsDescription}
                  onChange={(e) => setAcademicsDescription(e.target.value)}
                  required
                  rows="3"
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-sm transition-all bg-white resize-y"
                  placeholder="Provide description for the Academics & Admissions homepage section..."
                />
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isAcademicsConfigSaving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accent-gold hover:bg-accent-saffron disabled:bg-accent-gold/40 text-white text-xs font-bold tracking-widest uppercase shadow transition-all cursor-pointer"
                >
                  {isAcademicsConfigSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Intro Text</span>
                  )}
                </button>

                {academicsConfigSaveSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold animate-fade-in-slow">
                    <Check className="w-4 h-4" />
                    <span>Intro text updated!</span>
                  </span>
                )}
              </div>
            </form>

            {/* Academic Wings CRUD Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form: Add Academic Wing */}
              <div className="lg:col-span-5 bg-white p-6 rounded border border-gray-200 shadow-sm h-fit self-start">
                <h2 className="text-lg font-serif font-semibold text-charcoal border-b border-gray-100 pb-3 mb-6">
                  Add New Academic Wing
                </h2>

                <form onSubmit={handleAddWing} className="space-y-4">
                  {/* Wing Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                      Wing / Institute Name
                    </label>
                    <input
                      type="text"
                      value={newWingName}
                      onChange={(e) => setNewWingName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-xs transition-all bg-white"
                      placeholder="e.g., Academy of Quran Studies"
                    />
                  </div>

                  {/* Focus Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                      Focus / Specialization Focus
                    </label>
                    <textarea
                      value={newWingFocus}
                      onChange={(e) => setNewWingFocus(e.target.value)}
                      required
                      rows="3"
                      className="w-full px-3 py-2 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-xs transition-all bg-white resize-y"
                      placeholder="e.g., Advanced Quranic tafseer, tajweed precision..."
                    />
                  </div>

                  {/* Status Badging */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold tracking-wider text-charcoal uppercase">
                      Admissions Status Label
                    </label>
                    <select
                      value={newWingStatus}
                      onChange={(e) => setNewWingStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-gray-300 focus:border-accent-gold focus:outline-none text-xs transition-all bg-white"
                    >
                      <option value="Admissions Open">Admissions Open</option>
                      <option value="Admissions Closed">Admissions Closed</option>
                      <option value="Coming Soon">Coming Soon</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={isWingAdding}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-accent-gold hover:bg-accent-saffron disabled:bg-accent-gold/40 text-white text-[10px] font-bold tracking-widest uppercase shadow transition-all cursor-pointer"
                    >
                      {isWingAdding ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Wing</span>
                        </>
                      )}
                    </button>

                    {wingAddSuccess && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold animate-fade-in-slow">
                        <Check className="w-3 h-3" />
                        <span>Added Wing!</span>
                      </span>
                    )}
                  </div>
                </form>
              </div>

              {/* List: View & Delete Academic Wings */}
              <div className="lg:col-span-7 bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h2 className="text-lg font-serif font-semibold text-charcoal border-b border-gray-100 pb-3 mb-6">
                  Active Academic Wings ({academicsData.length})
                </h2>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {academicsData.map((wing) => (
                    <div 
                      key={wing.id}
                      className="flex gap-4 p-4 border border-gray-150 rounded hover:bg-gray-50/50 transition-colors items-start"
                    >
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <h4 className="text-sm font-serif font-bold text-charcoal">
                            {wing.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase border border-accent-saffron/20 bg-accent-saffron/5 text-accent-saffron">
                            {wing.status}
                          </span>
                        </div>
                        <p className="text-xs text-mediumgray leading-relaxed">
                          {wing.focus}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center mt-1">
                        <button
                          onClick={() => handleDeleteWing(wing.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Wing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
