import { DRILLS, VAULT_DECISIONS, training, skills, profile } from "@/lib/content";
import SchemaExplorer from "./SchemaExplorer";
import Decisions from "./Decisions";
import BB84 from "./BB84";

export function Profile() {
  return (
    <section id="profile">
      <div className="shead"><h2>Profile</h2><span className="tick">about</span></div>
      <p className="lede">I finished my Computer Science degree at Al-Balqa Applied University this July, with a 3.56 GPA. Most of my working time now goes into two platforms for the same founder at Scientific and Electronic Question.</p>
      <p className="lede">EvidUP is a systematic-review workspace: researchers import citations, clear duplicates, screen titles and abstracts, resolve disagreements between reviewers, and pull the surviving studies through to extraction. Rysala is a medical-education platform where students work through practice questions and track where they are weak. Both are pre-launch. I build the full stack on each.</p>
      <p className="lede">The security work came first and it shows up in how I build. I spent four months architecting a 72-table PostgreSQL schema where the access rules are enforced by database triggers rather than application code, because I had already seen how often the application layer is the thing that gets bypassed. I built a CTF machine that teaches pivoting, and a sandbox where I detonated live ransomware to watch what it does to a disk.</p>
      <p className="lede">I am heading toward graduate study in the security of software systems. In the meantime I want to write production code for people who care whether it holds.</p>
    </section>
  );
}

export function Experience() {
  return (
    <section id="work">
      <div className="shead"><h2>Experience</h2><span className="tick">roles</span></div>
      <div className="roles">
        <article className="role">
          <div className="role-h"><h3>EvidUP</h3><span className="live">pre-launch</span></div>
          <p className="role-sub">Full-stack developer · Scientific and Electronic Question · <a className="ext" href="https://evidup.com" target="_blank" rel="noreferrer">evidup.com</a></p>
          <p className="d">A collaborative workspace for systematic reviews. Teams import citations from RIS, NBIB, BibTeX and CSV, clear duplicate pairs before anything reaches the screening queue, screen titles and abstracts, settle reviewer conflicts, then move included studies through full-text decisions and into extraction.</p>
          <ul className="ul">
            <li>Built the full stack in Next.js.</li>
            <li>The part I care most about is the duplicate gate: unresolved pairs are held back from screening entirely, so two reviewers can never unknowingly screen the same record twice.</li>
            <li>Every screening decision is reversible and recorded, which is the same instinct behind the audit triggers in the database work below.</li>
          </ul>
          <div className="chips"><span className="chip">Next.js</span><span className="chip">React</span><span className="chip">Node.js</span></div>
        </article>
        <article className="role">
          <div className="role-h"><h3>Rysala</h3><span className="live">pre-launch</span></div>
          <p className="role-sub">Full-stack developer · Scientific and Electronic Question · <a className="ext" href="https://www.rysala.com" target="_blank" rel="noreferrer">rysala.com</a></p>
          <p className="d">A medical-education platform. Students work through practice questions written and reviewed by doctors, read explanations, and track how they are doing across specialties.</p>
          <ul className="ul">
            <li>Built the full stack with TanStack and Node.js.</li>
            <li>Built the analytics dashboard: performance broken down by topic, weak areas surfaced rather than buried, and study streaks.</li>
            <li>The dashboard is a read-heavy surface over a lot of per-question history, so most of the work was deciding what to precompute instead of recalculating on every page load.</li>
          </ul>
          <div className="chips"><span className="chip">TanStack Query</span><span className="chip">Node.js</span><span className="chip">React</span></div>
        </article>
        <article className="role">
          <div className="role-h"><h3>CS Mena Company</h3><span className="mono" style={{ fontSize: "11.5px", color: "var(--dim)" }}>May – Sep 2025</span></div>
          <p className="role-sub">Data entry specialist</p>
          <p className="d">High-volume record processing. Unglamorous, but reading thousands of rows closely enough to catch the wrong one is the same attention that log analysis needs, and I got it here before I needed it.</p>
        </article>
      </div>
    </section>
  );
}

