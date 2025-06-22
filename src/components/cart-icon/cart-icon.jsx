import React from "react";
import "./cart-icon.style.scss";
import ShoppingIcon from "../../assets/shopping-bag.svg";

const CartIcon = () => (
  <div className="cart-icon">
    <img className="shopping-icon" src={ShoppingIcon} alt="Shopping Cart" />
    {/* <div className="item-count">0<div/> */}
  </div>
);

export default CartIcon;
