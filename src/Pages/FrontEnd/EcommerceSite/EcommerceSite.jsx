import React, { useState } from "react";

import { FiMinus, FiPlus } from "react-icons/fi";

import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import ProductDetailsModal from "../../../Components/ProductDetailsModal";
import SearchBar from "../../../Components/SearchBar";
import Categories from "../../../Components/Categories";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, decreaseCart } from "../../../feature/cartSlice";
import BannerSlider from "../../../Components/ecommerce/BannerSlider";

const categories2 = [
  {
    label: "Vegetables",
    image:
      "https://chaldn.com/_mpimage/fruits-vegetables?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D23769&q=low&v=1&m=400&webp=1",
  },
  {
    label: "Fruits",
    image:
      "https://chaldn.com/_mpimage/fruits-vegetables?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D23769&q=low&v=1&m=400&webp=1",
  },
  {
    label: "Beverages",
    image:
      "https://chaldn.com/_mpimage/breakfast?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D23735&q=best&v=1&m=400&webp=1",
  },
  {
    label: "Snacks",
    image:
      "https://chaldn.com/_mpimage/snacks?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D23741&q=low&v=1&m=400&webp=1",
  },
  {
    label: "Snacks",
    image:
      "https://chaldn.com/_mpimage/diabetic-food?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D43805&q=best&v=1&m=400&webp=1",
  },
  {
    label: "Snacks",
    image:
      "https://chaldn.com/_mpimage/ice-cream?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D96165&q=best&v=1&m=400&webp=1",
  },
  {
    label: "Snacks",
    image:
      "https://chaldn.com/_mpimage/frozen-canned?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D167637&q=best&v=1&m=400&webp=1",
  },
  {
    label: "Snacks",
    image:
      "https://chaldn.com/_mpimage/baking?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D23770&q=low&v=1&m=400&webp=1",
  },

  {
    label: "Snacks",
    image:
      "https://chaldn.com/_mpimage/chocolates?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D119182&q=low&v=1&m=400&webp=1",
  },
  {
    label: "Snacks",
    image:
      "https://chaldn.com/_mpimage/candies?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D116591&q=low&v=1&m=400&webp=1",
  },
  {
    label: "Snacks",
    image:
      "https://chaldn.com/_mpimage/antiseptics?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D27490&q=low&v=1&m=400&webp=1",
  },
];

