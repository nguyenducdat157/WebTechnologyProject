import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./Product.css";
const Product = () => {
  const product = {
    _id: "1234",
    image:
      "https://images.footballfanatics.com/chelsea/chelsea-home-stadium-shirt-2021-22-kids_ss4_p-12056141+u-11omr3uqnmj7k6cr89mb+v-73b0d722e9ff46d7a5044a3c8064e0da.jpg?_hv=1&w=900",
    name: "Chelsea Kit",
    rating: 3,
    numReviews: 100,
    price: 200,
  };
  return (
    <div key={product._id} className="product_cart">
      <Link to={`/product/${product?._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="product__card__body">
        <Link to={`/product/${product?._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="product__price">${product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
