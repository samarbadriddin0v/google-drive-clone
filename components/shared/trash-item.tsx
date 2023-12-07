"use client";

import { IFolderAndFile } from "@/types";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { File, Folder, Minus, MoreVertical, Trash, Undo } from "lucide-react";
import { format } from "date-fns";
import { byteConverter } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmModal from "../modals/confirm-modal";
import { deleteObject, ref } from "firebase/storage";

interface TrashItemProps {
  item: IFolderAndFile;
}

const TrashItem = ({ item }: TrashItemProps) => {
  const { refresh } = useRouter();

  const type = item.size ? "files" : "folders";

  const onRestore = () => {
    const ref = doc(db, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      isArchive: false,
      archivedTime: null,
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Restored!",
      error: "Failed to restore.",
    });
  };

  const onDelete = () => {
    const refs = doc(db, type, item.id);

    if (type === "folders") {
      const promise = deleteDoc(refs).then(() => refresh());

      toast.promise(promise, {
        loading: "Loading...",
        success: "Deleted!",
        error: "Failed to delete.",
      });
    }

    if (type === "files") {
      const promise = deleteObject(ref(storage, item.image)).then(() => {
        deleteDoc(refs).then(() => refresh());
      });

      toast.promise(promise, {
        loading: "Loading...",
        success: "Deleted!",
        error: "Failed to delete.",
      });
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-1" role="button">
          {item.size ? (
            <File className="w-4 h-4 text-blue-500" />
          ) : (
            <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell>
        {format(new Date(item.archivedTime.seconds * 1000), "MMM dd, hh:mm a")}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end group items-center space-x-2">
        <Popover>
          <PopoverTrigger className="flex justify-start" asChild>
            <div
              role="button"
              className="p-2 hover:bg-secondary rounded-full transition"
            >
              <MoreVertical className="h-4 w-4" />
            </div>
          </PopoverTrigger>

          <PopoverContent className="p-0 py-2" forceMount side="left">
            <div
              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
              role="button"
              onClick={onRestore}
            >
              <Undo className="w-4 h-4" />
              <span>Restore</span>
            </div>
            <ConfirmModal onConfirm={onDelete}>
              <div
                className="w-full flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                role="button"
              >
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </div>
            </ConfirmModal>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default TrashItem;
