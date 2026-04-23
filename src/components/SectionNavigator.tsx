"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { animateElementIntoView } from "@/lib/scroll";

export default function SectionNavigator() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const sectionsCount = pathname === "/" ? 12 : 0;
  const contrastSectionIndices = [7];

  useEffect(() => {
    if (pathname !== "/") {
      sectionsRef.current = [];
      return;
    }

    const sections = Array.from(
      document.querySelectorAll(".home-page > section, .site-root__content > section"),
    ) as HTMLElement[];
    sectionsRef.current = sections;

    if (sections.length === 0) return;

    const updateActive = () => {
      let closestIndex = 0;
      let minDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - (window.innerHeight / 2));

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    const timeout = setTimeout(updateActive, 100);
    const snapTimeout = setTimeout(updateActive, 600);
    const rafId = window.requestAnimationFrame(updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      clearTimeout(timeout);
      clearTimeout(snapTimeout);
      window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  if (pathname !== "/" || sectionsCount === 0) {
    return null;
  }

  const handleDotClick = (index: number) => {
    const section = sectionsRef.current[index];
    if (!section) return;

    animateElementIntoView(section, 96);
  };

  return (
    <div className="section-dots-container">
      {Array.from({ length: sectionsCount }).map((_, i) => (
        <div
          key={i}
          className={`section-dot ${i === activeIndex ? "active" : ""} ${contrastSectionIndices.includes(activeIndex) ? "contrast" : ""}`}
          onClick={() => handleDotClick(i)}
        />
      ))}
    </div>
  );
}
