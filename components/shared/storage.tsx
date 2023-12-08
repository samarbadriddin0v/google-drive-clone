"use client";

import React, { useEffect } from "react";
import { Progress } from "../ui/progress";
import { byteConverter } from "@/lib/utils";
import { useSubscription } from "@/hooks/use-subscribtion";

interface StorageProps {
  totalSize: number;
}

const Storage = ({ totalSize }: StorageProps) => {
  const { subscription, totalStorage, setTotalStorage } = useSubscription();

  const totalValue = subscription === "Basic" ? 15_000_000 : 15_000_000_0;

  return (
    <div className="mt-4">
      <div className="flex items-end space-x-1">
        <div className="text-4xl">{byteConverter(totalSize, 1)}</div>
        <div className="opacity-75">
          of {subscription === "Basic" ? "1.5 GB" : "15 GB"} user
        </div>
      </div>

      <Progress className="mt-4" value={totalStorage / totalValue} />
    </div>
  );
};

export default Storage;
