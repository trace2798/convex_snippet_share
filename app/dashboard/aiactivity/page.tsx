"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { SnippetCard } from "../_components/snippet-card";
import { Skeleton } from "@/components/ui/skeleton";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { data } = useSession();
  const activities = useQuery(api.aiactivity.get, {
    userId: data?.user?.id as Id<"users">,
  });
  console.log(activities);
  if (activities === undefined) {
    return (
      <div>
        <h2 className="text-3xl"></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <SnippetCard.Skeleton />
          <SnippetCard.Skeleton />
          <SnippetCard.Skeleton />
          <SnippetCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!activities?.length) {
    return (
      <>
        <p>No activities found</p>
      </>
    );
  }

  return (
    <>
      <div>
        <h1 className="my-10 font-bold text-xl">Activities</h1>
        <div className="space-y-4">
          {activities?.map((activity, index) => (
            <>
              <Card key={index} className="">
                <CardHeader>
                  <CardTitle>
                    {formatDistanceToNow(activity._creationTime)} ago
                  </CardTitle>
                  <CardDescription>{activity.snippetId}</CardDescription>
                </CardHeader>
                <CardContent className="">{activity.ai_answer}</CardContent>
              </Card>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;

SnippetCard.Skeleton = function SnippetCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
