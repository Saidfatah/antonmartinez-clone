// app/store/layout.ts

import { create } from "zustand";

type LayoutStore = {
    layoutReady: boolean;
    pageRevealAnimationEnabled: boolean;
    setLayoutReady: (ready: boolean) => void;
    setPageRevealAnimationEnabled: (enabled: boolean) => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
    layoutReady: false,
    pageRevealAnimationEnabled: false,
    setLayoutReady: (ready) => set({ layoutReady: ready }),
    setPageRevealAnimationEnabled: (enabled) => set({ pageRevealAnimationEnabled: enabled }),
}));