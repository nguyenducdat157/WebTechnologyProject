import Layout from "../../components/Layout/Layout";
import Product from "../../components/Product/Product";

const CollectionPage = () => {
  return (
    <Layout>
      <h2 style={{ textAlign: "center" }}>Tất cả sản phẩm</h2>
      <div className="row" style={{ justifyContent: "center" }}>
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </Layout>
  );
};

export default CollectionPage;
