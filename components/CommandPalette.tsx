"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { palette } from "@/lib/content";
import { toggleTheme } from "@/lib/theme";

type Item = { label: string; tag: string; go?: string; act?: string };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const shown: Item[] = palette.filter((it) =>
    (it.label + " " + it.tag).toLowerCase().includes(q.toLowerCase().trim())
  );

  const close = useCallback(() => { setOpen(false); setQ(""); setSel(0); }, []);
  const openPal = useCallback(() => { setOpen(true); setQ(""); setSel(0); }, []);

  const choose = useCallback((it?: Item) => {
    if (!it) return;
    close();
    if (it.act === "theme") { toggleTheme(); return; }
    if (!it.go) return;
    if (it.go.startsWith("#")) {
      document.querySelector(it.go)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(it.go, it.go.startsWith("mailto") ? "_self" : "_blank");
    }
  }, [close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => openPal();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen as EventListener);
    };
  }, [openPal]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 20); }, [open]);

  if (!open) return null;

  return (
    <div
      className="scrim open"
      role="dialog"
      aria-modal="true"
      aria-label="Jump to section"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="pal">
        <input
          ref={inputRef}
          type="text"
          placeholder="Jump to…"
          autoComplete="off"
          spellCheck={false}
          aria-label="Search sections"
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, shown.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            else if (e.key === "Enter") { e.preventDefault(); choose(shown[sel]); }
            else if (e.key === "Escape") { close(); }
          }}
        />
        <ul role="listbox">
          {shown.length === 0 ? (
            <div className="empty">Nothing matches.</div>
          ) : (
            shown.map((it, idx) => (
              <li
                key={it.label}
                role="option"
                aria-selected={idx === sel}
                onMouseEnter={() => setSel(idx)}
                onClick={() => choose(it)}
              >
                <span>{it.label}</span>
                <span className="t">{it.tag}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
