import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#f5f7ff", background: "#070912", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28 }}><div style={{ display: "flex", padding: "12px 15px", border: "1px solid #7877ff", borderRadius: 12, color: "#9c9bff" }}>AR</div>{siteConfig.name}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ fontSize: 24, color: "#67e8f9", letterSpacing: 3 }}>ENGINEERING</div><div style={{ fontSize: 68, lineHeight: 1.05, maxWidth: 960, fontWeight: 650 }}>Reliable systems turn reviews into action.</div><div style={{ fontSize: 25, color: "#aeb6ca" }}>Durable jobs · Tenant safety · Evidence-backed AI</div></div>
  </div>, size);
}
