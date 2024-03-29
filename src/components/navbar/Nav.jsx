import { useState } from "react";
import "./nav.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, NavLink } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useCart } from "../../contex/Cartcontex";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
const Navbar = () => {
  const { cart } = useCart();
  const cartCount = cart.length;
  // const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // const handleNavbarToggle = () => {
  //   setIsNavbarOpen(!isNavbarOpen);
  // };

  return (
    <>
      <nav className="navbar navbar-expand-lg  nav shadow-sm">
        <div className="container-lg">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: "none" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to={"/"} className="navbar-brand">
            <span className="text-success" style={{ fontSize: "20px" }}>
              {" "}
              Dolce
            </span>
            <span style={{ fontSize: "20px" }}>shop</span>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " nav-link mx-2" : " nav-link mx-2"
                  }
                  to={"/shop"}
                >
                  All
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger nav-link mx-2" : " nav-link mx-2"
                  }
                  to={"/shop/tops"}
                >
                  Tops
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger nav-link mx-2" : " nav-link mx-2"
                  }
                  to={"/shop/sunglasses"}
                >
                  Sunglasses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger nav-link mx-2" : " nav-link mx-2"
                  }
                  to={"/shop/skincare"}
                >
                  Skincare
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger nav-link mx-2" : " nav-link mx-2"
                  }
                  to={"/shop/womens-bags"}
                >
                  Womens-bags
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link mx-2 dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Watches
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-danger nav-link mx-2"
                          : " nav-link mx-2"
                      }
                      to={"/shop/mens-watches"}
                    >
                      Mens-watches
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-danger nav-link mx-2"
                          : " nav-link mx-2"
                      }
                      to={"/shop/womens-watches"}
                    >
                      Womens-Watches
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
              <li className="nav-item mx-2">
                <a className="nav-link text-dark h5" href="" target="_blank">
                  <i className="fab fa-google-plus-square"></i>
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-dark h5" href="" target="_blank">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-dark h5" href="" target="_blank">
                  <i className="fab fa-facebook-square"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            <div className="cart-icon" style={{ position: "relative" }}>
              <NavLink
                to={"/cart"}
                className={({ isActive }) => (isActive ? "text-danger " : " ")}
              >
                <ShoppingCartOutlinedIcon
                  style={{ color: "#666", fontWeight: "normal" }}
                  className="mx-2"
                />
              </NavLink>
              {/* <img
                className="mx-1"
                src="/assets/images/bag.svg"
                alt=""
                style={{ width: "20px", height: "20px" }}
              /> */}
              <span
                style={{
                  position: "absolute",
                  top: "-13px",
                  right: "-0px",
                  background: "#999",
                  borderRadius: "50%",
                  padding: "2px 5px",
                  fontSize: "0.8em",
                  color: "white",
                }}
              >
                {cartCount}
              </span>
            </div>
            <Link to={"/signup"}>
              <PersonOutlineOutlinedIcon
                style={{ color: "#666", fontWeight: "normal" }}
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
