"use client";

import { useState } from "react";
import { flows } from "@/data/engineering-content";
import { SectionHeading } from "./section-heading";

export function CriticalFlows() {
  const [active, setActive] = useState(flows[0].id);
  const flow = flows.find((item) => item.id === active) ?? flows[0];
  function moveTab(key: string, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;
    const next = key === 'Home' ? 0 : key === 'End' ? flows.length - 1 : (index + (key === 'ArrowRight' ? 1 : -1) + flows.length) % flows.length;
    setActive(flows[next].id);
    requestAnimationFrame(() => document.getElementById(`tab-${flows[next].id}`)?.focus());
  }
  return <section className="page-section section-shell" id="flows">
    <SectionHeading eyebrow="03 / Critical flows" title="What happens between intent and outcome." copy="Four paths expose the engineering boundaries that matter: trigger, transaction, background execution, provider contact and visible result." />
    <div className="flow-tabs" role="tablist" aria-label="Critical engineering flows">
      {flows.map((item, index) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={active === item.id} aria-controls={`panel-${item.id}`} tabIndex={active === item.id ? 0 : -1} onKeyDown={(event) => moveTab(event.key, index)} onClick={() => setActive(item.id)}><span>0{index + 1}</span>{item.label}</button>)}
    </div>
    <article className="flow-panel" id={`panel-${flow.id}`} role="tabpanel" aria-labelledby={`tab-${flow.id}`}>
      <div className="flow-intro"><p className="eyebrow">Selected flow</p><h3>{flow.title}</h3><p>{flow.summary}</p></div>
      <ol className="flow-steps">
        {flow.steps.map((step, index) => <li key={step.phase}><span className="flow-index">{String(index + 1).padStart(2, "0")}</span><div><strong>{step.phase}</strong><p>{step.detail}</p></div></li>)}
      </ol>
    </article>
  </section>;
}
