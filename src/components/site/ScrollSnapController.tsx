"use client";

import { useEffect } from "react";

const SNAP_DURATION_MS = 600;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function getSnapOffset() {
  if (typeof window === "undefined") {
    return 10;
  }

  if (window.innerWidth <= 480) {
    return 48;
  }

  if (window.innerWidth <= 768) {
    return 56;
  }

  if (window.innerWidth <= 1040) {
    return 64;
  }

  return 10;
}

function getSnapIdleDelay() {
  if (typeof window === "undefined") {
    return 260;
  }

  if (window.innerWidth <= 768) {
    return 300;
  }

  return 260;
}

function getSnapThreshold() {
  if (typeof window === "undefined") {
    return 0.38;
  }

  if (window.innerWidth <= 768) {
    return 0.44;
  }

  if (window.innerWidth <= 1040) {
    return 0.4;
  }

  return 0.38;
}

function getSnapTargets() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      ".site-root__content > .hero, .site-root__content > .section, .site-root__content > main > .hero, .site-root__content > main > .section, .site-footer",
    ),
  ).filter((element) => element.offsetHeight > 0);
}

export default function ScrollSnapController() {
  useEffect(() => {
    let idleTimer = 0;
    let animationFrame = 0;
    let isAnimating = false;
    let lastScrollY = window.scrollY;
    let lastDirection: "down" | "up" = "down";

    const stopAnimation = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      isAnimating = false;
    };

    const animateScrollTo = (targetY: number) => {
      stopAnimation();

      const startY = window.scrollY;
      const delta = targetY - startY;

      if (Math.abs(delta) <= 4) {
        return;
      }

      isAnimating = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / SNAP_DURATION_MS, 1);
        const eased = easeInOutCubic(progress);

        window.scrollTo(0, startY + delta * eased);

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick);
          return;
        }

        animationFrame = 0;
        isAnimating = false;
        lastScrollY = window.scrollY;
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    const snapToSectionByDirection = () => {
      if (isAnimating) {
        return;
      }

      const targets = getSnapTargets();
      if (targets.length < 2) {
        return;
      }

      const offset = getSnapOffset();
      const currentY = window.scrollY;
      const adjustedY = currentY + offset;
      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const targetPositions = targets.map((element) =>
        Math.max(0, Math.min(window.scrollY + element.getBoundingClientRect().top - offset, maxScrollY)),
      );

      let lowerIndex = 0;
      for (let index = 0; index < targetPositions.length; index += 1) {
        if (targetPositions[index] <= adjustedY) {
          lowerIndex = index;
        }
      }

      const upperIndex = Math.min(lowerIndex + 1, targetPositions.length - 1);
      const lowerTarget = targetPositions[lowerIndex];
      const upperTarget = targetPositions[upperIndex];

      if (lastDirection === "down") {
        if (upperIndex === lowerIndex || upperTarget <= currentY + 4) {
          return;
        }

        const distanceBetweenSections = Math.max(1, upperTarget - lowerTarget);
        const progressToNext = Math.max(0, adjustedY - lowerTarget) / distanceBetweenSections;

        if (progressToNext < getSnapThreshold()) {
          return;
        }

        animateScrollTo(upperTarget);
        return;
      }

      if (upperTarget === lowerTarget || lowerTarget >= currentY - 4) {
        return;
      }

      const distanceBetweenSections = Math.max(1, upperTarget - lowerTarget);
      const progressToPrev = Math.max(0, upperTarget - adjustedY) / distanceBetweenSections;

      if (progressToPrev < getSnapThreshold()) {
        return;
      }

      animateScrollTo(lowerTarget);
    };

    const scheduleSnap = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY;
      const isScrollingUp = currentY < lastScrollY;

      if (isScrollingDown) {
        lastDirection = "down";
      } else if (isScrollingUp) {
        lastDirection = "up";
      }

      lastScrollY = currentY;

      if (isAnimating) {
        return;
      }

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(snapToSectionByDirection, getSnapIdleDelay());
    };

    const cancelSnap = () => {
      window.clearTimeout(idleTimer);
      stopAnimation();
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", scheduleSnap, { passive: true });
    window.addEventListener("wheel", cancelSnap, { passive: true });
    window.addEventListener("touchstart", cancelSnap, { passive: true });
    window.addEventListener("touchmove", cancelSnap, { passive: true });
    window.addEventListener("keydown", cancelSnap);
    window.addEventListener("mousedown", cancelSnap);
    window.addEventListener("resize", cancelSnap);

    return () => {
      window.clearTimeout(idleTimer);
      stopAnimation();
      window.removeEventListener("scroll", scheduleSnap);
      window.removeEventListener("wheel", cancelSnap);
      window.removeEventListener("touchstart", cancelSnap);
      window.removeEventListener("touchmove", cancelSnap);
      window.removeEventListener("keydown", cancelSnap);
      window.removeEventListener("mousedown", cancelSnap);
      window.removeEventListener("resize", cancelSnap);
    };
  }, []);

  return null;
}
