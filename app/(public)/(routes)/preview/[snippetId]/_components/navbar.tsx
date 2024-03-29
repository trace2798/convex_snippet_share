import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Code2Icon } from "lucide-react";

export const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 w-full h-14 px-4 border-b border-muted backdrop-blur-md shadow-sm flex items-center z-50">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
          <Link href="/">
            <Code2Icon />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};
