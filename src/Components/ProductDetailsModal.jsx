import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { addtoCart, decreaseCart } from "../feature/cartSlice";
import { useDispatch } from "react-redux";
import { Clock, Flame, Star } from "lucide-react";
const tags = ["Spicy", "Best Seller", "Noodles"];
const ProductDetailsModal = ({
  setSelectedProduct,
  selectedProduct,
  qty,
  setQty,
  getQty,
  products,
}) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        setSelectedProduct(null);
        document.body.style.overflow = "visible";
      }}
      className="fixed inset-0 z-50  backdrop-blur-sm flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[95%] max-w-7xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-scaleIn relative px-2.5 md:px-5 lg:px-10"
      >
        {/* CLOSE */}
        <button
          onClick={() => {
            setSelectedProduct(null);
            document.body.style.overflow = "visible";
          }}
          className="absolute cursor-pointer  top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6 p-3 lg:p-6">
          {/* IMAGE */}
          <div className="rounded-2xl flex items-center justify-center">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-[400px] w-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-2.5 justify-center">
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                {selectedProduct?.name}
              </h2>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star size={18} className="text-yellow-400 fill-current" />
                  <span className="font-bold">4</span>
                  <span className="text-gray-400 text-sm">(30)</span>
                </div>
                {/* <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={18} />
                  <span className="text-sm">20 min</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Flame size={18} className="text-orange-500" />
                  <span className="text-sm">20 cal</span>
                </div> */}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio ab optio adipisci tempora fugit? Voluptatibus,
                architecto et. Eligendi accusantium ipsa aut architecto, aliquid
                assumenda itaque asperiores fuga, natus, officia blanditiis.
              </p>
            </div>

            {/* ACTIONS */}

            {qty === 0 ? (
              <div>
                <button
                  className="flex items-start justify-start text-[15px] text-white px-5 py-1 rounded-2xl bg-[#c78436] cursor-pointer hover:bg-[#dd8f37] duration-300"
                  onClick={() => dispatch(addtoCart(selectedProduct))}
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                className=" bg-white shadow rounded-md h-[44px] w-[150px] flex items-center justify-between px-4"
              >
                {/* LEFT  */}
                {qty > 1 ? (
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(decreaseCart({ id: selectedProduct.id }))
                    }
                  >
                    <FiMinus />
                  </span>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(decreaseCart({ id: selectedProduct.id }))
                    }
                  >
                    <FiTrash2 />
                  </span>
                )}

                <span className="font-medium">{qty}</span>

                {/* PLUS  */}
                <span
                  className="cursor-pointer"
                  onClick={() => dispatch(addtoCart(selectedProduct))}
                >
                  <FiPlus />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2.5 mt-2.5 px-4">
          <div className="title flex items-center justify-between">
            <h5 className="text-xl lg:text-3xl font-semibold ">Hot Deals</h5>

            <Link className="text-sm lg:text-[17px] text-white px-5 py-1.5 lg:py-3 rounded-2xl bg-[#c78436] hover:underline hover:bg-[#dd8f37] duration-300">
              View All
            </Link>
          </div>

          <div
            className="
    grid gap-2.5
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    xl:grid-cols-6
    2xl:grid-cols-7
  "
          >
            {/* product card */}
            {products?.map((product) => {
              const qty = getQty(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => handleProductDetails(product)}
                  className="cursor-pointer"
                >
                  {/* Image wrapper */}
                  <div className="relative aspect-square bg-white rounded-lg flex items-center justify-center group overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Quantity / Add */}
                    {qty > 0 ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-md h-10 w-[90%] flex items-center justify-between px-3"
                      >
                        <button
                          onClick={() =>
                            dispatch(decreaseCart({ id: product.id }))
                          }
                          className="text-lg"
                        >
                          {qty > 1 ? <FiMinus /> : <FiTrash2 />}
                        </button>

                        <span className="font-medium">{qty}</span>

                        <button
                          onClick={() => dispatch(addtoCart(product))}
                          className="text-lg"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addtoCart(product));
                        }}
                        className="absolute bottom-5 right-4 bg-white w-9 h-9 rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[#e94560] text-base font-semibold">
                      Tk {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        Tk {product.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-1 text-gray-600 text-sm leading-snug line-clamp-2 hover:text-black transition">
                    {product.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
