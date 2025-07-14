import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Firebase configuration
// In a real app, these would be environment variables
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "vehicle-tracker-demo.firebaseapp.com",
  projectId: "vehicle-tracker-demo",
  storageBucket: "vehicle-tracker-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// For development, we'll use the Firestore emulator if running locally
if (import.meta.env.DEV) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
  } catch (error) {
    // Emulators already connected or not available
    console.log('Firebase emulators not available or already connected');
  }
}

export default app;