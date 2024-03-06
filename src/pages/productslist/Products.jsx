import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../../components/productcard/Productcard";
import { useState } from "react";
import "./product.css";
import ButtonGroup from "../../components/button/Button";
import "react-toastify/dist/ReactToastify.css";
import renderSkeleton from "../../components/loaders/skeleton";
import debounce from "lodash.debounce";
const Products = () => {
  const [state, setState] = useState("");
  const [page, setPage] = useState(70);
  const [searchQuery, setSearchQuery] = useState("");
  const url = `https://dummyjson.com/products?limit=12&skip=${page}`;
  const searchUrl = `https://dummyjson.com/products/search?q=${state}`;

  const { data, error, loading } = useFetch(searchQuery ? searchUrl : url);
  const search = useFetch(searchUrl);
  console.log("search", search);
  const renderSkeletonColumns = () => {
    let columns = [];
    for (let i = 0; i < 8; i++) {
      columns.push(renderSkeleton().columns);
    }
    return columns;
  };

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setState(value);
    debouncedSearch(value);
  };
  return (
    <>
      <div className=" p-2  container-lg mt-4">
        <div className="form-group  mb-4 form-div mx-auto ">
          <input
            type="text"
            className="form-control "
            placeholder="Search..."
            value={state}
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
        <div>
          {loading ? (
            <div className="grid-container">{renderSkeletonColumns()}</div>
          ) : error ? (
            <h6>Error getting data!</h6>
          ) : data.products && data.products.length === 0 ? (
            <h6 className="mx-auto ">
              {" "}
              That products got lost in the Bermuda Triangle.
            </h6>
          ) : data && data.products ? (
            <div className="grid-container">
              {data.products.map(({ images, price, title, id }) => (
                <ProductCard
                  images={images}
                  price={price}
                  title={title}
                  id={id}
                  key={id}
                />
              ))}
            </div>
          ) : (
            <div className="grid-container">{renderSkeletonColumns()}</div>
          )}
        </div>
        <div
          className={`${
            searchQuery ? "d-none" : "d-flex justify-content-center"
          } align-items-center`}
        >
          <div>
            <ButtonGroup setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
