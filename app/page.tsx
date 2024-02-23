"use client";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  // const session = useConvexAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Hi</h1>
      </div>
    </main>
  );
}
