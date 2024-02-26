"use client";

import { Separator } from "@/components/ui/separator";
// import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../../../../components/mode-toggle";
import { ActivityIcon, Building, Code, LayoutDashboard, PersonStanding } from "lucide-react";
import Link from "next/link";
import UserButton from "./user-button";

export const NavigationSidebar = () => {
  return (
    <>
      <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
        <Link href="/">
          <Code className="h-7 w-7 hover:cursor-pointer hover:text-indigo-400" />
        </Link>
        <Link href="/dashboard">
          <LayoutDashboard className="h-7 w-7 mt-10 hover:cursor-pointer hover:text-indigo-400" />
        </Link>
        {/* <Link href="/personal">
          <PersonStanding className="h-7 w-7 hover:cursor-pointer hover:text-indigo-400" />
        </Link> */}
        {/* <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" /> */}
        {/* <Link href="/organization">
          <Building className="h-7 w-7 hover:cursor-pointer hover:text-indigo-400" />
        </Link> */}
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
