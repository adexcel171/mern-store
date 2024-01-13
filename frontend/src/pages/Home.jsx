import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col items-center md:flex-row md:justify-between lg:ml-20 mt-10 md:mt-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center md:text-left mb-4 md:mb-0">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-4 md:px-10 mt-4 md:mt-0"
            >
              Shop
            </Link>
          </div>

          <div className="overflow-hidden">
            <div className="flex justify-center flex-wrap mt-4">
              {data.products.map((product) => (
                <div key={product._id} className="mb-4 md:mx-2">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
