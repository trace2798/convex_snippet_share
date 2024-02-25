"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useMutation } from "convex/react";
import { Copy, CopyCheck, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { ElementRef, FC, useRef, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";


interface CodeTitleBarProps {
  title: string;
  content: string;
  fileExtension: string;
  snippetId: string;
}

const CodeTitleBar: FC<CodeTitleBarProps> = ({
  title,
  content,
  fileExtension,
  snippetId,
}) => {
//  console.log("TITLE ===>", title);
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const update = useMutation(api.snippet.updateTitle);
  const [copiedText, copy] = useCopyToClipboard();
  const sendMessage = useAction(api.openai.chat);
  const [newMessageText, setNewMessageText] = useState("");
  // async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
  const handleSendMessage = async (text: string) => {
    await sendMessage({ content: text, snippetId: snippetId });
  };

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log("Copied!", { text });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  // const { user } = useUser();
  const session = useSession()

  return (
    <>
      <div className="w-full py-3 px-3 pl-4 dark:bg-zinc-900 flex justify-between items-center text-sm">
        <div className="text-muted-foreground items-center flex">
          <h1>{title}</h1>
          <span>{fileExtension}</span>
        </div>
        <div className="flex space-x-4">
          {session && (
            <button
              aria-label="Explain With AI"
              onClick={() => handleSendMessage(content)}
              className="font-medium"
            >
              <Sparkles className="hover:text-indigo-400" />
            </button>
          )}

          <button
            aria-label="Copy Code"
            onClick={handleCopy(content)}
            className="font-medium"
          >
            {copiedText ? (
              <CopyCheck className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 hover:text-indigo-700" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CodeTitleBar;
