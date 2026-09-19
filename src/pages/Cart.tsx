
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main>
        <section className="empty-cart">
          <p className="section-label">YOUR CART</p>

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any products to your cart yet.
          </p>

          <Link
            to="/products"
            className="cart-shop-button"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-header">
        <p className="section-label">YOUR CART</p>

        <h1>Shopping Cart</h1>

        <p>
          Review your products before checking out.
        </p>
      </section>

      <section className="cart-layout">

        {/* Cart Items */}

        <div className="cart-items">

          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h2>{item.title}</h2>

                <p>
                  ${item.price.toFixed(2)}
                </p>

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>
              </div>

              <strong className="cart-item-total">
                $
                {(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <button
            type="button"
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>

        {/* Cart Summary */}

        <aside className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>

            <strong>{totalItems}</strong>
          </div>

          <div className="summary-row">
            <span>Total</span>

            <strong>
              ${totalPrice.toFixed(2)}
            </strong>
          </div>

          <button
            type="button"
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>

          <Link
            to="/products"
            className="continue-shopping-button"
          >
            Continue Shopping
          </Link>

        </aside>

      </section>
    </main>
  );
}

export default Cart;
