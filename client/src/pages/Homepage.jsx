import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import Product from "../components/Product/Product";
import Slide from "../components/Silde/Slide";
import Admindashboard from "./Admin/Dashboard/AdminDashboard";
import Productlist from "./Admin/ProductList/ProductList";
import Orderlist from "./Admin/OrderList/OrderList";
import Userlist from "./Admin/UserList/UserList";
import Productedit from "./Admin/ProductEdit/ProductEdit";
export const Homepage = () => {
  return (
    <Layout>
      {" "}
      <Slide />
      <h2 style={{ textAlign: "center" }}>Sản phẩm nổi bật</h2>
      <div className="row" style={{ justifyContent: "center" }}>
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <Link to="/collections">
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          Xem tất cả sản phẩm
        </h2>
      </Link>
    </Layout>
    // <Layout>
    //     <Productedit></Productedit>
    // </Layout>
    
  );
};
