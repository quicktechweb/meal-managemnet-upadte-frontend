import React from "react";
import { addtoCart, decreaseCart } from "../../feature/cartSlice";
import { useDispatch } from "react-redux";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const ProductCard = ({ product, getQty, handleProductDetails, setQty }) => {
  const dispatch = useDispatch();
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
            <span onClick={() => dispatch(decreaseCart({ id: product.id }))}>
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
};

export default ProductCard;
