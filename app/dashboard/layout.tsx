import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { NavigationSidebar } from "../dashboard/_components/navigation/navigation-sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code2Icon } from "lucide-react";

const PersonalLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="flex md:hidden h-full w-[72px] z-30 fixed inset-y-0">
        <div className="fixed top-0 w-full h-14 px-4 border-b border-muted backdrop-blur-md shadow-sm flex items-center z-50">
          <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
            <Link href="/">
              <h1>
                <Code2Icon />
              </h1>
            </Link>
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button variant="outline">Menu</Button>
              </DrawerTrigger>
              <DrawerContent className="h-full w-20 bg-inherit">
                <NavigationSidebar />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full mx-[5vw] mt-20 md:mt-0">
        {children}
      </main>
    </div>
  );
};

export default PersonalLayout;
