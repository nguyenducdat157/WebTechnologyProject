import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL
} from "../constants/orderConstants";

import { CART_EMPTY } from "../constants/cartConstants";
import { HOST_URL } from "../ultils/constants";


export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  fetch(`${HOST_URL}/api/orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    },
    body: JSON.stringify(order)
  })
    .then(async (response) => {
      const data = await response.json();
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_EMPTY });
    localStorage.setItem("cartItems", JSON.stringify([]));
    })
    .catch((error) => {
      dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    });
}


export const listOrders = () => async (dispatch) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  fetch(`${HOST_URL}/api/orders`, {
    method: "GET",
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    },
  })
    .then(async (response) => {
      const data = await response.json();
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    })
    .catch((error) => {
      dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
    });
}

export const listMyOrders = () => async (dispatch) => {
  dispatch({ type: MY_ORDER_LIST_REQUEST });
  fetch(`${HOST_URL}/api/orders/mine`, {
    method: "GET",
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    },
  })
    .then(async (response) => {
      const data = await response.json();
      dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    })
    .catch((error) => {
      dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
    });
}

export const deliverOrder = (orderId) => async (dispatch) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  fetch(`${HOST_URL}/api/orders/accept/${orderId}`, {
    method: "PUT",
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    },
    body: {}
  })
    .then(async (response) => {
      const data = await response.json();
      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ORDER_DELIVER_FAIL, payload: error.message });
    });
};

export const payOrder = (orderId) => async (dispatch) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: orderId });
    fetch(`${HOST_URL}/api/orders/pay/${orderId}`, {
    method: "PUT",
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    },
    body: {}
    })
    .then(async (response) => {
      const data = await response.json();
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
    });
  };

export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    fetch(`${HOST_URL}/api/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    },
    })
    .then(async (response) => {
      const data = await response.json();
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
    });
  };
  
