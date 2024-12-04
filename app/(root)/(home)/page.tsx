import Header from '@/components/shared/header'
import Lists from '@/components/shared/lists'
import { db } from '@/lib/firebase'
import { auth, currentUser } from '@clerk/nextjs/server'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'

const getData = async (uid: string, type: 'files' | 'folders') => {
	let data: any[] = []
	const q = query(
		collection(db, type),
		where('uid', '==', uid),
		where('isArchive', '==', false),
		where('isDocument', '==', false)
	)
	const querySnapshot = await getDocs(q)
	querySnapshot.forEach(doc => {
		data.push({ ...doc.data(), id: doc.id })
	})

	return data
}

const HomePage = async () => {
	const user = await currentUser()
	const folders = await getData(user?.id!, 'folders')
	const files = await getData(user?.id!, 'files')

	return (
		<>
			<Header label={'My drive'} isHome />
			<Lists
				folders={JSON.parse(JSON.stringify(folders))}
				files={JSON.parse(JSON.stringify(files))}
			/>
		</>
	)
}

export default HomePage
