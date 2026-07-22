import { challenges } from "@/data/engineering-content";
import { SectionHeading } from "./section-heading";

export function EngineeringChallenges() {
  return <section className="page-section section-shell">
    <SectionHeading eyebrow="08 / Challenges solved" title="Failure modes became design inputs." copy="Each case started with an ordinary distributed-systems failure and ended with an application-level invariant." />
    <div className="challenge-list">{challenges.map(([title, failure, solution], index) => <article key={title}>
      <span className="challenge-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p><b>Failure mode</b>{failure}</p></div><span className="challenge-arrow" aria-hidden="true">→</span><p className="solution"><b>Implemented solution</b>{solution}</p>
    </article>)}</div>
  </section>;
}
