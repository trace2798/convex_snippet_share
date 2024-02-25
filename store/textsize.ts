import { create } from "zustand";

interface ITextSizeStore {
  textSize: string;
  setTextSize: (textSize: string) => void;
}

export const useTextSizeStore = create<ITextSizeStore>((set) => ({
  textSize: "text-base", // Default language
  setTextSize: (textSize) => set({ textSize }),
}));
