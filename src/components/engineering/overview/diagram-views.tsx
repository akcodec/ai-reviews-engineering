import type { DiagramDefinition, DiagramId } from "@/data/engineering-overview";

function Node({ kind, label, detail }: { kind: string; label: string; detail: string }) {
  return <div className={`overview-node node-${kind}`}><small>{kind}</small><strong>{label}</strong><span>{detail}</span></div>;
}

function Link({ type, label }: { type: "sync" | "async" | "scheduled" | "provider"; label: string }) {
  return <div className={`overview-connector connector-${type}`} aria-label={label}><span>{label}</span><i aria-hidden="true">→</i></div>;
}

function Legend() {
  return <ul className="overview-legend" aria-label="Diagram connector legend">
    <li><i className="legend-sync" />Synchronous request</li>
    <li><i className="legend-async" />Asynchronous dispatch</li>
    <li><i className="legend-scheduled" />Scheduled recovery</li>
    <li><b className="legend-durable" />Durable state</li>
    <li><b className="legend-provider" />Provider call</li>
  </ul>;
}

function SystemArchitecture() {
  return <div className="system-overview" role="group" aria-label="Browser requests pass through the React frontend and FastAPI to durable PostgreSQL state. Redis transports Celery tasks, workers call providers, and Beat recovers due committed work.">
    <div className="system-primary">
      <Node kind="client" label="Browser" detail="Owner or public request" /><Link type="sync" label="HTTPS" />
      <Node kind="client" label="React / Vite" detail="Product frontend" /><Link type="sync" label="Validated request" />
      <Node kind="service" label="FastAPI" detail="Auth + tenant scope" /><Link type="sync" label="Commit" />
      <Node kind="database" label="PostgreSQL" detail="Durable source of truth" />
    </div>
    <div className="system-jobs">
      <Node kind="scheduler" label="Celery Beat" detail="Due + expired lease scan" /><Link type="scheduled" label="Recovery scan" />
      <Node kind="database" label="PostgreSQL" detail="Committed job truth" /><Link type="async" label="After commit" />
      <Node kind="broker" label="Redis" detail="Task transport + TTL counters" /><Link type="async" label="Brokered task" />
      <Node kind="worker" label="Celery Worker" detail="Atomic claim + lease" />
    </div>
    <div className="system-providers">
      <span className="provider-call-label">EXTERNAL PROVIDER CALLS</span>
      <Node kind="external" label="Google Business Profile" detail="Reviews + controlled replies" />
      <Node kind="external" label="OpenAI" detail="Structured analysis" />
      <Node kind="external" label="SMTP / email" detail="At-least-once delivery edge" />
    </div>
    <Legend />
  </div>;
}

const normalSteps = [
  ["Browser → FastAPI", "Authenticated request arrives."],
  ["FastAPI", "Validate identity, permission and business scope."],
  ["FastAPI → PostgreSQL", "Insert job/event and required domain state."],
  ["PostgreSQL", "Transaction commits durable intent."],
  ["FastAPI → Redis", "Only after commit, publish the Celery task."],
  ["Worker → PostgreSQL", "Atomically claim the durable job."],
  ["PostgreSQL → Worker", "Return a unique lease token for this claim."],
  ["Worker → Provider", "Call Google, OpenAI or SMTP as required."],
  ["Worker → PostgreSQL", "Finalize only while processing and token still matches."],
  ["FastAPI → Browser", "Expose the owner-visible result."],
] as const;

function CeleryFlow() {
  return <div className="celery-overview">
    <div className="commit-banner"><span>CORE INVARIANT</span><strong>Commit before publish.</strong><p>Celery executes work, Redis transports tasks, and PostgreSQL stores durable job truth.</p></div>
    <ol className="sequence-flow" aria-label="Normal Celery job flow">
      {normalSteps.map(([actor, copy], index) => <li key={copy}><span>{String(index + 1).padStart(2, "0")}</span><small>{actor}</small><p>{copy}</p></li>)}
    </ol>
    <div className="recovery-path"><div><small>FAILURE</small><strong>Publish fails or lease expires</strong></div><i aria-hidden="true">···→</i><div><small>BEAT</small><strong>Scan committed due work</strong></div><i aria-hidden="true">···→</i><div><small>NEW CLAIM</small><strong>Fresh lease token</strong></div><p>Expired workers cannot overwrite the newer result.</p></div>
    <p className="diagram-callout">Publishing before commit can let a fast worker look for a row that is not yet visible. Durable intent first makes broker failure recoverable.</p>
  </div>;
}

const securityLayers = [
  ["01 · Client", "Public browser or authenticated owner browser", "No trust inferred from the UI"],
  ["02 · Request boundary", "FastAPI schemas + JWT authentication", "Unexpected fields rejected where configured"],
  ["03 · Authorization", "Business access + role and permission checks", "Backend-enforced for every tenant resource"],
  ["04 · Tenant operations", "Business-scoped services + database queries", "Hidden email-only events excluded from Alert Center"],
  ["05 · Provider boundary", "Encrypted Google tokens + controlled calls", "Bounded payloads, safe errors and redacted exceptions"],
] as const;

