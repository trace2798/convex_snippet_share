"use client";
import { FC } from "react";
import Background from "./background";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CodeEditor from "./code-editor";
import { cn } from "@/lib/utils";
import { Snippet } from "@/typing";

interface EditorProps {
  snippet: Snippet;
}

const Editor: FC<EditorProps> = ({ snippet }) => {

  return (
    <>
      <div
        className={cn(
          "relative flex h-full w-full flex-col items-center  max-h-[100%]  overflow-y-auto"
        )}
      >
        <Background snippet={snippet}>
          <CodeEditor
            id={snippet?._id}
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
