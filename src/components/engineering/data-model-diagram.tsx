import { SectionHeading } from "./section-heading";

const domains = [
  ["Identity", ["Users", "Business memberships", "Permissions"]],
  ["Tenant core", ["Businesses", "Google connections", "Reviews"]],
  ["Execution", ["API jobs", "Usage events", "Sync history"]],
  ["Owner action", ["Notifications", "Deliveries", "Reply drafts"]],
  ["Private insight", ["Feedback", "Report runs", "Recommendation reports"]],
];

export function DataModelDiagram() {
  return <section className="page-section section-shell">
    <SectionHeading eyebrow="06 / Conceptual data model" title="Every durable object belongs to a clear domain." copy="This model shows relationships and tenancy, not production columns. Businesses form the isolation boundary for reviews, integrations, jobs and insights." />
    <div className="data-model">
      <div className="tenant-spine"><span>TENANT BOUNDARY</span><strong>Business</strong><p>Owner + authorized members</p></div>
      <div className="domain-grid">{domains.map(([title, items]) => <article key={title as string}><h3>{title}</h3><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
    </div>
    <div className="relation-strip" aria-label="Key data relationships"><span>User</span><i>membership</i><span>Business</span><i>owns</i><span>Reviews + feedback</span><i>produces</i><span>Actions + reports</span></div>
  </section>;
}
