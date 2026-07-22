import { SectionHeading } from "./section-heading";

const Node = ({ eyebrow, name, tone = "" }: { eyebrow: string; name: string; tone?: string }) => <div className={`arch-node ${tone}`}><small>{eyebrow}</small><strong>{name}</strong></div>;

export function ArchitectureDiagram() {
  return <section className="page-section section-shell" id="architecture">
    <SectionHeading eyebrow="02 / High-level architecture" title="Durable state at the center. Providers at the edge." copy="The customer path stays responsive while transactional state coordinates asynchronous execution, schedules and external calls." />
    <div className="architecture-card">
      <div className="arch-row"><Node eyebrow="CUSTOMER SURFACE" name="React / Vite frontend" tone="violet" /><span className="connector sync">HTTPS</span><Node eyebrow="RAILWAY · API" name="FastAPI services" tone="cyan" /></div>
      <div className="arch-rail" aria-hidden="true"><span /><i>transaction + dispatch</i><span /></div>
      <div className="arch-core">
        <Node eyebrow="SOURCE OF TRUTH" name="PostgreSQL" tone="bright" />
        <div className="core-split"><Node eyebrow="BROKER" name="Redis" /><Node eyebrow="EXECUTION" name="Celery Worker" /><Node eyebrow="SCHEDULE" name="Celery Beat" /></div>
      </div>
      <div className="arch-rail dashed" aria-hidden="true"><span /><i>provider boundary</i><span /></div>
      <div className="provider-row"><Node eyebrow="REVIEWS + REPLIES" name="Google Business Profile" /><Node eyebrow="STRUCTURED AI" name="OpenAI" /><Node eyebrow="DELIVERY" name="SMTP / email" /></div>
      <div className="legend"><span><i className="solid" /> synchronous call</span><span><i className="dot" /> asynchronous job</span><span><i className="ring" /> scheduled work</span><span><i className="square" /> external provider</span></div>
    </div>
    <p className="diagram-note">Deployment boundaries shown here reflect the tracked implementation and declared targets: Cloudflare hosts the product frontend; Railway hosts backend processes and data services.</p>
  </section>;
}
