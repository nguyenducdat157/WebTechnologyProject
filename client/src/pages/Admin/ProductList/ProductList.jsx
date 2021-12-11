import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteProduct, listProducts } from "../../../actions/productActions";
import Header from "../../../components/Header/Header";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import "./ProductList.css";
export default function Productlist(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);
  const history = useHistory();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <div>
      <Header />
      <div className="ProductList-row">
        <h1>Products</h1>
        <button
          type="button"
          className="ProductList-button ProductList-primary"
          onClick={() => {
            history.push(`/create-product`);
          }}
        >
          Create Product
        </button>
      </div>
      <Link to="/admin">
        <h3>Back to dashboard</h3>
      </Link>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="ProductList-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>COUNT IN STOCK</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products?.length &&
                products?.map((product) => (
                  <tr>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <button
                        type="button"
                        className="ProductList-button small"
                        onClick={() => {
                          history.push({
                            pathname: `/edit-product/${product._id}`,
                            state: {
                              product: product,
                            },
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ProductList-button small"
                        onClick={() => {
                          handleDelete(product._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
