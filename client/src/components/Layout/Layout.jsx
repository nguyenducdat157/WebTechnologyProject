import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="grid-container">
      <Header
        style={{ postion: "fixed", zIndex: "999", width: "100%" }}
        className="row"
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