export function Database() {
  return (
    <section id="database">
      <div className="shead"><h2>University information system</h2><span className="tick">interactive</span></div>
      <article className="case">
        <div className="case-h">
          <span className="k">PostgreSQL 15 · 15 modules, 72 tables · four months · vibe-coded</span>
          <h3>A large schema built with AI, stress-tested by hand</h3>
          <p>The database layer for a full university system, modelled on Al-Balqa Applied University: students, curriculum, scheduling, enrollment, finance, dormitories, HR, library, lost-and-found. A 72-table schema across 15 modules is not something I would claim to have hand-written, the bulk of the structure was vibe-coded with AI, including the Python stress-testing scripts. What I contributed was the intent: pushing every constraint, trigger and procedure under heavy concurrent load to see where it actually breaks.</p>
          <p>The decisions worth talking about are the ones I made deliberately: business rules enforced at the database layer rather than the application layer, so bypassing the app does not bypass the rules. Separation of duties, audit logging and enrollment correctness are enforced by triggers and procedures. That posture came from thinking about what survives when the application is compromised.</p>
        </div>
        <div className="case-b">
          <SchemaExplorer />
          <Decisions />
        </div>
      </article>
    </section>
  );
}

export function Vault() {
  return (
    <section id="vault">
      <div className="shead"><h2>CTF machine</h2><span className="tick">team project</span></div>
      <article className="case">
        <div className="case-h">
          <span className="k">Green Circle internship · 6-person team · April 2026 · my contribution: Phase 3</span>
          <h3>Building the database stage of a multi-phase CTF machine</h3>
          <p>A six-person team built a multi-phase CTF machine during the Advanced Penetration Testing internship at Green Circle. I was responsible for Phase 3: an intentionally vulnerable database layer sitting behind a Flask front-end, designed so that a SQL injection flaw combined with a common server misconfiguration escalates from reading the database to reading the host filesystem.</p>
          <p>The stack is straightforward, Ubuntu 22.04, MySQL 8, Flask, Docker. docker-compose binds nothing to the host network, which is the one decision that forces players to use the SSH tunnel from Phase 2 rather than connecting directly. Nothing exotic, but the constraint is what makes the phase coherent with the ones around it.</p>
        </div>
        <div className="case-b">
          <div className="lab">what phase 3 drills</div>
          <div className="drills">
            {DRILLS.map((d, i) => (
              <div className="drill" key={d.t}>
                <span className="num">0{i + 1}</span><b>{d.t}</b><p>{d.d}</p>
              </div>
            ))}
          </div>
          <div className="lab" style={{ marginTop: "1.75rem" }}>design decisions</div>
          <div className="dgrid">
            {VAULT_DECISIONS.map((d) => (
              <div className="dcard" key={d.b}><b>{d.b}</b><p>{d.p}</p></div>
            ))}
          </div>
          <p className="foot-note">The underlying lesson is about a mundane, entirely plausible database misconfiguration, and why it turns a contained web bug into a host-level problem. The full write-up (stack, schema, reasoning) is available on request.</p>
        </div>
      </article>
    </section>
  );
}

export function BB84Section() {
  return (
    <section id="bb84">
      <div className="shead"><h2>BB84 key distribution</h2><span className="tick">live simulation</span></div>
      <article className="case">
        <div className="case-h">
          <span className="k">Python, no dependencies · ported to JavaScript for this page</span>
          <h3>Catching an eavesdropper by the errors she leaves</h3>
          <p>BB84 is a quantum key-distribution protocol. Alice sends bits in randomly chosen bases; Bob measures in randomly chosen bases; they keep only the positions where the bases matched. If Eve intercepts a qubit and measures it in the wrong basis, she destroys the state and Bob&apos;s result becomes random, so interception shows up as errors in bits that should have matched perfectly.</p>
          <p>I wrote this as a dependency-free simulation in Python. What runs below is the same algorithm, same constants: 8,000 qubits, 500 sifted bits revealed to estimate the error rate, abort above 0.11. Move Eve&apos;s slider and watch the error rate walk toward 25%, the signature of a full intercept-resend attack.</p>
        </div>
        <BB84 />
      </article>
    </section>
  );
}

