import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  addDoc, 
  deleteDoc, 
  query, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

// Check if Firebase keys are present in Vite env variables
export const isFirebaseConfigured = !!(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let authInstance = null;
let dbInstance = null;
let storageInstance = null;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
} else {
  console.warn("Firebase credentials not configured. Running in Local Mock Mode.");
}

// Default fallbacks for Mock mode and seeding
const defaultEventData = {
  title: "C.P. Ustad 25th Uroos Mubarak",
  dates: "June 01 & 02, 2026",
  location: "Mahlaratushaduliyya, Avilora",
  youtubeId: "dQw4w9WgXcQ",
  about: "The event C.P. Ustad 25th Uroos Mubarak represents a cornerstone spiritual and educational program hosted by the Mahlaratushaduliyya Cultural Foundation. Taking place at Mahlaratushaduliyya, Avilora, the assemblies gather together prominent scholars, community leaders, and alumni to explore traditional sciences, recite spiritual devotions, and participate in academic panels.\n\nAll programs are broadcast in real-time, allowing viewers from across the globe to connect with our heritage archives and actively participate in collective prayer services.",
  posters: [
    "/uroos_poster.png",
    "/uroos_gathering.png"
  ],
  homePosters: [
    "/uroos_poster.png",
    "/uroos_gathering.png"
  ],
  highlights: [
    "/uroos_poster.png",
    "/uroos_gathering.png",
    "/spiritual_gathering.png"
  ],
  heroBgImage: "/spiritual_gathering.png"
};

const defaultGalleryData = [
  {
    id: "1",
    title: 'The Living History',
    description: "Archival photos and biographical highlights of Kerala's historical scholars.",
    image: '/scholar_heritage.png',
    showOnHome: true,
  },
  {
    id: "2",
    title: 'Preserving the Written Word',
    description: 'Glimpses of rare Kitabs and historical manuscripts digitized for our library.',
    image: '/rare_manuscripts.png',
    showOnHome: true,
  },
  {
    id: "3",
    title: 'Mahlara in Action',
    description: 'Capturing the spiritual essence, prayers, and community gatherings.',
    image: '/spiritual_gathering.png',
    showOnHome: false,
  },
];

const defaultContactData = {
  address: "Mahlaratushaduliyya Cultural Foundation, Kerala, India.",
  email: "info@mahlaratushaduliyya.org",
  phone: "+91 XXXX XXX XXX",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
  facebook: "https://facebook.com/"
};

const defaultAboutData = {
  story: "Founded under the spiritual guidance of C.P. Ustad, the Mahlaratushaduliyya Cultural Foundation has stood as a beacon of sacred learning, research, and community guidance in Avilora for over two decades. Our journey began with a simple commitment: to preserve the classical teachings of Islam while empowering students to engage productively with the contemporary world.\n\nThrough dedicated academies of study, we continue to cultivate deep theological inquiry and traditional sciences, fostering a generation of scholars who bridge sacred tradition with modern innovation. Our programs focus on textual preservation, spiritual refinement, and intellectual leadership.",
  mission: "To preserve and digitize our rich cultural and manuscript heritage, provide rigorous and accessible theological education through specialized academic wings, and cultivate a community of spiritual proficiency and service.",
  vision: "To become a globally recognized center for Islamic legacy preservation, academic research, and spiritual elevation, cultivating intellectual depth and sacred proficiency.",
  pillars: [
    {
      title: "Sacred Preservation",
      desc: "Digitizing, archiving, and translating classical manuscripts and classical theological works to safeguard cultural heritage.",
      icon: "book"
    },
    {
      title: "Intellectual Rigor",
      desc: "Nurturing deep scholarship, traditional tafseer research, and religious precision across our specialized academy wings.",
      icon: "quill"
    },
    {
      title: "Spiritual Cultivation",
      desc: "Enriching community life through assemblies of prayer, educational Uroos conventions, and collective remembrance.",
      icon: "spiritual"
    },
    {
      title: "Modern Accessibility",
      desc: "Developing online learning setups, real-time broadcasts, and digitizing files to make sacred wisdom accessible.",
      icon: "globe"
    }
  ],
  milestones: [
    {
      year: '2001',
      title: 'Spiritual Legacy Begun',
      description: 'Under the supervision and guidance of C.P. Ustad, the initial lectures and educational assemblies were established in Avilora, planting the seeds of Islamic scholarship.'
    },
    {
      year: '2006',
      title: 'Foundation Incorporation',
      description: 'The Mahlaratushaduliyya Cultural Foundation was officially established as a centralized body to manage cultural preservation and community welfare.'
    },
    {
      year: '2014',
      title: 'Academy Wings Launched',
      description: 'Inauguration of the specialized Academies of Quran Studies and Cultural Research, structuring traditional sciences into rigorous educational paths.'
    },
    {
      year: '2021',
      title: 'Digital Preservation Program',
      description: 'Initiated the digitization of historical manuscripts, archiving rare Kitabs, and offering global community broadcasts.'
    },
    {
      year: '2026',
      title: '25th Uroos Mubarak Jubilee',
      description: 'Celebrating 25 years of educational excellence, community elevation, and spiritual preservation with global academic assemblies.'
    }
  ]
};

