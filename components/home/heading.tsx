"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Social } from "../auth/social";
import { useSession } from "next-auth/react";
// import { Spinner } from "@/components/spinner";

export const Heading = () => {
  //   const { isAuthenticated, isLoading } = useConvexAuth();
  const { data: session, status } = useSession();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Code Share{" "}
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Easily share code with anyone
      </h3>
      {status === "loading" && (
        <div className="w-full flex items-center justify-center">
          {/* <Spinner size="lg" /> */}
          <h1>Loading</h1>
        </div>
      )}
      {status === "authenticated" && (
        <Button asChild>
          <Link href="/dashboard">
            Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {status === "unauthenticated" && <Social />}
    </div>
  );
};
