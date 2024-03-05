import { Link } from "react-router-dom";
import "./home.css";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <Link
          to={"/shop"}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <h1 className="hero-mess m-3">
            Step into style with Dolce's curated collection.
          </h1>

          <button className="btn btn-dark btn-lg hero-btn">
            {" "}
            Shop now{" "}
            <ArrowRightAltOutlinedIcon style={{ background: "transparent" }} />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Hero;
