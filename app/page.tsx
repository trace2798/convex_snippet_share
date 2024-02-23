"use client";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // const session = useConvexAuth();
  const { data: session, update } = useSession();
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Hi</h1>
        {/* {data.session ? <h1>{data.session.user?.name}</h1> : <h1>no session</h1>} */}
   {session ? <h1>{session.user?.name}</h1> : <h1>no session</h1>}
      </div>
      <h1></h1>
    </main>
  );
}
