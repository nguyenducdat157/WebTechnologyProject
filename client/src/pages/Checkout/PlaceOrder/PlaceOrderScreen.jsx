import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import CheckoutSteps from "../../../components/CheckoutSteps/CheckoutSteps";
import "./PlaceOrderScreen.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { prevLink } from "../../../ultils/constants";
import { createOrder } from "../../../actions/orderActions";
import { saveProduct } from "../../../actions/productActions";
import { ORDER_CREATE_RESET } from "../../../constants/orderConstants";

export default function Placeorderscreen(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  console.log(success);

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * Number(c.qty), 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 10;
  const taxPrice = Math.round((0.1 * itemsPrice + Number.EPSILON) * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userReducer).userInfo;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        userId: userInfo._id,
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
    // cartItems.map((item) => {
    //   dispatch(
    //     saveProduct({
    //       _id: item.product,
    //       name: item.name,
    //       price: item.price,
    //       image: item.image,
    //       category: item.category,
    //       brand: item.brand,
    //       countInStock: item.countInStock - Number(item.qty),
    //       rating: item.rating,
    //       description: item.description,
    //     })
    //   );
    // });
  };

  useEffect(() => {
    if (success) {
      console.log("SUCCESS", success);
      // dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success]);
  return (
    <>
      {userInfo?.isAdmin ? (
        <MessageBox variant="danger">Access Denied</MessageBox>
      ) : (
        <div>
          <Header />
          {success ? (
            <div className="PlaceOrder-col-1">
              <div className="PlaceOrder-card PlaceOrder-card-body">
                <ul>
                  <li>
                    <h2>Order Success !!</h2>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="PlaceOrder-primary PlaceOrder-block"
                      onClick={() => {
                        props.history.push("/");
                      }}
                    >
                      Continue Shopping
                    </button>
                  </li>
                  {/* {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>} */}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
              <div className="PlaceOrder-row PlaceOrder-top">
                <div className="col-2">
                  <ul>
                    <li>
                      <div className="PlaceOrder-card PlaceOrder-card-body">
                        <h2>Shipping</h2>
                        <p>
                          <strong>Name:</strong> {userInfo?.name} <br />
                          <strong>Address: </strong> {shipping.address} <br />
                          <strong>Phone Number: </strong> {shipping.phone}
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="PlaceOrder-card PlaceOrder-card-body">
                        <h2>Payment</h2>
                        <p>
                          <strong>Method:</strong> {payment.paymentMethod}
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="PlaceOrder-card PlaceOrder-card-body">
                        <h2>Order Items</h2>
                        <ul>
                          {cartItems?.length ? (
                            cartItems?.map((item) => (
                              <li key={item.product}>
                                <div className="PlaceOrder-row">
                                  <div>
                                    <img
                                      style={{ maxWidth: "54px" }}
                                      src={prevLink + item.image}
                                      alt={item.name}
                                      className="PlaceOrder-small"
                                    ></img>
                                  </div>
                                  <div className="PlaceOrder-min-30">
                                    <Link to={`/product/${item.product}`}>
                                      {item.name}
                                    </Link>
                                  </div>

                                  <div>
                                    {item.qty} x ${item.price} = $
                                    {item.qty * item.price}
                                  </div>
                                </div>
                              </li>
                            ))
                          ) : (
                            <div>Cart is empty</div>
                          )}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="PlaceOrder-col-1">
                  <div className="PlaceOrder-card PlaceOrder-card-body">
                    <ul>
                      <li>
                        <h2>Order Summary</h2>
                      </li>
                      <li>
                        <div className="PlaceOrder-row">
                          <div>Items</div>
                          <div>${itemsPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className="PlaceOrder-row">
                          <div>Shipping</div>
                          <div>${shippingPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className="PlaceOrder-row">
                          <div>Tax</div>
                          <div>${taxPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className="PlaceOrder-row">
                          <div>
                            <strong> Order Total</strong>
                          </div>
                          <div>
                            <strong>${totalPrice}</strong>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="PlaceOrder-primary PlaceOrder-block"
                          disabled={cartItems?.length === 0}
                          onClick={placeOrderHandler}
                        >
                          Place Order
                        </button>
                      </li>
                      {/* {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>} */}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          <Footer />
        </div>
      )}
    </>
  );
}
