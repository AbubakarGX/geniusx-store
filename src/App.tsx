
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteGuard from "./components/RouteGuard";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Logged-in users only */}
        <Route
          path="/checkout"
          element={
            <RouteGuard>
              <Checkout />
            </RouteGuard>
          }
        />

        {/* Logged-in users only */}
        <Route
          path="/orders"
          element={
            <RouteGuard>
              <Orders />
            </RouteGuard>
          }
        />

        {/* Admin only */}
        <Route
          path="/admin/orders"
          element={
            <RouteGuard adminOnly>
              <AdminOrders />
            </RouteGuard>
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
