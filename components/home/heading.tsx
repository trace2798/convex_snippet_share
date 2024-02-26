"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useSession } from "next-auth/react";
import { Social } from "../auth/social";
// import { Spinner } from "@/components/spinner";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useRef, useState } from "react";
import HomeOptions from "./home-options";
import ToolBar from "@/app/dashboard/snippet/[snippetId]/_components/toolbar";
import CodeTitleBar from "../editor/code-title-bar";
import { SUPPORTED_LANGUAGES } from "@/lib/language";
import { Spinner } from "../spinner";

const content = `Easily share your code snippet with anyone.

Login to get started.
This is my submission for Convex Zero to One Hackathon.`;

export const Heading = () => {
  const container = useRef(null);
  const { data: session, status } = useSession();

  return (
    <div className="max-w-3xl space-y-4 justify-center flex flex-col items-center align-middle">
      <HomeOptions
        container={container}
        content={content}
        id="home"
        isPublic={true}
        language="typescript"
        title="home"
      />
      <div
        ref={container}
        className="p-5 bg-gradient-to-r from-blue-200 via-sky-500 to-blue-400 rounded-lg"
      >
        <CodeTitleBar
          title={"home"}
          content={content}
          fileExtension=".tsx"
          snippetId="zxrectfvgbhknj345678"
          snipperAuthorId="234576890-cdfhgbjn"
        />
        <ReactCodeMirror
          className={cn(
            "w-auto min-w-[250px] max-w-[5xl] max-h-[100%] overflow-y-auto text-lg"
          )}
          value={`${content}`}
          extensions={[
            javascript({ jsx: true, typescript: true }),
            EditorView.lineWrapping,
          ]}
          readOnly={false}
          theme={"dark"}
          placeholder="//Enter code snippet here..."
        />
      </div>
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
    </div>
  );
};
