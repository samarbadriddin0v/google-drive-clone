import Empty from '@/components/shared/empty'
import Header from '@/components/shared/header'
import TrashItem from '@/components/shared/trash-item'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { db } from '@/lib/firebase'
import { currentUser } from '@clerk/nextjs/server'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'

const getData = async (uid: string, type: 'files' | 'folders') => {
	let data: any[] = []
	const q = query(
		collection(db, type),
		where('uid', '==', uid),
		where('isArchive', '==', true)
	)
	const querySnapshot = await getDocs(q)
	querySnapshot.forEach(doc => {
		data.push({ ...doc.data(), id: doc.id })
	})

	return data
}

const TrashPage = async () => {
	const user = await currentUser()
	const folders = await getData(user?.id!, 'folders')
	const files = await getData(user?.id!, 'files')

	return (
		<>
			<Header label='Trash' />
			{[...files, ...folders].length === 0 ? (
				<Empty />
			) : (
				<Table className='mt-4'>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Archived time</TableHead>
							<TableHead>File size</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[...folders, ...files].map(folder => (
							<TrashItem
								key={folder.id}
								item={JSON.parse(JSON.stringify(folder))}
							/>
						))}
					</TableBody>
				</Table>
			)}
		</>
	)
}

export default TrashPage
