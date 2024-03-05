import { Outlet } from "react-router-dom";
import { CartProvider } from "../../contex/Cartcontex";
import { CheckoutProvider } from "../../contex/Checkoutcontex";
import "./homelayout.css";
import Navbar from "../../components/navbar/Nav";
import Footer from "../../components/footer/Footer";
const Home = () => {
  return (
    <>
      <CheckoutProvider>
        <CartProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </CartProvider>
      </CheckoutProvider>
    </>
  );
};

export default Home;
