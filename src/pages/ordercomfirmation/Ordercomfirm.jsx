import { Link } from "react-router-dom";
import { useCheckout } from "../../contex/Checkoutcontex";
import { useCart } from "../../contex/Cartcontex";
import { useEffect, useState } from "react";

const Order = () => {
  const { checkout, setCheckout } = useCheckout();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formdata"));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  const calculateTotal = () => {
    const total = checkout
      .map(({ price, quantity }) => price * quantity)
      .reduce((x, y) => x + y, 0);
    return total;
  };

  const currentDate = getCurrentDate();

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="text-left logo p-2 px-5">
                <img
                  src="https://i.imgur.com/2zDU056.png"
                  width="50"
                  className="img-fluid"
                />
              </div>
              <div className="invoice p-5">
                <h5>Your order Confirmed!</h5>
                <span className="font-weight-bold d-block mt-4">
                  Hello, {formData.name}
                </span>
                <span>
                  You order has been confirmed and will be shipped in next two
                  days!
                </span>
                <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <div className="py-2">
                            <span className="d-block text-muted">
                              Order Date
                            </span>
                            <span>{currentDate}</span>
                          </div>
                        </td>
                        <td>
                          <div className="py-2">
                            <span className="d-block text-muted">Order No</span>
                            <span>MT12332345</span>
                          </div>
                        </td>
                        <td>
                          <div className="py-2">
                            <span className="d-block text-muted">Payment</span>
                            <span>
                              <img
                                src="https://img.icons8.com/color/48/000000/mastercard.png"
                                width="20"
                                className="img-fluid"
                              />
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="py-2">
                            <span className="d-block text-muted">
                              Shiping Address
                            </span>
                            <span>{formData.address}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="product border-bottom table-responsive">
                  <table className="table table-borderless">
                    <tbody>
                      {checkout.length > 0 ? (
                        checkout.map(
                          ({ images, price, id, quantity, title }) => (
                            <tr key={id}>
                              <td>
                                <img
                                  src={images}
                                  style={{ width: "100px", height: "100px" }}
                                  className=""
                                />
                              </td>
                              <td>
                                <span className="font-weight-bold">
                                  {title}
                                </span>
                                <div className="product-qty">
                                  <span className="d-block">
                                    Quantity: {quantity}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="text-right">
                                  <span className="font-weight-bold">
                                    ${price}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <h4>bqck</h4>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="row d-flex justify-content-end">
                  <div className="col-md-5">
                    <table className="table table-borderless">
                      <tbody className="totals">
                        <tr>
                          <td>
                            <div className="text-left">
                              <span className="text-muted">Subtotal</span>
                            </div>
                          </td>
                          <td>
                            <div className="text-right">
                              <span>${calculateTotal()}</span>
                            </div>
                          </td>
                        </tr>
                        <tr></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p>
                  We will be sending shipping confirmation email when the item
                  shipped successfully!
                </p>
                <p className="font-weight-bold mb-0">
                  Thanks for shopping with us!
                </p>
                <span>Dolce Team</span>
              </div>
              <div className="d-flex justify-content-between footer p-3">
                <span>{currentDate}</span>
                <Link
                  to={"/shop"}
                  onClick={() => (
                    setCheckout([]),
                    setFormData({
                      name: "",
                      address: "",
                    })
                  )}
                >
                  <button className="btn btn-primary">Back to shop</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
