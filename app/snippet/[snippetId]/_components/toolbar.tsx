// import { PickerExample } from "@/components/GradientPicker";
import { GradientPicker } from "@/components/gradient-picker";
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
import { useQuery } from "convex/react";
import { FC, useEffect } from "react";
import { toast } from "sonner";
import VisibilitySwitch from "./visibility-switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Globe, Lock } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import { useVisibilityStore } from "@/store/visibility";

interface ToolbarProps {
  snippetId: string;
}

const ToolBar: FC<ToolbarProps> = ({ snippetId }) => {
  const { mutate, pending } = useApiMutation(
    api.snippet.updateBackgroundColor
  );

  const { mutate: mutateLanguage } = useApiMutation(
    api.snippet.updateLanguage
  );

  const { mutate: mutateTextSize } = useApiMutation(
    api.snippet.updateTextSize
  );

  const { mutate: mutatePaddingSize } = useApiMutation(
    api.snippet.updatePadding
  );

  const snippet = useQuery(api.snippets.getById, {
    snippetId: snippetId as Id<"snippets">,
  });

  const { mutate: mutateVisibility } = useApiMutation(
    api.snippet.updateVisibility
  );

  //console.log("BACK GROYBD ==>", snippet);
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
    })
      .then(() => {
        toast.success("Language Updated");
      })
      .catch(() => toast.error("Failed to update language"));
  };

 // console.log("Language", language);
 // console.log("Set Language", setLanguage);

  const handleTextSizeChange = (id: string, textSize: string) => {
    mutateTextSize({
      id: id as Id<"snippets">,
      textSize: textSize,
    })
      .then(() => {
        toast.success("Text Size Updated");
      })
      .catch(() => toast.error("Failed to update text size"));
  };
 // console.log("Text Size", textSize);
 // console.log("Set Text Size", setTextSize);

  const handlePaddingChange = (id: string, padding: string) => {
    mutatePaddingSize({
      id: id as Id<"snippets">,
      padding: padding,
    })
      .then(() => {
        toast.success("Padding Size Updated");
      })
      .catch(() => toast.error("Failed to update padding size"));
  };
  //console.log("Padding Size", padding);
  //console.log("Set Padding Size", setPadding);

  const handleVisibilityChange = (id: string, isPublic: boolean) => {
    mutateVisibility({
      id: id as Id<"snippets">,
      isPublic: isPublic,
    })
      .then(() => {
        toast.success("Visibility Updated");
      })
      .catch(() => toast.error("Failed to update visibility"));
  };
  // console.log("Padding Size", padding);
  // console.log("Set Padding Size", setPadding);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 pl-5 pt-5">
        <div>
          Background
          <br />
          <GradientPicker
            background={snippet?.backgroundColor ?? background}
            setBackground={(background: string) => {
              setBackground(background);
              handleBackgroundChange(snippetId, background);
            }}
          />
        </div>
        <div>
          Language
          <br />
          <Select
            onValueChange={(newLanguage) =>
              handleLanguageChange(snippetId, newLanguage)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="capitalize"
                placeholder={snippet?.language}
              />
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
          Text Size
          <br />
          <Select
            onValueChange={(newTextSize) =>
              handleTextSizeChange(snippetId, newTextSize)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="capitalize"
                placeholder={snippet?.textSize}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_TEXT_SIZES.map((size) => (
                  <SelectItem
                    key={size.id}
                    value={size.tailwindClass}
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
          Padding Size
          <br />
          <Select
            onValueChange={(newPaddingSize) =>
              handlePaddingChange(snippetId, newPaddingSize)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="capitalize"
                placeholder={snippet?.padding}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_PADDING_SIZES.map((padding) => (
                  <SelectItem
                    key={padding.id}
                    value={padding.pxValue}
                    onClick={() => setPadding(padding.pxValue)}
                  >
                    {padding.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          Visibility
          <br />
          {snippet && snippet.isPublic ? (
            <HoverCard>
              <HoverCardTrigger className="flex flex-col group">
                <Switch.Root
                  checked={true}
                  onCheckedChange={() =>
                    handleVisibilityChange(snippetId, false)
                  }
                  className="w-11 p-px rounded-full bg-slate-500 data-[state=checked]:bg-sky-500 shadow-inner shadow-black/50 active:data-[state=checked]:bg-sky-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-400 focus-visible:outline-2"
                >
                  <Switch.Thumb className="w-6 h-6 data-[state=checked]:bg-white bg-gray-200 shadow-sm block rounded-full transition data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit text-sm">
                Click to make it private
              </HoverCardContent>
            </HoverCard>
          ) : (
            <HoverCard>
              <HoverCardTrigger className="flex flex-col group">
                <Switch.Root
                  // checked={publicMode}
                  onCheckedChange={() =>
                    handleVisibilityChange(snippetId, true)
                  }
                  className="w-11 p-px rounded-full bg-slate-500 data-[state=checked]:bg-sky-500 shadow-inner shadow-black/50 active:data-[state=checked]:bg-sky-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-400 focus-visible:outline-2"
                >
                  <Switch.Thumb className="w-6 h-6 data-[state=checked]:bg-white bg-gray-200 shadow-sm block rounded-full transition data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit text-sm">
                Click to make it public
              </HoverCardContent>
            </HoverCard>
          )}
          {/* <VisibilitySwitch isPublic={snippet?.isPublic} /> */}
        </div>
      </div>
    </>
  );
};

export default ToolBar;
