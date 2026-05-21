import  { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Search,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  BookOpen,
  FileText,
  ChevronRight,
} from "lucide-react";

const App = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "How do I reset my password?",
      a: "Go to the login page and click 'Forgot password'. Enter your registered email address and we'll send you a secure reset link within a few minutes. The link expires after 30 minutes for security.",
    },
    {
      q: "How do I update my billing information?",
      a: "Navigate to Settings → Account → Billing. From there you can update your payment method, view past invoices, and manage your subscription plan at any time.",
    },
    {
      q: "Can I cancel or modify my order?",
      a: "Orders can be modified or cancelled up to 30 minutes after placement. After that window, please contact our support team directly and we'll do our best to assist you.",
    },
    {
      q: "How do I enable two-factor authentication?",
      a: "Go to Settings → Security → Two-Factor Authentication. Follow the steps to link your authenticator app or phone number. We strongly recommend enabling this for added account security.",
    },
    {
      q: "Why am I not receiving notifications?",
      a: "First check your notification preferences under Settings → Notifications. Also ensure your device's notification permissions are enabled for this app. If the issue persists, try logging out and back in.",
    },
    {
      q: "How do I download my data?",
      a: "You can request a full export of your data by going to Settings → Privacy → Download My Data. The export will be sent to your registered email address within 24 hours.",
    },
  ];

  const filtered = faqs.filter(
    (f) =>
      search === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 px-6 md:px-10 lg:px-16 py-10 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Help & Support
        </h1>

        <p className="text-base text-gray-500 leading-relaxed max-w-3xl">
          Find answers to common questions or get in touch with our team.
          Were available around the clock to make sure everything runs
          smoothly.
        </p>
      </div>

      {/* Trust Bar */}
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle size={15} className="text-green-500" />
          <span className="text-sm text-gray-500">
            99.9% uptime
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={15} className="text-blue-500" />
          <span className="text-sm text-gray-500">
            Avg. reply under 2 min
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Star size={15} className="text-amber-400" />
          <span className="text-sm text-gray-500">
            4.9 / 5 satisfaction
          </span>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {[
          {
            icon: <MessageCircle size={22} />,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            title: "Live chat",
            desc: "Talk to a real person now. Average wait time is under 2 minutes.",
            tag: "Online now",
            tagCls: "text-green-600 bg-green-50",
            cta: "Start chat",
          },
          {
            icon: <Mail size={22} />,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
            title: "Email support",
            desc: "Send us a message and we'll respond within one business day.",
            tag: "24h reply",
            tagCls: "text-purple-600 bg-purple-50",
            cta: "Send email",
          },
          {
            icon: <Phone size={22} />,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            title: "Phone support",
            desc: "Speak directly with our team. Available Monday to Friday, 9am – 6pm.",
            tag: "Offline",
            tagCls: "text-gray-400 bg-gray-100",
            cta: "View hours",
          },
        ].map((c, i) => (
          <button
            key={i}
            className="bg-white rounded-3xl border border-gray-200 p-6 text-left hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-[0.98] transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-5">
              <div
                className={`w-12 h-12 rounded-2xl ${c.iconBg} ${c.iconColor} flex items-center justify-center`}
              >
                {c.icon}
              </div>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${c.tagCls}`}
              >
                {c.tag}
              </span>
            </div>

            <p className="text-lg font-semibold text-gray-900 mb-2">
              {c.title}
            </p>

            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {c.desc}
            </p>

            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
              {c.cta}
              <ArrowRight size={14} />
            </div>
          </button>
        ))}
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {[
          {
            icon: <BookOpen size={18} />,
            title: "Documentation",
            desc: "Full guides and API references",
          },
          {
            icon: <FileText size={18} />,
            title: "Release notes",
            desc: "What's new in every update",
          },
        ].map((r, i) => (
          <button
            key={i}
            className="bg-white rounded-2xl border border-gray-200 px-5 py-5 text-left flex items-center gap-4 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0">
              {r.icon}
            </div>

            <div className="min-w-0">
              <p className="text-base font-semibold text-gray-800">
                {r.title}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {r.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Frequently asked
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions…"
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
          />
        </div>

        {/* FAQ Box */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">

          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-base font-medium text-gray-500">
                No results for {search}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Try different keywords or contact our support team.
              </p>
            </div>
          ) : (
            filtered.map((item, i) => (
              <div
                key={i}
                className="border-b border-gray-100 last:border-0"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <p className="text-base font-semibold text-gray-800">
                    {item.q}
                  </p>

                  <ChevronRight
                    size={18}
                    className={`text-gray-300 flex-shrink-0 transition-transform duration-200 ${
                      open === i ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white rounded-3xl border border-gray-200 px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

        <div>
          <p className="text-lg font-semibold text-gray-900">
            Still cant find what you need?
          </p>

          <p className="text-sm text-gray-400 mt-1 leading-relaxed">
            Our support team is available 24/7 and always happy to help.
          </p>
        </div>

        <button className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap">
          Contact support
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default App;