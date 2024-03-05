import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../../components/productcard/Productcard";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useCart } from "../../contex/Cartcontex";
import renderSkeleton from "../../components/loaders/skeleton";
import Errorpage from "../../components/errorpage/Error";
const Category = () => {
  const { cart, setCart } = useCart();
  console.log(cart);
  const { url } = useParams();
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/category/${url}`
  );
  console.log(data);
  const renderSkeletonColumns = () => {
    let columns = [];
    for (let i = 0; i < 6; i++) {
      columns.push(renderSkeleton().columns);
    }
    return columns;
  };

  return (
    <>
      <div className="span mt-5 mb-3 px-2 text-bold"></div>
      <div className="">
        {loading ? (
          <div className="grid-container">{renderSkeletonColumns()}</div>
        ) : error ? (
          <Errorpage />
        ) : data.products && data.products.length > 0 ? (
          <div className="grid-container">
            {data.products.map(({ images, price, title, id }) => (
              <ProductCard
                images={images}
                price={price}
                title={title}
                key={id}
              />
            ))}
          </div>
        ) : (
          <div className="grid-container">{renderSkeletonColumns()}</div>
        )}
      </div>
    </>
  );
};

export default Category;
