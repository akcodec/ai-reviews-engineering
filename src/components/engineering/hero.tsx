import { ArrowIcon } from "./section-heading";

const badges = ["React", "FastAPI", "PostgreSQL", "Redis", "Celery", "OpenAI", "Google APIs"];

export function Hero() {
  return <section className="hero section-shell" id="overview" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="pulse-dot" /> System design, made legible</p>
      <h1 id="hero-title">Engineering an AI system that turns reviews into action.</h1>
      <p className="hero-lede">Reliable Google review synchronization, evidence-backed AI analysis and tenant-safe background automation—connected in one feedback-to-recommendation workflow.</p>
      <div className="hero-actions">
        <a className="primary-button" href="#architecture">Explore the system <ArrowIcon /></a>
        <a className="tour-link" href="#engineering-overview"><span aria-hidden="true">02:00</span> 2-minute architecture tour</a>
        <a className="text-link" href="#reliability">Read the decisions</a>
      </div>
      <ul className="stack-badges" aria-label="Core implemented technologies">
        {badges.map((badge) => <li key={badge}>{badge}</li>)}
      </ul>
    </div>
    <div className="hero-system" aria-label="System pulse showing the product workflow">
      <div className="system-topline"><span>Live system model</span><span className="status"><i /> durable</span></div>
      <div className="signal-card signal-main"><span className="signal-icon">01</span><div><small>Input boundary</small><strong>Review received</strong></div><span className="signal-meta">validated</span></div>
      <div className="signal-line"><i /><i /><i /></div>
      <div className="signal-grid">
        <div className="mini-signal"><small>ANALYSIS</small><strong>Structured output</strong><span>sentiment · risk · reply</span></div>
        <div className="mini-signal accent"><small>JOB STATE</small><strong>Lease active</strong><span>token-fenced worker</span></div>
      </div>
      <div className="signal-card signal-result"><span className="signal-icon">04</span><div><small>Owner surface</small><strong>Actionable insight</strong></div><span className="signal-meta">ready</span></div>
    </div>
  </section>;
}
