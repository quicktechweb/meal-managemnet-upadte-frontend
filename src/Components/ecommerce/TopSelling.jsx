import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../../data/products";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductDetailsModal from "./ProductDetailsModal";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TopSelling = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <div className="flex flex-col gap-2.5 mt-2.5 max-w-[1600px]">
      {/* Header */}
      <div className="title flex items-center justify-between">
        <h5 className="text-xl lg:text-3xl font-semibold">Top Selling</h5>
        <Link className="text-sm lg:text-[17px] text-white px-5 py-1.5 lg:py-3 rounded-2xl bg-blue-600 hover:underline hover:bg-blue-800 duration-300">
          View All
        </Link>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 14 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
          1280: { slidesPerView: 5, spaceBetween: 14 },
          1536: { slidesPerView: 6, spaceBetween: 14 },
        }}
        className="w-full mt-2.5 pb-10"
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              getQty={getQty}
              setQty={setQty}
              handleProductDetails={handleProductDetails}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Product Details Modal */}
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

export default TopSelling;
