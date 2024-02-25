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
  pxValue: string;
};

export const SUPPORTED_TEXT_SIZES: SizesDefinition[] = [
  {
    id: "text-xs",
    label: "Extra Small",
    tailwindClass: "text-xs",
    pxValue: "12px"
  },
  {
    id: "text-sm",
    label: "Small",
    tailwindClass: "text-sm",
    pxValue: "14px",
  },
  {
    id: "text-base",
    label: "Base",
    tailwindClass: "text-base",
    pxValue: "16px"
  },
  {
    id: "text-lg",
    label: "Large",
    tailwindClass: "text-lg",
    pxValue: "18px"
  },
  {
    id: "text-xl",
    label: "Extra Large",
    tailwindClass: "text-xl",
    pxValue: "20px"
  },
];
