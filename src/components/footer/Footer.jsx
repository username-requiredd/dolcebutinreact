import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className=" footer py-4 border">
      <div className="container footer-top">
        <div className=" form-div text-center mx-auto">
          <small>Subscribe to our emails</small>
          <form>
            <div className="form-group mb-0 mt-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
          </form>
        </div>
        <hr className="mt-3 mb-3" />

        <div className=" text-start text-md-right">
          <small className="mb-0">&copy;Renzel 2024 </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
