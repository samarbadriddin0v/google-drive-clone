import Empty from "@/components/shared/empty";
import Header from "@/components/shared/header";
import ListItem from "@/components/shared/list-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React from "react";

const getData = async (uid: string, type: "files" | "folders") => {
  let data: any[] = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    limit(4)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

const RecentPage = async () => {
  const { userId } = auth();
  const folders = await getData(userId!, "folders");
  const files = await getData(userId!, "files");

  return (
    <>
      <Header label="Recent" />
      {[...files, ...folders].length === 0 ? (
        <Empty />
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>File size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...folders, ...files].map((folder) => (
              <ListItem key={folder.id} item={folder} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default RecentPage;
