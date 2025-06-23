import React from "react";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../redux/cart/cart.slice";
import "./cart-icon.style.scss";
import ShoppingIcon from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="cart-icon" onClick={() => dispatch(toggleCart())}>
        <img className="shopping-icon" src={ShoppingIcon} alt="Shopping Cart" />
        {/* <span className="item-count">0<span/> */}
      </div>
    </>
  );
};

export default CartIcon;
