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
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const url = `https://dummyjson.com/products?limit=0&skip=${page}`;
  const searchUrl = `https://dummyjson.com/products/search?q=${state}`;

  const { data, error, loading } = useFetch(searchQuery ? searchUrl : url);
  const categories = [
    "beauty",
    "tops",
    "mens-shoes",
    "skin-care",
    "mens-watches",
    "sunglasses",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-bags",
    "womens-watches",
    "fragrances",
  ];

  const filteredData =
    data && data.products
      ? data.products.filter(({ category }) => categories.includes(category))
      : [];

  console.log("categories:", filteredData);
  const search = useFetch(searchUrl);
  // console.log("search", search);
  console.log(data);
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
          ) : data.products && filteredData.length === 0 ? (
            <h6 className="mx-auto ">
              {" "}
              That products got lost in the Bermuda Triangle.
            </h6>
          ) : data && filteredData ? (
            <div className="grid-container">
              {filteredData.map(({ images, price, title, id }) => (
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
          <div>{/* <ButtonGroup setPage={setPage} /> */}</div>
        </div>
      </div>
    </>
  );
};

export default Products;
