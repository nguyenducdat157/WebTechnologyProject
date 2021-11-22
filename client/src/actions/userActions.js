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
  
export const register = ({name, email, password}) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
      const body = {name, email, password }
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${HOST_URL}/api/auth/register`,
        data: body
    })
    .then(function (response) {
        console.log(response.data);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.user });
        localStorage.setItem('info', JSON.stringify(response.data.user));
        Cookie.set('token', response.data.token);
        return response.data;
    })
    .catch(function (error) {
        // console.log(error.response);
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
        return error.response.data;
    });
    } catch (error) {
        // console.log(error)
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
      return error.response.data;
    }

  }

//   export {signin, register}