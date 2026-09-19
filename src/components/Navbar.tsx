
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Geniusx
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link
            to="/cart"
            className="cart-link"
          >
            Cart

            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to="/orders"
                className="nav-account-link"
              >
                My Orders
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin/orders"
                  className="nav-account-link"
                >
                  Admin Orders
                </Link>
              )}

              <span className="nav-user">
                Hi, {user.firstName}
              </span>

              <button
                type="button"
                className="nav-logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-auth-link"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-register-link"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
