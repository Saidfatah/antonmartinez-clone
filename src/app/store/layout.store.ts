// app/store/layout.ts

import { create } from "zustand";

type LayoutStore = {
    layoutReady: boolean;
    setLayoutReady: (ready: boolean) => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
    layoutReady: false,
    setLayoutReady: (ready) => set({ layoutReady: ready }),
}));