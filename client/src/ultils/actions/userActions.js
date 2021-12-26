import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/userConstants';
import { HOST_URL } from '../constants';

/*
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
*/

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    fetch(`${HOST_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(async (response) => {
        const data = await response.json();
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.user });
        localStorage.setItem('info', JSON.stringify(data.user))
        localStorage.setItem('token', JSON.stringify(data.token))
      })
      .catch((error) => {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
      });
  }
  
// export const register = ({name, email, password}) => async (dispatch) => {
//     dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
//     try {
//       const body = {name, email, password }
//       axios({
//         method: 'post',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         url: `${HOST_URL}/api/auth/register`,
//         data: body
//     })
//     .then(function (response) {
//         console.log(response.data);
//         dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.user });
//         localStorage.setItem('info', JSON.stringify(response.data.user));
//         localStorage.setItem('token', JSON.stringify(response.data.token));
//         return response.data;
//     })
//     .catch(function (error) {
//         // console.log(error.response);
//         dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
//         return error.response.data;
//     });
//     } catch (error) {
//         // console.log(error)
//       dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
//       return error.response.data;
//     }
//   }


 export const listUser = () => async (dispatch) => {
    dispatch({ type: USER_LIST_REQUEST });
    fetch(`${HOST_URL}/api/users/`, {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
    })
      .then(async (response) => {
        const data = await response.json();
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
      })
      .catch((error) => {
        dispatch({ type: USER_LIST_FAIL, payload: error.message });
      });
  }


export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  try {
    const { data } = await axios.delete(`${HOST_URL}/api/users/admin/${userId}`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error)
    dispatch({ type: USER_DELETE_FAIL, payload: error.message });
  }
};


  export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("info");
    dispatch({ type: USER_LOGOUT })
  }
//   export {signin, register}