export type Flow = { id: string; label: string; title: string; summary: string; steps: { phase: string; detail: string }[] };

export const productFlow = [
  ["01", "Reviews + feedback", "Google reviews and private, anonymous feedback enter through distinct boundaries."],
  ["02", "Trusted ingestion", "Validation, tenant checks, deduplication and database commits establish a durable record."],
  ["03", "AI analysis", "Bounded payloads feed structured analysis, guardrails and reply or report generation."],
  ["04", "Evidence-backed insight", "Findings stay linked to the review or eligible feedback window that produced them."],
  ["05", "Owner action", "Owners review drafts, alerts and recommendation reports inside their workspace."],
] as const;

export const flows: Flow[] = [
  { id: "google-sync", label: "OAuth + review sync", title: "Google OAuth and Review Sync", summary: "A scoped connection becomes a durable, deduplicated import—not a fragile request-time operation.", steps: [
    { phase: "Trigger", detail: "An authenticated owner starts OAuth, then selects the business location to connect." },
    { phase: "Boundary", detail: "FastAPI validates signed state and a one-time nonce, then exchanges credentials with Google." },
    { phase: "Commit", detail: "Encrypted tokens, scoped location mapping and the first-sync cutoff are committed." },
    { phase: "Background", detail: "A durable API job is published to Celery after commit; Beat can recover unpublished work." },
    { phase: "Provider", detail: "The worker fetches Google Business Profile reviews within bounded pages." },
    { phase: "Validate", detail: "Tenant-scoped Google review IDs deduplicate imports; the cutoff excludes historical reviews." },
    { phase: "Result", detail: "New reviews and found/created/skipped/failed sync history become visible to the owner." },
  ] },
  { id: "ai-analysis", label: "AI review analysis", title: "AI Review Analysis and Reply Drafting", summary: "AI work is an auditable workflow with structured output, policy gates and a human-controlled mutation path.", steps: [
    { phase: "Trigger", detail: "A saved review reserves usage and creates an active job for analysis or regeneration." },
    { phase: "Boundary", detail: "FastAPI authorizes business access; Celery owns the long-running execution boundary." },
    { phase: "Commit", detail: "Review, usage reservation and job state are durable before task publication." },
    { phase: "Background", detail: "A leased worker runs sentiment, urgency, category, risk and reply generation." },
    { phase: "Provider", detail: "Bounded review context goes to OpenAI; Google mutation is a separate controlled step." },
    { phase: "Validate", detail: "Schema validation, guardrails, active-job keys and idempotent posting constrain duplicates." },
    { phase: "Result", detail: "The owner sees analysis, a draft and approval path; policy can keep posting manual." },
  ] },
  { id: "notifications", label: "Durable notifications", title: "Durable Notification Delivery", summary: "The in-app event and its delivery intent share one transaction, while external email remains retryable.", steps: [
    { phase: "Trigger", detail: "A review risk or provider reconnect state creates an owner-facing notification." },
    { phase: "Boundary", detail: "The notification service applies tenant preferences before creating delivery work." },
    { phase: "Commit", detail: "Visible event and database-backed delivery record commit atomically." },
    { phase: "Background", detail: "Beat dispatches due records; workers claim them with expiring lease tokens." },
    { phase: "Provider", detail: "SMTP delivery runs outside the transaction and is treated as at-least-once." },
    { phase: "Validate", detail: "Stable dedupe keys, bounded retry and fencing prevent duplicate logical alerts and stale writes." },
    { phase: "Result", detail: "The in-app record remains visible even when email is delayed or terminally fails." },
  ] },
  { id: "recommendations", label: "Recommendation reports", title: "Feedback Aggregation and Recommendation Reports", summary: "Private feedback is sanitized at intake, then grouped on a business-local schedule with a safe fallback.", steps: [
    { phase: "Trigger", detail: "Anonymous feedback passes rate, content, privacy and optional idempotency checks." },
    { phase: "Boundary", detail: "The public API stores no customer name, email, raw IP or user-agent." },
    { phase: "Commit", detail: "Sanitized feedback commits immediately; no AI call occurs on submission." },
    { phase: "Background", detail: "Beat creates a unique run; a leased worker claims an eligible cutoff window." },
    { phase: "Provider", detail: "Redacted, bounded chunks go to OpenAI; provider failure has a deterministic fallback." },
    { phase: "Validate", detail: "Unique keys, stable cutoff ordering, structured output and injection defenses protect the report." },
    { phase: "Result", detail: "Recommendations persist before eligible feedback is marked processed." },
  ] },
];

