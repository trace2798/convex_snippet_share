"use client";
import Editor from "@/components/editor";
import ToolBar from "./_components/toolbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { use } from "react";
import { Id } from "@/convex/_generated/dataModel";

interface SnippetIdPageProps {
  params: {
    snippetId: string;
  };
}
const SnippetIdPage = ({ params }: SnippetIdPageProps) => {
  const snippet = useQuery(api.snippets.getById, {
    snippetId: params.snippetId as Id<"snippets">,
  });
  //console.log("PARAMS ===>", params.snippetId);
  // const { user } = useUser();
  // console.log(user);
  // const userName = user?.username;
  // if (!userName) return null;
  // const userFromDb = useQuery(api.users.get, { username: userName });
  // console.log(userFromDb);
 
  console.log(snippet)
  return (
    <>
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[200px] rounded-lg border"
      >
        <ResizablePanel defaultSize={15}>
            <ToolBar snippetId={params.snippetId} />    
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <Editor snippetId={params.snippetId} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default SnippetIdPage;
