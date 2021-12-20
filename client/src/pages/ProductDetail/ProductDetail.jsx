import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  detailsProduct,
  saveProductReview,
} from "../../actions/productActions";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MessageBox from "../../components/MessageBox/MessageBox";
import Rating from "../../components/Rating/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../../constants/productConstants";
import { listDarkComment } from "../../ultils/constants";
import "./ProductDetail.css";
const prevLink = "http://localhost:5000/public/";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;
  const history = useHistory();

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;

  console.log(product);

  useEffect(() => {
    if (productSaveSuccess) {
      window.alert("Đánh giá sản phẩm thành công");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, productSaveSuccess]);
  const addToCartHandler = () => {
    // props.history.push(`/cart/${productId}?qty=${qty}`);
    history.push({
      pathname: "/cart",
      state: {
        productId,
        qty,
      },
    });
  };

  const checkDarkComment = (comment) => {
    let check = true;
    listDarkComment.every((word) => {
      if (comment.toLowerCase().includes(word)) {
        check = false;
        return false;
      }
      return true;
    });
    return check;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      if (!checkDarkComment(comment)) {
        alert("Bình luận chứa cụm từ phản cảm hoặc không phù hợp");
        return;
      }
      dispatch(
        saveProductReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Bạn chưa đánh giá hoặc bình luận");
    }
  };

  return (
    <>
      {userInfo?.isAdmin ? (
        <MessageBox variant="danger">Access Denied</MessageBox>
      ) : (
        <div className="grid-container">
          <Header />
          <main>
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>Error</p>
              ) : (
                <div>
                  <div
                    style={{ alignItems: "flex-start" }}
                    className="product_detail_row"
                  >
                    <div className="col-2">
                      <img
                        style={{ width: "100%" }}
                        src={prevLink + product.image}
                        alt={product.name}
                      ></img>
                    </div>
                    <div className="col-1">
                      <ul>
                        <li>
                          <h1>{product.name}</h1>
                        </li>
                        <li>
                          <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}
                          ></Rating>
                        </li>
                        <li>Pirce : ${product.price}</li>
                        <li>
                          Description:
                          <p>{product.description}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-1">
                      <div className="product_detail_card product_detail_card_body">
                        <ul>
                          <li>
                            <div
                              className="product_detail_row"
                              style={{ marginBottom: "10px" }}
                            >
                              <div style={{ fontSize: "16px" }}>Price</div>
                              <div style={{ fontSize: "2rem" }}>
                                ${product.price}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div
                              className="product_detail_row"
                              style={{ marginBottom: "10px" }}
                            >
                              <div style={{ fontSize: "16px" }}>Status</div>
                              <div>
                                {product.countInStock > 0 ? (
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      color: "#20a020",
                                    }}
                                  >
                                    In Stock
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      color: "#a02020",
                                    }}
                                  >
                                    Unavailable
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                          {product.countInStock > 0 && (
                            <>
                              <li>
                                <div
                                  className="product_detail_row"
                                  style={{ marginBottom: "10px" }}
                                >
                                  <div style={{ fontSize: "16px" }}>Qty</div>
                                  <div>
                                    <select
                                      value={qty}
                                      onChange={(e) => setQty(e.target.value)}
                                      className="product_detail_select"
                                    >
                                      {[
                                        ...Array(product.countInStock).keys(),
                                      ].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <button
                                  onClick={addToCartHandler}
                                  className="product_detail_button"
                                >
                                  Add to Cart
                                </button>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 id="reviews">Reviews</h2>
                    {product.reviews.length === 0 && (
                      <h2>There is no review</h2>
                    )}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ul style={{ width: "100%", padding: "0 1rem" }}>
                        {product.reviews.map((review) => (
                          <li key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating rating={review.rating} caption=" "></Rating>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </li>
                        ))}
                        <li>
                          {userInfo ? (
                            <form
                              className="product_detail_form"
                              onSubmit={submitHandler}
                            >
                              <div>
                                <h2>Write a customer review</h2>
                              </div>
                              <div>
                                <label htmlFor="rating">Rating</label>
                                <select
                                  id="rating"
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                  className="product_detail_select"
                                >
                                  <option value="">Select...</option>
                                  <option value="1">1- Poor</option>
                                  <option value="2">2- Fair</option>
                                  <option value="3">3- Good</option>
                                  <option value="4">4- Very good</option>
                                  <option value="5">5- Excelent</option>
                                </select>
                              </div>
                              <div>
                                <label htmlFor="comment">Comment</label>
                                <textarea
                                  id="comment"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                              </div>
                              <div>
                                <label />
                                <button
                                  type="submit"
                                  className="product_detail_button"
                                >
                                  Submit
                                </button>
                              </div>
                              <div>
                                {/* {loadingReviewCreate && <LoadingBox></LoadingBox>} */}
                                {/* {errorReviewCreate && (
                        <h2 style={{ color: "red" }}>{errorReviewCreate}</h2>
                      )} */}
                              </div>
                            </form>
                          ) : (
                            <h2>
                              Please <Link to="/login">Sign In</Link> to write a
                              review
                            </h2>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
