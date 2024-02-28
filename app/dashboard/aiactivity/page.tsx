"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import { SnippetCard } from "../_components/snippet-card";
import ActivityList from "./_components/activity-list";

const AiActivityPage = ({}) => {
  const { data } = useSession();

  return (
    <>
      <div>
        <h1 className="my-10 font-bold text-xl">Activities</h1>
        <ActivityList userId={data?.user?.id as Id<"users">} />
      </div>
    </>
  );
};
export default AiActivityPage;
