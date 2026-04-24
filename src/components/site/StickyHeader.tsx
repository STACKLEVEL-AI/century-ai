"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ActionLink } from "@/components/site/ActionLink";
import { siteNavigation } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function StickyHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
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
    const onMouseMove = (event: MouseEvent) => {
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

  return (
    <>
      <header
        className={`site-header shell${hidden ? " is-hidden" : ""}${menuOpen ? " menu-open" : ""}`}
      >
        <div className="header-main">
          <Link href="/" className="logo" aria-label="Century by Stacklevel Group" onClick={closeMenu}>
            <span className="logo-line-two">
              <Image
                className="logo-stacklevel"
                src="/assets/sl.png"
                alt="Stacklevel Group logo"
                width={300}
                height={23}
                priority
              />
            </span>
          </Link>

          <button
            className={`burger-btn${menuOpen ? " is-active" : ""}`}
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>

          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Основная навигация">
            {siteNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? "is-active" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <ActionLink
              href="/demo"
              className="nav-cta"
              trackingLabel="header_mobile_demo"
              trackingContext="header"
              onClick={closeMenu}
            >
              Запросить демо
            </ActionLink>
          </nav>

          <div className="header-tools">
            <ActionLink
              href="/demo"
              className="header-cta"
              trackingLabel="header_demo"
              trackingContext="header"
            >
              Запросить демо
            </ActionLink>
          </div>
        </div>
      </header>

      <div className="mobile-bottom-cta">
        <div className="shell">
          <ActionLink
            href="/demo"
            className="header-cta mobile-bottom-cta__link"
            trackingLabel="mobile_bottom_demo"
            trackingContext="mobile-bottom"
          >
            Запросить демо
          </ActionLink>
        </div>
      </div>
    </>
  );
}
