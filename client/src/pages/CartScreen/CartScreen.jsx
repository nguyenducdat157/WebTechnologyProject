import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import MessageBox from "../../components/MessageBox/MessageBox";
import "./CartScreen.css";

export default function CartScreen(){
    const error = 0;
    
    const item = {
        product: "abcdxyz",
        name: "Ao phao Chelsea",
        image: "../../logo.svg",
        price: 5000000,
        countInStock: 50,
        seller: "dungvv",
        qty: 1,
    };
    const cartItems = [item];
    return (
        <div className="CartScreen-row CartScreen-top">
            <div className="CartScreen-col-2">
                <h1>Shopping Cart</h1>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {cartItems.length === 0 ? (
                <MessageBox>
                    Cart is empty. <Link to="/">Go Shopping</Link>
                </MessageBox>
                ) : (
                    <ul>
                        <li key={item.product}>
                            <div className="CartScreen-row">
                            <div>
                                <img
                                src={item.image}
                                alt={item.name}
                                className="CartScreen-small"
                                ></img>
                            </div>
                            <div className="CartScreen-min-30">
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div>
                            <div>
                                <select
                                value={item.qty}
                                >
                                {[...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div>{item.price} VNĐ</div>
                            <div>
                                <button
                                type="button"
                                className="Cartscreen-blue-color"
                                >
                                Delete
                                </button>
                            </div>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
            <div className="CartScreen-col-1">
                <div className="CartScreen-card CartScreen-card-body">
                <ul>
                    <li>
                    <h2>
                        Subtotal ({item.qty} items) : 
                        {item.price * item.qty} VNĐ
                    </h2>
                    </li>
                    <li>
                    <button
                        type="button"
                        className="CartScreen-primary CartScreen-block"
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    );
}