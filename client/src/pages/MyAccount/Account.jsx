import React from "react";
import "./Account.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
// import { detailsUser, updateUser } from "../actions/userActions";
// import { USER_UPDATE_RESET } from "../constants/userConstants";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { HOST_URL } from "../../ultils/constants";
import { USER_SIGNIN_SUCCESS } from "../../constants/userConstants";
import { validateEmail } from "../../ultils/functions";
import { logout } from "../../actions/userActions";
export default function AccountScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ err: false, msg: "" });
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;
  const [changePassword, setChangePassword] = useState(false);
  const dispatch = useDispatch();
  const [curPas, setCurPass] = useState("");
  const [newPas, setNewPas] = useState("");
  const [confirmPas, setConfirmPas] = useState("");
  const [curPasError, setCurPassError] = useState({ err: false, msg: "" });
  const [newPasError, setNewPasError] = useState({ err: false, msg: "" });
  const [confimrPasError, setConfirmPassError] = useState({
    err: false,
    msg: "",
  });

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo?._id) {
      props.history.push("/login");
    }
  }, [userInfo]);

  const UpdateInfo = async () => {
    if (!validateEmail(email)) {
      setEmailError({ err: true, msg: "Email invalid!" });
      return;
    }
    setEmailError({ err: false, msg: "" });
    const body = { name, email };
    try {
      const { data } = await axios.put(
        `${HOST_URL}/api/users/${userInfo._id}`,
        body,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log(data);
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("info", JSON.stringify(data));
    } catch (error) {
      if (error?.response?.status === 400) {
        setEmailError({ err: true, msg: "Email ready existed!" });
      } else {
        alert("Something went wrong!");
      }
    }
  };

  const hangleChangePass = async () => {
    if (curPas?.length < 6) {
      setCurPassError({
        err: true,
        msg: "Current password must be at least 6 characters",
      });
      setNewPasError({ err: false, msg: "" });
      setConfirmPassError({ err: false, msg: "" });
      return;
    }

    if (newPas?.length < 6) {
      setNewPasError({
        err: true,
        msg: "New password must be at least 6 characters",
      });
      setCurPassError({ err: false, msg: "" });
      setConfirmPassError({ err: false, msg: "" });
      return;
    }

    if (newPas === curPas) {
      setNewPasError({
        err: true,
        msg: "New password must be different current password",
      });
      setCurPassError({ err: false, msg: "" });
      setConfirmPassError({ err: false, msg: "" });
      return;
    }

    if (confirmPas?.length < 6) {
      setConfirmPassError({
        err: true,
        msg: "Confirm password must be at least 6 characters",
      });
      setNewPasError({ err: false, msg: "" });
      setCurPassError({ err: false, msg: "" });
      return;
    }

    if (confirmPas !== newPas) {
      setConfirmPassError({
        err: true,
        msg: "Confirm password not match new passord",
      });
      setNewPasError({ err: false, msg: "" });
      setCurPassError({ err: false, msg: "" });
      return;
    }

    setCurPassError({ err: false, msg: "" });
    setNewPasError({ err: false, msg: "" });
    setConfirmPassError({ err: false, msg: "" });

    const body = { current_password: curPas, new_password: newPas };
    try {
      const { data } = await axios.put(
        `${HOST_URL}/api/users/change-password/${userInfo._id}`,
        body,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log(data);
      dispatch(logout());
      props.history.push("/");
    } catch (error) {
      if (error?.response?.status === 401) {
        setCurPassError({ err: true, msg: "Current password invalid!" });
      } else {
        alert("Something went wrong!");
      }
    }
  };
  return (
    <div>
      <Header />
      <button
        className="button_signout profile_button_primary"
        onClick={(e) => {
          dispatch(logout());
          props.history.push("/");
        }}
      >
        Sign Out
      </button>
      <form className="profile_form">
        <div>
          <h1>User Profile</h1>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            className="profile_input"
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="profile_input"
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          {emailError.err && (
            <div style={{ color: "red" }}>{emailError.msg}</div>
          )}
        </div>
        <div>
          <button
            className="profile_input profile_button_primary"
            onClick={(e) => {
              e.preventDefault();
              UpdateInfo();
            }}
          >
            Update
          </button>
        </div>
        <div
          onClick={() => {
            setChangePassword(!changePassword);
          }}
          style={{ cursor: "pointer", marginTop: "30px" }}
        >
          <h3>Change Password</h3>
        </div>
        {changePassword && (
          <>
            <div>
              <label htmlFor="password">Current Password</label>
              <input
                className="profile_input"
                id="password"
                type="password"
                placeholder="Enter current password"
                value={curPas}
                onChange={(e) => {
                  setCurPass(e.target.value);
                }}
              ></input>
              {curPasError.err && (
                <div style={{ color: "red" }}>{curPasError.msg}</div>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword">New Password</label>
              <input
                className="profile_input"
                id="confirmPassword"
                type="password"
                placeholder="Enter new password"
                value={newPas}
                onChange={(e) => {
                  setNewPas(e.target.value);
                }}
              ></input>
              {newPasError.err && (
                <div style={{ color: "red" }}>{newPasError.msg}</div>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="profile_input"
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                value={confirmPas}
                onChange={(e) => {
                  setConfirmPas(e.target.value);
                }}
              ></input>
              {confimrPasError.err && (
                <div style={{ color: "red" }}>{confimrPasError.msg}</div>
              )}
            </div>
            <div>
              <button
                className="profile_input profile_button_primary"
                onClick={(e) => {
                  e.preventDefault();
                  hangleChangePass();
                }}
              >
                Change Password
              </button>
            </div>
          </>
        )}
      </form>
      <Footer />
    </div>
  );
}
