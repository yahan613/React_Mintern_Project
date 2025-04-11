import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log("目前item：",cart);
  return (
    <div>
        <p>cart.</p>
    </div>
  );
};

export default Cart;
