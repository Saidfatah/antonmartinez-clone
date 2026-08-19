// app/store/layout.ts

import { create } from "zustand";

type LayoutStore = {
    layoutReady: boolean;
    revealWorksPageElements: boolean;
    setLayoutReady: (ready: boolean) => void;
    setRevealWorksPageElements: (reveal: boolean) => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
    layoutReady: false,
    revealWorksPageElements: false,
    setRevealWorksPageElements: (reveal) => set({ revealWorksPageElements: reveal }),
    setLayoutReady: (ready) => set({ layoutReady: ready }),
}));