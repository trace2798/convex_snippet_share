"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { javascript } from "@codemirror/lang-javascript";
import ReactCodeMirror, {
  EditorView,
  highlightActiveLine,
} from "@uiw/react-codemirror";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Social } from "../auth/social";
import CodeTitleBar from "../editor/code-title-bar";
import { Spinner } from "../spinner";
import { Separator } from "../ui/separator";
import HomeOptions from "./home-options";

const content = `Easily share your code snippet with anyone.\n\nLogin to get started\n`;

const authenticatedContent = `Easily share your code snippet with anyone.`;

export const Heading = () => {
  const container = useRef(null);
  const { data: session, status } = useSession();
  const [originalcontent, setOriginalcontent] = useState(content);

  return (
    <div className="relative max-w-3xl space-y-4 justify-center flex flex-col items-center align-middle">
      <Separator className="dark:bg-slate-800 bg-neutral-100 border border-dashed md:w-[60vw]" />
      <Separator
        className="dark:bg-slate-800 bg-neutral-100 border border-dashed z-10 absolute left-0 h-[60vh]"
        orientation="vertical"
      />
      <Separator
        className="dark:bg-slate-800 bg-neutral-100  border border-dashed z-10 absolute right-0 h-[60vh]"
        orientation="vertical"
      />
      <HomeOptions
        container={container}
        content={originalcontent}
        id="home"
        isPublic={true}
        language="typescript"
        title="home"
      />
      <Separator className="dark:bg-slate-800 bg-neutral-100 my-5 border border-dashed w-full md:w-[60vw]" />

      <div ref={container}>
        <div
          ref={container}
          className="p-10 bg-gradient-to-r from-blue-200 via-sky-500 to-blue-400 rounded-lg"
        >
          <CodeTitleBar
            title={"home"}
            content={originalcontent}
            fileExtension=".tsx"
            snippetId=""
            snipperAuthorId=""
          />
          <ReactCodeMirror
            className={cn(
              "w-auto min-w-[250px] max-w-[5xl] max-h-[100%] overflow-y-auto text-base",
            )}
            value={`${status === "authenticated" ? `${authenticatedContent}\n\nWelcome, ${session?.user?.name}\n` : `${content}`}`}
            extensions={[
              javascript({ jsx: true, typescript: true }),
              EditorView.lineWrapping,
              highlightActiveLine(),
            ]}
            readOnly={false}
            theme="dark"
            placeholder="//Enter code snippet here..."
            onChange={setOriginalcontent}
          />
        </div>
      </div>
      <Separator className="dark:bg-slate-800 bg-neutral-100 my-5 border border-dashed w-full md:w-[60vw]" />
      <div>
        {status === "loading" && (
          <div className="w-full flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
        {status === "authenticated" && (
          <Button asChild className="w-[180px]">
            <Link href="/dashboard">
              Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
        {status === "unauthenticated" && <Social />}
      </div>

      <Separator className="dark:bg-slate-800 bg-neutral-100 my-5 border border-dashed w-full md:w-[60vw]" />
    </div>
  );
};
