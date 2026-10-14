"use client";
import { useEffect, useState, useCallback } from "react";
import { bb84, N, SAMPLE, THRESHOLD, type Bb84Result } from "@/lib/bb84";

export default function BB84() {
  const [eve, setEve] = useState(0);
  const [r, setR] = useState<Bb84Result | null>(null);

  const run = useCallback((pct: number) => {
    setR(bb84(N, pct / 100, SAMPLE));
  }, []);

  useEffect(() => { run(eve); }, [eve, run]);

  const rate = r ? r.rate : 0;
  const abort = rate > THRESHOLD;
  const fillW = Math.min(100, (rate / 0.3) * 100);
  const threshLeft = (THRESHOLD / 0.3) * 100;
  const verdict = abort
    ? "error rate above 0.11. Abort, a channel this noisy is assumed tapped"
    : r && r.same
    ? "keys match. Proceed to error correction"
    : "within threshold. Proceed to reconciliation";

  return (
    <div className="case-b">
      <div className="simwrap">
        <div>
          <div className="slider-row">
            <label htmlFor="eve">Eve intercepts</label>
            <input
              type="range" id="eve" min={0} max={100} step={5} value={eve}
              onChange={(e) => setEve(+e.target.value)}
            />
            <span className="val">{eve}%</span>
          </div>
          <div className="gauge">
            <div className="gauge-top"><span>estimated error rate</span><span>{rate.toFixed(3)}</span></div>
            <div className="track">
              <div className={"fill" + (abort ? " bad" : "")} style={{ width: fillW.toFixed(1) + "%" }} />
              <div className="thresh" style={{ left: threshLeft.toFixed(1) + "%" }}><b>abort &gt; 0.11</b></div>
            </div>
          </div>
          <div className={"verdict " + (abort ? "bad" : "ok")}>{verdict}</div>
          <div className="ctrl" style={{ borderTop: 0, paddingTop: ".75rem", marginTop: ".5rem" }}>
            <button className="sbtn" onClick={() => run(eve)}>Run again</button>
            <span className="hint">n = 8000 · sample = 500</span>
          </div>
        </div>
        <div className="stats">
          <div><span className="l">Eve intercepts</span><span className="n">{eve}%</span></div>
          <div><span className="l">qubits sent</span><span className="n">{N.toLocaleString()}</span></div>
          <div><span className="l">sifted bits</span><span className="n">{(r?.sifted ?? 0).toLocaleString()}</span></div>
          <div><span className="l">sample checked</span><span className="n">{SAMPLE}</span></div>
          <div><span className="l">mismatches</span><span className="n">{r?.errors ?? 0}</span></div>
          <div><span className="l">raw key bits</span><span className="n">{(r?.rawBits ?? 0).toLocaleString()}</span></div>
        </div>
      </div>
      <p className="foot-note">
        A second experiment in the original script asks a sharper question: if Eve intercepts
        everything, how many sifted bits must you reveal to be confident of catching her? Revealing
        just 10 bits catches her <span className="mono">94.4%</span> of the time, and 20 bits{" "}
        <span className="mono">99.7%</span>. The simulated numbers track the theoretical{" "}
        <span className="mono">1 &minus; (3/4)^k</span> closely.
      </p>
    </div>
  );
}
