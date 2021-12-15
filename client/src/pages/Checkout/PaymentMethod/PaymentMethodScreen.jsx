import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../../../actions/cartActions";
import CheckoutSteps from "../../../components/CheckoutSteps/CheckoutSteps";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import "./PaymentMethodScreen.css";

export default function Paymentmethodscreen(props) {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const userInfo = useSelector((state) => state.userReducer).userInfo;

  // xác nhận phương thức thanh toán
  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod !== "") {
      dispatch(savePayment({ paymentMethod }));
      props.history.push("/place-order");
    }
  };
  return (
    <>
      {userInfo?.isAdmin ? (
        <MessageBox variant="danger">Access Denied</MessageBox>
      ) : (
        <div>
          <Header />
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
          <form className="PaymentMethod-form">
            <div>
              <h1>Payment Method</h1>
            </div>
            <div>
              <div>
                <input
                  type="radio"
                  id="stripe"
                  value="Thanh toán khi nhận hàng"
                  name="paymentMethod"
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="stripe">&nbsp; Thanh toán khi nhận hàng</label>
              </div>
            </div>
            <div>
              <label />
              <button
                className="PaymentMethod-primary"
                type="submit"
                onClick={submitHandler}
              >
                Continue
              </button>
            </div>
          </form>
          <Footer />
        </div>
      )}
    </>
  );
}
