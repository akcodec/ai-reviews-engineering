import { SectionHeading } from "./section-heading";

const boundaries = [
  ["Credentials + quota", "Google, OpenAI and SMTP need correctly configured provider credentials and available quota."],
  ["Controlled mutation", "Google reply posting stays policy- and feature-flag controlled; analysis does not imply automatic publishing."],
  ["At-least-once edges", "SMTP and provider APIs can repeat or time out, so application effects are designed to be idempotent."],
  ["Separate live checks", "Credentialed provider verification is opt-in and intentionally outside ordinary automated tests."],
];

export function Boundaries() {
  return <section className="page-section section-shell boundaries">
    <SectionHeading eyebrow="11 / Honest boundaries" title="Controlled limitations are part of the architecture." copy="The portfolio demonstrates application design. External readiness still depends on provider configuration and deployment operations." />
    <div className="boundary-grid">{boundaries.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </section>;
}
