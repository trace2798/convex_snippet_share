"use client";
import { FC } from "react";
import Background from "./background";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CodeEditor from "./code-editor";
import { cn } from "@/lib/utils";

interface EditorProps {
  snippetId: string;
}

const Editor: FC<EditorProps> = ({ snippetId }) => {
 // console.log("snippet id ===>", snippetId);
  const snippet = useQuery(api.snippets.getById, {
    snippetId: snippetId as Id<"snippets">,
  });
  // console.log("SNIPPET ===>", snippet);
  return (
    <>

      <div className={cn("relative flex h-full w-full flex-col items-center  max-h-[100%]  overflow-y-auto")}>
        <Background snippet={snippet}>
          <CodeEditor
            id={snippetId}
            content={snippet?.content ?? "Content"}
            language={snippet?.language ?? "typescript"}
            textSize={snippet?.textSize ?? "text-base"}
            padding={snippet?.padding ?? "p-10"}
            title={snippet?.title ?? "untitled"}
          />
        </Background>
      </div>
    </>
  );
};

export default Editor;
