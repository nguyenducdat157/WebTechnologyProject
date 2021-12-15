import React from "react";
import { Link } from "react-router-dom";

import MessageBox from "../../../components/MessageBox";

export default function CartScreen() {
  const error = 0;
  const cartItems = 2;
  const linkanh = "../../../../../server/uploads/1.jpg";
  const soluong = 2;
  const price = 20;
  const countInStock = 8;

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <div className="row">
            <div>
              <img src={linkanh} alt={linkanh} className="small"></img>
            </div>
            <div className="min-30"></div>
            <div>
              <select value={soluong} onChange>
                {[...Array(countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>${price}</div>
            <div>
              <button type="button" onClick>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({soluong} items) : ${price}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick
                className="primary block"
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
