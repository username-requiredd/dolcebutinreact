import "./cart.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useCheckout } from "../../contex/Checkoutcontex";

import { useState } from "react";
import { useCart } from "../../contex/Cartcontex";
import Cartempty from "./Cartempty";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Cart = () => {
  const { cart, setCart } = useCart();
  const z = cart.map(({ id, quantity }) => ({ x: id, y: quantity }));
  const [quantity, setQuantity] = useState(z);
  const { checkout, setCheckout } = useCheckout();

  // const [isChecked, setIsChecked] = useState([]);
  const q = (id) => {
    const foundQuantity = quantity.find((value) => value.x === id);
    return foundQuantity ? foundQuantity.y : 10; // Return quantity if found, otherwise return a default value of 10
  };

  const checkOut = (id) => {
    const selectedID = parseInt(id);
    const selectedItem = cart.find(({ id }) => id === selectedID);

    if (selectedItem) {
      setCheckout((prev) => [
        ...prev,
        {
          id: selectedItem.id,
          price: selectedItem.price,
          quantity: selectedItem.quantity,
          title: selectedItem.title,
          images: selectedItem.images,
        },
      ]);
    }
  };
  const unChecked = (id) => {
    const unCheckedItem = parseInt(id);
    const newData = checkout.filter(({ id }) => id !== unCheckedItem);
    setCheckout(newData);
  };

  // console.log(isChecked);
  const calculateTotal = () => {
    const total = cart
      .map(({ price, quantity }) => price * quantity)
      .reduce((x, y) => x + y, 0);
    return total;
  };
  calculateTotal();
  const remove = (id) => {
    // console.log(id);
    const selectedItem = id;
    const search = cart.filter(({ id }) => id !== selectedItem);
    // console.log(search);
    return setCart(search);
  };

  const makePurchace = () => {
    if (checkout.length === 0) {
      toast(
        <div style={{ marginRight: "8px" }}>select an item to checkout</div>,
        {
          // style: {
          //   // width: "80%",
          //   borderRadius: "10px",
          //   background: "crimson",
          //   color: "black",
          // },
          autoClose: 1000,
        }
      );
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <ToastContainer
        style={{
          margin: "20px",
          height: "50px",
        }}
      />

      <section className="bg-light my-5">
        <div className="container">
          <div className="row">
            {/* cart */}
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your shopping cart</h4>
                  {cart && cart.length > 0 ? (
                    cart.map(({ id, images, price, quantity, title }) => (
                      <div className="row gy-3 mb-4" key={id}>
                        <div className="col-lg-5">
                          <div className="me-lg-5">
                            <input
                              id={id}
                              type="checkbox"
                              onChange={(e) =>
                                e.target.checked
                                  ? checkOut(e.target.id)
                                  : unChecked(e.target.id)
                              }
                              // checked={isChecked ? true : false}
                            />

                            <div className="d-flex">
                              <img
                                src={images}
                                className="border rounded me-3"
                                style={{ width: "96px", height: "96px" }}
                              />
                              <div className="">
                                {title}
                                {/* <p className="text-muted">{title}</p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                          <div className="">
                            <input
                              id={id}
                              type="number"
                              style={{ width: "100px" }}
                              className="me-4 cart-input"
                              value={q(id)}
                              onChange={(e) =>
                                setQuantity((prev) => [
                                  ...prev.filter((val) => val.x !== id),
                                  { x: id, y: e.target.value },
                                ])
                              }
                            />
                          </div>
                          <div className="">
                            <small className="text-muted text-nowrap">
                              {" "}
                              ${price} / per item{" "}
                            </small>
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                          <div className="float-md-end">
                            {/* <button
                              id={id}
                              className="btn btn-light border px-2 icon-hover-primary"
                            >
                              <i className="fas fa-heart fa-lg px-1 text-secondary"></i>
                            </button> */}
                            <button
                              id={id}
                              onClick={(e) => remove(parseInt(e.target.id))}
                              className="btn btn-light border d-flex align-items-center icon-hover-danger"
                            >
                              {" "}
                              Remove{" "}
                              <DeleteOutlineOutlinedIcon
                                style={{ background: "transparent" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Cartempty />
                  )}
                </div>
                {/* delivery */}
                <div class={` ${cart.length === 0 ? "d-none" : "d-block"}`}>
                  <div className="border-top pt-4 mx-4 mb-4">
                    <p>
                      <i className="fas fa-truck text-muted fa-lg"></i> Free
                      Delivery within 1-2 weeks
                    </p>
                    <p className="text-muted">
                      Enjoy free delivery on all orders! Shop now and get your
                      items delivered to your doorstep without any additional
                      cost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`col-lg-3 ${cart.length === 0 ? "d-none" : "d-block"}`}
            >
              <div class="card shadow-0 border">
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Total price:</p>
                    <p class="mb-2">${calculateTotal()}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Discount:</p>
                    <p class="mb-2 text-success">-$0</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">TAX:</p>
                    <p class="mb-2">$14.00</p>
                  </div>
                  <hr />
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Total price:</p>
                    <p class="mb-2 fw-bold">${calculateTotal() + 14}</p>
                  </div>

                  <div class="mt-3">
                    <Link
                      to={checkout.length > 0 ? "/checkout" : ""}
                      onClick={() => makePurchace()}
                      class="btn btn-success w-100 shadow-0 mb-2"
                    >
                      {" "}
                      Make Purchase{" "}
                      <PaymentsOutlinedIcon
                        style={{ background: "transparent" }}
                      />
                    </Link>
                    <Link to={"/shop"} class="btn btn-light w-100 border mt-2">
                      {" "}
                      Back to shop{" "}
                      <ArrowBackIcon style={{ background: "transparent" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <section class={` ${cart.length === 0 ? "d-none" : "d-block"}`}>
              <div className="container my-5">
                <header className="mb-4">
                  <h3>Recommended items</h3>
                </header>

                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                      <div className="mask px-2" style={{ height: "50px" }}>
                        <div className="d-flex justify-content-between">
                          <h6>
                            <span className="badge bg-danger pt-1 mt-3 ms-2">
                              New
                            </span>
                          </h6>
                          <a href="#">
                            <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                          </a>
                        </div>
                      </div>
                      <a href="#" className="">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                          className="card-img-top rounded-2"
                        />
                      </a>
                      <div className="card-body d-flex flex-column pt-3 border-top">
                        <a href="#" className="nav-link">
                          Gaming Headset with Mic
                        </a>
                        <div className="price-wrap mb-2">
                          <strong className="">$18.95</strong>
                          <del className="">$24.99</del>
                        </div>
                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                          <a href="#" className="btn btn-outline-primary w-100">
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                      <div className="mask px-2" style={{ height: "50px" }}>
                        <a href="#">
                          <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                        </a>
                      </div>
                      <a href="#" className="">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                          className="card-img-top rounded-2"
                        />
                      </a>
                      <div className="card-body d-flex flex-column pt-3 border-top">
                        <a href="#" className="nav-link">
                          Apple Watch Series 1 Sport{" "}
                        </a>
                        <div className="price-wrap mb-2">
                          <strong className="">$120.00</strong>
                        </div>
                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                          <a href="#" className="btn btn-outline-primary w-100">
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card px-4 border shadow-0">
                      <div className="mask px-2" style={{ height: "50px" }}>
                        <a href="#">
                          <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                        </a>
                      </div>
                      <a href="#" className="">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                          className="card-img-top rounded-2"
                        />
                      </a>
                      <div className="card-body d-flex flex-column pt-3 border-top">
                        <a href="#" className="nav-link">
                          Men's Denim Jeans Shorts
                        </a>
                        <div className="price-wrap mb-2">
                          <strong className="">$80.50</strong>
                        </div>
                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                          <a href="#" className="btn btn-outline-primary w-100">
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card px-4 border shadow-0">
                      <div className="mask px-2" style={{ height: "50px" }}>
                        <a href="#">
                          <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                        </a>
                      </div>
                      <a href="#" className="">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                          className="card-img-top rounded-2"
                        />
                      </a>
                      <div className="card-body d-flex flex-column pt-3 border-top">
                        <a href="#" className="nav-link">
                          Mens T-shirt Cotton Base Layer Slim fit{" "}
                        </a>
                        <div className="price-wrap mb-2">
                          <strong className="">$13.90</strong>
                        </div>
                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                          <a href="#" className="btn btn-outline-primary w-100">
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

            {/* summary */}
          </div>
        </div>
      </section>

      {/* cart + summary */}
    </>
  );
};

export default Cart;
