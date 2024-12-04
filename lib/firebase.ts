import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: 'drive-clone-9b26e.firebaseapp.com',
	projectId: 'drive-clone-9b26e',
	storageBucket: 'drive-clone-9b26e.firebasestorage.app',
	messagingSenderId: '883644913402',
	appId: '1:883644913402:web:4b27146bab79c3816e9b43',
}

!getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()
const storage = getStorage()

export { db, storage }
