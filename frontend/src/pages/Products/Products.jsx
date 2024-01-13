import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Rating from "./Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import ProductTabs from "./Tabs";
import HeartIcon from "./HeartIcon";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div>
        <Link
          className="text-white font-semibold hover:underline ml-4 mt-4"
          to="/"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col items-center mt-4 md:flex-row md:justify-between">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[20rem] md:w-full mb-4"
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between md:ml-4">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0">
                {product.name}
              </h2>

              <p className="text-sm md:text-base text-[#B0B0B0] mb-4">
                {product.description}
              </p>
              <p className="text-lg md:text-2xl font-extrabold">${product.price}</p>

              <div className="flex flex-col md:flex-row justify-between md:w-[20rem] mb-4">
                <div className="mb-2 md:mb-0">
                  <h1 className="flex items-center mb-2">
                    <FaStore className="mr-2 text-white" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaStar className="mr-2 text-white" /> Reviews: {product.numReviews}
                  </h1>
                </div>

                <div>
                  <h1 className="flex items-center mb-2">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap items-center">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />

                {product.countInStock > 0 && (
                  <div className="mb-2 md:mb-0">
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container mt-4 md:mt-0">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 container flex flex-col items-start justify-between md:ml-4">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Product;
