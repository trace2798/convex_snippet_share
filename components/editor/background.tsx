"use client";
import { FC, useRef, useState } from "react";
import Options from "./options";
import { useBackgroundStore } from "@/store/color";
import { cn } from "@/lib/utils";
import { usePaddingStore } from "@/store/padding";

interface BackgroundProps {
  children: React.ReactNode;
  snippet: any;
}

const Background: FC<BackgroundProps> = ({ children, snippet }) => {
  const container = useRef(null);
  const { background } = useBackgroundStore();
  const { padding } = usePaddingStore();
  const bg = snippet?.backgroundColor ?? background;
  const paddingClass = snippet?.padding ?? padding;
  return (
    <>
      <Options
        container={container}
        language={snippet?.language}
        title={snippet?.title}
        content={snippet?.content}
        isPublic={snippet?.isPublic ?? false}
        id={snippet?._id}
      />
      <div
        ref={container}
        className={cn(
          "flex top-0 justify-center w-fit items-center rounded-xl",
          paddingClass
        )}
        style={{ background: bg ?? background, padding: snippet?.padding }} // Use the background state to set the background color
      >
        {children}
      </div>
    </>
  );
};

export default Background;