export function OtherWork() {
  return (
    <section id="more">
      <div className="shead"><h2>Other work</h2><span className="tick">projects</span></div>
      <div className="pgrid">
        <article className="pcard">
          <h3>Malware sandbox</h3>
          <p className="k">April 2026 · isolated detonation lab</p>
          <p>An isolated environment for detonating live ransomware and watching what it does. A clean Windows 10 VM as the detonation zone with FlareVM tooling, a REMnux box running INetSim as a fake internet, both on a host-only network with no path to the physical one. The Windows DNS was pointed at the REMnux box so every lookup the malware made was answered by the simulator.</p>
          <p>I ran Petya. The useful part was the failure: its MBR overwrite wiped the volatile logs I was counting on, so the forensic record I wanted did not survive the thing I was recording. The fix is architectural: forward events to a SIEM in real time and capture packets off-host, so the evidence is never stored on the machine being destroyed.</p>
          <div className="chips" style={{ marginTop: "auto", paddingTop: "1.1rem" }}><span className="chip">VMware</span><span className="chip">REMnux</span><span className="chip">INetSim</span><span className="chip">FlareVM</span><span className="chip">Sysmon</span></div>
        </article>
        <article className="pcard">
          <h3>Strategic Buyer Intelligence Platform</h3>
          <p className="k">Feb 2026 – present · personal project</p>
          <p>A tool for linking entity records across messy sources in two languages. The pipeline cleans and merges large datasets and uses fuzzy matching through RapidFuzz to connect records between English and Turkish sources, scoped by country, where exact string matching gives you nothing.</p>
          <p>I built the Streamlit interface over it: filtering, selection, and a data-integrity check that runs before anything is exported, because the failure mode of a record-linking tool is quietly shipping a wrong match.</p>
          <p style={{ marginTop: ".9rem" }}><a className="ext" href="https://mikymota.streamlit.app" target="_blank" rel="noreferrer">mikymota.streamlit.app</a></p>
          <div className="chips" style={{ marginTop: "auto", paddingTop: "1.1rem" }}><span className="chip">Python</span><span className="chip">RapidFuzz</span><span className="chip">Streamlit</span></div>
        </article>
      </div>
    </section>
  );
}

export function Training() {
  return (
    <section id="training">
      <div className="shead"><h2>Training &amp; education</h2><span className="tick">record</span></div>
      <div className="rows">
        {training.map((t) => (
          <div className="row" key={t.h}>
            <div><h4>{t.h}</h4><p>{t.p}</p></div>
            <div className="src">{t.src}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills">
      <div className="shead"><h2>Skills</h2><span className="tick">stack</span></div>
      <div className="skills">
        {skills.map((g) => (
          <div className="sgroup" key={g.g}>
            <h4>{g.g}</h4>
            <div className="chips">{g.items.map((it) => (<span className="chip" key={it}>{it}</span>))}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact">
      <div className="shead"><h2>Contact</h2><span className="tick">reach me</span></div>
      <p className="lede" style={{ fontSize: "clamp(1.1rem,2.4vw,1.4rem)", color: "var(--ink)", fontWeight: 500, letterSpacing: "-.02em", maxWidth: "30ch", lineHeight: 1.35 }}>
        Looking for full-stack work. The harder the correctness requirements, the more interested I am.
      </p>
      <div className="clinks">
        <a className="clink" href={`mailto:${profile.email}`}><span className="l">email</span><span className="v">{profile.email}</span></a>
        <a className="clink" href={profile.github} target="_blank" rel="noreferrer"><span className="l">github</span><span className="v">{profile.githubHandle}</span></a>
        <a className="clink" href={profile.linkedin} target="_blank" rel="noreferrer"><span className="l">linkedin</span><span className="v">{profile.linkedinHandle}</span></a>
      </div>
      <footer>
        <span>Amman, Jordan</span>
        <span>Built with Next.js &amp; Tailwind CSS</span>
      </footer>
    </section>
  );
}
