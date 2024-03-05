import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "./filter.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Filter = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="filter py-2">
        <button
          id="filter"
          onClick={() => setShow((prev) => !prev)}
          className="btn "
          type="button"
          style={{
            backgroundColor: "transparent",
            color: "black",
            border: "1px solid #4CAF50",
            borderRadius: "10px",
          }}
        >
          Filters
          <FilterAltIcon />
        </button>
      </div>
      <div
        className={`${
          show ? "d-block" : "d-none"
        } px-2 row mx-auto mb-3 categories-parent`}
      >
        <h4 className="mb-3">Categories</h4>
        <div className="col-sm-12 mx-auto d-flex flex-wrap ">
          <Link
            activeClassName="active"
            to={"/shop/tops"}
            className="text-decoration-none"
          >
            <div className="p-2 cat-div mx-1 mb-2">Tops</div>
          </Link>
          <Link to={"/shop/womens-jewellery"} className="text-decoration-none">
            <div className="p-2 cat-div mx-1 mb-2">Jewellery</div>
          </Link>
          <Link to={"sunglasses"} className="text-decoration-none">
            <div className="p-2 cat-div mx-1 mb-2">Sunglasses</div>
          </Link>
          <Link to={"/shop/mens-watches"} className="text-decoration-none">
            <div className="p-2 cat-div mx-1 mb-2">Watches</div>
          </Link>
          <Link to={"/shop/womens-bags"} className="text-decoration-none">
            <div className="p-2 cat-div mx-1 mb-2">Shoes</div>
          </Link>
          <Link to={"/shop/mens-shirts"} className="text-decoration-none">
            <div className="p-2 cat-div mx-1 mb-2">Shirts</div>
          </Link>
        </div>
      </div>

      <section id="sidebar" className="container-fluid">
        <p>
          Shop |{" "}
          <Link className="filter-link" to={"/shop"}>
            <b>All</b>
          </Link>
        </p>
        <div className="sidebar-section">
          <h4>Filters</h4>
          <div className="sidebar-category">
            <h5>Filter by Category</h5>
            <div className="category-list-container">
              <ul className="list-unstyled">
                <li>
                  <Link to={"/shop/tops"}>Tops</Link>
                </li>
                <li>
                  <Link to={"/shop/womens-dresses"}>Womens Dresses</Link>
                </li>
                <li>
                  <Link to={"/shop/womens-shoes"}>Womens Shoes</Link>
                </li>
                <li>
                  <Link to={"/shop/sunglasses"}>Sunglasses</Link>
                </li>
                <li>
                  <Link to={"/shop/skincare"}>Skincare</Link>
                </li>
                <li>
                  <Link to={"/shop/mens-shoes"}>Mens Shoes</Link>
                </li>
                <li>
                  <Link to={"/shop/mens-watches"}>Mens Watches</Link>
                </li>
                <li>
                  <Link to={"/shop/womens-watches"}>Womens Watches</Link>
                </li>
                <li>
                  <Link to={"/shop/womens-jewellery"}>Womens Jewellery</Link>
                </li>
                <li>
                  <Link to={"/shop/womens-bags"}>Womens Bags</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sidebar-price">
            <h5>Filter by Price</h5>
            <div className="price-list-container">
              <form>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    checked
                    id="price-all"
                  />
                  <label className="custom-control-label" htmlFor="price-all">
                    All Price
                  </label>
                  <span className="badge">$1000</span>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-1"
                  />
                  <label className="custom-control-label" htmlFor="price-1">
                    $0 - $100
                  </label>
                  <span className="badge">$150</span>
                </div>
                {/* Add more price range options here */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Filter;
