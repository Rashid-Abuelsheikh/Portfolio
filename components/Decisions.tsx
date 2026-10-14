"use client";
import { useState } from "react";
import { DECISIONS } from "@/lib/content";

export default function Decisions() {
  const [i, setI] = useState(0);
  const d = DECISIONS[i];
  return (
    <>
      <div className="lab" style={{ marginTop: "1.75rem" }}>three decisions worth defending</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: ".9rem" }}>
        {DECISIONS.map((dec, idx) => (
          <button
            key={dec.k}
            className="sbtn"
            style={idx === i ? { borderColor: "var(--blue)", background: "var(--blue-t)" } : undefined}
            onClick={() => setI(idx)}
          >
            {dec.k}
          </button>
        ))}
      </div>
      <div>
        <h4 style={{ fontSize: "15px", color: "var(--ink)", marginBottom: ".5rem" }}>{d.h}</h4>
        <p style={{ fontSize: "14.5px", maxWidth: "72ch", marginBottom: ".9rem" }}>{d.p}</p>
        <pre dangerouslySetInnerHTML={{ __html: d.c }} />
      </div>
    </>
  );
}
