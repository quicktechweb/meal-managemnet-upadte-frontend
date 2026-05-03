import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../../data/products";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductDetailsModal from "./ProductDetailsModal";

const LatestProduct = () => {
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

  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="flex flex-col gap-2.5 mt-2.5">
      <div className="title flex items-center justify-between">
        <h5 className="text-xl lg:text-3xl font-semibold ">Latest Products</h5>

        <Link className="text-sm lg:text-[17px] text-white px-5 py-1.5 lg:py-3 rounded-2xl bg-blue-600 hover:underline hover:bg-blue-800 duration-300">
          View All
        </Link>
      </div>

      <div className="flex flex-wrap items-center lg:gap-2 2xl:gap-3.5 mt-2.5">
        {/* product card */}
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            getQty={getQty}
            setQty={setQty}
            handleProductDetails={handleProductDetails}
          />
        ))}
      </div>

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

export default LatestProduct;
