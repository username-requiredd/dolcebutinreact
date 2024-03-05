import { Link } from "react-router-dom";
import "./error.css";
const Errorpage = () => {
  return (
    <>
      <section className="page_404">
        <div className="container ">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>

                  <p>
                    the page you are looking for exists in another planet or you
                    aint cool enough to view it !
                  </p>
                  <Link
                    className="link_404"
                    to={"/shop"}
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                  >
                    {" "}
                    Go to shop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Errorpage;
