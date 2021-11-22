import "./Login.css";
const Login = () => {
  return (
    <div style={{ background: "#047baa", height: "100vh" }}>
      <div className="login_page_container">
        <div className="login_page_form">
          <form className="login-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button className="auth_button">login</button>
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
