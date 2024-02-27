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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface EditorProps {
  snippet: Snippet;
  preview?: boolean;
}

const Editor: FC<EditorProps> = ({ snippet, preview }) => {
  const { data } = useSession();
  console.log("DATA ===>", data);
  const [originalcontent, setOriginalcontent] = useState(snippet?.notes);
  const [isSaving, setIsSaving] = useState(false);
  const sendMessage = useAction(api.openai.chat);
  if (!snippet) <>Loading</>;
  const { mutate, pending } = useApiMutation(api.snippet.updateNote);
  const handleSendMessage = async (text: string, language: string) => {
    await sendMessage({
      content: text,
      snippetId: snippet?._id,
      language: language,
      userId: snippet?.userId,
    });
  };

  useEffect(() => {
    setOriginalcontent(snippet?.notes);
  }, [snippet?.notes]);

  const handleNoteChange = (value: string) => {
    setOriginalcontent(value);
  };

  const handleSave = () => {
    setIsSaving(true);
    mutate({
      id: snippet?._id,
      notes: originalcontent,
    })
      .then(() => {
        toast.success("Note Updated");
        setIsSaving(false);
      })
      .catch(() => {
        toast.error("Failed to update note");
        setIsSaving(false);
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
        {data?.user.id == snippet?.userId && data?.user.aiCount && !preview && (
          <HoverCard>
            <HoverCardTrigger>
              {" "}
              <Button
                disabled={pending || data?.user.aiCount >= 10}
                aria-label="Explain With AI"
                onClick={() =>
                  handleSendMessage(
                    snippet?.content ?? "Content",
                    snippet?.language ?? "typescript",
                  )
                }
                className="font-medium mt-5 hover:text-indigo-400"
                variant="ghost"
              >
                <Sparkles className="hover:text-indigo-400 w-5 h-5" />
                &nbsp; Explain Content with AI
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm">
              10 AI generation for free. <br />
              <span className="text-muted-foreground">
                Current Count: {data.user.aiCount}
              </span>
            </HoverCardContent>
          </HoverCard>
        )}

        {snippet && !preview && (
          <div className="mt-5 w-full flex justify-center items-center flex-col">
            <Textarea
              disabled={isSaving || pending}
              className="max-w-3xl min-h-[200px]"
              value={originalcontent}
              onChange={(event) => handleNoteChange(event.target.value)}
            >
              {snippet?.notes}
            </Textarea>
            <Button
              onClick={handleSave}
              disabled={isSaving || originalcontent === snippet?.notes}
              className="mt-5 w-[180px]"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
        {snippet?.notes && preview && (
          <Card className="mx-[5vw] backdrop-blur-lg bg-inherit my-5 border-none max-w-3xl">
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
