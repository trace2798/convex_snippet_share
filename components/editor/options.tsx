"use client";
import { SUPPORTED_LANGUAGES } from "@/lib/language";
import { exportToPng } from "@/lib/utils";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { Check, Copy, DownloadIcon, Image, Link } from "lucide-react";

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
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${title}${extension?.fileExtension}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const url = `${origin}/preview/${id}`;

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      <div className="w-[300px] flex flex-col md:flex-row md:flex-wrap justify-evenly items-center my-6">
        <Button
          variant="outline"
          className=""
          onClick={() => exportToPng(container.current)}
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <DownloadIcon className="h-4 w-4" />
        </Button>
        {isPublic && (
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
        )}
      </div>
    </>
  );
};

export default Options;
