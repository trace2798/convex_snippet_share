"use client";
import { GradientPicker } from "@/components/gradient-picker";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { SUPPORTED_TEXT_SIZES } from "@/lib/font";
import { SUPPORTED_LANGUAGES } from "@/lib/language";
import { SUPPORTED_PADDING_SIZES } from "@/lib/padding";
import { useBackgroundStore } from "@/store/color";
import { useLanguageStore } from "@/store/language";
import { usePaddingStore } from "@/store/padding";
import { useTextSizeStore } from "@/store/textsize";
import { useVisibilityStore } from "@/store/visibility";
import { Snippet } from "@/typing";
import * as Switch from "@radix-ui/react-switch";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import { toast } from "sonner";

interface ToolbarProps {
  snippet: Snippet;
  currentUserId?: string
}

const ToolBar: FC<ToolbarProps> = ({ snippet, currentUserId }) => {
  // const { data } = useSession();
  const { mutate, pending } = useApiMutation(api.snippet.updateBackgroundColor);

  const { mutate: mutateLanguage, pending: pendingLanguageChange } =
    useApiMutation(api.snippet.updateLanguage);

  const { mutate: mutateTextSize, pending: pendingTextSizeChange } =
    useApiMutation(api.snippet.updateTextSize);

  const { mutate: mutatePaddingSize, pending: pendingPaddingSizeChange } =
    useApiMutation(api.snippet.updatePadding);

  const { mutate: mutateVisibility, pending: pendingVisibilityChange } =
    useApiMutation(api.snippet.updateVisibility);

  const { background, setBackground } = useBackgroundStore();
  const { language, setLanguage } = useLanguageStore();
  const { textSize, setTextSize } = useTextSizeStore();
  const { padding, setPadding } = usePaddingStore();
  const { isPublic, setIsPublic } = useVisibilityStore();

  useEffect(() => {
    if (snippet) {
      setBackground(snippet.backgroundColor);
    }
  }, [snippet, setBackground]);

  useEffect(() => {
    if (snippet) {
      setLanguage(snippet.language);
    }
  }, [snippet, setLanguage]);

  useEffect(() => {
    if (snippet) {
      setTextSize(snippet.textSize);
    }
  }, [snippet, setTextSize]);

  useEffect(() => {
    if (snippet) {
      setPadding(snippet.padding);
    }
  }, [snippet, setPadding]);

  useEffect(() => {
    if (snippet) {
      setIsPublic(snippet.isPublic);
    }
  }, [snippet, setIsPublic]);

  const handleBackgroundChange = (id: string, background: string) => {
    mutate({
      id: id as Id<"snippets">,
      backgroundColor: background,
      userId: currentUserId,
    })
      .then(() => {
        toast.success("Background Updated");
      })
      .catch(() => toast.error("Failed to update background"));
  };

  const handleLanguageChange = (id: string, language: string) => {
    mutateLanguage({
      id: id as Id<"snippets">,
      language: language,
      userId: currentUserId,
    })
      .then(() => {
        toast.success("Language Updated");
      })
      .catch(() => toast.error("Failed to update language"));
  };

  const handleTextSizeChange = (id: string, textSize: string) => {
    mutateTextSize({
      id: id as Id<"snippets">,
      textSize: textSize,
      userId: currentUserId,
    })
      .then(() => {
        toast.success("Text Size Updated");
      })
      .catch(() => toast.error("Failed to update text size"));
  };

  const handlePaddingChange = (id: string, padding: string) => {
    mutatePaddingSize({
      id: id as Id<"snippets">,
      padding: padding,
      userId: currentUserId,
    })
      .then(() => {
        toast.success("Padding Size Updated");
      })
      .catch(() => toast.error("Failed to update padding size"));
  };

  const handleVisibilityChange = (id: string, isPublic: boolean) => {
    mutateVisibility({
      id: id as Id<"snippets">,
      isPublic: isPublic,
      userId: currentUserId,
    })
      .then(() => {
        toast.success("Visibility Updated");
      })
      .catch(() => toast.error("Failed to update visibility"));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 pl-5 pt-5">
        <div>
          <h1 className="text-sm mb-2 text-muted-foreground">Background</h1>
          <GradientPicker
            background={snippet?.backgroundColor ?? background}
            setBackground={(background: string) => {
              setBackground(background);
              handleBackgroundChange(snippet?._id, background);
            }}
          />
        </div>
        <div>
          <h1 className="text-sm mb-2 text-muted-foreground">Language</h1>
          <Select
            onValueChange={(newLanguage) =>
              handleLanguageChange(snippet?._id, newLanguage)
            }
          >
            <SelectTrigger
              className="w-[180px]"
              disabled={pendingLanguageChange}
            >
              <SelectValue className="capitalize" placeholder={language} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_LANGUAGES.map((language) => (
                  <SelectItem
                    key={language.id}
                    value={language.id}
                    onClick={() => setLanguage(language.id)}
                  >
                    {language.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h1 className="text-sm mb-2 text-muted-foreground">Text Size</h1>
          <Select
            onValueChange={(newTextSize) =>
              handleTextSizeChange(snippet?._id, newTextSize)
            }
          >
            <SelectTrigger
              disabled={pendingTextSizeChange}
              className="w-[180px]"
            >
              <SelectValue className="capitalize" placeholder={textSize} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_TEXT_SIZES.map((size) => (
                  <SelectItem
                    key={size.id}
                    value={size.pxValue}
                    onClick={() => setTextSize(size.tailwindClass)}
                  >
                    {size.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h1 className="text-sm mb-2 text-muted-foreground">Padding Size</h1>
          <Select
            onValueChange={(newPaddingSize) => {
              handlePaddingChange(snippet?._id, newPaddingSize);
            }}
          >
            <SelectTrigger
              disabled={pendingPaddingSizeChange}
              className="w-[180px]"
            >
              <SelectValue className="capitalize" placeholder={padding} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_PADDING_SIZES.map((padding) => (
                  <SelectItem key={padding.id} value={padding.pxValue}>
                    {padding.pxValue}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h1 className="text-sm mb-2 text-muted-foreground">Visibility</h1>
          {snippet && snippet.isPublic ? (
            <HoverCard>
              <HoverCardTrigger className="flex flex-col group">
                <Switch.Root
                  checked={true}
                  onCheckedChange={() =>
                    handleVisibilityChange(snippet._id, false)
                  }
                  className="w-11 p-px rounded-full bg-slate-500 data-[state=checked]:bg-sky-500 shadow-inner shadow-black/50 active:data-[state=checked]:bg-sky-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-400 focus-visible:outline-2"
                >
                  <Switch.Thumb className="w-6 h-6 data-[state=checked]:bg-white bg-gray-200 shadow-sm block rounded-full transition data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit text-sm">
                Click to make it private. You cannot share a private snippet.
              </HoverCardContent>
            </HoverCard>
          ) : (
            <HoverCard>
              <HoverCardTrigger className="flex flex-col group">
                <Switch.Root
                  onCheckedChange={() =>
                    handleVisibilityChange(snippet?._id, true)
                  }
                  className="w-11 p-px rounded-full bg-slate-500 data-[state=checked]:bg-sky-500 shadow-inner shadow-black/50 active:data-[state=checked]:bg-sky-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-400 focus-visible:outline-2"
                >
                  <Switch.Thumb className="w-6 h-6 data-[state=checked]:bg-white bg-gray-200 shadow-sm block rounded-full transition data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit text-sm">
                Click to make it public. You can share a public snippet.
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolBar;