const products = [
  {
    id: 1,
    name: "Rupchanda Chinigura Rice 1kg",
    image:
      "https://i.ibb.co/R4bPVP9S/ca23c57e-6a26-4fb9-9132-a6bc0c04e3f5-removebg-preview.png",
    price: 155,
    oldPrice: 175,
    save: 20,
  },
  {
    id: 2,
    name: "Rupchanda Premium Rice 2kg",
    image:
      "https://chaldn.com/_mpimage/ag-food-chicken-meat-ball-250-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D151232&q=best&v=1&m=400&webp=1",
    price: 300,
    oldPrice: 350,
    save: 50,
  },
  {
    id: 3,
    name: "Rupchanda Basmati Rice 500g",
    image:
      "https://chaldn.com/_mpimage/ag-food-chicken-mini-samosa-250-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D160591&q=best&v=1&m=400&webp=1",
    price: 80,
    oldPrice: 100,
    save: 20,
  },
  {
    id: 4,
    name: "Rupchanda Everyday Rice 1.5kg",
    image:
      "https://chaldn.com/_mpimage/samyang-hot-chicken-ramen-noodles-2x-spicy-140-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D47022&q=best&v=1&m=400&webp=1",
    price: 220,
    oldPrice: 260,
    save: 40,
  },
  {
    id: 5,
    name: "Rupchanda Organic Rice 1kg",
    image:
      "https://chaldn.com/_mpimage/nestle-pre-nan-premature-low-birth-weight-0-6-m-400-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D152792&q=best&v=1&m=400&m=400&webp=1",
    price: 180,
    oldPrice: 200,
    save: 20,
  },
  {
    id: 6,
    name: "Rupchanda Special Rice 2kg",
    image:
      "https://chaldn.com/_mpimage/le-blanc-sunflower-oil-5-ltr?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D177125&q=best&v=1&m=400&webp=1",
    price: 320,
    oldPrice: 380,
    save: 60,
  },
  {
    id: 7,
    name: "Rupchanda Mini Pack Rice 500g",
    image:
      "https://chaldn.com/_mpimage/nestle-nescafe-3-in-1-iced-frappe-cold-coffee-mix-30-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D138604&q=best&v=1&m=400&webp=1",
    price: 75,
    oldPrice: 90,
    save: 15,
  },
  {
    id: 8,
    name: "Rupchanda Long Grain Rice 1kg",
    image:
      "https://chaldn.com/_mpimage/eldobaby-1-infant-formula-with-iron-0-6-m-350-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D138373&q=best&v=1&m=400&webp=1",
    price: 160,
    oldPrice: 190,
    save: 30,
  },
  {
    id: 9,
    name: "Rupchanda Steamed Rice 2kg",
    image:
      "https://chaldn.com/_mpimage/potato-regular-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D164304&q=best&v=1&m=400&webp=1",
    price: 310,
    oldPrice: 360,
    save: 50,
  },
  {
    id: 10,
    name: "Rupchanda Fragrant Rice 1kg",
    image:
      "https://chaldn.com/_mpimage/doux-chicken-franks-original-340-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D122023&q=best&v=1&m=400&webp=1",
    price: 170,
    oldPrice: 200,
    save: 30,
  },
  {
    id: 11,
    name: "Rupchanda White Rice 500g",
    image:
      "https://chaldn.com/_mpimage/blossoms-dried-mixed-plum-220-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D148500&q=best&v=1&m=400&m=400&webp=1",
    price: 85,
    oldPrice: 100,
    save: 15,
  },
  {
    id: 12,
    name: "Rupchanda Select Rice 1kg",
    image:
      "https://chaldn.com/_mpimage/cadbury-bournville-dark-chocolate-bar-80-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D178127&q=best&v=1&m=400&m=400&webp=1",
    price: 190,
    oldPrice: 220,
    save: 30,
  },
  {
    id: 13,
    name: "Rupchanda Everyday Premium 1.5kg",
    image:
      "https://chaldn.com/_mpimage/nutri-juicee-mango-fortified-soft-drink-powder-500-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D176635&q=best&v=1&m=400&m=400&webp=1",
    price: 230,
    oldPrice: 270,
    save: 40,
  },
  {
    id: 14,
    name: "Rupchanda Classic Rice 2kg",
    image:
      "https://chaldn.com/_mpimage/ceylon-organic-extra-virgin-coconut-oil-500-ml?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D126647&q=best&v=1&m=400&webp=1",
    price: 340,
    oldPrice: 400,
    save: 60,
  },
  {
    id: 15,
    name: "Rupchanda Premium Short Grain 1kg",
    image:
      "https://chaldn.com/_mpimage/pusti-fortified-soyabean-oil-poly-1-ltr?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D175020&q=best&v=1&m=400&webp=1",
    price: 165,
    oldPrice: 190,
    save: 25,
  },
  {
    id: 16,
    name: "Rupchanda Everyday Rice 500g",
    image:
      "https://chaldn.com/_mpimage/cavendish-harvey-mango-kiwi-drops-200-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D126603&q=best&v=1&m=400&webp=1",
    price: 70,
    oldPrice: 85,
    save: 15,
  },
  {
    id: 17,
    name: "Rupchanda Royal Rice 1kg",
    image:
      "https://chaldn.com/_mpimage/eldobaby-2-follow-up-tin-6-12-months-400-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D69081&q=best&v=1&m=400&webp=1",
    price: 180,
    oldPrice: 210,
    save: 30,
  },
  {
    id: 18,
    name: "Rupchanda Everyday Choice 2kg",
    image:
      "https://chaldn.com/_mpimage/varsele-laga-nutri-a21-bird-food-800-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D122495&q=best&v=1&m=400&m=400&webp=1",
    price: 320,
    oldPrice: 370,
    save: 50,
  },
  {
    id: 19,
    name: "Rupchanda Fine Rice 1kg",
    image:
      "https://chaldn.com/_mpimage/olio-orolio-extra-virgin-olive-oil-1-ltr?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D148784&q=best&v=1&m=400&webp=1",
    price: 175,
    oldPrice: 200,
    save: 25,
  },
  {
    id: 20,
    name: "Rupchanda Everyday Deluxe 1.5kg",
    image:
      "https://chaldn.com/_mpimage/gold-wings-premium-budgies-mix-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D126041&q=best&v=1&m=400&m=400&webp=1",
    price: 240,
    oldPrice: 280,
    save: 40,
  },
];

