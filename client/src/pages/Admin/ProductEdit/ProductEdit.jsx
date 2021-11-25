import React, { useEffect, useState } from 'react';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import "./ProductEdit.css";
export default function Productedit(){
    const loading = 0, error = 0;
    const productId = "619f40f787eb3425bc3f6aa0";
    const name = "Ao da bong";
    const price = "500.000VND";
    const category = "Ao";
    const brand = "2020-2021";
    const countInStock = 50;
    const description = "";

    return (
        <div>
            <form className="ProductEdit-form">
            <div>
                <h1>Edit Product {productId}</h1>
            </div>
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
            <>
                <div className="ProductEdit">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Enter name" value={name} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="text"
                        placeholder="Enter price"
                        value={price}
                    ></input>
                </div>
                <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
            </>
            )}
            </form>
        </div>
    );
}