"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EmptySnippets } from "./empty-snippets";
import { NewSnippetButton } from "./new-snippet-button";
import { SnippetCard } from "./snippet-card";

interface SnippetListProps {
  userId: string;
}

export const SnippetList = ({ userId }: SnippetListProps) => {
  // console.log(userId);
  // if (userId === undefined) {
  //   return (
  //     <div>
  //       <h2 className="text-3xl">
  //         {/* {query.favorites ? "Favorite snippets" : "Team snippets"} */}
  //       </h2>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
  //         <NewSnippetButton userId={userId} disabled />
  //         <SnippetCard.Skeleton />
  //         <SnippetCard.Skeleton />
  //         <SnippetCard.Skeleton />
  //         <SnippetCard.Skeleton />
  //       </div>
  //     </div>
  //   );
  // }
  const data = useQuery(api.snippets.get, {
    userId: userId,
  });
  // console.log(data);
  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {/* {query.favorites ? "Favorite snippets" : "Team snippets"} */}
        </h2>
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
    return <EmptySnippets />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {/* {query.favorites ? "Favorite snippets" : "Team snippets"} */}
        {/* <h1>No Fav</h1> */}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewSnippetButton userId={userId} />
        {data?.map((snippet: any) => (
          <SnippetCard
            key={snippet._id}
            id={snippet._id}
            title={snippet.title}
            imageUrl={snippet.imageUrl}
            userId={snippet.userId}
            authorName={snippet.authorName}
            createdAt={snippet._creationTime}
            orgId={snippet.orgId}
            isFavorite={snippet.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
