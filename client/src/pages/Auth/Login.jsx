import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signin } from "../../actions/userActions";
import { validateEmail } from "../../ultils/functions";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [errorAPI, setErrorAPI] = useState("");
  const [emailError, setEmailError] = useState(false);
  const userSignin = useSelector((state) => state.userReducer);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) history.push("/admin");
      else history.push("/");
      return;
    }

    if (error) {
      setErrorAPI("Mật khẩu hoặc email không đúng");
    }
  }, [userSignin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    dispatch(signin(email, password));
  };

  useEffect(() => {
    setErrorAPI("");
    setActive(email !== "" && password?.length >= 6);
  }, [email, password]);

  return (
    <div style={{ background: "#047baa", height: "100vh" }}>
      <div className="login_page_container">
        <div className="login_page_form">
          <form className="login-form">
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
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
            {<p style={{ color: "red" }}>{errorAPI}</p>}
            <button
              className="auth_button"
              onClick={handleSubmit}
              disabled={!active}
            >
              login
            </button>
            <p className="auth_message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
