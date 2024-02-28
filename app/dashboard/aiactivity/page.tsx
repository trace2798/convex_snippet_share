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
import { useSession } from "next-auth/react";
import { SnippetCard } from "../_components/snippet-card";
import { useEffect } from "react";

const AiActivityPage = ({}) => {
  const { data } = useSession();
  const { results, status, loadMore } = usePaginatedQuery(
    api.aiactivity.get,
    {
      userId: data?.user?.id as Id<"users">,
    },
    { initialNumItems: 2 }
  );
  useEffect(() => {
    const handleScroll = () => {
      const page = document.documentElement;
      const closeToBottom =
        page.scrollHeight - page.scrollTop - page.clientHeight < 100;
      if (closeToBottom && status === "CanLoadMore") {
        loadMore(1);
      }
    };
    handleScroll();
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [status, loadMore]);

  console.log(results);
  if (results === undefined) {
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

  if (!results?.length) {
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
      </div>
    </>
  );
};
export default AiActivityPage;

SnippetCard.Skeleton = function SnippetCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
