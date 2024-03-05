import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages
import Products from "./pages/productslist/Products";
import Home from "./layouts/homelayout/HomeLayout";
import Hero from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/contact";
import SignUp from "./pages/signup/Signup";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/Checkout";
import ProductLayout from "./layouts/productlayout/Productlayout";
import ProductDetail from "./pages/productdetails/Productdetails";
import Category from "./pages/categories/Category";
import Order from "./pages/ordercomfirmation/Ordercomfirm";
import Errorpage from "./components/errorpage/Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />}>
        <Route index element={<Hero />} />
        {/* product layouts */}
        <Route path="/shop" element={<ProductLayout />}>
          <Route index element={<Products />} />
          <Route path=":url" element={<Category />} />
        </Route>
        <Route path="/details">
        <Route path=":id" element={<ProductDetail />} />
        </Route>

        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
        <Route path="*" element={<Errorpage/>}/>
        {/* <Route path="error" element={<Errorpage/>}/> */}
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
