export const siteConfig = {
  name: "AI Reviews to Revenue",
  shortName: "AR",
  title: "Engineering | AI Reviews to Revenue",
  description:
    "A technical look at the durable, tenant-safe system that turns reviews and private feedback into evidence-backed owner action.",
  url: "https://ai-reviews-engineering.vercel.app",
  navigation: [
    { label: "Overview", href: "#overview" },
    { label: "Architecture", href: "#architecture" },
    { label: "Flows", href: "#flows" },
    { label: "Reliability", href: "#reliability" },
    { label: "Security", href: "#security" },
    { label: "Testing", href: "#testing" },
  ],
  links: {} as Record<string, string>,
} as const;

export type SiteConfig = typeof siteConfig;
