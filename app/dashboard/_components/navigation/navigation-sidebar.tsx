"use client";

import { Separator } from "@/components/ui/separator";
// import { UserButton } from "@clerk/nextjs";
import {
  ActivityIcon,
  Code2Icon,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../../../../components/mode-toggle";
import UserButton from "./user-button";

export const NavigationSidebar = () => {
  return (
    <>
      <div className="space-y-4 flex flex-col items-center h-full text-primary w-full backdrop-blur-md shadow-sm border-r py-3">
        <Link href="/">
          <Code2Icon className="h-7 w-7 hover:cursor-pointer hover:text-indigo-400" />
        </Link>
        <Link href="/dashboard">
          <LayoutDashboard className="h-7 w-7 mt-10 hover:cursor-pointer hover:text-indigo-400" />
        </Link>
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <ModeToggle />
          <Link href="/dashboard/aiactivity">
            <ActivityIcon className="h-7 w-7 hover:cursor-pointer hover:text-indigo-400" />
          </Link>
          <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
          <UserButton />
        </div>
      </div>
    </>
  );
};
