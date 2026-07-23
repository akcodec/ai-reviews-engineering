"use client";

import { useState } from "react";
import { diagrams, type DiagramId } from "@/data/engineering-overview";
import { DiagramScan, DiagramView } from "./diagram-views";

export function DiagramSwitcher() {
  const [activeId, setActiveId] = useState<DiagramId>(diagrams[0].id);
  const activeIndex = diagrams.findIndex((diagram) => diagram.id === activeId);
  const active = diagrams[activeIndex] ?? diagrams[0];

  function selectWithKeyboard(key: string, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
    const nextIndex = key === "Home"
      ? 0
      : key === "End"
        ? diagrams.length - 1
        : (index + (key === "ArrowRight" ? 1 : -1) + diagrams.length) % diagrams.length;
    const next = diagrams[nextIndex];
    setActiveId(next.id);
    requestAnimationFrame(() => document.getElementById(`overview-tab-${next.id}`)?.focus());
  }

  return <div className="diagram-switcher">
    <div className="overview-tabs-wrap">
      <div className="overview-tabs" role="tablist" aria-label="Engineering overview diagrams">
        {diagrams.map((diagram, index) => <button
          type="button"
          role="tab"
          key={diagram.id}
          id={`overview-tab-${diagram.id}`}
          aria-selected={diagram.id === active.id}
          aria-controls={`overview-panel-${diagram.id}`}
          tabIndex={diagram.id === active.id ? 0 : -1}
          onClick={() => setActiveId(diagram.id)}
          onKeyDown={(event) => selectWithKeyboard(event.key, index)}
        ><span>{String(index + 1).padStart(2, "0")}</span>{diagram.label}<i aria-hidden="true" /></button>)}
      </div>
    </div>
    {diagrams.map((diagram, index) => <section
      className="overview-panel"
      id={`overview-panel-${diagram.id}`}
      role="tabpanel"
      aria-labelledby={`overview-tab-${diagram.id}`}
      tabIndex={diagram.id === active.id ? 0 : -1}
      hidden={diagram.id !== active.id}
      key={diagram.id}
    >
      <header className="overview-panel-header">
        <div><p className="eyebrow">Visual model · {String(index + 1).padStart(2, "0")}</p><h3>{diagram.title}</h3><p id={`overview-description-${diagram.id}`}>{diagram.description}</p></div>
        <a className="overview-detail-link" href={diagram.detailsHref}>Explore details <span aria-hidden="true">↘</span></a>
      </header>
      <figure aria-describedby={`overview-description-${diagram.id}`}>
        <DiagramView id={diagram.id} />
        <figcaption className="sr-only">{diagram.description}</figcaption>
      </figure>
      <DiagramScan diagram={diagram} />
    </section>)}
  </div>;
}
