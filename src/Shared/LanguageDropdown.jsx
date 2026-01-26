import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
];

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-2 rounded-xl
        bg-white/80 backdrop-blur-md border border-gray-200
        shadow-sm hover:shadow-md transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
      >
        <span className="text-sm">{selected.flag}</span>
        <span className="text-sm font-medium text-gray-800">
          {selected.label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-3 w-44 origin-top-right
        rounded-xl bg-white/90 backdrop-blur-md border border-gray-200
        shadow-xl overflow-hidden transition-all duration-200 z-50
        ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {languages.map((lang) => {
          const active = selected.code === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm
              transition-colors duration-150
              ${
                active
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.label}</span>
              {active && <span className="w-2 h-2 rounded-full bg-green-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageDropdown;
