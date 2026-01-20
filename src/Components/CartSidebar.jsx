import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  decreaseCart,
  getSubtotal,
  removeFromCart,
} from "../feature/cartSlice";
import { useEffect } from "react";
import { FiMinus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.cartQuantity : 0;
  };

  useEffect(() => {
    dispatch(getSubtotal());
  }, [cartItems, dispatch]);

  const handleCheckout = () => {
    navigate("/checkout");
    document.body.style.overflow = "visible";
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 z-50 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* 2. Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[330px] sm:w-[350px] bg-slate-50 shadow-[0_0_50px_rgba(0,0,0,0.3)] z-50 transform transition-all duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-white px-4 lg:px-6 py-2 lg:py-4 border-b border-gray-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-3xl"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                My Cart{" "}
                <span className="bg-rose-600 text-white text-xs  py-1 rounded-full px-2">
                  {cartItems?.length}
                </span>
              </h2>
              <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">
                Ready to checkout?
              </p>
            </div>
            <button
              onClick={onClose}
              className="group p-1.5 lg:p-3 cursor-pointer bg-slate-100 hover:bg-red-50 rounded-2xl transition-all"
            >
              <X
                size={20}
                className="text-slate-600  group-hover:text-red-500 transition-colors"
              />
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto items-bar h-[calc(100vh-150px)] lg:h-[calc(100vh-200px)] px-2 py-2 space-y-4">
          {cartItems?.map((item) => {
            const qty = getQty(item.id);

            return (
              <div className="group relative flex gap-2 bg-white p-2 rounded-3xl border border-transparent hover:border-indigo-100 hover:shadow-xl transition-all duration-300">
                <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-slate-100 rounded-2xl overflow-hidden">
                  <img
                    src={item?.image}
                    alt="Product"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-800 line-clamp-1 text-sm lg:text-base leading-tight">
                        {item?.name}
                      </h3>
                      <p className="text-[10px] font-semibold text-indigo-500 capitalize tracking-widest mt-1">
                        description
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                      <button
                        onClick={() => dispatch(decreaseCart({ id: item.id }))}
                        className="w-3.5 h-3.5 flex items-center justify-center hover:bg-white rounded-lg cursor-pointer transition-all"
                      >
                        {qty > 1 ? <FiMinus /> : <FiTrash2 />}
                      </button>
                      <span className="px-2 font-bold text-slate-700">
                        {qty}
                      </span>
                      <button
                        onClick={() => dispatch(addtoCart(item))}
                        className="w-3.5 h-3.5 flex items-center justify-center hover:bg-white rounded-lg cursor-pointer transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-sm font-black text-slate-900">
                      ৳ {item?.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart({ id: item?.id }))}
                  className="text-red-400 hover:text-red-500 transition-colors cursor-pointer text-sm lg:text-base"
                >
                  <FiTrash2 />
                </button>
              </div>
            );
          })}

          {cartItems?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <h4 className="text-xl lg:text-2xl font-semibold">
                Your Cart Are Empty
              </h4>
            </div>
          )}
          {/*Product Card */}
        </div>

        {/* Checkout Footer */}
        <div className="absolute bottom-0 left-0 w-full bg-white py-2 lg:py-4 px-4 lg:px-6 border-t border-slate-100">
          <div className="flex justify-between items-end mb-3 lg:mb-6">
            <div>
              <p className="text-xs lg:text-sm font-bold text-slate-400 capitalize tracking-widest">
                Total Amount
              </p>
              <p className="text-sm lg:text-xl font-black text-slate-900">
                ৳ {cartTotalAmount}
              </p>
            </div>
            {/* <div className="text-right">
              <p className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg italic">
                + Taxes included
              </p>
            </div> */}
          </div>

          <button
            disabled={cartItems?.length === 0}
            onClick={handleCheckout}
            className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 p-2 transition-all active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-center gap-3 text-white font-bold text-sm">
              <span>Checkout</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform"
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
