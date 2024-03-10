"use client";
import { useRenameModal } from "@/store/use-rename-modal";
import { Copy, CopyCheck } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

interface CodeTitleBarProps {
  title: string;
  content: string;
  fileExtension: string;
  snippetId: string;
  snipperAuthorId: string;
  toolbarButtonDisable?: boolean;
}

const CodeTitleBar: FC<CodeTitleBarProps> = ({
  title,
  content,
  fileExtension,
  snippetId,
  snipperAuthorId,
  toolbarButtonDisable,
}) => {
  const { onOpen } = useRenameModal();
  const [copiedText, copy] = useCopyToClipboard();
  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Copied to Clipboard");
      })
      .catch((error) => {
        toast.error("Failed to copy to Clipboard");
      });
  };
  return (
    <>
      <div className="w-full py-3 px-3 pl-4 bg-zinc-900 flex justify-between items-center text-sm">
        {/* <button
          className="text-muted-foreground items-center flex"
          onClick={() => onOpen(snippetId, title)}
          disabled={toolbarButtonDisable ?? false}
        >
          <h1 className="hover:cursor-pointer">{title}</h1>
          {/* <span>{fileExtension}</span>
        </button> */}
        <button
          className={`text-muted-foreground items-center flex ${toolbarButtonDisable ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}
          onClick={() => onOpen(snippetId, title)}
          disabled={toolbarButtonDisable ?? false}
        >
          <h1>{title}</h1>
          {/* <span>{fileExtension}</span> */}
        </button>
        <div className="flex space-x-4">
          <button
            aria-label="Copy Code"
            onClick={handleCopy(content)}
            className="font-medium"
          >
            {copiedText ? (
              <CopyCheck className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-zinc-600 hover:text-indigo-700" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CodeTitleBar;
