import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import "./productcard.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductCard = ({ images, price, title, id }) => {
  return (
    <>
      <Link
        to={`/details/${id}`}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <div className="grid-item ">
          <img src={images[0]} alt="" className="" style={{ width: "100%" }} />
          <div className="grid-product-details px-1">
            <span className="product-title">{title}</span> <br />
            <div className="act d-flex align-items-center justify-content-between">
              <span className="product-price mb-1">${price}</span>
              <span>
                {/* <ShoppingCartOutlinedIcon className="shop-icon" /> */}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
