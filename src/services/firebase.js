import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbn2sHgttCIDjiukrotlI0kxSTgZ2ArxY",
    authDomain: "hope3-app.firebaseapp.com",
    projectId: "hope3-app",
    storageBucket: "hope3-app.firebasestorage.app",
    messagingSenderId: "772053958218",
    appId: "1:772053958218:web:b906307c799d9fb0aaf0b3",
    measurementId: "G-V1TZ2VLV8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
