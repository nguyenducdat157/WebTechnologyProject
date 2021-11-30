import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Product from "../components/Product/Product";
import Slide from "../components/Silde/Slide";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const Homepage = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const getNewListProduct = (products) => {
    let listNewProducts = products?.filter(function (x) {
      return (
        (new Date().getTime() - new Date(x.createdAt).getTime()) /
          (1000 * 3600 * 24) <
        30
      );
    });
    return listNewProducts?.length > 4
      ? listNewProducts.slice(0, 4)
      : listNewProducts;
  };

  console.log(getNewListProduct(products));

  // console.log(products);
  return (
    // <Layout>
    //   {" "}
    <>
      <Header />
      <Slide />
      <h2 style={{ textAlign: "center" }}>Hàng mới về</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="row" style={{ justifyContent: "center" }}>
            {getNewListProduct(products).length ? (
              getNewListProduct(products).map((product) => {
                // console.log(product);
                return <Product key={product._id} product={product} />;
              })
            ) : (
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Không có sản phẩm mới nào
              </p>
            )}
          </div>
          <Link to="/collections">
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
              Xem tất cả sản phẩm
            </h2>
          </Link>
        </>
      )}
      <Footer />
    </>
    // </Layout>
  );
};
