import { create } from "zustand";

interface IPaddingStore {
  padding: string;
  setPadding: (padding: string) => void;
}

export const usePaddingStore = create<IPaddingStore>((set) => ({
  padding: "p-10", // Default language
  setPadding: (padding) => set({ padding }),
}));