const defaultAcademicsConfig = {
  description: "Hosting premier educational institutes dedicated to deep research, intellectual preservation, and spiritual proficiency."
};

const defaultAcademicsData = [
  {
    id: "1",
    name: 'Academy of Cultural Research',
    focus: 'Deep-dive research into Islamic history, local cultural evolution, and socio-religious heritage.',
    status: 'Admissions Open',
  },
  {
    id: "2",
    name: 'Academy of Quran Studies',
    focus: 'Advanced Quranic tafseer, tajweed precision, and contextual applications of the Holy Text.',
    status: 'Admissions Open',
  },
  {
    id: "3",
    name: 'ASIL (Academy of Studies in Islamic Legacy)',
    focus: 'A prestigious wing dedicated to the preservation, translation, and study of classical Islamic manuscripts and legacy.',
    status: 'Admissions Open',
  },
];

// Local subscriptions array for Mock Mode state changes
const mockEventListeners = [];
const mockGalleryListeners = [];
const mockAuthListeners = [];
const mockContactListeners = [];
const mockAcademicsListeners = [];
const mockAcademicsConfigListeners = [];
const mockAboutListeners = [];

// Helper to notify Mock state updates
const notifyEventSubscribers = () => {
  const currentData = getMockEventData();
  mockEventListeners.forEach(cb => cb(currentData));
};

const notifyGallerySubscribers = () => {
  const currentData = getMockGalleryData();
  mockGalleryListeners.forEach(cb => cb(currentData));
};

const notifyContactSubscribers = () => {
  const currentData = getMockContactData();
  mockContactListeners.forEach(cb => cb(currentData));
};

const notifyAcademicsSubscribers = () => {
  const currentData = getMockAcademicsData();
  mockAcademicsListeners.forEach(cb => cb(currentData));
};

const notifyAboutSubscribers = () => {
  const currentData = getMockAboutData();
  mockAboutListeners.forEach(cb => cb(currentData));
};

const notifyAcademicsConfigSubscribers = () => {
  const currentData = getMockAcademicsConfigData();
  mockAcademicsConfigListeners.forEach(cb => cb(currentData));
};

const getMockEventData = () => {
  const data = localStorage.getItem('mcf_event');
  if (data) {
    const parsed = JSON.parse(data);
    if (parsed.heroBgImage === undefined) {
      parsed.heroBgImage = defaultEventData.heroBgImage;
    }
    if (parsed.highlights === undefined) {
      parsed.highlights = defaultEventData.highlights;
    }
    if (parsed.homePosters === undefined) {
      parsed.homePosters = parsed.posters || defaultEventData.homePosters;
    }
    return parsed;
  }
  return defaultEventData;
};

const getMockGalleryData = () => {
  const data = localStorage.getItem('mcf_gallery');
  return data ? JSON.parse(data) : defaultGalleryData;
};

const getMockContactData = () => {
  const data = localStorage.getItem('mcf_contact');
  return data ? JSON.parse(data) : defaultContactData;
};

const getMockAcademicsConfigData = () => {
  const data = localStorage.getItem('mcf_academics_config');
  return data ? JSON.parse(data) : defaultAcademicsConfig;
};

const getMockAcademicsData = () => {
  const data = localStorage.getItem('mcf_academics');
  return data ? JSON.parse(data) : defaultAcademicsData;
};

