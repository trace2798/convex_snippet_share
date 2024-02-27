"use client";

import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
// import { useApiMutation } from "@/hooks/use-api-mutation";

import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Actions } from "@/components/actions";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Actions } from "./actions";
// import { Actions } from "@/components/actions";

interface SnippetCardProps {
  id: string;
  title: string;
  authorName: string;
  userId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const SnippetCard = ({
  id,
  title,
  userId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: SnippetCardProps) => {
  // const { userId } = useAuth();
  const currentUser = useCurrentUser();
  console.log("CurrentUSer ===>", currentUser);
  const authorLabel = userId === userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  // const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
  //   api.board.favorite
  // );
  // const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
  //   api.board.unfavorite
  // );

  // const toggleFavorite = () => {
  //   if (isFavorite) {
  //     onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
  //   } else {
  //     onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
  //   }
  // };

  return (
    <Link href={`/dashboard/snippet/${id}`}>
      <Card className="group hover:cursor-pointer hover:backdrop-blur-sm hover:shadow-sm dark:hover:shadow-indigo-200 hover:shadow-indigo-900">
        <CardHeader className="flex  flex-row items-center justify-between">
          <div className="text-sm group-hover:text-base group-hover:text-zinc-800 dark:group-hover:text-indigo-400">
            {title}
          </div>
          <div>
            <Actions id={id} title={title} side="right">
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

SnippetCard.Skeleton = function SnippetCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
