import { create } from "zustand";

interface IVisibilityStore {
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
}

export const useVisibilityStore = create<IVisibilityStore>((set) => ({
  isPublic: true, // Default language
  setIsPublic: (isPublic) => set({ isPublic }),
}));
