import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  changeCart,
  removeFromCart,
} from "../../actions/cartActions";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MessageBox from "../../components/MessageBox/MessageBox";
import { prevLink } from "../../ultils/constants";
import "./CartScreen.css";

export default function CartScreen(props) {
  const dispatch = useDispatch();
  const [changeItem, setChangeItem] = useState({ id: "", num: 1 });

  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.userReducer).userInfo;
  // console.log(userInfo);
  // console.log(cart);
  console.log(props);
  const { cartItems } = cart;
  const subtotal = cartItems.reduce((a, b) => a + b.price * Number(b.qty), 0);

  const sumOfQty = cartItems.reduce((a, b) => a + Number(b.qty), 0);

  const productId = props.location.state?.productId;
  const qty = props.location.state?.qty;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    props.history.replace("/cart", null);
  }, []);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleChangeNumberOfProduct = (id, num) => {
    setChangeItem({ id, num });
  };

  useEffect(() => {
    dispatch(changeCart(changeItem.id, changeItem.num));
  }, [changeItem]);

  const checkoutHandler = () => {
    if (userInfo?._id) {
      props.history.push("/shipping");
      return;
    }
    props.history.push("/login?redirect=shipping");
  };

  return (
    <>
      {userInfo?.isAdmin ? (
        <MessageBox variant="danger">Access Denied</MessageBox>
      ) : (
        <>
          <Header />
          <div className="CartScreen-row CartScreen-top">
            <div className="CartScreen-col-2">
              {/* {error && <MessageBox variant="danger">{error}</MessageBox>} */}
              {cartItems.length === 0 ? (
                <MessageBox>
                  Cart is empty. <Link to="/">Go Shopping</Link>
                </MessageBox>
              ) : (
                <ul>
                  {cartItems?.length &&
                    cartItems?.map((item) => (
                      <li key={item.product}>
                        <div className="CartScreen-row">
                          <div>
                            <img
                              src={prevLink + item.image}
                              alt={item.name}
                              className="CartScreen-small"
                            ></img>
                          </div>
                          <div className="CartScreen-min-30">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            <select
                              value={item.qty}
                              onChange={(e) => {
                                handleChangeNumberOfProduct(
                                  item.product,
                                  Number(e.target.value)
                                );
                              }}
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>$ {item.price}</div>
                          <div>
                            <button
                              type="button"
                              className="Cartscreen-blue-color"
                              onClick={() => {
                                removeFromCartHandler(item.product);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="CartScreen-col-1">
              <div className="CartScreen-card CartScreen-card-body">
                <ul>
                  <li>
                    <h2>
                      (Subtotal {Number(sumOfQty)} items) : $ {subtotal}
                    </h2>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="CartScreen-primary CartScreen-block"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
