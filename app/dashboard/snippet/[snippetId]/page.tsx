"use client";
import Editor from "@/components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ToolBar from "./_components/toolbar";

interface SnippetIdPageProps {
  params: {
    snippetId: string;
  };
}
const SnippetIdPage = ({ params }: SnippetIdPageProps) => {
  const snippet = useQuery(api.snippets.getById, {
    snippetId: params.snippetId as Id<"snippets">,
  });
 
  console.log(snippet)
  return (
    <>
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[200px] rounded-lg border"
      >
        <ResizablePanel defaultSize={15}>
            <ToolBar snippet={snippet} />    
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <Editor snippet={snippet} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default SnippetIdPage;
