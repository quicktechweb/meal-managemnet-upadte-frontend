import { useState, useEffect, useRef } from "react";

const features = [
  {
    number: "01",
    title: "Expert Team",
    description:
      "Our seasoned professionals bring decades of combined experience, setting industry benchmarks and redefining what excellence looks like in practice.",
    accent: "#E6F1FB",
    accentText: "#185FA5",
  },
  {
    number: "02",
    title: "Proven Results",
    description:
      "Every project we take on is backed by a data-driven approach, ensuring measurable outcomes that consistently exceed client expectations.",
    accent: "#EAF3DE",
    accentText: "#3B6D11",
  },
  {
    number: "03",
    title: "Innovation First",
    description:
      "We stay ahead of the curve by combining cutting-edge technology with creative thinking, giving your business a decisive competitive advantage.",
    accent: "#EEEDFE",
    accentText: "#534AB7",
  },
  {
    number: "04",
    title: "24/7 Support",
    description:
      "Our dedicated support team is always on standby, ensuring your operations never experience unnecessary downtime or unresolved challenges.",
    accent: "#FAEEDA",
    accentText: "#854F0B",
  },
  {
    number: "05",
    title: "Transparent Process",
    description:
      "From kickoff to delivery, we give you full visibility at every stage — honest timelines, clear updates, and communication that builds real trust.",
    accent: "#E1F5EE",
    accentText: "#0F6E56",
  },
  {
    number: "06",
    title: "Custom Solutions",
    description:
      "No two businesses are the same. We craft bespoke strategies tailored precisely to your unique goals, challenges, and long-term vision.",
    accent: "#FAECE7",
    accentText: "#993C1D",
  },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Card({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s, box-shadow 0.3s ease, border-color 0.3s ease`,
        borderColor: hovered ? "#d1d1d1" : "#ebebeb",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.07)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        background: "#fff",
      }}
      className="relative rounded-2xl border p-7 overflow-hidden cursor-default"
    >
      {/* Accent corner blob */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "90px",
          height: "90px",
          background: feature.accent,
          borderRadius: "0 16px 0 100%",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Number badge */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "18px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: feature.accentText,
          fontFamily: "monospace",
          opacity: 0.8,
        }}
      >
        {feature.number}
      </div>

      {/* Color dot */}
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: feature.accent,
          border: `1.5px solid ${feature.accentText}22`,
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: feature.accentText,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "17px",
          fontWeight: 700,
          color: "#111",
          letterSpacing: "-0.02em",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13.5px",
          color: "#6b6b6b",
          lineHeight: 1.72,
          margin: 0,
        }}
      >
        {feature.description}
      </p>

      {/* Bottom hover line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: hovered ? "100%" : "0%",
          background: feature.accentText,
          opacity: 0.4,
          transition: "width 0.4s ease",
          borderRadius: "0 0 16px 16px",
        }}
      />
    </div>
  );
}

export default function WhyChooseUs() {
  const [headRef, headInView] = useInView();

  return (
    <section
      style={{
        background: "#f9f9f8",
        padding: "96px 24px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #ccc 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1050px", margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            marginBottom: "56px",
          }}
        >
          {/* Eyebrow line */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ width: "28px", height: "1px", background: "#aaa" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", fontWeight: 500 }}>
              Why Choose Us
            </span>
          </div>

          {/* Split layout */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
            <h2
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(1.9rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#111",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: 0,
                maxWidth: "520px",
              }}
            >
              The standard others{" "}
              <em style={{ fontStyle: "italic", color: "#666" }}>aspire to reach.</em>
            </h2>

            <div style={{ maxWidth: "320px" }}>
              <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.7, margin: "0 0 20px" }}>
                We combine deep expertise with relentless commitment to craft experiences
                that elevate your brand and accelerate your growth.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  style={{
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                  }}
                >
                  Get Started →
                </button>
                <button
                  style={{
                    background: "#fff",
                    color: "#555",
                    border: "1px solid #e0e0e0",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  View Our Work
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "14px",
          }}
        >
          {features.map((f, i) => (
            <Card key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}