export default function BannerSection() {
  return (
    <div className="relative min-h-[calc(100vh-142px)] flex items-center overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-100 font-sans">
      {/* ── BACKGROUND GLOW ── */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-400/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-sky-300/20 blur-[120px] rounded-full" />
      </div>

      {/* ── HERO ── */}
      <div className="relative z-10 w-full mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* LEFT */}
          <div className="flex-1 max-w-2xl text-center md:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-white shadow-md">
              <span>🏛️</span>
              <span className="text-sm font-semibold text-blue-700">
                Institute Meal Management System
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-[58px] font-extrabold leading-tight text-slate-900">
              Smart Dining for <br />
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                Modern Institutes
              </span>
            </h1>

            {/* Description */}
            <p className="mb-8 text-[17px] text-slate-600 max-w-lg mx-auto md:mx-0">
              A fully digital meal management platform for students, faculty and
              administrators.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="relative px-8 py-3.5 rounded-xl text-white font-bold bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg shadow-blue-400/40 hover:scale-105 transition">
                <span className="relative z-10">Get Started Free</span>
                <span className="absolute inset-0 rounded-xl bg-white/10 blur opacity-0 hover:opacity-100 transition"></span>
              </button>
            </div>

            {/* Trust */}
            <div className="mt-8 flex items-center gap-4 justify-center md:justify-start">
              <div className="flex -space-x-3">
                {["🧑‍🎓", "👩‍🎓", "🧑‍🏫", "👩‍🏫"].map((e, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow text-lg"
                  >
                    {e}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600">
                Trusted by{" "}
                <span className="font-semibold text-slate-900">3,200+</span>{" "}
                students
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 w-full max-w-xl relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Floating Card 1 */}
              <div className="absolute top-6 left-6 bg-white/80 backdrop-blur p-4 rounded-xl shadow-lg flex gap-3 animate-[float_4s_ease-in-out_infinite]">
                <div className="h-10 w-10 bg-green-100 flex items-center justify-center rounded-full">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-bold">Meal Booked</p>
                  <p className="text-xs text-slate-500">Tomorrow Lunch</p>
                </div>
              </div>

              {/* Floating Card 2 */}
            </div>

            {/* Border effect */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-dashed border-blue-300 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
