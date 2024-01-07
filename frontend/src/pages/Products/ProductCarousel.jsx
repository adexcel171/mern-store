import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block sm:block ">
    {isLoading ? null : error ? (
      <Message variant="danger">
        {error?.data?.message || error.error}
      </Message>
    ) : (
      <Slider
        {...settings}
        className="w-full sm:w-full md:w-[56rem] lg:w-[50rem] xl:w-[50rem] mx-auto"
      >
        {products.map(
          ({
            image,
            _id,
            name,
            price,
            description,
            brand,
            createdAt,
            numReviews,
            rating,
            quantity,
            countInStock,
          }) => (
            <div key={_id}>
              <img
                src={image}
                alt={name}
                className="w-full flex px-4 rounded-lg object-cover h-[25rem]"
              />
  
              <div className="mt-4 flex flex-col lg:flex-row justify-between">
                <div className="lg:w-full">
                  <h2 className="text-xl lg:text-2xl font-semibold mb-2">{name}</h2>
                  <p className="text-lg lg:text-xl mb-2">$ {price}</p>
                  <p className="lg:w-full text-sm lg:text-base">
                    {description.substring(0, 170)} ...
                  </p>
                </div>
  
                <div className="flex flex-col lg:flex-row w-full lg:mt-0">
                  <div className="lg:w-full mb-4 lg:mb-0">
                    <h1 className="flex items-center mb-2 lg:mb-6">
                      <FaStore className="mr-2 text-white" /> Brand: {brand}
                    </h1>
                    <h1 className="flex items-center mb-2 lg:mb-6">
                      <FaClock className="mr-2 text-white" /> Added:{" "}
                      {moment(createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-2 lg:mb-6">
                      <FaStar className="mr-2 text-white" /> Reviews: {numReviews}
                    </h1>
                  </div>
  
                  <div className="lg:w-full mb-4 lg:mb-0">
                    <h1 className="flex items-center mb-2 lg:mb-6">
                      <FaStar className="mr-2 text-white" /> Ratings:{" "}
                      {Math.round(rating)}
                    </h1>
                    <h1 className="flex items-center mb-2 lg:mb-6">
                      <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                      {quantity}
                    </h1>
                    <h1 className="flex items-center mb-2 lg:mb-6">
                      <FaBox className="mr-2 text-white" /> In Stock:{" "}
                      {countInStock}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </Slider>
    )}
  </div>
  

  );
};

export default ProductCarousel;
