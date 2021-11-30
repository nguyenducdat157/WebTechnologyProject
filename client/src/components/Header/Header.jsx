import { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
const Header = (props) => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (searchKey !== "") history.push(`/search/${searchKey}`);
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
          <form onSubmit={handleSubmitSearch}>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
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