function SecurityBoundaries() {
  return <div className="security-overview" role="group" aria-label="Five nested trust boundaries enforce validation, authentication, business authorization, tenant-scoped operations and controlled provider access.">
    <div className="trust-stack">{securityLayers.map(([number, title, detail]) => <div className="trust-layer" key={number}><span>{number}</span><strong>{title}</strong><p>{detail}</p></div>)}</div>
    <aside className="security-proof">
      <h4>OAuth replay protection</h4>
      <p>Signed state → one-time hashed nonce → atomic consumption</p>
      <h4>Credential custody</h4>
      <p>Google access and refresh tokens are encrypted before persistence.</p>
      <div className="explicit-note"><strong>The frontend expresses permissions.</strong><span>The backend enforces them.</span></div>
      <p className="pkce-note">No PKCE claim is made: the tracked implementation uses signed state and one-time nonce protection.</p>
    </aside>
  </div>;
}

const feedbackSteps = [
  ["Public request", "Anonymous message"], ["Business validation", "Known tenant slug"],
  ["HMAC identity", "Ephemeral request key"], ["Redis limits", "Burst + sustained TTL"],
  ["Strict schema", "Bounded payload"], ["Privacy sanitization", "Remove obvious PII"],
  ["Duplicate checks", "Window + idempotency"], ["PostgreSQL commit", "Sanitized feedback"],
] as const;

function FeedbackRateLimit() {
  return <div className="feedback-overview">
    <ol className="feedback-pipeline" aria-label="Public feedback validation and storage flow">{feedbackSteps.map(([label, detail], index) => <li key={label} className={index === 3 ? "redis-step" : index === 7 ? "database-step" : "security-step"}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><small>{detail}</small>{index < feedbackSteps.length - 1 && <i aria-hidden="true">→</i>}</li>)}</ol>
    <div className="store-contrast">
      <article className="redis-responsibility"><small>REDIS · TEMPORARY</small><h4>Abuse-control windows</h4><p>Burst and sustained counters expire by TTL. The server-side HMAC secret never becomes feedback data.</p></article>
      <article className="database-responsibility"><small>POSTGRESQL · DURABLE</small><h4>Sanitized business evidence</h4><p>Feedback, idempotency and later report eligibility persist without raw IP, user-agent, customer name or email.</p></article>
    </div>
    <p className="diagram-callout">Rate limiting reduces abuse; it is not complete abuse prevention. Redis and PostgreSQL intentionally own different lifetimes.</p>
  </div>;
}

function StateMachine() {
  return <div className="state-overview" role="group" aria-label="Queued work is atomically claimed into processing. It can complete, retry with bounded backoff, fail terminally, recover after lease expiry, or become skipped or resolved.">
    <div className="state-main"><Node kind="state" label="queued" detail="durable intent" /><Link type="async" label="atomic claim + attempt" /><Node kind="worker" label="processing" detail="unique lease token" /><Link type="sync" label="token-fenced finalize" /><Node kind="success" label="completed / delivered" detail="owner-visible result" /></div>
    <div className="state-branches">
      <article><small>TEMPORARY FAILURE</small><strong>processing → retry scheduled → processing</strong><p>Bounded exponential backoff; attempt count advances with claims.</p></article>
      <article><small>LEASE EXPIRY</small><strong>processing → recovery eligible → new lease</strong><p>Beat recovers due work. The old token becomes stale.</p></article>
      <article><small>TERMINAL</small><strong>processing → failed</strong><p>Permanent failure or maximum attempts stops retrying.</p></article>
      <article><small>SUPPRESSION</small><strong>pending / processing → skipped or resolved</strong><p>Preferences or a resolved condition can safely end work.</p></article>
    </div>
    <div className="lease-explainer"><span>LEASE TOKEN FENCING</span><p>A claim issues a unique token. Success, retry or failure is accepted only while the row is processing and that token matches. A newer claim makes the old worker’s final update invalid.</p></div>
    <p className="diagram-callout"><strong>At-least-once boundary:</strong> fencing protects application state, but SMTP and third-party providers may accept an operation immediately before a worker crash. Application-level idempotency is still required.</p>
  </div>;
}

export function DiagramView({ id }: { id: DiagramId }) {
  if (id === "system") return <SystemArchitecture />;
  if (id === "celery") return <CeleryFlow />;
  if (id === "security") return <SecurityBoundaries />;
  if (id === "feedback") return <FeedbackRateLimit />;
  return <StateMachine />;
}

export function DiagramScan({ diagram }: { diagram: DiagramDefinition }) {
  const items = [["What enters", diagram.scan.enters], ["What becomes durable", diagram.scan.durable], ["What can fail", diagram.scan.failure], ["How recovery works", diagram.scan.recovery], ["What the owner sees", diagram.scan.owner]];
  return <dl className="diagram-scan">{items.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl>;
}
