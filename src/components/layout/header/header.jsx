import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/firebase.utils";
import Logo from "../../../assets/crown.svg";
import CartIcon from "../../cart-icon/cart-icon";
import CartDropDown from "../../ui/cart-dropdown/cart-dropdown";
import "./header.style.scss";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const hidden = useSelector((state) => state.cart.hidden);

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
          <Link className="option" to="/signin">
            {currentUser ? (
              <div className="option" onClick={() => auth.signOut()}>
                SIGN OUT
              </div>
            ) : (
              <div>SIGN IN</div>
            )}
          </Link>
          <CartIcon />
        </div>
        {hidden ? null : <CartDropDown />}
      </div>
    </>
  );
};

export default Header;
