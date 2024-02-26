import { create } from "zustand";

interface IBackgroundStore {
  background: string;
  setBackground: (background: string) => void;
}

export const useBackgroundStore = create<IBackgroundStore>((set) => ({
  background: "#B4D455", // Default background color
  setBackground: (background) => set({ background }),
}));
