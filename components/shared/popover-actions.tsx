'use client'

import { FileUp, Folder, FolderUp, Star, Trash } from 'lucide-react'
import React, { ElementRef, useRef } from 'react'
import { Separator } from '../ui/separator'
import { useFolder } from '@/hooks/use-folder'
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'
import { db, storage } from '@/lib/firebase'
import { useUser } from '@clerk/nextjs'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSubscription } from '@/hooks/use-subscribtion'

const PopoverActions = () => {
	const inputRef = useRef<ElementRef<'input'>>(null)
	const { onOpen } = useFolder()
	const { user } = useUser()
	const router = useRouter()
	const { documentId } = useParams()
	const { setTotalStorage, totalStorage } = useSubscription()

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) return
		const file = files[0]
		let image = ''

		const reader = new FileReader()

		if (file) {
			reader.readAsDataURL(file)
			reader.onload = e => {
				image = e.target?.result as string
			}
		}

		const folderId = documentId as string

		const collectionRefs = !documentId
			? collection(db, 'files')
			: collection(db, 'folders', folderId, 'files')

		const promise = addDoc(collectionRefs, {
			name: file.name,
			type: file.type,
			size: file.size,
			uid: user?.id,
			timestamp: serverTimestamp(),
			isArchive: false,
			isDocument: false,
		})
			.then(docs => {
				if (documentId) {
					addDoc(collection(db, 'files'), {
						name: file.name,
						type: file.type,
						size: file.size,
						uid: user?.id,
						timestamp: serverTimestamp(),
						isArchive: false,
						isDocument: true,
					})
				}

				const refs = documentId
					? ref(storage, `files/${folderId}/${docs.id}/image`)
					: ref(storage, `files/${docs.id}/image`)

				uploadString(refs, image, 'data_url').then(() => {
					getDownloadURL(refs).then(url => {
						const docRefs = documentId
							? doc(db, 'folders', folderId, 'files', docs.id)
							: doc(db, 'files', docs.id)

						updateDoc(docRefs, {
							image: url,
						}).then(() => {
							router.refresh()
							setTotalStorage(totalStorage + file.size)
						})
					})
				})
			})
			.catch(e => console.log(e))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Uploaded!',
			error: 'Error uploading file',
		})
	}

	return (
		<>
			{!documentId && (
				<>
					<div
						className='flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm'
						role='button'
						onClick={onOpen}
					>
						<Folder className='w-4 h-4' />
						<span>New folder</span>
					</div>
					<Separator />
				</>
			)}
			<label>
				<div
					className='flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm'
					role='button'
				>
					<FileUp className='w-4 h-4' />
					<span>File upload</span>
				</div>
				<input
					type='file'
					className='hidden'
					accept='image/*'
					ref={inputRef}
					onChange={onChange}
				/>
			</label>

			<label>
				<div
					className='flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm'
					role='button'
				>
					<FolderUp className='w-4 h-4' />
					<span>Folder upload</span>
				</div>
				<input
					type='file'
					className='hidden'
					accept='image/*'
					ref={inputRef}
					onChange={onChange}
				/>
			</label>

			{documentId && (
				<>
					<Separator />
					<Link href={`/document/${documentId}/trash`}>
						<div
							className='flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm'
							role='button'
						>
							<Trash className='w-4 h-4' />
							<span>Trash</span>
						</div>
					</Link>
					<Link href={`/document/${documentId}/starred`}>
						<div
							className='flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm'
							role='button'
						>
							<Star className='w-4 h-4' />
							<span>Starred</span>
						</div>
					</Link>
				</>
			)}
		</>
	)
}

export default PopoverActions