const EcommerceSite = () => {
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.cartQuantity : 0;
  };

  const setQty = (id, qty) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (qty <= 0) delete copy[id];
      else copy[id] = qty;
      return copy;
    });
  };

  const handleProductDetails = (product) => {
    setSelectedProduct(product);

    document.body.style.overflow = "hidden";
  };

  return (
    <div>
      {/* search bar */}
      <SearchBar />

      {/* banner sidebar  */}

      <BannerSlider />

      {/* category */}

      <Categories categories2={categories2} />

      {/* hot deals */}

      <div className="flex flex-col gap-2.5 mt-2.5">
        <div className="title flex items-center justify-between">
          <h5 className="text-xl lg:text-3xl font-semibold ">Hot Deals</h5>

          <Link className="text-sm lg:text-[17px] text-white px-5 py-1.5 lg:py-3 rounded-2xl bg-[#c78436] hover:underline hover:bg-[#dd8f37] duration-300">
            View All
          </Link>
        </div>

        {/* hot deals product */}

        <div className="flex flex-wrap items-center lg:gap-2 2xl:gap-3.5 mt-2.5">
          {/* product card */}
          {products?.map((product) => {
            const qty = getQty(product.id);

            return (
              <div
                key={product.id}
                onClick={() => handleProductDetails(product)}
                className="max-w-[163px] md:max-w-[170px] xl:max-w-[170px] 2xl:max-w-[180px] w-full h-[280px]"
              >
                <div className="relative aspect-square flex items-center justify-center rounded-sm group cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-3/4 object-contain"
                  />
                  {/* Quantity  */}
                  {qty > 0 ? (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white shadow rounded-md h-[44px] w-[150px] flex items-center justify-between px-4"
                    >
                      <span
                        onClick={() =>
                          dispatch(decreaseCart({ id: product.id }))
                        }
                      >
                        {qty > 1 ? <FiMinus /> : <FiTrash2 />}
                      </span>

                      <span className="font-medium">{qty}</span>

                      <span onClick={() => dispatch(addtoCart(product))}>
                        <FiPlus />
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addtoCart(product));
                      }}
                      className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full shadow cursor-pointer flex items-center justify-center"
                    >
                      <FiPlus />
                    </button>
                  )}
                </div>

                <div className="mt-2 lg:mt-4 flex items-center gap-2">
                  <span className="text-[#e94560] text-base lg:text-xl font-medium">
                    Tk {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-base lg:text-xl">
                      Tk {product.oldPrice}
                    </span>
                  )}
                </div>

                <h3 className="mt-1.5 lg:mt-3 text-[#6b7280] text-sm lg:text-lg leading-tight hover:text-black transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* selected product modal */}
      {selectedProduct && (
        <ProductDetailsModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          qty={getQty(selectedProduct.id)}
          setQty={setQty}
          getQty={getQty}
          cart={cart}
          products={products}
        />
      )}
    </div>
  );
};

export default EcommerceSite;
