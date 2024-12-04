import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: 'sammi-a2d49.firebaseapp.com',
	projectId: 'sammi-a2d49',
	storageBucket: 'sammi-a2d49.firebasestorage.app',
	messagingSenderId: '127113662672',
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

!getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()
const storage = getStorage()

export { db, storage }
