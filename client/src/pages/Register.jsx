import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { register } from "../actions/userActions";
import {
  Button,
  Grid,
  InputAdornment,
  Link,
  TextField,
} from "@material-ui/core";
import { validateEmail, validatePhone } from "../../src/ultils/functions";
export const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    phone: "",
    address: "",
  });

  const userRegister = useSelector((state) => state.userReducer);
  console.log(userRegister);
  const { loading, userInfo, error } = userRegister;
  console.log(loading, userInfo, error);
  let history = useHistory();

  const [isInvalid, setIsInvalid] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    fullname: false,
    phone: false,
    address: false,
  });

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
    if (error) {
      // toast.error("Tài khoản đã tồn tại", {
      //   hideProgressBar: true,
      //   closeButton: false,
      //   position: "top-center",
      //   closeOnClick: true,
      // })
      alert("Tai khoan da ton tai");
    }
  }, [userInfo, error]);

  const dispatch = useDispatch();

  const {
    username,
    email,
    password,
    confirmPassword,
    fullname,
    phone,
    address,
  } = data;

  const handleChange = (name) => (event) => {
    console.log(name, event.target.value);
    setData({ ...data, [name]: event.target.value });
    console.log(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    let validate = {
      username: !data.username ? true : false,
      email: !validateEmail(data.email) ? true : false,
      password: !data.password || data.password.length < 6 ? true : false,
      confirmPassword: data.confirmPassword !== data.password ? true : false,
      fullname: !data.fullname ? true : false,
      phone: !validatePhone(data.phone) ? true : false,
      address: !data.address ? true : false,
    };
    // console.log(validate);
    setIsInvalid(validate);
    let callApi = true;
    for (const property in validate) {
      if (validate[property] === true) callApi = false;
    }
    // console.log('callApi', callApi);
    if (callApi) {
      dispatch(register(data));
    }
  };
  return (
    <div>
      <Grid container>
        <Grid
          container
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justifyContent="center"
          style={{ padding: 10, height: "100vh" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 500,
              minWidth: 300,
              width: "100%",
            }}
          >
            <Grid container justify="center">
              <img
                src="https://thumbs.dreamstime.com/b/mobile-shop-logo-template-phone-white-background-can-used-store-service-repair-perfect-your-business-design-vector-97133721.jpg"
                width={200}
                alt="logo"
              />
            </Grid>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 500,
                minWidth: 300,
                width: "100%",
              }}
              onSubmit={onSubmit}
            >
              <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={handleChange("username")}
                autoFocus
                error={isInvalid.username ? true : false}
                helperText={
                  isInvalid.username ? "Vui lòng điền vào trường này" : ""
                }
              />
              <TextField
                label="Email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={handleChange("email")}
                error={isInvalid.email ? true : false}
                helperText={isInvalid.email ? "Email khoong hop le!" : ""}
              />
              <TextField
                label="Password"
                margin="normal"
                variant="outlined"
                value={password}
                type="password"
                onChange={handleChange("password")}
                error={isInvalid.password ? true : false}
                helperText={isInvalid.password ? "Mat khau khong hop le" : ""}
              />
              <TextField
                label="Confirm password"
                margin="normal"
                variant="outlined"
                value={confirmPassword}
                type="password"
                onChange={handleChange("confirmPassword")}
                error={isInvalid.confirmPassword ? true : false}
                helperText={
                  isInvalid.confirmPassword ? "Mat khau khong trung khop" : ""
                }
              />
              <TextField
                label="Fullname"
                margin="normal"
                variant="outlined"
                value={fullname}
                onChange={handleChange("fullname")}
                error={isInvalid.fullname ? true : false}
                helperText={
                  isInvalid.fullname ? "Vui lòng điền vào trường này" : ""
                }
              />
              <TextField
                label="Phone number"
                margin="normal"
                variant="outlined"
                value={phone}
                onChange={handleChange("phone")}
                error={isInvalid.phone ? true : false}
                helperText={isInvalid.phone ? "sdt khong hop le" : ""}
              />
              <TextField
                label="Address"
                margin="normal"
                variant="outlined"
                value={address}
                onChange={handleChange("address")}
                error={isInvalid.address ? true : false}
                helperText={
                  isInvalid.address ? "Vui lòng điền vào trường này" : ""
                }
              />
              <Button color="primary" variant="contained" type="submit">
                Register
              </Button>
              <div
                style={{ display: "flex", marginTop: "10px", fontSize: "14px" }}
              >
                <p>Already have an account?&nbsp;</p>
                <Link
                  href="/signin"
                  variant="body2"
                  style={{ fontSize: "14px" }}
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} style={{ height: "100vh" }}>
          <img
            src="https://thethaocuocsong.vn/wp-content/uploads/2021/05/saostar-e6f44968db6j0yku.jpeg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="phone-register"
          />
        </Grid>
      </Grid>
    </div>
  );
};
