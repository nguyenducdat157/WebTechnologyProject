import axios from "axios";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL } from "../constants/productConstants";
import { HOST_URL } from "../ultils/constants";
    
    
export const listProducts = (
    category = '',
    searchKeyword = '',
    sortOrder = ''
    ) => async (dispatch) => {
        try {
          dispatch({ type: PRODUCT_LIST_REQUEST });
          const { data } = await axios.get(`
            ${HOST_URL}/api/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}
          `);
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
        } catch (error) {
          dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
        }
};

export const detailsProduct = (productId) => async (dispatch) => {
  console.log(productId);

  try {
      dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
      const {data} = await axios.get(`${HOST_URL}/api/products/${productId}`);
      dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
      dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message})
  }
}

export const saveProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post( `${HOST_URL}/api/products/${productId}/reviews`, review, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        }
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(`${HOST_URL}/api/products/${productId}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export const saveProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    if (!product._id) {
      const { data } = await axios.post(`${HOST_URL}/api/products`, product, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },  
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(`${HOST_URL}/api/products/${product._id}` , product, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
        }
      );
      console.log(product.name);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};