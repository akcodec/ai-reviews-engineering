import { overviewSignals } from "@/data/engineering-overview";
import { DiagramSwitcher } from "./diagram-switcher";

export function EngineeringOverview() {
  return <section className="page-section overview-section section-shell" id="engineering-overview">
    <div className="overview-intro">
      <header className="section-heading overview-heading">
        <p className="eyebrow">00 / Interviewer tour</p>
        <h2>Engineering at a Glance</h2>
        <p>A visual walkthrough of how requests, background work, tenant data, security controls, and external providers fit together.</p>
      </header>
      <aside className="demonstrates" aria-labelledby="demonstrates-title">
        <h3 id="demonstrates-title">What this demonstrates</h3>
        <ul>{overviewSignals.map((signal) => <li key={signal}><span aria-hidden="true">✓</span>{signal}</li>)}</ul>
      </aside>
    </div>
    <DiagramSwitcher />
  </section>;
}
