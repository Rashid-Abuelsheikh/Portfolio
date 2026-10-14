"use client";
import { useEffect, useState } from "react";

const facts = [
  ["Based in", "Amman, JO"],
  ["Degree", "B.Sc. CS"],
  ["GPA", "3.56 / 4.00"],
  ["Platforms shipped", "2"],
  ["Tables architected", "72"],
  ["PT training", "120 hrs"],
  ["Languages", "AR / EN / TR"],
];

export default function Hero() {
  const [clock, setClock] = useState("·");
  useEffect(() => {
    const tick = () => {
      try {
        const p = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Amman",
        }).format(new Date());
        setClock(p + " Amman");
      } catch { setClock("Amman"); }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hgrid">
        <div>
          <span className="ping"><i />Open to full-stack roles</span>
          <h1>Rashid Abu&nbsp;Elsheikh</h1>
          <p className="claim">I build web applications, and I know how they get broken into.</p>
          <p className="hbody lede">
            Full-stack developer in Amman. I build two production platforms, EvidUP and Rysala,
            in Next.js, React and Node.js. Before that I spent a year in penetration testing:
            Green Circle&apos;s practical track, then a USAID-funded internship, plus lab work of
            my own: a CTF machine, a ransomware sandbox.
          </p>
          <p className="hbody lede">
            That order matters. I learned how applications fail before I had shipped many, so I
            write them watching for the failure.
          </p>
          <div className="cta">
            <a className="btn btn-p" href="#database">See how I work</a>
            <a className="btn btn-s" href="mailto:rashid19ps@gmail.com">Email me</a>
          </div>
        </div>
        <div className="panel" aria-label="Summary">
          <div className="panel-h"><span>at a glance</span><span className="mono">{clock}</span></div>
          <dl className="readout">
            {facts.map(([k, v]) => (
              <div key={k} style={{ display: "contents" }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="plays">
        <p>three things on this page actually run</p>
        <div className="playlist">
          <a className="play" href="#database"><b>Explore the schema</b><span>15 modules, 72 tables, the real names</span></a>
          <a className="play" href="#vault"><b>Database Vault</b><span>A CTF box designed so you can&apos;t skip a step</span></a>
          <a className="play" href="#bb84"><b>Run the BB84 sim</b><span>My Python, ported. Catch the eavesdropper</span></a>
        </div>
      </div>
    </section>
  );
}
