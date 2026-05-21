import { useRef } from "react";

const sections = [
  {
    id: "meal",
    label: "Meal Management",
    tag: "Core",
    tagColor: "#16a34a",
    tagBg: "#dcfce7",
    accent: "#f0fdf4",
    border: "#bbf7d0",
    dotColor: "#16a34a",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
    features: [
      { title: "Advance Meal Ordering", desc: "Order your meals days ahead — no last-minute rush, no missed lunches. Plan smart and eat on time every day." },
      { title: "Weekly Meal Plan", desc: "Plan your entire week in one go. View, edit, and manage daily meal preferences from a clean weekly calendar view." },
      { title: "Custom Menu Selection", desc: "Choose from a curated daily menu tailored to dietary needs and preferences. Vegetarian, halal, or custom — covered." },
      { title: "Real-time Order Tracking", desc: "Track your meal from kitchen to table with live status updates so you always know when lunch is ready." },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    tag: "Shop",
    tagColor: "#1d4ed8",
    tagBg: "#dbeafe",
    accent: "#eff6ff",
    border: "#bfdbfe",
    dotColor: "#1d4ed8",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    features: [
      { title: "Product Marketplace", desc: "Browse and purchase groceries, snacks, and meal essentials from a built-in shop — all in one platform." },
      { title: "Secure Checkout", desc: "Fast and secure payment flow with multiple payment gateway support including cards, mobile banking, and wallets." },
      { title: "Order History", desc: "Access your full purchase history with itemized receipts, spending insights, and one-click reorder shortcuts." },
      { title: "Delivery Scheduling", desc: "Pick your preferred delivery slot and get products delivered to your office or home at your convenience." },
    ],
  },
  {
    id: "ride",
    label: "Ride Share",
    tag: "Transport",
    tagColor: "#7c3aed",
    tagBg: "#ede9fe",
    accent: "#f5f3ff",
    border: "#ddd6fe",
    dotColor: "#7c3aed",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    features: [
      { title: "Book a Ride", desc: "Request a ride to or from your meal location instantly. No waiting, no calls — just tap and go." },
      { title: "Scheduled Pickups", desc: "Plan rides in advance aligned with your meal and work schedule so you are never late or stranded." },
      { title: "Live Driver Tracking", desc: "Monitor your driver's real-time location from booking to arrival with an accurate live map view." },
      { title: "Shared Ride Option", desc: "Split costs with colleagues heading the same direction — smart, affordable, and eco-friendly commuting." },
    ],
  },
  {
    id: "attendance",
    label: "Attendance",
    tag: "HR",
    tagColor: "#b45309",
    tagBg: "#fef3c7",
    accent: "#fffbeb",
    border: "#fde68a",
    dotColor: "#b45309",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M9 16l2 2 4-4"/>
      </svg>
    ),
    features: [
      { title: "Daily Check-in / Check-out", desc: "Log attendance seamlessly with timestamped check-ins directly tied to your meal orders for the day." },
      { title: "Meal-Linked Attendance", desc: "Attendance is auto-validated when a meal order is placed — one action, two tasks done simultaneously." },
      { title: "Monthly Reports", desc: "Generate detailed attendance reports per employee for payroll processing, HR audits, and compliance needs." },
      { title: "Leave Management", desc: "Mark leaves, half-days, and holidays with ease. Meal orders auto-cancel on off days to avoid waste." },
    ],
  },
];

function FeatureCard({ feature, dotColor, border, index }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid #f0f0f0",
        borderRadius: "14px",
        padding: "22px",
        animation: `fadeUp 0.45s ease ${index * 0.05}s both`,
      }}
      className="hover:border-gray-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: dotColor,
            marginTop: "5px",
            flexShrink: 0,
            opacity: 0.75,
          }}
        />
        <div>
          <h4
            className="text-sm font-semibold text-gray-800 mb-1.5 leading-snug"
            style={{ letterSpacing: "-0.01em" }}
          >
            {feature.title}
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({ section }) {
  return (
    <div className="mb-16 last:mb-0">
      {/* Section label row */}
      <div className="flex items-center gap-3 mb-6">
        <div
          style={{
            background: section.accent,
            border: `1.5px solid ${section.border}`,
            color: section.tagColor,
            borderRadius: "10px",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {section.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3
              className="text-base font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.015em" }}
            >
              {section.label}
            </h3>
            <span
              style={{
                background: section.tagBg,
                color: section.tagColor,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                padding: "2px 8px",
                borderRadius: "999px",
              }}
            >
              {section.tag}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{section.features.length} features</p>
        </div>
        <div
          style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${section.border}, transparent)` }}
          className="ml-2"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
        {section.features.map((f, i) => (
          <FeatureCard
            key={f.title}
            feature={f}
            dotColor={section.dotColor}
            border={section.border}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRefs = useRef({});

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-6 h-px bg-gray-300" />
            <span className="text-xs uppercase tracking-[0.18em] text-gray-400 font-medium">
              Platform Features
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em", maxWidth: "520px" }}
            >
              Everything you need,{" "}
              <em className="not-italic text-gray-400">in one place.</em>
            </h2>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              A fully integrated system for modern teams — meals, shopping, transport, and HR in a single platform.
            </p>
          </div>
        </div>

        {/* Sticky quick-nav */}
        <div
          className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-12"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <div className="max-w-5xl mx-auto flex items-center gap-2 flex-wrap">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{ color: s.tagColor, background: s.tagBg, border: `1px solid ${s.border}` }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-80 transition-opacity"
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* All sections */}
        {sections.map((section) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            style={{ scrollMarginTop: "64px" }}
          >
            <SectionBlock section={section} />
            {section.id !== sections[sections.length - 1].id && (
              <div className="border-t border-dashed border-gray-200 mb-14" />
            )}
          </div>
        ))}

        {/* CTA bottom */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Georgia', serif" }}>
              Ready to get started?
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {sections.reduce((a, s) => a + s.features.length, 0)} features across {sections.length} modules.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-black transition-colors">
              Get Started →
            </button>
            <button className="border border-gray-200 text-gray-500 text-sm font-medium px-6 py-2.5 rounded-full hover:border-gray-400 transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}