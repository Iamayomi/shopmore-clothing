import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/cart/cart.slice";
import "./cart-icon.style.scss";
import ShoppingIcon from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <>
      <div className="cart-icon" onClick={() => dispatch(toggleCart())}>
        <img className="shopping-icon" src={ShoppingIcon} alt="Shopping Cart" />

        <span className="item-count">{cartItems.length}</span>
      </div>
    </>
  );
};

export default CartIcon;
