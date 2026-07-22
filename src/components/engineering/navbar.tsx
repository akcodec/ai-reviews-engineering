"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("engineering-theme");
    const next = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = next;
    const frame = requestAnimationFrame(() => setTheme(next));
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("engineering-theme", next);
    setTheme(next);
  }

  return <header className="site-header">
    <nav className="nav-shell" aria-label="Primary navigation">
      <a className="brand" href="#top" aria-label={`${siteConfig.name}, back to top`}>
        <span className="brand-mark" aria-hidden="true">{siteConfig.shortName}</span>
        <span>{siteConfig.name}</span>
      </a>
      <div id="mobile-nav" className={`nav-links ${open ? "is-open" : ""}`}>
        {siteConfig.navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </div>
      <div className="nav-actions">
        <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={theme === "dark" ? "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" : "M20 15.2A8 8 0 0 1 8.8 4 8 8 0 1 0 20 15.2Z"} /></svg>
        </button>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          <span className="sr-only">Toggle navigation</span><span /><span />
        </button>
      </div>
    </nav>
  </header>;
}
