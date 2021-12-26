import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../../../actions/productActions";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import { Link, useParams, useHistory } from "react-router-dom";
import "./ProductEdit.css";
import { HOST_URL } from "../../../ultils/constants";
export default function Productedit(props) {
  const defaultData = props.location.state?.product;
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  // console.log(productId);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [name, setName] = useState(defaultData?.name || "");
  const [price, setPrice] = useState(defaultData?.price || "");
  const [image, setImage] = useState(defaultData?.image || "");
  const [brand, setBrand] = useState(defaultData?.brand || "");
  const [category, setCategory] = useState(defaultData?.category || "");
  const [countInStock, setCountInStock] = useState(
    defaultData?.countInStock || ""
  );
  const [description, setDescription] = useState(
    defaultData?.description || ""
  );
  const [uploading, setUploading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState({ type: "", msg: "" });

  // console.log(product);
  useEffect(() => {
    if (productId) dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  // đăng tải ảnh sản phẩm
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      setErrorSubmit({ type: "name", msg: "Name is required" });
      return;
    }
    if (price === "") {
      setErrorSubmit({ type: "price", msg: "Price is required" });
      return;
    }
    if (image === "") {
      setErrorSubmit({ type: "image", msg: "Image is required" });
      return;
    }
    if (category === "") {
      setErrorSubmit({ type: "category", msg: "Category is required" });
      return;
    }
    if (brand === "") {
      setErrorSubmit({ type: "brand", msg: "Brand is required" });
      return;
    }
    if (description === "") {
      setErrorSubmit({ type: "description", msg: "Description is required" });
      return;
    }
    if (countInStock === "") {
      setErrorSubmit({
        type: "countInStock",
        msg: "Count in Stock is required",
      });
      return;
    }
    setErrorSubmit({ type: "", msg: "" });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    console.log(formData);
    if (!productId) {
      fetch(`${HOST_URL}/api/products/`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        body: formData,
      })
        .then(async (response) => {
          if (response.status === 201) {
            alert("Create Product successfully!");
          } else {
            alert("Some thing went wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`${HOST_URL}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        body: formData,
      })
        .then(async (response) => {
          if (response.status === 200) {
            alert("Update Product successfully!");
          } else {
            alert("Some thing went wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <form className="ProductEdit-form" onSubmit={submitHandler}>
        <div>
          {productId ? (
            <h1 style={{ textAlign: "center" }}>Update Product</h1>
          ) : (
            <h1 style={{ textAlign: "center" }}>Create Product</h1>
          )}
          <Link to="/list-products">
            <h3>Back to list product</h3>
          </Link>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="ProductEdit">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {errorSubmit.type === "name" && (
                <div style={{ color: "red" }}>{errorSubmit.msg}</div>
              )}
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                min={0}
                placeholder="Enter price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></input>
              {errorSubmit.type === "price" && (
                <div style={{ color: "red" }}>{errorSubmit.msg}</div>
              )}
            </div>

            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                accept=".jpg, .jpeg, .png"
                onChange={uploadFileHandler}
                required
              ></input>
              {errorSubmit.type === "image" && (
                <div style={{ color: "red" }}>{errorSubmit.msg}</div>
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              {/* <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
              ></input> */}
              <select
                className="ProductEdit_select"
                id="category"
                onChange={handleChangeCategory}
              >
                <option value="">Category</option>
                <option value="kit" selected={category === "kit"}>
                  Kit
                </option>
                <option value="accessory" selected={category === "accessory"}>
                  Accessory
                </option>
              </select>
              {errorSubmit.type === "category" && (
                <div style={{ color: "red" }}>{errorSubmit.msg}</div>
              )}
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              ></input>
              {errorSubmit.type === "brand" && (
                <div style={{ color: "red" }}>{errorSubmit.msg}</div>
              )}
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="number"
                placeholder="Enter countInStock"
                min={0}
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              ></input>
              {errorSubmit.type === "countInStock" && (
                <div style={{ color: "red" }}>{errorSubmit.msg}</div>
              )}
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              {errorSubmit.type === "description" && (
                <div style={{ color: "red" }}>{errorSubmit.msg}</div>
              )}
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                {productId ? "Update" : "Create"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
