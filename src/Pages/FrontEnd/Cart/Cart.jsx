import PropTypes from "prop-types";
import CartCalculation from "../../Hooks/UseCartCalculation";

const Cart = (props) => {
    const { shipping, tax, totalQuantity, total, grandtotal, totalIncome, model } = CartCalculation();
    
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h5 className="text-lg font-semibold mb-2">Order Summary</h5>
            <hr className="mb-2" />
            <p className="font-medium">Total Quantity: {totalQuantity}</p>
            <p className="font-medium">Total: {total.toFixed(2)} Taka</p>
            <p className="font-medium">Shipping: {shipping.toFixed(2)} Taka</p>
            <p className="font-medium">Tax: {tax.toFixed(2)} Taka</p>
            <hr className="my-2" />
            <p className="font-medium">Grand Total: {grandtotal.toFixed(2)} Taka</p>
            {/* <p className="font-medium">Total Income: {totalIncome.toFixed(2)} Taka</p> */}
            {/* <p className="font-medium">Discount Total: {model} Taka</p> */}
            <div className="mt-4">{props.children}</div>
        </div>
    );
};

Cart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Cart;



