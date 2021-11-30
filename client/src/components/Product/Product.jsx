import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./Product.css";
const prevLink = "http://localhost:5000/public/";
const Product = (props) => {
  const { product } = props;
  console.log(product);
  return (
    <div key={product._id} className="product_cart">
      <Link to={`/product/${product?._id}`}>
        <img
          width="378"
          height="378"
          className="medium"
          src={prevLink + product.image}
          alt={product.name}
        />
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