const getMockAboutData = () => {
  const data = localStorage.getItem('mcf_about');
  if (data) {
    const parsed = JSON.parse(data);
    if (parsed.story === undefined) parsed.story = defaultAboutData.story;
    if (parsed.mission === undefined) parsed.mission = defaultAboutData.mission;
    if (parsed.vision === undefined) parsed.vision = defaultAboutData.vision;
    if (parsed.pillars === undefined) parsed.pillars = defaultAboutData.pillars;
    if (parsed.milestones === undefined) parsed.milestones = defaultAboutData.milestones;
    return parsed;
  }
  return defaultAboutData;
};

// ----------------------------------------------------
// DYNAMIC FIREBASE SEEDING LOGIC
// ----------------------------------------------------

const seedEventData = async (db, storage) => {
  try {
    console.log("Seeding default event data to Firebase Storage...");
    const uploadedPosters = [];
    for (const posterPath of defaultEventData.posters) {
      const response = await fetch(posterPath);
      const blob = await response.blob();
      const filename = posterPath.substring(1);
      const file = new File([blob], filename, { type: blob.type });

      // Upload to Storage
      const storageRef = ref(storage, `events/seeded_${Date.now()}_${filename}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      uploadedPosters.push(downloadUrl);
    }

    let seededHeroBgImage = defaultEventData.heroBgImage;
    if (seededHeroBgImage && seededHeroBgImage.startsWith('/')) {
      try {
        const response = await fetch(seededHeroBgImage);
        const blob = await response.blob();
        const filename = seededHeroBgImage.substring(1);
        const file = new File([blob], filename, { type: blob.type });
        const storageRef = ref(storage, `hero/seeded_${Date.now()}_${filename}`);
        const uploadResult = await uploadBytes(storageRef, file);
        seededHeroBgImage = await getDownloadURL(uploadResult.ref);
      } catch (err) {
        console.error("Error seeding default hero background image:", err);
      }
    }

    const seededData = {
      ...defaultEventData,
      posters: uploadedPosters,
      homePosters: uploadedPosters,
      heroBgImage: seededHeroBgImage
    };

    await setDoc(doc(db, "settings", "event"), seededData);
    console.log("Successfully seeded default event to Firestore!");
    return seededData;
  } catch (error) {
    console.error("Error seeding default event:", error);
    await setDoc(doc(db, "settings", "event"), defaultEventData);
    return defaultEventData;
  }
};

const seedGalleryData = async (db, storage) => {
  try {
    console.log("Seeding default gallery items to Firebase Storage...");
    const seededItems = [];
    for (const item of defaultGalleryData) {
      const response = await fetch(item.image);
      const blob = await response.blob();
      const filename = item.image.substring(1);
      const file = new File([blob], filename, { type: blob.type });

      // Upload to Storage
      const storageRef = ref(storage, `gallery/seeded_${Date.now()}_${filename}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      const firebaseData = {
        title: item.title,
        description: item.description,
        image: downloadUrl,
        showOnHome: item.showOnHome || false
      };

      const docRef = await addDoc(collection(db, "gallery"), firebaseData);
      seededItems.push({ id: docRef.id, ...firebaseData });
    }
    console.log("Successfully seeded default gallery to Firestore!");
    return seededItems;
  } catch (error) {
    console.error("Error seeding default gallery:", error);
    return defaultGalleryData;
  }
};

const seedContactData = async (db) => {
  try {
    console.log("Seeding default contact data to Firestore...");
    await setDoc(doc(db, "settings", "contact"), defaultContactData);
    return defaultContactData;
  } catch (error) {
    console.error("Error seeding default contact data:", error);
    return defaultContactData;
  }
};

const seedAcademicsConfig = async (db) => {
  try {
    console.log("Seeding default academics config to Firestore...");
    await setDoc(doc(db, "settings", "academics"), defaultAcademicsConfig);
    return defaultAcademicsConfig;
  } catch (error) {
    console.error("Error seeding default academics config:", error);
    return defaultAcademicsConfig;
  }
};

const seedAcademicsData = async (db) => {
  try {
    console.log("Seeding default academics data to Firestore...");
    const items = [];
    for (const item of defaultAcademicsData) {
      const { id, ...firebaseData } = item;
      const docRef = await addDoc(collection(db, "academics"), firebaseData);
      items.push({ id: docRef.id, ...firebaseData });
    }
    return items;
  } catch (error) {
    console.error("Error seeding default academics data:", error);
    return defaultAcademicsData;
  }
};

// ----------------------------------------------------
// PUBLIC API IMPLEMENTATION (Seams/Interface)
// ----------------------------------------------------

// AUTHENTICATION

export const signInUser = async (email, password) => {
  if (isFirebaseConfigured && authInstance) {
    return signInWithEmailAndPassword(authInstance, email, password);
  } else {
    const mockUsers = JSON.parse(localStorage.getItem('mcf_mock_users') || '[]');
    if (email === 'admin@mcf.org' && password === 'adminpassword') {
      localStorage.setItem('mcf_mock_session', 'true');
      mockAuthListeners.forEach(cb => cb({ email, uid: 'mock-admin' }));
      return { user: { email, uid: 'mock-admin' } };
    }
    const found = mockUsers.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('mcf_mock_session', 'true');
      mockAuthListeners.forEach(cb => cb({ email, uid: found.uid }));
      return { user: { email, uid: found.uid } };
    }
    throw new Error("Invalid admin credentials. (Use email: admin@mcf.org and password: adminpassword for local bypass).");
  }
};

