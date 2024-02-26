"use client";
import { cn } from "@/lib/utils";
import { useBackgroundStore } from "@/store/color";
import { usePaddingStore } from "@/store/padding";
import { FC, useRef } from "react";
import Options from "./options";
import { Card, CardDescription } from "../ui/card";

interface BackgroundProps {
  children: React.ReactNode;
  snippet: any;
}

const Background: FC<BackgroundProps> = ({ children, snippet }) => {
  const container = useRef(null);
  const { background } = useBackgroundStore();
  const { padding } = usePaddingStore();
  const bg = snippet?.backgroundColor ?? background;
  const pd = snippet?.padding ?? padding;
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
      <Card className="border-none mb-3">
        <CardDescription>Views: {snippet?.viewCount}</CardDescription>
      </Card>
      <div
        ref={container}
        className={cn(
          "flex top-0 justify-center w-fit items-center rounded-xl",
        )}
        style={{ background: bg ?? background, padding: pd }} // Use the background state to set the background color
      >
        {children}
      </div>
    </>
  );
};

export default Background;
