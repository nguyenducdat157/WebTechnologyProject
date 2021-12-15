import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShipping } from "../../../actions/cartActions";
import CheckoutSteps from "../../../components/CheckoutSteps/CheckoutSteps";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import "./ShippingAddressScreen.css";

export default function Shippingaddressscreen(props) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducer).userInfo;

  // gửi thông tin giao hàng
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      alert("Phone number is invalid!");
    } else {
      dispatch(saveShipping({ address, phone }));
      props.history.push("/payment");
    }
  };

  function validatePhone(phone) {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(String(phone));
  }
  return (
    <>
      {userInfo?.isAdmin ? (
        <MessageBox variant="danger">Access Denied</MessageBox>
      ) : (
        <div>
          <Header />
          <CheckoutSteps step1 step2></CheckoutSteps>
          <form className="Shippingaddress-form">
            <div>
              <h1>Shipping Address</h1>
            </div>
            <div>
              <label htmlFor="fullName">Phone Number</label>
              <input
                type="text"
                id="fullName"
                className="Shippingaddress_input"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                className="Shippingaddress_input"
                type="text"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label />
              <button
                className="Shippingaddress-primary Shippingaddress_button"
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