export const signUpUser = async (email, password) => {
  if (isFirebaseConfigured && authInstance) {
    return createUserWithEmailAndPassword(authInstance, email, password);
  } else {
    const mockUsers = JSON.parse(localStorage.getItem('mcf_mock_users') || '[]');
    if (email === 'admin@mcf.org' || mockUsers.some(u => u.email === email)) {
      throw new Error("Email already registered.");
    }
    const newUser = { email, password, uid: `mock-${Date.now()}` };
    mockUsers.push(newUser);
    localStorage.setItem('mcf_mock_users', JSON.stringify(mockUsers));
    return { user: newUser };
  }
};

export const signOutUser = async () => {
  if (isFirebaseConfigured && authInstance) {
    return signOut(authInstance);
  } else {
    localStorage.removeItem('mcf_mock_session');
    mockAuthListeners.forEach(cb => cb(null));
    return true;
  }
};

export const subscribeToAuth = (callback) => {
  if (isFirebaseConfigured && authInstance) {
    return onAuthStateChanged(authInstance, callback);
  } else {
    mockAuthListeners.push(callback);
    const isLoggedIn = localStorage.getItem('mcf_mock_session') === 'true';
    if (isLoggedIn) {
      callback({ email: 'admin@mcf.org', uid: 'mock-admin' });
    } else {
      callback(null);
    }
    return () => {
      const idx = mockAuthListeners.indexOf(callback);
      if (idx !== -1) mockAuthListeners.splice(idx, 1);
    };
  }
};

// UPCOMING EVENT DATA

export const subscribeToEvent = (callback) => {
  if (isFirebaseConfigured && dbInstance) {
    return onSnapshot(doc(dbInstance, "settings", "event"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.heroBgImage === undefined) {
          data.heroBgImage = defaultEventData.heroBgImage;
        }
        if (data.highlights === undefined) {
          data.highlights = defaultEventData.highlights;
        }
        if (data.homePosters === undefined) {
          data.homePosters = data.posters || defaultEventData.homePosters;
        }
        callback(data);
      } else {
        // Initialize doc in firebase if it doesn't exist by seeding it
        seedEventData(dbInstance, storageInstance).then(callback);
      }
    }, (error) => {
      console.error("Firestore Event Subscription error:", error);
      callback(defaultEventData);
    });
  } else {
    mockEventListeners.push(callback);
    callback(getMockEventData());
    return () => {
      const idx = mockEventListeners.indexOf(callback);
      if (idx !== -1) mockEventListeners.splice(idx, 1);
    };
  }
};

export const updateEvent = async (eventData) => {
  if (isFirebaseConfigured && dbInstance) {
    return setDoc(doc(dbInstance, "settings", "event"), eventData);
  } else {
    localStorage.setItem('mcf_event', JSON.stringify(eventData));
    notifyEventSubscribers();
    return true;
  }
};

// MEDIA GALLERY

