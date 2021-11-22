import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions/userActions";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
} from "../../constants/userConstants";
import { HOST_URL } from "../../ultils/constants";
import { validateEmail } from "../../ultils/functions";
import { useHistory } from "react-router-dom";
import "./Login.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    const body = { name, email, password };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${HOST_URL}/api/auth/register`,
      data: body,
    })
      .then(function (response) {
        console.log(response.data);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.user });
        localStorage.setItem("info", JSON.stringify(response.data.user));
        // Cookie.set("token", response.data.token);
        history.push("/");
      })
      .catch(function (error) {
        // console.log(error.response);
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
        if (error.response?.status === 400) {
          setError("Tài khoản đã tồn tại");
        } else {
          setError("Lỗi server!!!");
        }
      });
  };

  useEffect(() => {
    setError("");
    setActive(name !== "" && email !== "" && password?.length >= 6);
  }, [name, email, password]);
  return (
    <div style={{ background: "#047baa", height: "100vh" }}>
      <div className="login_page_container">
        <div className="login_page_form">
          <form className="register-form">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="email address"
              value={email}
              onChange={(e) => {
                setEmailError(false);
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {emailError && <p style={{ color: "red" }}>Email không hợp lệ</p>}
            {<p style={{ color: "red" }}>{error}</p>}
            <button
              className="auth_button"
              onClick={handleSubmit}
              disabled={!active}
            >
              Register
            </button>
            <p className="auth_message">
              Already registered? <a href="/login">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
