"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ArrowBigLeftDash,
  ChevronDown,
  Info,
  LayoutPanelTop,
  TableProperties,
} from "lucide-react";
import PopoverActions from "./popover-actions";
import { useLayout } from "@/hooks/use-layout";
import { useRouter } from "next/navigation";

interface HeaderProps {
  label: string;
  isHome?: boolean;
  isDocument?: boolean;
  isDocumentPage?: boolean;
}

const Header = ({ label, isHome, isDocument, isDocumentPage }: HeaderProps) => {
  const { setLayout, layout } = useLayout();
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between">
      {isHome ? (
        <Popover>
          <PopoverTrigger className="flex justify-start">
            <div className="px-4 py-2 hover:bg-secondary transition rounded-full flex items-center space-x-2">
              <h2 className="text-xl capitalize">{label}</h2>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className="px-0 py-2">
            <PopoverActions />
          </PopoverContent>
        </Popover>
      ) : (
        <>
          {isDocumentPage ? (
            <div
              className="flex items-center space-x-2 hover:bg-secondary transition px-4 py-2 rounded-full"
              role="button"
              onClick={() => router.back()}
            >
              <ArrowBigLeftDash className="w-6 h-6" />
              <div className="text-xl">{label}</div>
            </div>
          ) : (
            <div className="text-xl">{label}</div>
          )}
        </>
      )}

      {isHome && !isDocument && (
        <div className="flex items-center space-x-2">
          {layout === "list" ? (
            <div
              role="button"
              className="p-2 hover:bg-secondary rounded-full transition"
              onClick={() => setLayout("grid")}
            >
              <TableProperties className="w-5 h-5" />
            </div>
          ) : (
            <div
              role="button"
              className="p-2 hover:bg-secondary rounded-full transition"
              onClick={() => setLayout("list")}
            >
              <LayoutPanelTop className="w-5 h-5" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
