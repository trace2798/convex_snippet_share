"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Actions } from "./actions";

interface SnippetCardProps {
  id: string;
  title: string;
  userId: string;
  createdAt: number;
}

export const SnippetCard = ({
  id,
  title,
  userId,
  createdAt,
}: SnippetCardProps) => {
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <Link href={`/dashboard/snippet/${id}`}>
      <Card className="group hover:cursor-pointer hover:backdrop-blur-sm hover:shadow-sm dark:hover:shadow-indigo-200 hover:shadow-indigo-900">
        <CardHeader className="flex  flex-row items-center justify-between">
          <div className="text-sm group-hover:text-base group-hover:text-zinc-800 dark:group-hover:text-indigo-400">
            {title}
          </div>
          <div>
            <Actions id={id} title={title} side="right" userId={userId}>
              <button className="">
                <MoreHorizontal className=" opacity-75 hover:opacity-100 transition-opacity" />
              </button>
            </Actions>
          </div>
        </CardHeader>
        <CardFooter className="text-sm dark:group-hover:text-indigo-300">
          {createdAtLabel}
        </CardFooter>
      </Card>
    </Link>
  );
};

SnippetCard.Skeleton =  function SnippetCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
