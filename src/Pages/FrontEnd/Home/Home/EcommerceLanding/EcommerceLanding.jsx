import { Link } from "react-router-dom";

const categories = [
  {
    title: "Tandoori Chicken",
    count: "9 Products",
    img: "https://images.deliveryhero.io/image/global-menu-service/FP_BD/vendor/ga7u/product/10067132/1073dc85-ada3-4b44-8dcc-3d6448d391b4.jpg?width=400",
  },
  {
    title: "BBQ Steak Chicken",
    count: "3 Products",
    img: "https://images.deliveryhero.io/image/global-menu-service/FP_BD/vendor/vmpu/product/10123986/789c3aa5-5015-4376-b288-34e663d843ea.jpg?width=400",
  },
  {
    title: "Chicken Butter",
    count: "4 Products",
    img: "https://images.deliveryhero.io/image/global-menu-service/FP_BD/vendor/ga7u/product/10067143/493dfd86-7474-4107-96b2-015a6fb74cdf.jpg?width=400",
  },
  {
    title: "BBQ Wings",
    count: "4 Products",
    img: "https://images.deliveryhero.io/image/global-menu-service/FP_BD/vendor/ga7u/product/10067152/fc68e16a-96a6-402e-872f-a72b27b0574b.jpg?width=400",
  },
  {
    title: "Spicy Wings",
    count: "7 Products",
    img: "https://images.deliveryhero.io/image/global-menu-service/FP_BD/vendor/ga7u/product/10067153/31dc04dd-0cb8-4f90-ada9-f8617a34d638.jpg?width=400",
  },
  {
    title: "BBQ Tandoori",
    count: "2 Products",
    img: "https://images.deliveryhero.io/image/global-menu-service/FP_BD/vendor/ga7u/product/10067145/b414f125-32d2-4be1-81f9-544859d61802.jpg?width=400",
  },
];

const EcommerceLanding = () => {
  return (
    <section className="py-16 bg-white">
        <div>
              <h2 className="text-3xl text-center md:text-4xl font-bold mb-4">
          Ecommerce Management 
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 max-w-2xl mx-auto mb-4 text-center">
          Rapidiously morph transparent internal or sources Whereas resource
          sucking e-business. Conveniently innovate compelling internal.
        </p>

         <div className="mt-2 mb-5">
       <Link to="/ecommercesite">
          <button className="bg-red-500 hover:bg-red-600 transition text-white px-8 py-3 rounded-md text-sm md:text-base flex items-center gap-2 mx-auto">
            Visit E-commerce site
            <span className="text-lg">→</span>
          </button></Link>
        </div>
        </div>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
 
        {/* LEFT PROMO */}
        <div className="relative overflow-hidden group lg:col-span-1">
          <img
            src="https://images.deliveryhero.io/image/fd-bd/Products/9032939.jpg?width=400"
            alt="Men Accessories"
            className="w-full h-full object-cover min-h-[520px] group-hover:scale-105 transition duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35"></div>

          {/* Border */}
          <div className="absolute inset-4 border border-white"></div>

          {/* Text */}
          <div className="absolute bottom-10 left-10 text-white z-10">
            <p className="uppercase tracking-widest text-sm">
              Food Parts
            </p>
            <h2 className="text-3xl font-bold mt-2">
              Sale <span className="font-light">30% Off</span>
            </h2>
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">

          {categories.map((item, index) => (
            <div
              key={index}
              className="group bg-white border overflow-hidden text-center"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Text */}
              <div className="py-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {item.count}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default EcommerceLanding;