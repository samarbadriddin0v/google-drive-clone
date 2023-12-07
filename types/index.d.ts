import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface IFolderAndFile {
  id: string;
  name: string;
  uid: string;
  timestamp: Timestamp;
  image: string;
  type: string;
  size: number;
  isStar: boolean;
  archivedTime: Timestamp;
}
