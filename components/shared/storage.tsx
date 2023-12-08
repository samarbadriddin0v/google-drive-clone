import React from "react";
import { Progress } from "../ui/progress";
import { byteConverter } from "@/lib/utils";

interface StorageProps {
  totalSize: number;
}

const Storage = ({ totalSize }: StorageProps) => {
  return (
    <div className="mt-4">
      <div className="flex items-end space-x-1">
        <div className="text-4xl">{byteConverter(totalSize, 1)}</div>
        <div className="opacity-75">of 1.5 GB user</div>
      </div>

      <Progress className="mt-4" value={20} />
    </div>
  );
};

export default Storage;
