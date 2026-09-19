
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Geniusx
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

<Link to="/cart" className="cart-link">
  Cart
  {totalItems > 0 && (
    <span className="cart-badge">
      {totalItems}
    </span>
  )}
</Link>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;
