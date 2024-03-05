import { Link } from "react-router-dom";
import { useCart } from "../../contex/Cartcontex";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useCheckout } from "../../contex/Checkoutcontex";
import { useState } from "react";
import { useEffect } from "react";
const Checkout = () => {
  const { cart, setCart } = useCart();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    localStorage.setItem("formdata", JSON.stringify(formData));
  }, [formData]);
  console.log(formData.name, formData.address);
  const { checkout, setCheckout } = useCheckout();
  console.log(checkout);
  const calculateTotal = () => {
    const total = checkout
      .map(({ price, quantity }) => price * quantity)
      .reduce((x, y) => x + y, 0);
    return total;
  };

  const check = () => {
    if (formData.name === "" || formData.address === "") {
      toast(
        <div>
          <span style={{ marginRight: "8px" }}></span>
          Name and address field cannot be left empty
        </div>,
        {
          autoClose: 1000,
        }
      );
    } else {
      setIsValid(true);
    }
  };

  const removeCartData = () => {
    const i = checkout.map(({ id }) => id);
    const updatedCart = cart.filter((item) => !i.includes(item.id));
    setCart(updatedCart);
    // setCheckout([]);
  };

  return (
    <>
      <ToastContainer
        style={{
          margin: "20px",
          height: "50px",
        }}
      />

      <div className="container wrapper mt-4">
        <div className="row cart-head">
          <div className="container">
            <div className="row">
              <p></p>
            </div>
            <div className="row">
              <div style={{ display: "table", margin: "auto" }}>
                <span className="step step_complete">
                  {" "}
                  <a href="#" className="check-bc">
                    Cart
                  </a>{" "}
                  <span className="step_line step_complete"> </span>{" "}
                  <span className="step_line backline"> </span>{" "}
                </span>
                <span className="step step_complete">
                  {" "}
                  <a href="#" className="check-bc">
                    Checkout
                  </a>{" "}
                  <span className="step_line "> </span>{" "}
                  <span className="step_line step_complete"> </span>{" "}
                </span>
                <span className="step_thankyou check-bc step_complete">
                  Thank you
                </span>
              </div>
            </div>
            <div className="row">
              <p></p>
            </div>
          </div>
        </div>
        <div className="row cart-body   ">
          <form
            className="form-horizontal"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="panel panel-info">
              <div className="panel-heading">
                Review Order{" "}
                <div className="pull-right">
                  <small>
                    <Link className="afix-1" to={"/cart"}>
                      Edit Cart
                    </Link>
                  </small>
                </div>
              </div>
              {/* row */}
              <div className="row   ">
                <div className="col-lg-6 col-sm-8   ">
                  <div className="panel-body">
                    {checkout.length > 0 ? (
                      checkout.map(({ images, id, price, quantity, title }) => (
                        <div className="form-group" key={id}>
                          <div className="row mx-auto">
                            <div className="col-sm-3 col-lg-3">
                              <img
                                className="img-responsive"
                                src={images}
                                alt="Product"
                                style={{ width: "100px" }}
                              />
                            </div>
                            <div className="col-sm-6 col-xs-6">
                              <div className="col-xs-12">{title}</div>
                              <div className="col-xs-12">
                                <small>
                                  Quantity:<span>{quantity}</span>
                                </small>
                              </div>
                            </div>
                            <div className="col-sm-3 col-xs-3 text-right">
                              <h6>
                                <span>$</span>
                                {price}
                              </h6>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <div className="form-group">
                        <p>Shop for items to checkout</p>
                      </div>
                    )}

                    <div className="form-group">
                      <div className="col-xs-12">
                        <strong>Subtotal</strong>
                        <div className="pull-right">
                          <span>$</span>
                          <span>{calculateTotal()}</span>
                        </div>
                      </div>
                      <div className="col-xs-12">
                        <small>Shipping</small>
                        <div className="pull-right">
                          <span>- $10</span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <hr />
                    </div>
                    <div className="form-group">
                      <div className="col-xs-12">
                        <strong>Order Total</strong>
                        <div className="pull-right">
                          <span>$</span>
                          <span>{calculateTotal() + 10}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* second col */}
                <div className="col-lg-6  col-sm-8 ">
                  {/* SHIPPING METHOD */}
                  <div className="panel panel-info  mt-4">
                    <div className="panel-heading">Address</div>
                    <div className="panel-body">
                      <div className="form-group">
                        <div className="col-md-12">
                          <h4>Shipping Address</h4>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Country:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            name="country"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-6 col-xs-12">
                          <strong>First Name:</strong>
                          <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="span1"></div>
                        <div className="col-md-6 col-xs-12">
                          <strong>Last Name:</strong>
                          <input
                            type="text"
                            name="last_name"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Address:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>City:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>State:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            name="state"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Zip / Postal Code:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            name="zip_code"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Phone Number:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            name="phone_number"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Email Address:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            name="email_address"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* SHIPPING METHOD END */}
                  {/* CREDIT CART PAYMENT */}
                  <div className="panel panel-info mt-4">
                    <div className="panel-heading">
                      <span>
                        <i className="glyphicon glyphicon-lock"></i>
                      </span>{" "}
                      Secure Payment
                    </div>
                    <div className="panel-body">
                      <small>
                        This is a mock website. You can leave this field blank
                        or just put anything.
                      </small>

                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Card Type:</strong>
                        </div>
                        <div className="col-md-12">
                          <select
                            id="CreditCardType"
                            name="CreditCardType"
                            className="form-control"
                          >
                            <option value="5">Visa</option>
                            <option value="6">MasterCard</option>
                            <option value="7">American Express</option>
                            <option value="8">Discover</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Credit Card Number:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            name="car_number"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Card CVV:</strong>
                        </div>
                        <div className="col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            name="car_code"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <strong>Expiration Date</strong>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <select className="form-control" name="">
                            <option>Month</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </select>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <select className="form-control" name="">
                            <option>Year</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <span>Pay secure using your credit card.</span>
                        </div>
                        <div className="col-md-12">
                          <ul className="cards">
                            <li className="visa hand">Visa</li>
                            <li className="mastercard hand">MasterCard</li>
                            <li className="amex hand">Amex</li>
                          </ul>
                          <div className="clearfix"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <Link
                            to={"/order"}
                            onClick={() => {
                              // check();
                              removeCartData();
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            <button className="btn btn-primary">
                              Place Order
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CREDIT CART PAYMENT END */}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-right">
                  {" "}
                  <i
                    className="fa fa-close close"
                    data-dismiss="modal"
                  ></i>{" "}
                </div>

                <div className="px-4 py-5">
                  <h5 className="text-uppercase">Jonathan Adler</h5>

                  <h4 className="mt-5 theme-color mb-5">
                    Thanks for your order
                  </h4>

                  <span className="theme-color">Payment Summary</span>
                  <div className="mb-3">
                    <hr className="new1" />
                  </div>

                  <div className="d-flex justify-content-between">
                    <span className="font-weight-bold">Ether Chair(Qty:1)</span>
                    <span className="text-muted">$1750.00</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <small>Shipping</small>
                    <small>$175.00</small>
                  </div>

                  <div className="d-flex justify-content-between">
                    <small>Tax</small>
                    <small>$200.00</small>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <span className="font-weight-bold">Total</span>
                    <span className="font-weight-bold theme-color">
                      $2125.00
                    </span>
                  </div>

                  <div className="text-center mt-5">
                    <button className="btn btn-primary">
                      Track your order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
