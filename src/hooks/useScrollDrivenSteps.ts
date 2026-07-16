"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollDrivenSteps(stepCount: number) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || stepCount < 2) return;

    let frame = 0;

    const updateActiveStep = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const viewportHeight = Math.max(1, window.innerHeight);

      if (rect.top >= viewportHeight || rect.bottom <= 0) return;

      const nextIndex = Math.max(
        0,
        Math.min(stepCount - 1, Math.round(-rect.top / viewportHeight)),
      );

      if (nextIndex === activeIndexRef.current) return;

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const queueUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveStep);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, [stepCount]);

  const scrollToStep = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const nextIndex = Math.max(0, Math.min(stepCount - 1, index));
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      window.scrollTo({
        top: sectionTop + window.innerHeight * nextIndex,
        // Smooth programmatic scrolling can be cancelled by CSS scroll-snap.
        behavior: "auto",
      });
    },
    [stepCount],
  );

  return { activeIndex, scrollToStep, sectionRef };
}