export const reliability = [
  ["Commit Before Publish", "A worker can race an open transaction.", "Persist first; publish after commit.", "Workers start from durable state."],
  ["Durable Database Job / Outbox", "Broker publication can fail after commit.", "Keep dispatch intent in PostgreSQL.", "Beat republishes due work."],
  ["Atomic Worker Claims", "Two workers may see one due item.", "Claim with a conditional update.", "Only the winning lease works."],
  ["Lease-Token Fencing", "A slow worker can outlive its lease.", "Require the current token on terminal writes.", "Stale workers cannot overwrite truth."],
  ["Idempotent Deduplication", "Providers and clients retry.", "Use stable keys and tenant uniqueness.", "Repeated intent has one app effect."],
  ["Bounded Exponential Retry", "Provider failures are normal.", "Back off with an attempt ceiling.", "Recovery avoids infinite loops."],
  ["Beat Recovery", "A task may miss the broker.", "Scan committed due work on schedule.", "Database truth repairs dispatch."],
  ["Safe Terminal States", "Late failures can corrupt completion.", "Guard final transitions.", "Final states stay final."],
  ["New-Reviews-Only Cutoff", "First sync can import years of history.", "Capture a UTC cutoff at first mapping.", "Automation starts with new reviews."],
] as const;

export const securityControls = [
  ["Identity", "JWT authentication protects owner and member routes."],
  ["Authorization", "Business access and role checks run on the backend for tenant resources."],
  ["OAuth integrity", "Signed state plus a one-time, hashed nonce prevents callback replay."],
  ["Token custody", "Google access and refresh tokens are encrypted before persistence."],
  ["Scoped connections", "Owners bind a Google account and location to one business."],
  ["Public boundary", "Business-scoped Redis limits and HMAC-derived ephemeral keys control feedback abuse."],
  ["Safe inputs", "Strict models reject unexpected fields; provider and LLM payloads are bounded."],
  ["Private telemetry", "Logs and errors redact secrets; anonymous feedback is sanitized before storage."],
] as const;

export const challenges = [
  ["Task before row", "A worker consumed work before the API commit.", "Publish after commit and retain a recoverable database job."],
  ["Commit without publish", "The user saw success but no worker ran.", "A scheduled dispatcher finds committed, unpublished work."],
  ["Stale worker finish", "An expired worker tried to overwrite newer work.", "Lease-token fencing makes terminal updates conditional."],
  ["Duplicate Google review", "Provider retry risked duplicate reviews.", "Tenant-scoped provider IDs and conflict-safe inserts deduplicate."],
  ["Reconnect alert storm", "Every failed operation could warn again.", "A stable logical key deduplicates until recovery."],
  ["Email-only notification", "SMTP failure could hide an event.", "The in-app event commits with its delivery record."],
  ["Historical import", "Initial mapping could automate old reviews.", "A first-selection cutoff admits only later reviews."],
  ["Public form abuse", "Abuse and PII could pollute reports.", "Rate limits, sanitization, duplicate windows and private storage narrow the boundary."],
] as const;

export const stack = [
  ["React + TypeScript", "Typed customer dashboard and public feedback interfaces."],
  ["FastAPI + Python", "Validated HTTP boundaries and service orchestration."],
  ["PostgreSQL", "Tenant data, uniqueness constraints, durable jobs and transactional claims."],
  ["Redis", "Celery brokering and TTL-bounded public rate-limit counters."],
  ["Celery Worker + Beat", "Asynchronous execution, schedules and recovery scans."],
  ["SQLAlchemy + Alembic", "Repository access and reversible schema evolution."],
  ["OpenAI", "Structured analysis, reply drafts and grouped recommendations."],
  ["Google Business Profile APIs", "OAuth-scoped ingestion and controlled reply operations."],
  ["Railway", "Service target for API, worker, Beat, PostgreSQL and Redis."],
  ["Cloudflare", "Static React/Vite application hosting."],
  ["Next.js + Vercel", "This statically generated public engineering narrative."],
] as const;
