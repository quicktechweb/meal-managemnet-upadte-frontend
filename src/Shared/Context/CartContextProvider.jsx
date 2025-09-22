import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const allCart = JSON.parse(localStorage.getItem("productCart"));
    if (allCart) setCart(allCart);
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;
