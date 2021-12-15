import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MessageBox from "../components/MessageBox/MessageBox";
import Product from "../components/Product/Product";

const SearchPage = (props) => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  console.log(props.match.params.key);
  useEffect(() => {
    dispatch(listProducts("", props.match.params.key, ""));
  }, [dispatch, props.match.params.key]);
  return (
    <>
      {userInfo?.isAdmin ? (
        <MessageBox variant="danger">Access Denied</MessageBox>
      ) : (
        <>
          <Header />
          <h2 style={{ textAlign: "center" }}>Tìm kiếm</h2>
          <div
            className="row"
            style={{ justifyContent: "center", minHeight: "83vh" }}
          >
            {products?.length ? (
              products?.map((product) => {
                // console.log(product);
                return <Product key={product._id} product={product} />;
              })
            ) : (
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Không có sản phẩm nào
              </p>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default SearchPage;
