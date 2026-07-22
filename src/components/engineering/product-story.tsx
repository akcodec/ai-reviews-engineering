import { productFlow } from "@/data/engineering-content";
import { SectionHeading } from "./section-heading";

export function ProductStory() {
  return <section className="page-section section-shell">
    <SectionHeading eyebrow="01 / Product story" title="From noisy signals to a clear next move." copy="Reviews arrive in different places, at different urgency levels, and with little operational context. The system turns each signal into durable evidence before automation begins." />
    <div className="story-flow">
      {productFlow.map(([number, title, copy], index) => <article className="story-step" key={number}>
        <div className="step-number">{number}</div>
        <h3>{title}</h3><p>{copy}</p>
        {index < productFlow.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
      </article>)}
    </div>
    <aside className="principle-callout"><span>Core principle</span><p>Celery executes the work. PostgreSQL remains the source of truth.</p></aside>
  </section>;
}
