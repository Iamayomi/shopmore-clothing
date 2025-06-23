import React from "react";
import { useSelector } from "react-redux";
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import "./cart-dropdown.style.scss";

const CartDropDown = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <div className="cart-dropdown">
        <div className="cart-items">
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.key} item={cartItem} />
          ))}
        </div>
        <Button>GO TO CHECKOUT</Button>
      </div>
    </>
  );
};

export default CartDropDown;
