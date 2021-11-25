import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import "./ProductList.css"
export default function Productlist(props){
     const loading = 0, error = 0;
     return(
        <div>
            <div className="ProductList-row">
                <h1>Products</h1>
                <button type="button" className="ProductList-button ProductList-primary">
                    Create Product
                </button>
            </div>
            
            {loading?(
                <LoadingBox></LoadingBox>
            ) : error? (
                <MessageBox variant="danger">{error}</MessageBox>
            ):(
                <>
                    <table className="ProductList-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>619e05b46afcf9202c1dabec</td>
                                <td>Áo thi đấu CLB Chelsea</td>
                                <td>150.000</td>
                                <td>Áo</td>
                                <td>2021-2022</td>
                                <td>
                                    <button
                                    type="button"
                                    className="ProductList-button small">
                                    Edit
                                    </button>
                                    <button
                                    type="button"
                                    className="ProductList-button small"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>619e05b46afcf9202c1dabec</td>
                                <td>Áo thi đấu CLB Chelsea</td>
                                <td>150.000</td>
                                <td>Áo</td>
                                <td>2021-2022</td>
                                <td>
                                    <button
                                    type="button"
                                    className="ProductList-button small">
                                    Edit
                                    </button>
                                    <button
                                    type="button"
                                    className="ProductList-button small"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>619e05b46afcf9202c1dabec</td>
                                <td>Áo thi đấu CLB Chelsea</td>
                                <td>150.000</td>
                                <td>Áo</td>
                                <td>2021-2022</td>
                                <td>
                                    <button
                                    type="button"
                                    className="ProductList-button small">
                                    Edit
                                    </button>
                                    <button
                                    type="button"
                                    className="ProductList-button small"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>619e05b46afcf9202c1dabec</td>
                                <td>Áo thi đấu CLB Chelsea</td>
                                <td>150.000</td>
                                <td>Áo</td>
                                <td>2021-2022</td>
                                <td>
                                    <button
                                    type="button"
                                    className="ProductList-button small">
                                    Edit
                                    </button>
                                    <button
                                    type="button"
                                    className="ProductList-button small"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>619e05b46afcf9202c1dabec</td>
                                <td>Áo thi đấu CLB Chelsea</td>
                                <td>150.000</td>
                                <td>Áo</td>
                                <td>2021-2022</td>
                                <td>
                                    <button
                                    type="button"
                                    className="ProductList-button small">
                                    Edit
                                    </button>
                                    <button
                                    type="button"
                                    className="ProductList-button small"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>619e05b46afcf9202c1dabec</td>
                                <td>Áo thi đấu CLB Chelsea</td>
                                <td>150.000</td>
                                <td>Áo</td>
                                <td>2021-2022</td>
                                <td>
                                    <button
                                    type="button"
                                    className="ProductList-button small">
                                    Edit
                                    </button>
                                    <button
                                    type="button"
                                    className="ProductList-button small"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>619e05b46afcf9202c1dabec</td>
                                <td>Áo thi đấu CLB Chelsea</td>
                                <td>150.000</td>
                                <td>Áo</td>
                                <td>2021-2022</td>
                                <td>
                                    <button
                                    type="button"
                                    className="ProductList-button small">
                                    Edit
                                    </button>
                                    <button
                                    type="button"
                                    className="ProductList-button small"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>619e05b46afcf9202c1dabec</td>
                                <td>Áo thi đấu CLB Chelsea</td>
                                <td>150.000</td>
                                <td>Áo</td>
                                <td>2021-2022</td>
                                <td>
                                    <button
                                    type="button"
                                    className="ProductList-button small">
                                    Edit
                                    </button>
                                    <button
                                    type="button"
                                    className="ProductList-button small"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <div className="ProductList-row ProductList-center ProductList-pagination">
                        <Link>
                            1
                        </Link>
                        <Link>
                            2
                        </Link>
                    </div>
                </>
            )}
        </div>
     );
}