export const subscribeToGallery = (callback) => {
  if (isFirebaseConfigured && dbInstance) {
    return onSnapshot(query(collection(dbInstance, "gallery")), (snapshot) => {
      if (snapshot.empty) {
        // Initialize gallery in firebase by seeding default items
        seedGalleryData(dbInstance, storageInstance).then(callback);
      } else {
        const items = [];
        snapshot.forEach(docSnap => {
          items.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(items);
      }
    }, (error) => {
      console.error("Firestore Gallery Subscription error:", error);
      callback(defaultGalleryData);
    });
  } else {
    mockGalleryListeners.push(callback);
    callback(getMockGalleryData());
    return () => {
      const idx = mockGalleryListeners.indexOf(callback);
      if (idx !== -1) mockGalleryListeners.splice(idx, 1);
    };
  }
};

export const addGalleryItem = async (item) => {
  if (isFirebaseConfigured && dbInstance) {
    const { id, ...firebaseData } = item;
    return addDoc(collection(dbInstance, "gallery"), firebaseData);
  } else {
    const list = getMockGalleryData();
    list.unshift(item);
    localStorage.setItem('mcf_gallery', JSON.stringify(list));
    notifyGallerySubscribers();
    return true;
  }
};

export const deleteGalleryItem = async (id) => {
  if (isFirebaseConfigured && dbInstance) {
    return deleteDoc(doc(dbInstance, "gallery", id));
  } else {
    let list = getMockGalleryData();
    list = list.filter(item => item.id !== id);
    localStorage.setItem('mcf_gallery', JSON.stringify(list));
    notifyGallerySubscribers();
    return true;
  }
};

export const updateGalleryItem = async (id, updatedData) => {
  if (isFirebaseConfigured && dbInstance) {
    return setDoc(doc(dbInstance, "gallery", id), updatedData, { merge: true });
  } else {
    const list = getMockGalleryData();
    const idx = list.findIndex(item => item.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedData };
      localStorage.setItem('mcf_gallery', JSON.stringify(list));
      notifyGallerySubscribers();
    }
    return true;
  }
};

// IMAGE UPLOAD SYSTEM

export const uploadImage = async (file, pathPrefix = "uploads") => {
  if (isFirebaseConfigured && storageInstance) {
    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storageInstance, `${pathPrefix}/${filename}`);
    const uploadResult = await uploadBytes(storageRef, file);
    return getDownloadURL(uploadResult.ref);
  } else {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }
};

// INSTAGRAM EMBED HELPERS

export const getInstagramPostId = (url) => {
  if (!url) return null;
  // Match instagram.com/p/CODE/ or instagram.com/reel/CODE/ or instagram.com/tv/CODE/
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
};

export const isValidInstagramUrl = (url) => {
  return !!getInstagramPostId(url);
};

// ----------------------------------------------------
// CONTACT DETAILS & SOCIAL LINKS API
// ----------------------------------------------------

export const subscribeToContact = (callback) => {
  if (isFirebaseConfigured && dbInstance) {
    return onSnapshot(doc(dbInstance, "settings", "contact"), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      } else {
        seedContactData(dbInstance).then(callback);
      }
    }, (error) => {
      console.error("Firestore Contact Subscription error:", error);
      callback(defaultContactData);
    });
  } else {
    mockContactListeners.push(callback);
    callback(getMockContactData());
    return () => {
      const idx = mockContactListeners.indexOf(callback);
      if (idx !== -1) mockContactListeners.splice(idx, 1);
    };
  }
};

export const updateContact = async (data) => {
  if (isFirebaseConfigured && dbInstance) {
    return setDoc(doc(dbInstance, "settings", "contact"), data);
  } else {
    localStorage.setItem('mcf_contact', JSON.stringify(data));
    notifyContactSubscribers();
    return true;
  }
};

// ----------------------------------------------------
// EDUCATION & RESEARCH (ACADEMICS) CONFIG & WINGS API
// ----------------------------------------------------

