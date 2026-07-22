import { stack } from "@/data/engineering-content";
import { SectionHeading } from "./section-heading";

export function TechStack() {
  return <section className="page-section section-shell">
    <SectionHeading eyebrow="10 / Technology stack" title="Boring where it should be. Specialized where it matters." copy="Each technology has one clear job, keeping the runtime understandable and the public engineering site dependency-light." />
    <div className="stack-grid">{stack.map(([name, reason], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{reason}</p></article>)}</div>
  </section>;
}
