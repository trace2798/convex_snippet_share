// import { LanguageDefinition } from "./types";
import {
  type LanguageSupport as LS,
  type StreamParser,
} from "@codemirror/language";
import type { Extension } from "@codemirror/state";

export type SizesDefinition = {
  id: string;
  label: string;
  tailwindClass: string;
};

export const SUPPORTED_TEXT_SIZES: SizesDefinition[] = [
  {
    id: "text-xs",
    label: "Extra Small",
    tailwindClass: "text-xs",
  },
  {
    id: "text-sm",
    label: "Small",
    tailwindClass: "text-sm",
  },
  {
    id: "text-base",
    label: "Base",
    tailwindClass: "text-base",
  },
  {
    id: "text-lg",
    label: "Large",
    tailwindClass: "text-lg",
  },
  {
    id: "text-xl",
    label: "Extra Large",
    tailwindClass: "text-xl",
  },
];
