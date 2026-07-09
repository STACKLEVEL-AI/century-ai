"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ActionLink } from "@/components/site/ActionLink";
import { siteNavigation } from "@/lib/site";

const LANDING_SCROLL_RESTORE_KEY = "century:landing-scroll-y";

export default function StickyHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const upScrollAccum = useRef(0);
  const downScrollAccum = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;

      if (next) {
        setHidden(false);
      }

      return next;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const centerLandingTarget = useCallback((target: HTMLElement) => {
    const headerHeightRaw = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--landing-header-height");
    const headerHeight = Number.parseFloat(headerHeightRaw) || 0;
    const visibleViewportHeight = Math.max(window.innerHeight - headerHeight, 0);
    const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const targetRect = target.getBoundingClientRect();
    const targetCenter = window.scrollY + targetRect.top + targetRect.height / 2;
    const viewportCenter = headerHeight + visibleViewportHeight / 2;
    const targetTop = Math.max(0, Math.min(targetCenter - viewportCenter, maxScrollY));

    window.scrollTo({ top: targetTop, behavior: "auto" });
  }, []);

  const handleLandingAnchorClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
      closeMenu();

      if (pathname !== "/") {
        return;
      }

      const [, targetId] = href.split("#");

      if (!targetId) {
        return;
      }

      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      setHidden(false);
      setActiveSection(targetId);
      window.dispatchEvent(new CustomEvent("century:anchor-navigation-start"));

      const nextUrl = `${window.location.pathname}#${targetId}`;

      if (window.location.pathname + window.location.hash !== nextUrl) {
        window.history.pushState(null, "", nextUrl);
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          centerLandingTarget(target);
        });
      });
    },
    [centerLandingTarget, closeMenu, pathname],
  );

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) {
        return;
      }

      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      if (delta > 0) {
        upScrollAccum.current = 0;
        downScrollAccum.current += delta;

        if (downScrollAccum.current >= 40 && current > 80) {
          setHidden(true);
        }
      } else {
        downScrollAccum.current = 0;
        upScrollAccum.current += Math.abs(delta);

        if (upScrollAccum.current >= 40) {
          setHidden(false);
        }
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const onMouseMove = (event: globalThis.MouseEvent) => {
      if (Math.abs(event.movementY) < 3 && Math.abs(event.movementX) < 3) {
        return;
      }

      if (event.clientY < 80) {
        setHidden(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    if (!menuOpen || typeof window === "undefined" || window.innerWidth > 1040) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const getSectionKey = (section: HTMLElement) => section.dataset.navSection || section.id;
    const shouldPreserveReloadScroll = () => {
      const navigationEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;

      const isRestoreNavigation =
        navigationEntry?.type === "reload" || navigationEntry?.type === "back_forward";

      return isRestoreNavigation && sessionStorage.getItem(LANDING_SCROLL_RESTORE_KEY) !== null;
    };

    const centerTargetFromHash = () => {
      if (shouldPreserveReloadScroll()) {
        return;
      }

      const hash = window.location.hash.replace(/^#/, "");

      if (!hash) {
        return;
      }

      const target = document.getElementById(hash);

      if (!target) {
        return;
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          centerLandingTarget(target);
        });
      });
    };

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-landing-section]"));

    if (sections.length === 0 || !("IntersectionObserver" in window)) {
      centerTargetFromHash();
      window.addEventListener("hashchange", centerTargetFromHash);

      return () => {
        window.removeEventListener("hashchange", centerTargetFromHash);
      };
    }

    if (window.location.hash) {
      centerTargetFromHash();
    }

    const visibility = new Map<string, number>();
    sections.forEach((section) => {
      visibility.set(section.id, 0);
    });

    const setActiveFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");

      if (hash) {
        const target = document.getElementById(hash);
        setActiveSection(target ? getSectionKey(target) : hash);
      }
    };

    const updateActiveSection = () => {
      let nextSection = "";
      let maxRatio = 0;

      sections.forEach((section) => {
        const ratio = visibility.get(section.id) ?? 0;

        if (ratio > maxRatio) {
          maxRatio = ratio;
          nextSection = getSectionKey(section);
        }
      });

      if (!nextSection && window.scrollY >= 24) {
        nextSection = sections[0] ? getSectionKey(sections[0]) : "";
      }

      setActiveSection(nextSection);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(
            (entry.target as HTMLElement).id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        updateActiveSection();
      },
      {
        threshold: [0.16, 0.3, 0.5, 0.72],
        rootMargin: "-18% 0px -56% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    setActiveFromHash();
    window.addEventListener("hashchange", setActiveFromHash);
    window.addEventListener("hashchange", centerTargetFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", setActiveFromHash);
      window.removeEventListener("hashchange", centerTargetFromHash);
    };
  }, [centerLandingTarget, pathname]);

  return (
    <>
      <header className={`site-header${hidden ? " is-hidden" : ""}${menuOpen ? " menu-open" : ""}`}>
        <div className="header-main mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
          <Link
            href="/#hero"
            className="logo w-[190px] h-[48px]"
            aria-label="Century"
            onClick={(event) => handleLandingAnchorClick(event, "/#hero")}
          >
            <span className="logo-century w-full">CENTURY</span>
          </Link>

          <button
            className={`burger-btn${menuOpen ? " is-active" : ""}`}
            type="button"
            onClick={toggleMenu}
            aria-label={
              menuOpen
                ? "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e"
                : "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e"
            }
            aria-expanded={menuOpen}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>

          <nav
            className={`main-nav${menuOpen ? " is-open" : ""}`}
            aria-label="\u041e\u0441\u043d\u043e\u0432\u043d\u0430\u044f \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f"
          >
            {siteNavigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`main-nav__link${pathname === "/" && activeSection === item.sectionId ? " is-active" : ""}`}
                onClick={(event) => handleLandingAnchorClick(event, item.href)}
              >
                <span className="main-nav__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="main-nav__label">{item.label}</span>
              </Link>
            ))}

            <ActionLink
              href="/#contacts"
              className="header-cta nav-cta w-[128px] h-[36px]"
              trackingLabel="header_contact"
              trackingContext="header"
              onClick={(event) => handleLandingAnchorClick(event, "/#contacts")}
            >
             Связаться
            </ActionLink>
          </nav>
        </div>
      </header>

      <div className="mobile-bottom-cta">
        <div className="shell">
          <ActionLink
            href="/#contacts"
            className="header-cta mobile-bottom-cta__link"
            trackingLabel="mobile_bottom_contact"
            trackingContext="mobile-bottom"
            onClick={(event) => handleLandingAnchorClick(event, "/#contacts")}
          >
            Связаться
          </ActionLink>
        </div>
      </div>
    </>
  );
}
