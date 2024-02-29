"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EmptySnippets } from "./empty-snippets";
import { NewSnippetButton } from "./new-snippet-button";
import { SnippetCard } from "./snippet-card";
import { Skeleton } from "@/components/ui/skeleton";

interface SnippetListProps {
  userId: string;
}

export const SnippetList = ({ userId }: SnippetListProps) => {
  const data = useQuery(api.snippets.get, {
    userId: userId,
  });
  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl"></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewSnippetButton userId={userId} disabled />
          <SnippetCard.Skeleton />
          <SnippetCard.Skeleton />
          <SnippetCard.Skeleton />
          <SnippetCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return <EmptySnippets userId={userId} />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewSnippetButton userId={userId} />
        {data?.map((snippet: any) => (
          <SnippetCard
            key={snippet._id}
            id={snippet._id}
            title={snippet.title}
            userId={snippet.userId}
            createdAt={snippet._creationTime}
          />
        ))}
      </div>
    </div>
  );
};
