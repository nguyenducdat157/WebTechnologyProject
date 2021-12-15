import axios from "axios";
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
} from "../constants/orderConstants";

import { CART_EMPTY } from "../constants/cartConstants";
import { HOST_URL } from "../ultils/constants";


export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    console.log(order);
    const { data } = await axios.post(`${HOST_URL}/api/orders`, order, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_EMPTY });
    localStorage.setItem("cartItems", JSON.stringify([]));
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}


export const listOrders = () => async (dispatch) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get(`${HOST_URL}/api/orders`, {
      headers: {   
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { data } = await axios.get(`${HOST_URL}/api/orders/mine`, {
      headers: {   
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}
