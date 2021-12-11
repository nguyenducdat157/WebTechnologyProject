import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from '../../../components/MessageBox/MessageBox';
import CheckoutSteps from '../../../components/CheckoutSteps/CheckoutSteps';
import "./PlaceOrderScreen.css";


export default function Placeorderscreen(){
    const error = 0, loading = 0;
    const shippingAddress = {
        fullName: "Vo Viet Dung",
        address: "Me linh - Ha Noi",
        city: "Ha Noi",
        postalCode: "1234",
        country: "Viet Nam"
    }
    const item = {
        product: "abcdxyz",
        name: "Ao phao Chelsea",
        image: "../../logo.svg",
        price: 5000000,
        countInStock: 50,
        seller: "dungvv",
        qty: 1,
    };
    const cart = {
        shippingAddress,
        item,
        paymentMethod: "Pay Pal",
        itemsPrice: "5000000",
        shippingPrice: "30000",
        taxPrice: "500000",
        totalPrice: "5800000", 

    };
    
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="PlaceOrder-row PlaceOrder-top">
                <div className="col-2">
                <ul>
                    <li>
                    <div className="PlaceOrder-card PlaceOrder-card-body">
                        <h2>Shipping</h2>
                        <p>
                        <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                        <strong>Address: </strong> {cart.shippingAddress.address},
                        {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                        ,{cart.shippingAddress.country}
                        </p>
                    </div>
                    </li>
                    <li>
                    <div className="PlaceOrder-card PlaceOrder-card-body">
                        <h2>Payment</h2>
                        <p>
                        <strong>Method:</strong> {cart.paymentMethod}
                        </p>
                    </div>
                    </li>
                    <li>
                    <div className="PlaceOrder-card PlaceOrder-card-body">
                        <h2>Order Items</h2>
                        <ul>
                            <li key={item.product}>
                            <div className="PlaceOrder-row">
                                <div>
                                <img
                                    src={item.image}
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
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                </div>
                            </div>
                            </li>
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
                        <div>${cart.itemsPrice}</div>
                        </div>
                    </li>
                    <li>
                        <div className="PlaceOrder-row">
                        <div>Shipping</div>
                        <div>${cart.shippingPrice}</div>
                        </div>
                    </li>
                    <li>
                        <div className="PlaceOrder-row">
                        <div>Tax</div>
                        <div>${cart.taxPrice}</div>
                        </div>
                    </li>
                    <li>
                        <div className="PlaceOrder-row">
                        <div>
                            <strong> Order Total</strong>
                        </div>
                        <div>
                            <strong>${cart.totalPrice}</strong>
                        </div>
                        </div>
                    </li>
                    <li>
                        <button
                        type="button"
                        className="PlaceOrder-primary PlaceOrder-block"
                        disabled={cart.item.length === 0}
                        >
                        Place Order
                        </button>
                    </li>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
}
