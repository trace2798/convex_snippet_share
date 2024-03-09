"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Snippet } from "@/typing";
import { useAction } from "convex/react";
import { Sparkles } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import { Card, CardDescription } from "../ui/card";
import ReactMarkdown from "react-markdown";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import Background from "./background";
import CodeEditor from "./code-editor";

interface EditorProps {
  snippet: Snippet;
  preview?: boolean;
  currentUserId?: string;
  aiCount?: number;
}

const Editor: FC<EditorProps> = ({
  snippet,
  preview,
  currentUserId,
  aiCount,
}) => {
  // const { data } = useSession();
  const [originalcontent, setOriginalcontent] = useState(snippet?.notes);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const sendMessage = useAction(api.openai.chat);

  if (!snippet) <>Loading</>;
  const { mutate, pending } = useApiMutation(api.snippet.updateNote);
  const handleSendMessage = async (
    text: string,
    language: string,
    userId: string
  ) => {
    setIsGenerating(true);
    await sendMessage({
      content: text,
      snippetId: snippet?._id,
      language: language,
      userId:  currentUserId as Id<"users">,
    });
    setIsGenerating(false);
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
      userId: currentUserId,
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
            title={snippet?.title ?? "untitled"}
            snipperAuthorId={snippet?.userId}
          />
        </Background>
        {currentUserId == snippet?.userId &&
          aiCount !== undefined &&
          aiCount !== null &&
          !preview && (
            <HoverCard>
              <HoverCardTrigger>
                {" "}
                <Button
                  disabled={
                    pending ||
                    aiCount >= 10 ||
                    isGenerating ||
                    snippet.content?.length == 0
                  }
                  aria-label="Explain With AI"
                  onClick={() =>
                    handleSendMessage(
                      snippet?.content ?? "Content",
                      snippet?.language ?? "typescript",
                      currentUserId as Id<"users">
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
                  Current Count: {aiCount}
                </span>
              </HoverCardContent>
            </HoverCard>
          )}

        {snippet && !preview && (
          <div className="mt-5 w-full flex justify-center items-center flex-col">
            {isGenerating ? (
              <Skeleton className="h-14 w-[50%] bg-gradient-to-r from-zinc-950 to-zinc-900 via-indigo-900" />
            ) : (
              <Textarea
                disabled={isSaving || pending}
                className="max-w-3xl min-h-[300px] backdrop-blur-sm bg-inherit border-none w-[90%] focus:outline-none focus:ring-0 focus:border-none focus:shadow-none scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                value={originalcontent}
                onChange={(event) => handleNoteChange(event.target.value)}
              >
                {snippet?.notes}
              </Textarea>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving || originalcontent === snippet?.notes}
              className="mt-5 w-[180px]"
            >
              {isSaving ? <Spinner size="lg" /> : "Save"}
            </Button>
          </div>
        )}
        {snippet?.notes && preview && (
          <Card className="mx-[5vw] backdrop-blur-lg bg-inherit my-5 border-none max-w-3xl">
            {snippet.notes.split("\n").map((paragraph, index) => (
              <CardDescription
                key={index}
                className="p-1"
                // style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
              >
                <ReactMarkdown
                  // remarkPlugins={[remarkGfm, remarkMath]}
                  className="text-base break-words prose dark:prose-invert"
                >
                  {paragraph}
                </ReactMarkdown>
              </CardDescription>
            ))}
          </Card>
        )}
      </div>
    </>
  );
};

export default Editor;
