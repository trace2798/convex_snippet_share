"use client";

import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Editor from "@/components/editor";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Snippet } from "@/typing";

interface SnippetIdPageProps {
  params: {
    snippetId: Id<"snippets">;
  };
}

const SnippetIdPage = ({ params }: SnippetIdPageProps) => {
  const [countIncremented, setCountIncremented] = useState(false);
  const snippet = useQuery(api.snippets.getById, {
    snippetId: params.snippetId,
  }) as Snippet;

  const { mutate, pending } = useApiMutation(api.snippet.incrementCount);

  // console.log(snippet);

  useEffect(() => {
    if (snippet && !countIncremented) {
      mutate({ id: params.snippetId });
      setCountIncremented(true); // Set the state variable to true after incrementing
    }
  }, [snippet]);

  if (snippet == undefined) {
    return (
      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (snippet == null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-14">
        <Editor snippet={snippet} preview={true} readOnly={true} />
      </div>
    </div>
  );
};

export default SnippetIdPage;
