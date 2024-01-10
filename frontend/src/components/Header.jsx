import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex sm:block flex-col items-center justify-center">
  <div className="sm:block  xl:block">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
      {data.map((product) => (
        <div key={product._id} className="mb-4">
          <SmallProduct product={product} />
        </div>
      ))}
    </div>
  </div>
  <ProductCarousel />
</div>

    </>
  );
};

export default Header;
