"use client";
import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";
import { toggleTheme } from "@/lib/theme";

export default function Rail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const secs = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!("IntersectionObserver" in window) || !secs.length) return;
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const openPalette = () => window.dispatchEvent(new CustomEvent("open-palette"));

  return (
    <aside className="rail">
      <div className="sig">
        Rashid<br />Abu Elsheikh
        <small>Full-stack developer<br />Amman, Jordan</small>
      </div>
      <nav className="railnav" aria-label="Sections">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className={active === n.href.slice(1) ? "on" : ""}>
            <span className="bar" />
            {n.label}
          </a>
        ))}
      </nav>
      <div className="railfoot">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noreferrer">github</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin</a>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginTop: ".4rem" }}>
          <button className="themebtn" onClick={toggleTheme} aria-label="Switch colour theme">◐</button>
          <button className="kbd" onClick={openPalette} aria-label="Open command palette">⌘K</button>
        </div>
      </div>
    </aside>
  );
}
