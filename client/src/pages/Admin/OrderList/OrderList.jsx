import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listMyOrders, listOrders } from "../../../actions/orderActions";
import Header from "../../../components/Header/Header";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import { formatDate } from "../../../ultils/functions";
import "./OrderList.css";
export default function Orderlist(props) {
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;
  const orderList = useSelector((state) => state.orderList);
  const orderMineList = useSelector((state) => state.myOrderList);
  const { loading, error, orders } = userInfo?.isAdmin
    ? orderList
    : orderMineList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(listOrders());
    } else {
      console.log("USER");
      dispatch(listMyOrders());
    }
  }, []);

  console.log(orders);

  return (
    <div>
      <Header />
      <h1>Orders</h1>
      {userInfo?.isAdmin ? (
        <Link to="/admin">
          <h3>Back to dashboard</h3>
        </Link>
      ) : (
        <Link to="/">
          <h3>Back to Homepage</h3>
        </Link>
      )}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders?.length ? (
        <>
          <table className="OrderList-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>ADDRESS</th>
                <th>PHONE</th>
                <th>STATUS</th>
                {userInfo?.isAdmin && <th>ACTIONS</th>}
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.userId.name}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    $ {order.shippingPrice + order.taxPrice + order.itemsPrice}
                  </td>
                  <td>{order.shipping.address}</td>
                  <td>{order.shipping.phone}</td>
                  <td>
                    {order.isPaid
                      ? "Paid"
                      : order.isDelivered
                      ? "Delivered"
                      : "Pending"}
                  </td>
                  {userInfo?.isAdmin && (
                    <td>
                      {order.isPaid ? (
                        <button
                          type="button"
                          className="OrderList-button OrderList-small"
                        >
                          Delete
                        </button>
                      ) : order.isDelivered ? (
                        <button
                          type="button"
                          className="OrderList-button OrderList-small"
                        >
                          Pay
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="OrderList-button OrderList-small"
                        >
                          Delivery
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <MessageBox>
          No Order. {userInfo?.isAdmin ? "" : <Link to="/">Go Shopping</Link>}
        </MessageBox>
      )}
    </div>
  );
}
