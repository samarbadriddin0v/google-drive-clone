import SuggestCard from "@/components/card/suggest-card";
import Empty from "@/components/shared/empty";
import Header from "@/components/shared/header";
import { db } from "@/lib/firebase";
import { DocIdProps, IFolderAndFile } from "@/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";

const getFolder = async (folderId: string) => {
  const docRef = doc(db, "folders", folderId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

const getFiles = async (folderId: string, uid: string) => {
  let files: any[] = [];
  const q = query(
    collection(db, "folders", folderId, "files"),
    where("uid", "==", uid),
    where("isArchive", "==", false)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    files.push({ ...doc.data(), id: doc.id });
  });

  return files;
};

const DocumentIdPage = async ({ params }: DocIdProps) => {
  const folder = (await getFolder(params.documentId)) as IFolderAndFile;
  const files = await getFiles(params.documentId, folder.uid);

  return (
    <>
      <Header label={folder.name} isHome isDocument />
      {files.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {files.map((file) => (
            <SuggestCard item={file} key={file.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default DocumentIdPage;
