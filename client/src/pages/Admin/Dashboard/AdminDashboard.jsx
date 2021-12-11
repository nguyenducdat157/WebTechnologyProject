import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../../../actions/productActions";
import { listUser } from "../../../actions/userActions";
import Header from "../../../components/Header/Header";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import "./AdminDashboard.css";

export default function Admindashboard() {
  const productList = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const { products } = productList;

  const userList = useSelector((state) => state.userList);
  const users = userList.users?.filter((user) => {
    return !user.isAdmin;
  });

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listUser());
  }, [dispatch]);
  return (
    <div>
      {/* <div className="row">
        <h1>Dashboard</h1>
      </div> */}
      <Header />
      {/* {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <> */}
      <ul className="dashboard-row dashboard-summary">
        <li>
          <Link to="/list-users">
            <div className="dashboard-summary-title color1">
              <span>
                <i className="fa fa-users" /> Users
              </span>
            </div>
            <div className="dashboard-summary-body">{users?.length}</div>
          </Link>
        </li>

        <li>
          <Link to="/list-orders">
            <div className="dashboard-summary-title color2">
              <span>
                <i className="fa fa-shopping-cart" /> Orders
              </span>
            </div>
            <div className="dashboard-summary-body">30</div>
          </Link>
        </li>

        <li>
          <Link to="/list-products">
            <div className="dashboard-summary-title color3">
              <span>
                <i className="fa fa-money" /> Products
              </span>
            </div>
            <div className="dashboard-summary-body">{products?.length}</div>
          </Link>
        </li>
      </ul>
      {/* </>
      )} */}
    </div>
  );
}
