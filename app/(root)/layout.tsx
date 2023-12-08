import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="w-full min-h-[90vh] relative top-[10vh] pl-72 bg-[#F6F9FC] dark:bg-[#1f1f1f] pr-4">
        <div className="min-h-[90vh] rounded-xl bg-white dark:bg-black p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
