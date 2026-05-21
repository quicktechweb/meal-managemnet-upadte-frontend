import { useState } from "react";
import {
  Shield, Lock, Bell, Eye, Key, UserCheck,
  ChevronRight, Download, Trash2, Settings, User, HelpCircle,
} from "lucide-react";

const SettingsPage = () => {
  const [toggles, setToggles] = useState({
    emailNotif: true, pushNotif: true, mealReminder: true, weeklyReport: false,
    twoFactor: false, loginAlerts: true, profileVisible: true, dataSharing: false,
    activityStatus: true, locationAccess: false,
  });

  const [activeSection, setActiveSection] = useState("notifications");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const sidebarLinks = [
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "privacy", label: "Privacy", icon: <Eye size={18} /> },
    { id: "account", label: "Account", icon: <User size={18} /> },
    { id: "help", label: "Help & Support", icon: <HelpCircle size={18} /> },
  ];

  const sections = {
    notifications: {
      label: "Notifications", icon: <Bell size={20} />,
      desc: "Choose what you're notified about and how you receive alerts.",
      groups: [
        { heading: "Email & Push", items: [
          { key: "emailNotif", title: "Email Notifications", desc: "Receive order confirmations and updates via email." },
          { key: "pushNotif", title: "Push Notifications", desc: "Real-time alerts on your device for meal and ride updates." },
        ]},
        { heading: "Meal Alerts", items: [
          { key: "mealReminder", title: "Meal Order Reminders", desc: "Reminders before your daily meal order window closes." },
          { key: "weeklyReport", title: "Weekly Summary", desc: "A weekly digest of your meals, spending, and attendance." },
        ]},
      ],
    },
    security: {
      label: "Security", icon: <Shield size={20} />,
      desc: "Manage your login security and keep your account protected.",
      groups: [
        { heading: "Login Protection", items: [
          { key: "twoFactor", title: "Two-Factor Authentication", desc: "Require a second verification step when signing in." },
          { key: "loginAlerts", title: "Login Alerts", desc: "Get notified when a new device signs into your account." },
        ]},
      ],
      actions: [
        { label: "Change Password", icon: <Lock size={14} />, cls: "text-gray-700 hover:bg-gray-100" },
        { label: "Active Sessions", icon: <UserCheck size={14} />, cls: "text-blue-600 hover:bg-blue-50" },
        { label: "Trusted Devices", icon: <Key size={14} />, cls: "text-gray-700 hover:bg-gray-100" },
      ],
    },
    privacy: {
      label: "Privacy", icon: <Eye size={20} />,
      desc: "Control who sees your information and how your data is used.",
      groups: [
        { heading: "Visibility", items: [
          { key: "profileVisible", title: "Public Profile", desc: "Allow others in your organization to view your profile." },
          { key: "activityStatus", title: "Activity Status", desc: "Show when you were last active on the platform." },
        ]},
        { heading: "Data", items: [
          { key: "dataSharing", title: "Anonymous Data Sharing", desc: "Share anonymized usage data to help improve the platform." },
          { key: "locationAccess", title: "Location Access", desc: "Allow the app to use your location for rides and delivery." },
        ]},
      ],
      danger: [
        { label: "Download My Data", icon: <Download size={14} />, cls: "text-blue-600 hover:bg-blue-50" },
        { label: "Delete Account", icon: <Trash2 size={14} />, cls: "text-red-500 hover:bg-red-50" },
      ],
    },
    account: {
      label: "Account", icon: <User size={20} />,
      desc: "Manage your personal information and account preferences.",
      groups: [
        { heading: "Profile", items: [
          { key: "profileVisible", title: "Profile Visibility", desc: "Control who can see your profile across the platform." },
          { key: "activityStatus", title: "Show Online Status", desc: "Display your active status to other users." },
        ]},
      ],
    },
    help: {
      label: "Help & Support", icon: <HelpCircle size={20} />,
      desc: "Find answers, contact support, or report a problem.",
      groups: [
        { heading: "Resources", items: [
          { key: "emailNotif", title: "Contact Support", desc: "Reach out to our team for any issues or questions." },
          { key: "pushNotif", title: "Report a Problem", desc: "Let us know if something isn't working correctly." },
        ]},
      ],
    },
  };

  const active = sections[activeSection];
  const enabledCount = Object.values(toggles).filter(Boolean).length;

  const Toggle = ({ keyName }) => (
    <button
      onClick={() => toggle(keyName)}
      className="flex-shrink-0 focus:outline-none"
      aria-label={`Toggle ${keyName}`}
    >
      <div className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${toggles[keyName] ? "bg-blue-500" : "bg-gray-300"}`}>
        <div className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${toggles[keyName] ? "left-[21px]" : "left-[3px]"}`} />
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top navbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              className="md:hidden mr-1 p-1 rounded-lg text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Settings size={15} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">Settings & Privacy</span>
          </div>
          <span className="text-xs text-gray-400">{enabledCount} of {Object.keys(toggles).length} enabled</span>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-sm z-10">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActiveSection(link.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors text-left border-b border-gray-100 last:border-0 ${
                activeSection === link.id ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className={activeSection === link.id ? "text-blue-500" : "text-gray-400"}>{link.icon}</span>
              {link.label}
              {activeSection === link.id && <ChevronRight size={14} className="ml-auto text-blue-400" />}
            </button>
          ))}
        </div>
      )}

      {/* Mobile horizontal tab pills (visible on small screens, below hamburger menu) */}
      <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-gray-100 scrollbar-hide">
        {sidebarLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveSection(link.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeSection === link.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-4 items-start">

        {/* Sidebar — desktop only */}
        <div className="hidden md:block w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-20">
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">Menu</p>
          </div>
          <nav className="pb-3">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left ${
                  activeSection === link.id ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className={`flex-shrink-0 ${activeSection === link.id ? "text-blue-500" : "text-gray-400"}`}>{link.icon}</span>
                {link.label}
                {activeSection === link.id && <ChevronRight size={14} className="ml-auto text-blue-400" />}
              </button>
            ))}
          </nav>
          <div className="border-t border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-400 leading-relaxed">Changes are saved automatically as you update your settings.</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">

          {/* Section header */}
          <div className="bg-white rounded-2xl border border-gray-200 px-5 py-5 mb-4">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-gray-500">{active.icon}</span>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">{active.label}</h1>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{active.desc}</p>
          </div>

          {/* Groups */}
          {active.groups.map((group, gi) => (
            <div key={gi} className="bg-white rounded-2xl border border-gray-200 mb-4 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{group.heading}</p>
              </div>
              <div className="divide-y divide-gray-100">
                {group.items.map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                    <Toggle keyName={item.key} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Security actions */}
          {active.actions && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4">
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Quick Actions</p>
              </div>
              <div className="divide-y divide-gray-100">
                {active.actions.map((a) => (
                  <button key={a.label} className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium transition-colors ${a.cls}`}>
                    <div className="flex items-center gap-3"><span>{a.icon}</span>{a.label}</div>
                    <ChevronRight size={15} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Danger zone */}
          {active.danger && (
            <div className="bg-white rounded-2xl border border-red-100 overflow-hidden mb-4">
              <div className="px-5 py-3 border-b border-red-100 bg-red-50">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-widest">Danger Zone</p>
              </div>
              <div className="divide-y divide-gray-100">
                {active.danger.map((a) => (
                  <button key={a.label} className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium transition-colors ${a.cls}`}>
                    <div className="flex items-center gap-3">{a.icon}{a.label}</div>
                    <ChevronRight size={15} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Save bar */}
          <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-gray-400">All changes saved automatically</p>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none text-xs text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors font-medium">
                Reset Defaults
              </button>
              <button className="flex-1 sm:flex-none text-xs text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
                Save Changes
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;