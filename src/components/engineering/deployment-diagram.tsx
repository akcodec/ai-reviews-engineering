import { SectionHeading } from "./section-heading";

const Service = ({ label, name, external = false }: { label: string; name: string; external?: boolean }) => <div className={`deploy-service ${external ? "external" : ""}`}><small>{label}</small><strong>{name}</strong></div>;

export function DeploymentDiagram() {
  return <section className="page-section section-shell">
    <SectionHeading eyebrow="07 / Deployment topology" title="Separate processes. Shared durable truth." copy="The topology distinguishes browser delivery, request handling, background execution, scheduling, state and approved providers without implying private networking or replicas." />
    <div className="deployment-board">
      <Service label="USER" name="Browser" /><span className="deploy-arrow">→</span><Service label="CLOUDFLARE" name="React frontend" /><span className="deploy-arrow">→</span>
      <div className="railway-boundary"><span className="boundary-label">RAILWAY</span><Service label="REQUESTS" name="Backend API" /><Service label="ASYNC" name="Worker" /><Service label="SCHEDULE" name="Beat" /><Service label="STATE" name="PostgreSQL" /><Service label="BROKER" name="Redis" /></div>
      <span className="deploy-arrow">→</span><div className="provider-stack"><Service label="PROVIDER" name="Google" external /><Service label="PROVIDER" name="OpenAI" external /><Service label="PROVIDER" name="SMTP" external /></div>
    </div>
    <p className="diagram-note">Not claimed: private networking, replication, automated backups or disaster-recovery automation. Those require environment-level verification beyond the tracked application.</p>
  </section>;
}
