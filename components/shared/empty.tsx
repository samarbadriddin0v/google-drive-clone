import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface EmptyProps {
  sm?: boolean;
}

const Empty = ({ sm }: EmptyProps) => {
  return (
    <div className={cn("w-full justify-center flex flex-col space-y-2")}>
      <Image
        src={"/empty.svg"}
        alt="Empty"
        width={sm ? 100 : 200}
        height={sm ? 100 : 200}
        className="mx-auto"
      />

      <h1 className="text-3xl text-center">Empty</h1>

      <p className="text-center text-gray-500">
        There is nothing here. Please check again.
      </p>
    </div>
  );
};

export default Empty;
