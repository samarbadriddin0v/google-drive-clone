import SuggestCard from "@/components/card/suggest-card";
import Empty from "@/components/shared/empty";
import Header from "@/components/shared/header";
import { db } from "@/lib/firebase";
import { DocIdProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

const getFiles = async (folderId: string, uid: string) => {
  let files: any[] = [];
  const q = query(
    collection(db, "folders", folderId, "files"),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    where("isStar", "==", true)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    files.push({ ...doc.data(), id: doc.id });
  });

  return files;
};

const DocumentStarredPage = async ({ params }: DocIdProps) => {
  const { userId } = auth();
  const files = await getFiles(params.documentId, userId!);

  return (
    <>
      <Header label="Starred" isDocumentPage isHome={false} />
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

export default DocumentStarredPage;
