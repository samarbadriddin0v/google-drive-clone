"use client";

import { useSubscription } from "@/hooks/use-subscribtion";
import { ChildProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

const SubscriptionProvider = ({ children }: ChildProps) => {
  const { user, isLoaded } = useUser();
  const { setIsLoading, setSubscription } = useSubscription();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/subscription?email=${user?.emailAddresses[0].emailAddress}`
      );
      setSubscription(data);
      setIsLoading(false);
    };

    if (isLoaded) {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoaded]);

  return children;
};

export default SubscriptionProvider;
