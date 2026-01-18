"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    title: "How to Deliver Digital Experiences",
    desc:
      "Our design projects are fresh and simple and will benefit your business greatly.",
    bg:
      "https://appbeats.themetags.com/img/galaxy-image.jpg",
    image: "https://appbeats.themetags.com/img/hero-app-image.png",
  },
  {
    title: "Build Modern Mobile Apps",
    desc:
      "We help you build scalable, modern and fast mobile applications.",
    bg:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    image: "https://appbeats.themetags.com/img/hero-app-image.png",
  },
  {
    title: "Grow Your Business Digitally",
    desc:
      "Transform your ideas into digital products that users love.",
    bg:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    image: "https://appbeats.themetags.com/img/hero-app-image.png",
  },
];

const Bannerparts = () => {
  const [active, setActive] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[720px] ">
      {/* BACKGROUND SLIDER */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000
            ${i === active ? "opacity-100" : "opacity-0"}
          `}
          style={{
            backgroundImage: `
              linear-gradient(to left,
                rgba(50,100,245,0.90),
                rgba(74,84,232,0.88),
                rgba(91,66,219,0.85),
                rgba(104,44,203,0.88),
                rgba(114,2,187,0.90)
              ),
              url(${slide.bg})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 pt-32 text-white">
        <div className="transition-all duration-700">
          <h1 className="text-5xl font-semibold leading-tight max-w-xl mt-16">
            {slides[active].title}
          </h1>

          <p className="mt-6 text-lg max-w-lg opacity-90">
            {slides[active].desc}
          </p>

          <div className="mt-10 flex gap-6">
            <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold">
              Download Now
            </button>

            <button className="bg-white/10 border border-white px-8 py-3 rounded-full font-semibold">
              Contact with us
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE SLIDER */}
     {/* RIGHT HERO IMAGE */}
<div className="absolute right-10 xl:right-60 top-24 z-20 hidden lg:block w-[480px] h-[520px]">
  {slides.map((slide, i) => (
    <img
      key={i}
      src={slide.image}
      alt="hero app"
      className={`absolute  top-0 left-0 w-[420px] transition-all h-[680px] duration-1000
        ${
          i === active
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-24"
        }
      `}
    />
  ))}
</div>


      {/* BOTTOM SHAPE */}
      <div className="absolute left-0 right-0 bottom-[-2px] z-[1] w-full">
        <img
          src="https://appbeats.themetags.com/img/hero-shape.svg"
          alt="bottom shape"
          className="w-full"
        />
      </div>
    </section>
  );
}
export default Bannerparts;