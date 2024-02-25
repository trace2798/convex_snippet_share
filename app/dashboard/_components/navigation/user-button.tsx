"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC, use } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

interface UserButtonProps {}

const UserButton: FC<UserButtonProps> = ({}) => {
  const { data, status } = useSession();
  if (status === "loading")
    return (
      <>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </>
    );
  console.log(data);
  if (!data) {
    redirect("/");
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
          <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
            <Avatar className="relative w-8 h-8">
              {data.user.image ? (
                <div className="relative aspect-square h-full w-full">
                  <Avatar>
                    <AvatarImage src={data.user.image} />
                  </Avatar>
                </div>
              ) : (
                <AvatarFallback>
                  <span className="sr-only">{data.user.name}</span>
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="" align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              {data.user.name && (
                <p className="font-medium text-sm ">{data.user.name}</p>
              )}
              {data.user.email && (
                <p className="w-[200px] truncate text-xs ">{data.user.email}</p>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            // asChild
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserButton;
