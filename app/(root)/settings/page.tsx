"use client";

import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscription } from "@/hooks/use-subscribtion";
import { UserProfile, useUser } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import axios from "axios";
import { BadgeCheck } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { toast } from "sonner";

const SettingsPage = () => {
  const { subscription } = useSubscription();
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  const onSubmit = () => {
    const priceId = "price_1OK5jiL7w2jHXlsSaWtc7yQI";
    const promise = axios
      .post("/api/subscription", {
        email: user?.emailAddresses[0].emailAddress,
        fullName: user?.fullName,
        userId: user?.id,
        priceId,
      })
      .then((res) => window.open(res.data, "_blank"));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Subscribed!",
      error: "Error subscribing",
    });
  };

  return (
    <>
      <Header label="Settings" />
      <Tabs defaultValue="account" className="mt-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="subscription">Manage</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UserProfile
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : shadesOfPurple,
            }}
          />
        </TabsContent>
        <TabsContent value="subscription">
          <div className="flex space-x-4">
            <div className="border rounded-xl p-4 w-80">
              <p className="text-lg font-bold">Current Plan</p>

              <div className="mt-4">
                <div className="flex items-center border-b justify-between pb-2">
                  <p className="opacity-75">Plan: </p>
                  <p>{subscription}</p>
                </div>
                <div className="flex items-center border-b justify-between pb-2 mt-4">
                  <p className="opacity-75">Price: </p>
                  <p>{subscription === "Basic" ? "$0" : "$10"}</p>
                </div>
                <div className="flex items-center border-b justify-between pb-2 mt-4">
                  <p className="opacity-75">Storage: </p>
                  <p>{subscription === "Basic" ? "1.5 GB" : "15 GB"}</p>
                </div>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex-1 px-12">
              <p className="text-lg font-bold">
                {subscription === "Basic"
                  ? "Upgrade for benefits"
                  : "You plan benefits"}
              </p>
              <div className="grid grid-cols-2 mt-4">
                {options.split(",").map((option) => (
                  <div
                    className="flex items-center pb-2 space-x-2"
                    key={option}
                  >
                    <BadgeCheck className="w-5 h-5 text-blue-500" />
                    <p className="opacity-75">{option.trim()}</p>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center">
                <Button onClick={onSubmit}>
                  {subscription === "Basic" ? "Upgrade" : "Manage"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SettingsPage;

const options =
  "100 GB of storage, Access to Google experts,  Share with up to 5 others, Extra member benefits, More Google Photos editing features";
