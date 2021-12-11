import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    <div className="not_found_container">
      <h1 className="not_found_h1">404</h1>
      <p style={{ fontSize: "2rem", textAlign: "center", fontWeight: "100" }}>
        Oops! Something is wrong.
      </p>
      <a className="not_found_button" href="/">
        Go back to homepage
      </a>
    </div>
  );
};

export default PageNotFound;
