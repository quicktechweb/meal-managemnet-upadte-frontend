import { useState } from "react";
import { ShoppingCart, Minus, Plus, Star } from "lucide-react";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

export default function ProductDetailsPage() {
  const [qty, setQty] = useState(1);

  const total = 180;
  const sold = 8;
  const remaining = total - sold;
  const myTickets = 0;
  const progress = (sold / total) * 100;

  const thumbs = [
    "https://sellularr.netlify.app/images/11.jpg",
    "https://sellularr.netlify.app/images/guiter.jpg",
    "https://sellularr.netlify.app/images/pp1.jpg",
    "https://sellularr.netlify.app/images/11.jpg",
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <ScrollToTop/>
      {/* ---------- OUTER GRID: (LEFT+MIDDLE) | RIGHT ---------- */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8">
        
        {/* ================= LEFT + MIDDLE WRAPPER ================= */}
        <div className="space-y-8">
          {/* ---------- INNER GRID: LEFT | MIDDLE ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-8">

            {/* ---------- LEFT: Image gallery ---------- */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 flex items-center justify-center">
                <img
                  src="https://sellularr.netlify.app/images/11.jpg"
                  alt="Main product"
                  className="max-h-[420px] max-w-full object-contain"
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    className="border border-gray-200 rounded-xl p-1 hover:border-emerald-600 hover:shadow transition"
                  >
                    <img
                      src={src}
                      alt={`thumb-${i}`}
                      className="object-contain h-20 w-full"
                    />
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold">Efficient protection:</span> High-strength 9H tempered glass keeps your screen scratch-free while maintaining HD clarity.
              </p>
            </div>

            {/* ---------- MIDDLE: Product details ---------- */}
            <div className="space-y-6">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Misxi 2 Pack Hard PC Case with Tempered Glass for 49 mm Apple Watch Ultra 2 / Ultra
              </h1>

              <p className="text-gray-600">
                Thin protective case with built-in screen protector, shock-resistant frame, Black.
              </p>

              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300" />
                ))}
                <span className="text-sm text-gray-500">(No Ratings)</span>
              </div>

              <div className="text-2xl md:text-3xl font-bold text-emerald-600">BDT 2179</div>
              <p className="text-sm text-gray-500">
                4K+ bought · <span className="text-green-600 font-medium">In stock</span>
              </p>

              {/* Size */}
              <div className="space-y-2">
                <h2 className="font-semibold">Size</h2>
                <div className="flex flex-wrap gap-2">
                  {["38mm","40mm","41mm","42mm","44mm","45mm","46mm","49mm"].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:border-emerald-600 transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <h2 className="font-semibold">Color : Black (2-Pack)</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <button
                      key={i}
                      className="w-12 h-12 border border-gray-300 rounded-lg hover:border-emerald-600 transition"
                    >
                      <img
                        src="https://m.media-amazon.com/images/I/51QQROVVhyL._SS64_.jpg"
                        alt="color"
                        className="object-contain mx-auto"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>9H tempered glass for premium scratch protection</li>
                <li>Shockproof PC frame with precise cutouts</li>
                <li>Thin, lightweight design for comfort</li>
              </ul>
            </div>
          </div>

          {/* ================= REVIEW SECTION spans both left + middle ================= */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Customer Reviews & Ratings
            </h2>

            <p className="text-center text-gray-700 font-medium mb-6">
              No customers ratings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
              {/* Star summary */}
              <div className="flex flex-col items-center md:items-start space-y-2">
                <div className="text-4xl font-bold text-emerald-600">0.0</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.973 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.973 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L1.67 10.1c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.518-4.674z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500">0 reviews</p>
              </div>

              {/* Progress bars */}
              <div className="space-y-2">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-12 text-sm text-gray-700">{star} Star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: "0%" }} />
                    </div>
                    <span className="w-10 text-sm text-gray-500 text-right">0%</span>
                  </div>
                ))}
              </div>
            </div>

           <hr className="my-6 border-0 h-px bg-gray-300" />


            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Review this product</h3>
              <p className="text-gray-600 text-sm mb-4">Share your thoughts with other customers</p>
              <button className="px-5 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
                Write a review
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Only registered users can write reviews. Please login or register.
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: Purchase & shipping ================= */}
        <div className="bg-white rounded-2xl border border-gray-100 md:mb-64 mb-0 shadow-xl p-6 space-y-6">
          {/* Price card */}
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-inner">
            <div className="grid grid-cols-2 text-center text-sm font-medium">
              <div>
                <p className="text-2xl font-bold text-emerald-700">৳ 2,172</p>
                <p className="text-gray-500">Product Price</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">৳ 10</p>
                <p className="text-gray-500">Coupon Price</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-center text-sm">
            Order now and get it around{" "}
            <span className="font-semibold text-gray-800">Thursday, September 11</span>
          </p>

          {/* Quantity */}
          <div className="flex items-center justify-center md:justify-start">
            <span className="text-sm font-semibold text-gray-700">Quantity:</span>
            <div className="flex ms-2 items-center p-2 border border-gray-300 rounded-lg w-32 overflow-hidden shadow-sm">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-3 py-1 hover:bg-gray-100 transition">
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-1 hover:bg-gray-100 transition">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Coupon progress */}
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-inner">
            <div className="grid grid-cols-2 sm:grid-cols-3 text-center text-sm font-medium gap-y-2">
              <div><p className="text-lg font-semibold text-green-600">{sold}</p><p className="text-gray-500">SOLD</p></div>
              <div><p className="text-lg font-semibold text-orange-500">{remaining}</p><p className="text-gray-500">REMAINING</p></div>
              <div><p className="text-lg font-semibold text-blue-600">{myTickets}</p><p className="text-gray-500">TICKETS</p></div>
              <div><p className="text-lg font-semibold text-purple-600">{progress.toFixed(1)}%</p><p className="text-gray-500">PROGRESS</p></div>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-center text-xs text-gray-600">
              {sold} of {total} coupons sold
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="border border-emerald-600 text-emerald-600 py-2 rounded-xl font-medium hover:bg-emerald-50 transition">
              Buy Coupon
            </button>
            <button className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 rounded-xl font-medium hover:bg-emerald-700 transition">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button className="col-span-2 border border-emerald-600 text-emerald-600 py-2 rounded-xl font-medium hover:bg-emerald-50 transition">
              Buy Now
            </button>
          </div>

          {/* Extra Info */}
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-center gap-1">
              <span role="img" aria-label="lock">🔒</span> Secured transaction
            </p>
            <div className="flex items-center gap-4 mt-2">
              <img src="https://sellularr.netlify.app/images/fedex.svg" alt="FedEx" className="h-5" />
              <img src="https://sellularr.netlify.app/images/dhl.svg" alt="DHL" className="h-5" />
            </div>
            <p className="font-semibold mt-3">Features & Benefits</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Compatible with Apple Watch Ultra 49 mm</li>
              <li>9H tempered glass for scratch protection</li>
              <li>Button cover included for full protection</li>
              <li>Precise design allows access to all features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
