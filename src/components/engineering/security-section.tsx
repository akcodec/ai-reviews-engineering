import { securityControls } from "@/data/engineering-content";
import { SectionHeading } from "./section-heading";

export function SecuritySection() {
  return <section className="page-section section-shell" id="security">
    <SectionHeading eyebrow="05 / Security + tenant safety" title="Trust boundaries enforced in the backend." copy="The UI expresses permissions. FastAPI, service checks and tenant-scoped database access enforce them." />
    <div className="security-layout">
      <div className="security-rings" aria-label="Security layers from public boundary to tenant data">
        <div className="ring-layer ring-outer"><span>PUBLIC EDGE</span><div className="ring-layer ring-middle"><span>IDENTITY + POLICY</span><div className="ring-layer ring-inner"><span>TENANT DATA</span><strong>Business-scoped truth</strong></div></div></div>
      </div>
      <div className="control-list">{securityControls.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </div>
    <p className="security-note"><strong>Deliberate boundary:</strong> no PKCE claim is made. OAuth integrity here is based on implemented signed state and one-time nonce consumption.</p>
  </section>;
}
