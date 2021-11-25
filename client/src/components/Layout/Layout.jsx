import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="grid-container">
      <Header
        style={{ postion: "fixed", zIndex: "999", width: "100%" }}
        className="row"
      />
      <main style={{height:"calc(100vh - 100px)",overflowY:"scroll"}}>{children}</main>
      <Footer style={{postion: "fixed", zIndex: "999", width: "100%" }}/>
    </div>
  );
};

export default Layout;
