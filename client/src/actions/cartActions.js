import axios from "axios";
import { CART_ADD_ITEM, CART_CHANGE_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "../constants/cartConstants";
import { HOST_URL } from "../ultils/constants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${HOST_URL}/api/products/${productId}`);
      console.log(data);
      dispatch({
        type: CART_ADD_ITEM, payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          rating: data.rating,
          brand: data.brand,
          category: data.category,
          description: data.description,
          qty: Number(qty)
        }
      });
    //   const { cart: { cartItems } } = getState();
    //   console.log(getState());
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
  
    } catch (error) {
        console.log(error);
    }
}

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const { cart: { cartItems } } = getState();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const changeCart = (productId, qty) => (dispatch, getState) => {
  dispatch({ type: CART_CHANGE_ITEM, payload: {productId, qty } });

  const { cart: { cartItems } } = getState();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}

export const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}
