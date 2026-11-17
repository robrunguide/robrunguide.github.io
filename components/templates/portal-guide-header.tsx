"use client";

import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/urls";
import type { TemplateLink } from "@/lib/fixed-template/render";

export function PortalGuideHeader({ links, guideSlugs, currentSlug }: {
  links: TemplateLink[];
  guideSlugs: string[];
  currentSlug: string;
}) {
  const [open, setOpen] = useState<"mobile" | "guides" | null>(null);
  const header = useRef<HTMLElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const guidesToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !(open === "mobile" ? header : group).current?.contains(event.target)) {
        setOpen(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(null);
      (open === "mobile" ? mobileToggle : guidesToggle).current?.focus();
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const guideLinks = links.filter((link) => guideSlugs.includes(link.slug));
  const primaryLinks = links.filter((link) => !guideSlugs.includes(link.slug));
  const renderLink = (link: TemplateLink) => {
    const active = link.slug === currentSlug;
    return (
      <a key={link.slug} className={`nav-link${active ? " active" : ""}`} data-nav href={link.href} aria-current={active ? "page" : undefined}>
        {link.label}
      </a>
    );
  };

  return (
    <header className="portal-guide-header" ref={header}>
      <div className="wrap header">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Preserve the fixed template's ordinary navigation. */}
        <a className="brand" href="/" aria-label="Back to homepage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" alt={siteConfig.assets.logoAlt ?? ""} src={assetPath(siteConfig.assets.logo)} />
          <strong>{siteConfig.game.name || siteConfig.shortName}</strong>
        </a>
        <button type="button" ref={mobileToggle} className="nav-link portal-mobile-toggle" aria-controls="portal-navigation" aria-expanded={open === "mobile"} onClick={() => setOpen(open === "mobile" ? null : "mobile")}>
          <Menu size={16} aria-hidden="true" /> Menu
        </button>
        <nav className="nav" id="portal-navigation" aria-label="Primary navigation" data-open={open === "mobile"}>
          {primaryLinks.map(renderLink)}
          <div className="portal-more-guides" ref={group}>
            <button type="button" ref={guidesToggle} className="nav-link portal-guides-toggle" aria-controls="portal-guide-links" aria-expanded={open === "guides"} onClick={() => setOpen(open === "guides" ? null : "guides")}>
              More Guides <ChevronDown size={14} aria-hidden="true" />
            </button>
            <div id="portal-guide-links" className="portal-guide-links" data-open={open === "guides"}>
              {guideLinks.map(renderLink)}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
