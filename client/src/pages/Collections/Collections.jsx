import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../ultils/actions/productActions";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import MessageBox from "../../components/MessageBox/MessageBox";
import Product from "../../components/Product/Product";

const CollectionPage = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;
  useEffect(() => {
    dispatch(listProducts(category, "", sort));
  }, [dispatch, category, sort]);

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      {userInfo?.isAdmin ? (
        <MessageBox variant="danger">Access Denied</MessageBox>
      ) : (
        <>
          <Header />

          <h2 style={{ textAlign: "center" }}>Tất cả sản phẩm</h2>
          <div>
            <select
              className="select"
              onChange={handleChangeCategory}
              style={{ marginBottom: "1%", marginLeft: "20px" }}
            >
              <option value="" selected disabled>
                Danh mục sản phẩm
              </option>
              <option value="">Tất cả</option>
              <option value="kit">Áo đấu</option>
              <option value="accessory">Phụ kiện</option>
            </select>
            <select
              className="select"
              onChange={handleChangeSort}
              style={{ marginBottom: "1%", marginLeft: "20px" }}
            >
              <option selected disabled>
                Sắp xếp theo
              </option>
              <option value="">Mới nhất</option>
              <option value="lowest">Giá: Tăng dần</option>
              <option value="highest">Giá: Giảm dần</option>
            </select>
          </div>
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

export default CollectionPage;
