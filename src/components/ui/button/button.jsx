import React from "react";
import "./button.style.scss";

const Button = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <button className={`${inverted ? "inverted" : ""} ${isGoogleSignIn ? "google-signin" : ""} custom-button`} {...otherProps}>
    {children}
  </button>
);

export default Button;
