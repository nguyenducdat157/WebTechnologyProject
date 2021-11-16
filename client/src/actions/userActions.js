import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/userConstants';
import { HOST_URL } from '../ultils/constants';

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await axios.post("/api/users/signin", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  }
  
  export const register = ({username, email, password, fullname, phone, address}) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { username, email, password, fullname, phone, address } });
    try {
      const body = {username, email, password, fullname, phone, address}
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${HOST_URL}/api/user/register`,
        data: body
    })
    .then(function (response) {
        console.log(response.data);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.user });
        localStorage.setItem('info', JSON.stringify(response.data.user));
        Cookie.set('token', response.data.token);
    })
    .catch(function (error) {
        console.log(error);
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    });
    } catch (error) {
        console.log(error)
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }

  }

//   export {signin, register}