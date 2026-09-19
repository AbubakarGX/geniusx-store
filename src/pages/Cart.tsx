
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

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
          <p className="section-label">SHOPPING CART</p>

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any products to your cart yet.
          </p>

          <Link to="/products" className="cart-shop-button">
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-header">
        <p className="section-label">SHOPPING CART</p>

        <h1>Your Cart</h1>

        <p>
          Review your selected products before checkout.
        </p>
      </section>

      <section className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-content">
                <h2>{item.title}</h2>

                <p>{item.description}</p>

                <strong>
                  ${item.price.toFixed(2)}
                </strong>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>

                <p className="cart-subtotal">
                  Subtotal: $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="summary-row">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button className="checkout-button">
            Checkout
          </button>

          <button
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default Cart;