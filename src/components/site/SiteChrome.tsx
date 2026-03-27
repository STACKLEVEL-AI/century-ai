import type { ReactNode } from "react";
import SectionNavigator from "@/components/SectionNavigator";
import StickyHeader from "@/components/site/StickyHeader";
import FooterMultiColumn from "@/components/site/FooterMultiColumn";
import ScrollToTop from "@/components/ScrollToTop";

type SiteChromeProps = {
  children: ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  return (
    <div className="site-root">
      <div className="grid-overlay" aria-hidden="true" />
      <StickyHeader />
      <SectionNavigator />
      <div className="site-root__content">{children}</div>
      <FooterMultiColumn />
      <ScrollToTop />
    </div>
  );
}
