"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";

const ActivityList = ({ userId }: { userId: string }) => {
  if (!userId) {
    return (
      <div className="flex flex-col space-y-5">
        <ActivityList.Skeleton />
        <ActivityList.Skeleton />
      </div>
    );
  }
  const { results, status, loadMore } = usePaginatedQuery(
    api.aiactivity.get,
    {
      userId: userId as Id<"users">,
    },
    { initialNumItems: 2 }
  );
  console.log(results);

  useEffect(() => {
    if (!results) return;

    const handleScroll = () => {
      const page = document.documentElement;
      const closeToBottom =
        page.scrollHeight - page.scrollTop - page.clientHeight < 100;
      if (closeToBottom && status === "CanLoadMore") {
        loadMore(2);
      }
    };

    handleScroll();
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [status, loadMore, results]); // add 'results' to the dependency array

  console.log(results);
  if (results === undefined) {
    return (
      <div className="flex flex-col space-y-5">
        <ActivityList.Skeleton />
        <ActivityList.Skeleton />
      </div>
    );
  }
  return (
    <>
      <div className="space-y-4">
        {results?.map((activity, index) => (
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
    </>
  );
};

export default ActivityList;

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden">
      <Card className="bg-inherit backdrop-blur-sm">
        <CardHeader className="space-y-5">
          <CardTitle>
            <Skeleton className="h-10 w-[20%] dark:bg-gradient-to-r dark:from-zinc-950 dark:to-zinc-900 dark:via-zinc-700" />
          </CardTitle>
          <CardDescription>
            {" "}
            <Skeleton className="h-14 w-[40%] dark:bg-gradient-to-r dark:from-zinc-950 dark:to-zinc-900 dark:via-zinc-700" />
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          {" "}
          <Skeleton className="h-32 w-[80%] dark:bg-gradient-to-r dark:from-zinc-950 dark:to-zinc-900 dark:via-zinc-700" />
        </CardContent>
      </Card>
    </div>
  );
};
