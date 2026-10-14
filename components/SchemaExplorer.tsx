"use client";
import { useState } from "react";
import { MODULES } from "@/lib/content";

export default function SchemaExplorer() {
  const [i, setI] = useState(7);
  const m = MODULES[i];
  return (
    <>
      <div className="lab">pick a module</div>
      <div className="modgrid" role="tablist" aria-label="Schema modules">
        {MODULES.map((mod, idx) => (
          <button
            key={mod.n}
            className={"mod" + (idx === i ? " on" : "")}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setI(idx)}
          >
            <b>{mod.n}</b>
            <span>{mod.t.length} tables</span>
          </button>
        ))}
      </div>
      <div className="modview" role="region" aria-live="polite">
        <span className="grp">{m.g}</span>
        <h4>{m.n}</h4>
        <div className="tbls">
          {m.t.map((t) => (<span className="tbl" key={t}>{t}</span>))}
        </div>
        <p>{m.d}</p>
      </div>
    </>
  );
}
