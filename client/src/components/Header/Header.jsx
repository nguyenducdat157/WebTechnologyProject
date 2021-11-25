import { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
const Header = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;
  return (
    <header>
      <div
        className={
          showMenu ? "header__topnav header__responsive" : "header__topnav"
        }
      >
        <a href="/" className="logo_header">
          <img src="https://jockey.vn/static/assets/logo.svg"></img>
        </a>
        <a href="#news" className="header__link">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
        </a>
        {userInfo ? (
          <a href="/profile" className="header__link">
            <i className="fa fa-user-circle" aria-hidden="true"></i>{" "}
            {userInfo.name}
          </a>
        ) : (
          <a href="/login" className="header__link">
            Sign In
          </a>
        )}
        <a href="#about" className="header__link">
          <i class="fa fa-truck" aria-hidden="true"></i> Order
        </a>
        <a className="icon" onClick={handleShowMenu}>
          <i className="fa fa-bars"></i>
        </a>
        <div className="header__search">
          <form
            onSubmit={() => {
              alert("submit");
            }}
          >
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