export const subscribeToAcademicsConfig = (callback) => {
  if (isFirebaseConfigured && dbInstance) {
    return onSnapshot(doc(dbInstance, "settings", "academics"), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      } else {
        seedAcademicsConfig(dbInstance).then(callback);
      }
    }, (error) => {
      console.error("Firestore Academics Config error:", error);
      callback(defaultAcademicsConfig);
    });
  } else {
    mockAcademicsConfigListeners.push(callback);
    callback(getMockAcademicsConfigData());
    return () => {
      const idx = mockAcademicsConfigListeners.indexOf(callback);
      if (idx !== -1) mockAcademicsConfigListeners.splice(idx, 1);
    };
  }
};

export const updateAcademicsConfig = async (data) => {
  if (isFirebaseConfigured && dbInstance) {
    return setDoc(doc(dbInstance, "settings", "academics"), data);
  } else {
    localStorage.setItem('mcf_academics_config', JSON.stringify(data));
    notifyAcademicsConfigSubscribers();
    return true;
  }
};

export const subscribeToAcademics = (callback) => {
  if (isFirebaseConfigured && dbInstance) {
    return onSnapshot(query(collection(dbInstance, "academics")), (snapshot) => {
      if (snapshot.empty) {
        seedAcademicsData(dbInstance).then(callback);
      } else {
        const items = [];
        snapshot.forEach(docSnap => {
          items.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(items);
      }
    }, (error) => {
      console.error("Firestore Academics Subscription error:", error);
      callback(defaultAcademicsData);
    });
  } else {
    mockAcademicsListeners.push(callback);
    callback(getMockAcademicsData());
    return () => {
      const idx = mockAcademicsListeners.indexOf(callback);
      if (idx !== -1) mockAcademicsListeners.splice(idx, 1);
    };
  }
};

export const addAcademicWing = async (item) => {
  if (isFirebaseConfigured && dbInstance) {
    const { id, ...firebaseData } = item;
    return addDoc(collection(dbInstance, "academics"), firebaseData);
  } else {
    const list = getMockAcademicsData();
    list.unshift(item);
    localStorage.setItem('mcf_academics', JSON.stringify(list));
    notifyAcademicsSubscribers();
    return true;
  }
};

export const deleteAcademicWing = async (id) => {
  if (isFirebaseConfigured && dbInstance) {
    return deleteDoc(doc(dbInstance, "academics", id));
  } else {
    let list = getMockAcademicsData();
    list = list.filter(item => item.id !== id);
    localStorage.setItem('mcf_academics', JSON.stringify(list));
    notifyAcademicsSubscribers();
    return true;
  }
};

export const updateAcademicWing = async (id, updatedItem) => {
  if (isFirebaseConfigured && dbInstance) {
    const { id: _, ...firebaseData } = updatedItem;
    return setDoc(doc(dbInstance, "academics", id), firebaseData);
  } else {
    let list = getMockAcademicsData();
    list = list.map(item => item.id === id ? { ...item, ...updatedItem } : item);
    localStorage.setItem('mcf_academics', JSON.stringify(list));
    notifyAcademicsSubscribers();
    return true;
  }
};

// ABOUT US NARRATIVES

export const subscribeToAbout = (callback) => {
  if (isFirebaseConfigured && dbInstance) {
    return onSnapshot(doc(dbInstance, "settings", "about"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.story === undefined) data.story = defaultAboutData.story;
        if (data.mission === undefined) data.mission = defaultAboutData.mission;
        if (data.vision === undefined) data.vision = defaultAboutData.vision;
        if (data.pillars === undefined) data.pillars = defaultAboutData.pillars;
        if (data.milestones === undefined) data.milestones = defaultAboutData.milestones;
        callback(data);
      } else {
        setDoc(doc(dbInstance, "settings", "about"), defaultAboutData).then(() => {
          callback(defaultAboutData);
        });
      }
    }, (error) => {
      console.error("Firestore About Subscription error:", error);
      callback(defaultAboutData);
    });
  } else {
    mockAboutListeners.push(callback);
    callback(getMockAboutData());
    return () => {
      const idx = mockAboutListeners.indexOf(callback);
      if (idx !== -1) mockAboutListeners.splice(idx, 1);
    };
  }
};

export const updateAbout = async (data) => {
  if (isFirebaseConfigured && dbInstance) {
    return setDoc(doc(dbInstance, "settings", "about"), data);
  } else {
    localStorage.setItem('mcf_about', JSON.stringify(data));
    notifyAboutSubscribers();
    return true;
  }
};
