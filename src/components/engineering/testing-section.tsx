import { SectionHeading } from "./section-heading";

const layers = [
  ["Unit + service", "Business rules, privacy transforms, provider error mapping and workflow decisions."],
  ["Authorization", "Owner/member permissions and tenant boundaries across business resources."],
  ["PostgreSQL integration", "Concurrent dedupe, atomic claims, lease fencing and terminal-state invariants."],
  ["Redis integration", "Burst/sustained public-feedback limiting, TTL behavior and HMAC-derived keys."],
  ["Migration safety", "Fresh upgrade, current-head checks and selected downgrade guards."],
  ["Provider mocks", "Google, OpenAI and SMTP behavior without ordinary tests needing live credentials."],
  ["Frontend quality", "Product frontend TypeScript build/lint; this site runs Next.js lint and production build."],
  ["Opt-in live checks", "Credentialed provider and infrastructure checks stay separate from automated tests."],
];

export function TestingSection() {
  return <section className="page-section section-shell" id="testing">
    <SectionHeading eyebrow="09 / Testing strategy" title="Test the seams where timing and tenancy fail." copy="The tracked suite emphasizes service behavior, real PostgreSQL and Redis invariants, migration paths and provider simulation. Browser end-to-end coverage remains planned—not claimed as complete." />
    <div className="test-layout"><div className="test-pyramid" aria-label="Testing layers"><div>LIVE<br /><small>opt-in</small></div><div>INTEGRATION<br /><small>PostgreSQL · Redis · migrations</small></div><div>SERVICE<br /><small>authorization · reliability · providers</small></div></div>
      <div className="test-grid">{layers.map(([title, copy]) => <article key={title}><span className="check" aria-hidden="true">✓</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </div>
  </section>;
}
