"use client";

import * as Switch from "@radix-ui/react-switch";
import { FC, useState } from "react";

export default function VisibilitySwitch({ isPublic }: { isPublic: boolean }) {
  const [publicMode, setPublicMode] = useState(isPublic);

  return (
    <>
      <p>Document is Public {publicMode ? "Yes" : "no"}</p>
      <label className="flex space-x-4">
        <span className="font-medium">Airplane Mode</span>
        <Switch.Root
          checked={publicMode}
          onCheckedChange={setPublicMode}
          className="w-11 p-px rounded-full bg-slate-500 data-[state=checked]:bg-sky-500 shadow-inner shadow-black/50 active:data-[state=checked]:bg-sky-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-400 focus-visible:outline-2"
        >
          <Switch.Thumb className="w-6 h-6 data-[state=checked]:bg-white bg-gray-200 shadow-sm block rounded-full transition data-[state=checked]:translate-x-[18px]" />
        </Switch.Root>
      </label>
    </>
  );
}
