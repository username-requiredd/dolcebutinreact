import { Link } from "react-router-dom";
import "./cartempty.css";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Cartempty = () => {
  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body cart">
                <div className="col-sm-12 empty-cart-cls text-center">
                  <img
                    src="https://i.imgur.com/dCdflKN.png"
                    width="130"
                    height="130"
                    className="img-fluid mb-4 mr-3"
                    alt="Empty Cart Image"
                  />
                  <p>
                    <strong>Your Cart is Empty</strong>
                  </p>
                  <p>
                    Add something to make me happy
                    <SentimentSatisfiedAltOutlinedIcon />
                  </p>
                  <Link
                    style={{ width: "100%" }}
                    to={"/shop"}
                    className="btn btn-primary mx-auto cart-btn-transform m-3"
                  >
                    Back to shop{" "}
                    <ArrowBackIcon style={{ background: "transparent" }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartempty;
