import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBjlYXmE9pMylcoBR2rSVPn2cny34zI6wI",
    authDomain: "rinku-3edd4.firebaseapp.com",
    projectId: "rinku-3edd4",
    storageBucket: "rinku-3edd4.appspot.com",
    messagingSenderId: "702955966143",
    appId: "1:702955966143:web:c641501579a20e5b0bc00a"
    /* apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "rinku-3edd4.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID */
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth()

export { app, auth };