"use client";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Snippet } from "@/typing";
import { useAction } from "convex/react";
import { Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardDescription } from "../ui/card";
import { Textarea } from "../ui/textarea";
import Background from "./background";
import CodeEditor from "./code-editor";

interface EditorProps {
  snippet: Snippet;
  preview?: boolean;
}

const Editor: FC<EditorProps> = ({ snippet, preview }) => {
  const { data } = useSession();
  const [originalcontent, setOriginalcontent] = useState(snippet?.notes);
  const sendMessage = useAction(api.openai.chat);
  if (!snippet) <>Loading</>;
  const { mutate } = useApiMutation(api.snippet.updateNote);
  const handleSendMessage = async (text: string, language: string) => {
    await sendMessage({
      content: text,
      snippetId: snippet?._id,
      language: language,
    });
  };

  useEffect(() => {
    setOriginalcontent(snippet?.notes);
  }, [snippet?.notes]);

  const handleNoteChange = (value: string) => {
    mutate({
      id: snippet?._id,
      notes: value,
    })
      .then(() => {
        toast.success("Note Updated");
      })
      .catch(() => {
        toast.error("Failed to update note");
      });
  };
  return (
    <>
      <div className={cn("flex h-full w-full flex-col items-center")}>
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
        {data?.user.id == snippet?.userId && (
          <Button
            aria-label="Explain With AI"
            onClick={() =>
              handleSendMessage(
                snippet?.content ?? "Content",
                snippet?.language ?? "typescript"
              )
            }
            className="font-medium mt-5 hover:text-indigo-400"
            variant="ghost"
          >
            <Sparkles className="hover:text-indigo-400 w-5 h-5" />
            &nbsp; Explain Content with AI
          </Button>
        )}

        {snippet?.notes && !preview && (
          <Textarea
            className="max-w-xl min-h-[200px]"
            value={originalcontent}
            onChange={(event) => handleNoteChange(event.target.value)}
          >
            {snippet?.notes}
          </Textarea>
        )}
        {snippet?.notes && preview && (
          <Card className="mx-[5vw] my-5 border-none max-w-3xl">
            {snippet.notes.split("\n").map((paragraph, index) => (
              <CardDescription key={index} className="p-1">
                {paragraph}
              </CardDescription>
            ))}
          </Card>
        )}
      </div>
    </>
  );
};

export default Editor;