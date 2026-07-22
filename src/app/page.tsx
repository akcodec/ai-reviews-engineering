import { ArchitectureDiagram } from "@/components/engineering/architecture-diagram";
import { Boundaries } from "@/components/engineering/boundaries";
import { CriticalFlows } from "@/components/engineering/critical-flows";
import { DataModelDiagram } from "@/components/engineering/data-model-diagram";
import { DeploymentDiagram } from "@/components/engineering/deployment-diagram";
import { EngineeringChallenges } from "@/components/engineering/engineering-challenges";
import { Footer } from "@/components/engineering/footer";
import { Hero } from "@/components/engineering/hero";
import { Navbar } from "@/components/engineering/navbar";
import { ProductStory } from "@/components/engineering/product-story";
import { ReliabilitySection } from "@/components/engineering/reliability-section";
import { SecuritySection } from "@/components/engineering/security-section";
import { TechStack } from "@/components/engineering/tech-stack";
import { TestingSection } from "@/components/engineering/testing-section";

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="background-grid" aria-hidden="true" />
    <Navbar />
    <main id="main-content">
      <Hero /><ProductStory /><ArchitectureDiagram /><CriticalFlows /><ReliabilitySection />
      <SecuritySection /><DataModelDiagram /><DeploymentDiagram /><EngineeringChallenges />
      <TestingSection /><TechStack /><Boundaries />
    </main>
    <Footer />
  </>;
}
