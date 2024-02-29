"use client";
import Editor from "@/components/editor";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Snippet } from "@/typing";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import ToolBar from "./_components/toolbar";

interface SnippetIdPageProps {
  params: {
    snippetId: string;
  };
}
const SnippetIdPage = ({ params }: SnippetIdPageProps) => {
  const snippet = useQuery(api.snippets.getById, {
    snippetId: params.snippetId as Id<"snippets">,
  }) as Snippet;

  const { data } = useSession();
  return (
    <>
      <div className="pb-5">
        {data?.user.id === snippet?.userId && (
          <ToolBar snippet={snippet} currentUserId={data?.user.id} />
        )}
        <Editor
          snippet={snippet}
          currentUserId={data?.user.id}
          aiCount={data?.user.aiCount}
        />
      </div>
    </>
  );
};

export default SnippetIdPage;
