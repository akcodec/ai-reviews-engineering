import { siteConfig } from "@/config/site";

export function Footer() {
  return <footer className="footer section-shell"><a className="brand" href="#top"><span className="brand-mark">{siteConfig.shortName}</span><span>{siteConfig.name}</span></a><p>Engineering review systems that preserve context, tenancy and durable truth.</p><a href="#top">Back to top ↑</a></footer>;
}
