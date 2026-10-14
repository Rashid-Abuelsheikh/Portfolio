export const profile = {
  name: "Rashid Abu Elsheikh",
  role: "Full-stack developer",
  location: "Amman, Jordan",
  email: "rashid19ps@gmail.com",
  github: "https://github.com/Rashid-Abuelsheikh",
  githubHandle: "Rashid-Abuelsheikh",
  linkedin: "https://linkedin.com/in/rashidabuelsheikh",
  linkedinHandle: "rashidabuelsheikh",
};

export const nav = [
  { href: "#top", label: "Start" },
  { href: "#profile", label: "Profile" },
  { href: "#work", label: "Experience" },
  { href: "#database", label: "Database" },
  { href: "#vault", label: "Attack path" },
  { href: "#bb84", label: "BB84" },
  { href: "#more", label: "Other work" },
  { href: "#training", label: "Training" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export type Module = { n: string; g: string; t: string[]; d: string };

export const MODULES: Module[] = [
  { n: "Identity & Contact", g: "people & structures", t: ["person", "person_address", "person_email"],
    d: "Class-table inheritance: a person parent table joined by student, employee and user_account. A single flattened users table was rejected because it would be dominated by NULLs: a student carries no salary, an employee carries no GPA." },
  { n: "Authorization", g: "people & structures", t: ["role", "permission", "role_permission", "user_account", "user_role"],
    d: "Where separation of duties starts. fn_trg_role_permission_sod_guard rejects any insert that would grant a destructive permission to a role that is not its designated single owner." },
  { n: "Organization", g: "people & structures", t: ["campus", "college", "department", "building", "study_room"],
    d: "The institutional structure the operational workflow rests on, and the physical rooms that scheduling later books." },
  { n: "Student Records", g: "people & structures", t: ["student", "student_minor", "student_program_history", "student_status"],
    d: "An enrollment row must reference an actual student rather than any human in the system. That requirement is why identity is split rather than flattened." },
  { n: "HR & Payroll", g: "people & structures", t: ["employee", "employee_qualification", "salary_grade", "payroll", "employee_leave"],
    d: "The staff side of the institution: qualifications, salary grades, payroll runs and leave." },
  { n: "Curriculum", g: "academic workflow", t: ["academic_program", "course", "course_prerequisite", "program_course", "academic_rule_set"],
    d: "Academic policy that would normally be hard-coded lives in academic_rule_set instead: rules typed boolean, numeric or JSON, scoped by level with an effective-from date. The first rule moved in was the GPA 2.0 probation threshold, which previously could only be changed by redeployment." },
  { n: "Scheduling", g: "academic workflow", t: ["academic_year", "semester", "time_slot", "course_section", "section_meeting"],
    d: "Semesters, time slots, and the course sections that hundreds of students contend over in the same minute during registration." },
  { n: "Enrollment & Grading", g: "academic workflow", t: ["enrollment", "grade_scale", "enrollment_status_history", "student_gpa_snapshot"],
    d: "The relational hub. enrollment carries six indexes, each justified against a measured query. student_gpa_snapshot is precomputed and kept current by a lightweight trigger that fires when a final grade is submitted, because computing GPA on demand meant a multi-semester join on every transcript view." },
  { n: "Finance", g: "academic workflow", t: ["fee_type", "student_fee", "payment", "student_wallet", "credit_hour_rate", "financial_aid"],
    d: "A student moves from a curriculum into a scheduled section, accumulates a grade and a fee, and is reflected in a financial outcome. The wallet is one of the three rows locked during registration." },
  { n: "Dormitory", g: "cross-cutting", t: ["dormitory", "dorm_room", "dorm_application", "dorm_payment"],
    d: "One of the concerns that touches several modules without belonging to any one of them." },
  { n: "Holds", g: "cross-cutting", t: ["hold_type", "student_hold"],
    d: "A blocking hold is one of roughly thirteen cheap checks run before registration acquires any lock at all, so requests destined to fail are rejected before they generate contention." },
  { n: "External Equivalency", g: "cross-cutting", t: ["external_college", "shamel_exam_session", "shamel_record"],
    d: "Credit and examination records that originate outside the institution." },
  { n: "Auditing & Archive", g: "cross-cutting", t: ["audit_log (partitioned)", "enrollment_archive"],
    d: "audit_log is range-partitioned by year with further monthly partitions created on demand, stores full before-and-after state as JSONB, and records the acting user through a session-scoped GUC set at the start of every transaction. Partition pruning was confirmed against EXPLAIN output." },
  { n: "Library", g: "added after freeze", t: ["library_asset", "book_loan", "library_fine"],
    d: "Added deliberately after the core schema was frozen, as a test of horizontal extensibility: new domain, own permissions, own audit triggers, no migration of existing tables. Carries per-row optimistic locking, and a partial unique index that encodes a real rule: the same physical asset cannot be on loan twice at once." },
  { n: "Lost & Found", g: "added after freeze", t: ["lost_item", "lost_item_chain_of_custody"],
    d: "Added alongside Library. The chain of custody is immutable, and disposal is gated by its own separation-of-duties trigger so one clerk cannot both hold and dispose of an item." },
];

export type Decision = { k: string; h: string; p: string; c: string };

export const DECISIONS: Decision[] = [
  { k: "Concurrency", h: "Registration is the most contended operation in the system",
    p: "Hundreds of students compete for the last seats of a popular section within the same minute. Early concurrency tests produced real deadlocks between sessions locking the same three rows in opposite directions. Locks are now always taken in one order (course_section, then student, then student_wallet) with a bounded wait, and the seat increment is written as a conditional update rather than a lock held across the whole critical section.",
    c: '<span class="c">-- shortens the lock window; ROW_COUNT is the final race guard</span>\n<span class="k">UPDATE</span> course_section\n   <span class="k">SET</span> enrolled_count = enrolled_count + <span class="w">1</span>\n <span class="k">WHERE</span> section_id     = p_section_id\n   <span class="k">AND</span> enrolled_count &lt; v_enforced_limit;\n\n<span class="k">GET DIAGNOSTICS</span> v_rows = ROW_COUNT;\n<span class="k">IF</span> v_rows = <span class="w">0</span> <span class="k">THEN</span>\n    <span class="k">RAISE EXCEPTION</span> <span class="s">\'ERR_SECTION_FULL: race condition\'</span>;\n<span class="k">END IF</span>;' },
  { k: "Separation of duties", h: "Four layers, each a backstop for the one above",
    p: "During early development a sensitive permission was granted to a role that should never have held it. That one mistake is why enforcement moved below the application layer. Seed inserts are written one block per role so intended permissions are readable in source control; a guard trigger rejects bad grants at runtime; per-action triggers consult the acting employee’s permissions inside the transaction; and a verification block counts permission holders at the end of migration, aborting the whole deployment if the numbers are wrong. A half-deployed security model is impossible.",
    c: '<span class="c">-- rejected inside the transaction, whatever the app layer decided</span>\nfn_trg_library_fine_sod\nfn_trg_library_asset_sod\nfn_trg_custody_sod\n   <span class="c">└─ consult fn_employee_has_permission() at write time</span>\n\n<span class="c">-- deployment-time invariant</span>\n<span class="k">DO</span> $verify$ <span class="c">… counts holders of each destructive permission …</span>\n  <span class="c">-- count != 1  -&gt;  migration aborts</span>\n<span class="k">END</span> $verify$;' },
  { k: "Indexing", h: "Every index corresponds to a query that was profiled first",
    p: "No index was designed up front. Each one was added after profiling a real query with EXPLAIN ANALYZE against a populated database, then re-profiled to confirm it helped. The student-dashboard query was a sequential scan over the whole enrollment table before the composite index below; afterwards the planner switched to an index-only scan. Partial indexes on soft-deleted and completed rows cut on-disk index size by forty to fifty percent on tables carrying history.",
    c: '<span class="c">-- turned a seq scan into an index-only scan</span>\n<span class="k">CREATE INDEX</span> idx_enrollment_student_section_status\n    <span class="k">ON</span> enrollment (student_id, section_id, status, enrollment_id);\n\n<span class="c">-- partial unique index that encodes a business rule</span>\n<span class="k">CREATE UNIQUE INDEX</span> uq_book_loan_one_open_per_asset\n    <span class="k">ON</span> book_loan (asset_id)\n    <span class="k">WHERE</span> return_date <span class="k">IS NULL</span>;' },
];

export const DRILLS = [
  { t: "Pivoting", d: "SSH port forwarding as a practical technique: treating a foothold on one machine as the way to reach a second that has no route from outside." },
  { t: "Enumeration", d: "Disciplined database enumeration: reading a schema carefully enough to tell the bait apart from the objective instead of grabbing the first thing that looks like a win." },
  { t: "Impact", d: "Understanding how a single contained web weakness, combined with one common server misconfiguration, escalates from reading a database to reading the host itself." },
];

export const VAULT_DECISIONS = [
  { b: "No exposed host ports", p: "docker-compose binds nothing to the host network. That single choice forces players to treat a foothold as a jumping-off point rather than a destination. The pivoting instinct is the whole lesson." },
  { b: "One vulnerable route, on purpose", p: "Auth holds everywhere else; input handling on other routes is clean. The weakness lives in exactly one endpoint, so the box can’t be solved by accident through an unrelated bug and the lesson stays focused." },
  { b: "A schema that tells a story", p: "Tables are seeded so a curious analyst finds a tempting credential dump first and only later realises the internal host map was the real objective. The ordering rewards a quick win, then teaches that the quick win wasn’t the point." },
  { b: "A realistic skin", p: "The UI is branded as an internal corporate tool. A sterile test page puts players in lab mindset; a plausible admin panel keeps them in engagement mindset, which is where the muscle memory actually forms." },
];

export const training = [
  { h: "Advanced Penetration Testing Internship", src: "Green Circle · USAID funded", p: "Real-world vulnerability assessment and exploitation, taken immediately after the practical track below." },
  { h: "Practical Penetration Testing", src: "Green Circle", p: "120 training hours across defensive strategy, threat analysis and hands-on incident response, plus the CyberBridge program of practical sessions and simulations." },
  { h: "Piscine", src: "42 Amman", p: "A 26-day peer-to-peer immersion in C, memory management and UNIX shell scripting. Over 50 exercises under time limits, no instructors, code reviewed only by other students." },
  { h: "Complete Full-Stack Web Development Bootcamp", src: "Udemy", p: "Front to back web development." },
  { h: "CompTIA Network+ (N10-009)", src: "Udemy", p: "Network architecture, security fundamentals and troubleshooting methodology." },
  { h: "B.Sc. Computer Science · GPA 3.56 / 4.00", src: "Al-Balqa Applied University", p: "Al-Balqa Applied University, Al-Salt. September 2022 to July 2026." },
  { h: "High School Diploma", src: "Abu Bakr Al-Sideaq", p: "Abu Bakr Al-Sideaq School, Amman. 2021 to 2022." },
];

export const skills = [
  { g: "web", items: ["Next.js", "React", "Node.js", "TanStack Query", "JavaScript", "HTML", "CSS"] },
  { g: "databases", items: ["PostgreSQL", "MySQL", "SQL"] },
  { g: "languages", items: ["Python", "Java", "C", "C++"] },
  { g: "security", items: ["Penetration testing", "Incident response", "SIEM monitoring", "Network security"] },
  { g: "systems", items: ["Linux", "Docker", "VMware"] },
  { g: "spoken", items: ["Arabic · native", "English · very good", "Turkish · basic"] },
];

export const palette = [
  { label: "Profile", tag: "about", go: "#profile" },
  { label: "Experience · EvidUP & Rysala", tag: "work", go: "#work" },
  { label: "Explore the database schema", tag: "interactive", go: "#database" },
  { label: "Database Vault · CTF design", tag: "interactive", go: "#vault" },
  { label: "Run the BB84 simulation", tag: "live", go: "#bb84" },
  { label: "Malware sandbox", tag: "project", go: "#more" },
  { label: "Strategic Buyer Intelligence", tag: "project", go: "#more" },
  { label: "Training & education", tag: "record", go: "#training" },
  { label: "Skills", tag: "stack", go: "#skills" },
  { label: "Contact", tag: "reach", go: "#contact" },
  { label: "Email rashid19ps@gmail.com", tag: "action", go: "mailto:rashid19ps@gmail.com" },
  { label: "GitHub · Rashid-Abuelsheikh", tag: "action", go: "https://github.com/Rashid-Abuelsheikh" },
  { label: "LinkedIn", tag: "action", go: "https://linkedin.com/in/rashidabuelsheikh" },
  { label: "Toggle light / dark", tag: "action", act: "theme" },
];
