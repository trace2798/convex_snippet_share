"use client";
import { SUPPORTED_LANGUAGES } from "@/lib/language";
import { exportToPng } from "@/lib/utils";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { Check, Copy, DownloadIcon, Image, Link } from "lucide-react";
import { toast } from "sonner";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";

interface OptionsProps {
  container: any;
  language: string;
  content: string;
  title: string;
  isPublic: boolean;
  id: string;
}

const Options: FC<OptionsProps> = ({
  id,
  container,
  language,
  content,
  title,
  isPublic,
}) => {
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const extension = SUPPORTED_LANGUAGES.find((lang) => lang.id === language);
  const handleDownload = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([content], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      const titleParts = title.split("/");
      const lastPartOfTitle = titleParts[titleParts.length - 1];
      element.download = `${lastPartOfTitle}${extension?.fileExtension}`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      toast.success("File downloaded");
    } catch (error) {
      toast.error("Failed to download file");
    }
  };

  const url = `${origin}/preview/${id}`;

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-[300px] flex flex-row md:flex-wrap justify-evenly items-center my-6">
        <HoverCard>
          <HoverCardTrigger>
            {" "}
            <Button
              disabled={content.length === 0}
              variant="outline"
              className=""
              onClick={() => exportToPng(container.current, title)}
            >
              <Image className="h-4 w-4" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm">
            Download as PNG
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            {" "}
            <Button variant="outline" onClick={handleDownload}>
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm">
            Download as file
          </HoverCardContent>
        </HoverCard>

        {isPublic && (
          <HoverCard>
            <HoverCardTrigger>
              {" "}
              <Button
                variant="outline"
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Link className="h-4 w-4" />
                )}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm">
              Link to Share
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    </>
  );
};

export default Options;
