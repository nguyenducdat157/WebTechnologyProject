import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Product from "../components/Product/Product";
import Slide from "../components/Silde/Slide";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export const Homepage = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // console.log(products);
  return (
    <Layout>
      {" "}
      <Slide />
      <h2 style={{ textAlign: "center" }}>Sản phẩm nổi bật</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="row" style={{ justifyContent: "center" }}>
            {products.length &&
              products.map((product) => {
                console.log(product);
                return <Product key={product._id} product={product} />;
              })}
          </div>
          <Link to="/collections">
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
              Xem tất cả sản phẩm
            </h2>
          </Link>
        </>
      )}
    </Layout>
  );
};
