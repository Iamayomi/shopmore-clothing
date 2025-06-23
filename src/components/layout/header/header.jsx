import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/firebase.utils";
import Logo from "../../../assets/crown.svg";
import CartIcon from "../../cart-icon/cart-icon";
import Message from "../../ui/message/message";
import CartDropDown from "../../ui/cart-dropdown/cart-dropdown";
import "./header.style.scss";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const hidden = useSelector((state) => state.cart.hidden);

  const [message, setMessage] = useState(null);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setMessage({
        type: "success",
        message: "Signed out successfully!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        message: `Failed to sign out: ${error.message}`,
      });
    }
  };

  const closeMesage = () => {
    setMessage(null);
  };

  return (
    <>
      <div className="header">
        <Link className="logo-container" to="/">
          <img className="logo" src={`${Logo}`} />
        </Link>
        <div className="options">
          <Link className="option" to="/shop">
            SHOP
          </Link>
          <Link className="option" to="/contact">
            CONTACT
          </Link>
          {currentUser ? (
            <>
              <span>Welcome, {currentUser.displayName}</span>
              <div className="option" onClick={handleSignOut}>
                SIGN OUT
              </div>
            </>
          ) : (
            <>
              <Link className="option" to="/signin">
                SIGN IN
              </Link>
            </>
          )}
          <CartIcon />
        </div>
        {!hidden && <CartDropDown />}
        {message && <Message type={message.type} message={message.message} onClose={closeMesage} />}
      </div>
    </>
  );
};

export default Header;
