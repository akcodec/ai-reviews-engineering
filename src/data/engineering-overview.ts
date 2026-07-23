export type DiagramId =
  | "system"
  | "celery"
  | "security"
  | "feedback"
  | "states";

export type DiagramDefinition = {
  id: DiagramId;
  label: string;
  title: string;
  description: string;
  detailsHref: "#architecture" | "#reliability" | "#security";
  scan: {
    enters: string;
    durable: string;
    failure: string;
    recovery: string;
    owner: string;
  };
};

export const overviewSignals = [
  "Distributed job reliability",
  "Tenant-safe authorization",
  "Provider failure recovery",
  "Idempotent application effects",
  "OAuth replay protection",
  "Privacy-aware public ingestion",
  "PostgreSQL and Redis integration testing",
] as const;

export const diagrams: DiagramDefinition[] = [
  {
    id: "system",
    label: "System Architecture",
    title: "Durable state at the center",
    description:
      "A container view of the browser, product frontend, API, durable database, task transport, workers, scheduler and external providers.",
    detailsHref: "#architecture",
    scan: {
      enters: "Authenticated product requests and public feedback.",
      durable: "Jobs, events, reviews and tenant data in PostgreSQL.",
      failure: "Broker publication, worker execution or provider calls.",
      recovery: "Beat finds committed due or lease-expired work and republishes it.",
      owner: "Reviews, alerts, reply drafts and recommendation reports.",
    },
  },
  {
    id: "celery",
    label: "Celery Job Flow",
    title: "Commit first. Publish second.",
    description:
      "The normal and recovery paths for a durable background job, including atomic claims and lease-token fencing.",
    detailsHref: "#reliability",
    scan: {
      enters: "An authorized request that needs background work.",
      durable: "The job, event and required domain state before dispatch.",
      failure: "Publication can fail; workers can crash or outlive a lease.",
      recovery: "Beat republishes due truth; a new claim receives a new token.",
      owner: "A result only after a fenced final database update.",
    },
  },
  {
    id: "security",
    label: "Security Boundaries",
    title: "Permissions are enforced behind the UI",
    description:
      "Five trust layers show where requests are validated, tenants are isolated and provider credentials are controlled.",
    detailsHref: "#security",
    scan: {
      enters: "Public requests or JWT-authenticated owner actions.",
      durable: "Only validated, tenant-scoped data and safe errors.",
      failure: "Invalid identity, permission, payload or OAuth replay checks.",
      recovery: "Safe rejection, reconnect state and auditable retry paths.",
      owner: "Only authorized business data and visible notifications.",
    },
  },
  {
    id: "feedback",
    label: "Feedback Rate Limit",
    title: "Temporary counters, durable feedback",
    description:
      "The public feedback boundary separates short-lived Redis abuse controls from sanitized PostgreSQL records.",
    detailsHref: "#security",
    scan: {
      enters: "Anonymous feedback for a validated business identifier.",
      durable: "Sanitized feedback and durable duplicate/idempotency state.",
      failure: "Rate, schema, privacy or duplicate checks can reject intake.",
      recovery: "TTL counters expire; accepted feedback remains eligible for later reports.",
      owner: "Aggregated private recommendations, never raw request identity.",
    },
  },
  {
    id: "states",
    label: "Job State Machine",
    title: "Every transition is guarded",
    description:
      "Durable job and delivery states make retries, recovery, terminal failure and suppression observable.",
    detailsHref: "#reliability",
    scan: {
      enters: "A committed job or notification delivery intent.",
      durable: "State, attempt count, retry time, lease and safe error.",
      failure: "Temporary, permanent and lease-expiry paths are explicit.",
      recovery: "Bounded backoff or Beat-driven reclaim with a fresh token.",
      owner: "Completed output, delivery status, or a safe terminal state.",
    },
  },
];
