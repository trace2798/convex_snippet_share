"use client";
import { Social } from "@/components/auth/social";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import github from "next-auth/providers/github";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // const session = useConvexAuth();
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  const user = useCurrentUser();
  console.log(user)
  // console.log(update);
  // const getUser = useQuery(api.accounts.create, {});
  // const userId = useStoreUserEffect();
  // console.log(userId)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Hi</h1>
        {session ? (
          <h1>
            {session.user?.name}
            <br />
            {session.user?.email}
          </h1>
        ) : (
          <h1>no session</h1>
        )}
      </div>
      {session ? (
        <button onClick={() => signOut()}>Log Out</button>
      ) : (
        <>
          <Social />
        </>
      )}
    </main>
  );
}
