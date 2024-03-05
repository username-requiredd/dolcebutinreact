import "./productdetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CircularLoader from "../../components/loaders/Progressbar";
import ProductCard from "../../components/productcard/Productcard";
import { useState } from "react";
import { useCart } from "../../contex/Cartcontex";
import { useCheckout } from "../../contex/Checkoutcontex";
const ProductDetail = () => {
  const [quantity, setQuantity] = useState();
  const { cart, setCart } = useCart();
  const { checkout, setCheckout } = useCheckout();
  const { id } = useParams();
  const { data, error, loading } = useFetch(
    `https://dummyjson.com/products/${id}`
  );
  const {
    data: category,
    error: e,
    loading: lod,
  } = useFetch(`https://dummyjson.com/products/category/${data?.category}`);

  console.log(category);

  const notification = (message) => {
    return (
      <div>
        <span style={{ marginRight: "8px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              fill="#FFFFFF"
              d="M9 16.17l-3.5-3.5a.996.996 0 0 1 0-1.41l1.41-1.41a.996.996 0 0 1 1.41 0L9 12.34l4.59-4.59a.996.996 0 0 1 1.41 0l1.41 1.41c.39.39.39 1.02 0 1.41L9.41 16.17a.996.996 0 0 1-1.41 0z"
            />
          </svg>
        </span>
        {message}
      </div>
    );
  };

  const buyNow = () => {
    // const prodoctId = parseInt(e)
    setCheckout([
      {
        id: data.id,
        title: data.title,
        images: data.images[0],
        price: data.price,
        inStock: data.stock,
        quantity: quantity ? parseInt(quantity) : 1,
      },
    ]);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // console.log(checkout);
  const addToCart = (id) => {
    const productID = parseInt(id);
    const productSearch = cart.find((x) => x.id === productID);

    if (productSearch === undefined) {
      const results = category.products.find((item) => item.id === productID);

      if (results) {
        setCart((prev) => [
          ...prev,
          {
            id: results.id,
            title: results.title,
            images: results.images[0],
            price: results.price,
            quantity: quantity ? parseInt(quantity) : 1,
            instock: results.stock,
          },
        ]);
        toast(
          <div>
            <span style={{ marginRight: "8px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path
                  fill="#FFFFFF"
                  d="M9 16.17l-3.5-3.5a.996.996 0 0 1 0-1.41l1.41-1.41a.996.996 0 0 1 1.41 0L9 12.34l4.59-4.59a.996.996 0 0 1 1.41 0l1.41 1.41c.39.39.39 1.02 0 1.41L9.41 16.17a.996.996 0 0 1-1.41 0z"
                />
              </svg>
            </span>
            Added to Cart
          </div>,
          {
            // style: {
            //   width: "80%",
            //   borderRadius: "10px",
            //   background: "#4CAF50",
            //   color: "#FFFFFF",
            // },
            autoClose: 1000,
          }
        );
      }
    } else {
      toast(notification("Product already exists in cart"), {
        style: {
          // width: "80%",
          // borderRadius: "10px",
          // background: "crimson",
          // color: "#FFFFFF",
        },
        autoClose: 1000,
      });
    }
  };

  const sQ = (e) => {
    let q = parseInt(e.target.value);
    if (q === 0 || q > data.stock) {
      setQuantity(1);
    } else {
      setQuantity(e.target.value);
    }
  };

  return (
    <>
      <ToastContainer
        style={{
          margin: "20px",
          height: "50px",
          // background: "crimson",
        }}
      />

      {e ? (
        <h4> Error getting data! try checking your connection.</h4>
      ) : loading ? (
        <p>Loading</p>
      ) : data ? (
        <div className="container mt-5 mb-4 mx-auto">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-6 border-end">
                <div className="d-flex flex-column justify-content-center">
                  {data && data.images && data.images.length > 0 && (
                    <div className="main_image border">
                      <img
                        src={data.images[0]}
                        id="main_product_image"
                        width="350"
                        className="img-fluid"
                      />
                    </div>
                  )}
                  {data && data.images && data.images.length > 0 && (
                    <div className="thumbnail_images">
                      <div className="div px-1" style={{ width: "70px" }}>
                        <a href={data.images[1]}>
                          <img
                            src={data.images[1]}
                            width="70"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="div px-1" style={{ width: "70px" }}>
                        <a href={data.images[2]}>
                          <img
                            src={data.images[2]}
                            width="70"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="div px-1" style={{ width: "70px" }}>
                        <a href={data.images[3]}>
                          <img
                            src={data.images[3]}
                            width="70"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="div px-1" style={{ width: "70px" }}>
                        <img
                          src={data.thumbnail}
                          width="70"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 right-side">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{data.title}</h3>
                    <span className="heart">
                      <FavoriteBorderOutlinedIcon
                        onClick={() =>
                          toast(notification("Added to Wishlist"), {
                            autoClose: 1000,
                          })
                        }
                      />
                    </span>
                  </div>
                  <div className="mt-2 pr-3 content">
                    <p>{data.description}</p>
                  </div>
                  <h3>${data.price}</h3>
                  <span className="mt-2 mb-1">Stock:</span>
                  <span className=" text-success">{data.stock}</span>
                  <div className="ratings d-flex flex-row align-items-center">
                    <div className="d-flex flex-row star">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarHalfIcon />
                    </div>
                    <span>{data.rating}</span>
                  </div>
                  <div className="mt-5 color-container">
                    <div className="inpute">
                      <span className="fw-bold">Quantity</span>
                      <div className="input-container mt-1">
                        <input
                          onChange={(e) => sQ(e)}
                          type="number"
                          name=""
                          value={quantity}
                          placeholder="1"
                          className="input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="buttons d-flex flex-row mt-5 gap-3">
                    <Link to={"/checkout"} onClick={() => buyNow()}>
                      <button className="btn btn-outline-dark">Buy Now</button>
                    </Link>
                    <button
                      id={data.id}
                      className="btn btn-dark "
                      onClick={(e) => addToCart(e.target.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <p className={`mb-5 mx-3 like  ${loading ? "d-none" : "d-block"}`}>
        You may also like
      </p>
      {/* <div className="container grid-container">
        {category.products ?
          category.products.map(({ images, price, title, id }) =>
            id !== data.id ? (
              <ProductCard
                images={images}
                price={price}
                title={title}
                id={id}
              />
            ) : (
              null
            )
          )}
      </div> */}
      {category === null ? (
        <div>Loading Similar data...</div>
      ) : category && category.products && category.products.length > 0 ? (
        <div className="container grid-container">
          {category.products.map(({ images, price, title, id }) =>
            id !== data.id ? (
              <ProductCard
                images={images}
                price={price}
                title={title}
                id={id}
              />
            ) : null
          )}
        </div>
      ) : (
        <div>No related products found.</div>
      )}
    </>
  );
};

export default ProductDetail;
