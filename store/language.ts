import { create } from "zustand";

interface ILanguageStore {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<ILanguageStore>((set) => ({
  language: "typescript", // Default language
  setLanguage: (language) => set({ language }),
}));
