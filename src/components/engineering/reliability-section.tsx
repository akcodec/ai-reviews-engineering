import { reliability } from "@/data/engineering-content";
import { SectionHeading } from "./section-heading";

export function ReliabilitySection() {
  return <section className="page-section section-shell" id="reliability">
    <SectionHeading eyebrow="04 / Reliability by design" title="Retries are expected. Duplicate effects are not." copy="External delivery is at-least-once. The application combines durable intent, idempotent effects and fenced state transitions instead of claiming exactly-once delivery." />
    <div className="decision-grid">
      {reliability.map(([title, problem, design, result], index) => <article className="decision-card" key={title}>
        <span className="card-index">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3>
        <dl><div><dt>Problem</dt><dd>{problem}</dd></div><div><dt>Design</dt><dd>{design}</dd></div><div><dt>Result</dt><dd>{result}</dd></div></dl>
      </article>)}
    </div>
  </section>;
}
