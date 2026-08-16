"use client";

import { RefObject, useEffect, useRef } from "react";

type UseVirtualScrollOptions = {
  enabled?: boolean;

  // Called when scrolling starts.
  onScrollStart?: () => void;

  // Called when scrolling completely settles.
  onScrollEnd?: (currentScrollY: number, maxScroll: number) => void;
  
  // Called when scrolling updates.
  onScrollUpdate?: (currentScrollY: number, maxScroll: number) => void;
  
  // Optional element that should receive pointer-events changes.
  scrollPointerRef?: RefObject<HTMLElement | null>;

  // Scroll sensitivity.
  multiplier?: number;

  // Inertia / interpolation.
  ease?: number;
};

const data={
    current:0,
    target: 0,
}

export function useVirtualScroll(
  containerRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    onScrollStart,
    onScrollUpdate,
    onScrollEnd,
    scrollPointerRef,
    multiplier = 0.3,
    ease = 0.3,
  }: UseVirtualScrollOptions = {}
) {

  const raf = useRef<number | null>(null);
  const maxScroll = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !enabled) return;

    const updateBounds = () => {
     maxScroll.current = Math.max(
        container.offsetHeight - window.innerHeight,
        0
    );

      data.target = Math.min(
        Math.max(data.target, -maxScroll.current),
        0
      );

      data.current = Math.min(
        Math.max(data.current, -maxScroll.current),
        0
      );
    };

    const setScrollingState = (scrolling: boolean) => {
      if (isScrolling.current === scrolling) return;

      isScrolling.current = scrolling;

      if (scrollPointerRef?.current) {
        scrollPointerRef.current.style.pointerEvents = scrolling
          ? "all"
          : "none";
      }

      if (scrolling) {
        onScrollStart?.();
      } 
    };

    const render = () => {
      data.current +=
        (data.target - data.current) * ease;

      // Avoid tiny floating-point values.
      if (Math.abs(data.current) < 0.15) {
        data.current = data.target;
      }

      container.style.transform = `translate3d(0, ${data.current}px, 0)`;

      // Call update callback with current scroll position
      onScrollUpdate?.(Math.abs(data.current), maxScroll.current);

      const settled =
        Math.abs(data.target - data.current) < 0.1;

      if (settled) {
        data.current = data.target;

        onScrollEnd?.(Math.abs(data.current), maxScroll.current);
        setScrollingState(false);
        raf.current = null;

        return;
      }

      raf.current = requestAnimationFrame(render);
    };

    const startRender = () => {
      if (raf.current !== null) return;

      raf.current = requestAnimationFrame(render);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const delta = event.deltaY * multiplier;

      data.target -= delta;

      data.target = Math.max(
        -maxScroll.current,
        Math.min(0, data.target)
      );

      setScrollingState(true);
      startRender();
    };

    const handleResize = () => {
      updateBounds();
    };

    updateBounds();

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);

      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }

      container.style.transform = "";

      if (scrollPointerRef?.current) {
        scrollPointerRef.current.style.pointerEvents = "none";
      }
    };
  }, [
    containerRef,
    enabled,
    ease,
    multiplier,
    onScrollStart,
    onScrollEnd,
    scrollPointerRef,
  ]);
}