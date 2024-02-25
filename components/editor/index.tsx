"use client";
import { cn } from "@/lib/utils";
import { Snippet } from "@/typing";
import { FC } from "react";
import Background from "./background";
import CodeEditor from "./code-editor";

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
            snipperAuthorId={snippet?.userId}
          />
        </Background>
      </div>
    </>
  );
};

export default Editor;
