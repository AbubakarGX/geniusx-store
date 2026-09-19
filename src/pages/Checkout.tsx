
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/UseAuth";

function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
    });

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
    };

    if (!firstName.trim()) {
      newErrors.firstName =
        "Please enter your first name.";
    }

    if (!lastName.trim()) {
      newErrors.lastName =
        "Please enter your last name.";
    }

    if (!email.trim()) {
      newErrors.email =
        "Please enter your email.";
    } else if (
      !email.includes("@") ||
      !email.includes(".")
    ) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (!phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (phone.length < 10) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    if (!address.trim()) {
      newErrors.address =
        "Please enter your delivery address.";
    }

    if (!city.trim()) {
      newErrors.city =
        "Please enter your city.";
    }

    if (!state.trim()) {
      newErrors.state =
        "Please enter your state.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(
      newErrors
    ).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    const order = {
      id: Date.now(),

      userId: user?.id,

      status: "Pending",

      customer: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
      },

      items: cart,

      totalItems,

      totalPrice,

      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem(
        "geniusx-orders"
      ) || "[]"
    );

    existingOrders.push(order);

    localStorage.setItem(
      "geniusx-orders",
      JSON.stringify(existingOrders)
    );

    clearCart();

    setSubmitted(true);
  }

  /*
    User must be logged in before placing
    an order.
  */
  if (!user) {
    return (
      <main>
        <section className="empty-cart">
          <p className="section-label">
            LOGIN REQUIRED
          </p>

          <h1>Please Login</h1>

          <p>
            You need to be logged in before
            placing an order.
          </p>

          <Link
            to="/login"
            className="cart-shop-button"
          >
            Login
          </Link>
        </section>
      </main>
    );
  }

  /*
    Show confirmation after successful
    order submission.
  */
  if (submitted) {
    return (
      <main>
        <section className="empty-cart">
          <p className="section-label">
            ORDER CONFIRMED
          </p>

          <h1>Thank You!</h1>

          <p>
            Your order has been submitted
            successfully.
          </p>

          <div className="confirmation-actions">
            <Link
              to="/orders"
              className="cart-shop-button"
            >
              View Orders
            </Link>

            <Link
              to="/products"
              className="continue-shopping-button"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /*
    Don't allow checkout when the cart
    is empty.
  */
  if (cart.length === 0) {
    return (
      <main>
        <section className="empty-cart">
          <p className="section-label">
            CHECKOUT
          </p>

          <h1>Your Cart is Empty</h1>

          <p>
            Add some products before
            proceeding to checkout.
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
        <p className="section-label">
          CHECKOUT
        </p>

        <h1>Complete Your Order</h1>

        <p>
          Enter your information to complete
          your order.
        </p>
      </section>

      <section className="checkout-layout">
        <div className="checkout-form-container">
          <h2>Customer Information</h2>

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="checkout-first-name">
                First Name
              </label>

              <input
                id="checkout-first-name"
                type="text"
                value={firstName}
                onChange={(event) =>
                  setFirstName(
                    event.target.value
                  )
                }
                placeholder="Enter your first name"
              />

              {errors.firstName && (
                <p className="form-error">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="checkout-last-name">
                Last Name
              </label>

              <input
                id="checkout-last-name"
                type="text"
                value={lastName}
                onChange={(event) =>
                  setLastName(
                    event.target.value
                  )
                }
                placeholder="Enter your last name"
              />

              {errors.lastName && (
                <p className="form-error">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="checkout-email">
                Email
              </label>

              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="form-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="checkout-phone">
                Phone Number
              </label>

              <input
                id="checkout-phone"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                placeholder="Enter your phone number"
              />

              {errors.phone && (
                <p className="form-error">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="checkout-address">
                Delivery Address
              </label>

              <textarea
                id="checkout-address"
                value={address}
                onChange={(event) =>
                  setAddress(
                    event.target.value
                  )
                }
                placeholder="Enter your delivery address"
                rows={4}
              />

              {errors.address && (
                <p className="form-error">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="checkout-location">
              <div className="form-group">
                <label htmlFor="checkout-city">
                  City
                </label>

                <input
                  id="checkout-city"
                  type="text"
                  value={city}
                  onChange={(event) =>
                    setCity(
                      event.target.value
                    )
                  }
                  placeholder="Enter your city"
                />

                {errors.city && (
                  <p className="form-error">
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="checkout-state">
                  State
                </label>

                <input
                  id="checkout-state"
                  type="text"
                  value={state}
                  onChange={(event) =>
                    setState(
                      event.target.value
                    )
                  }
                  placeholder="Enter your state"
                />

                {errors.state && (
                  <p className="form-error">
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="place-order-button"
            >
              Place Order
            </button>
          </form>
        </div>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <div>
                <strong>
                  {item.title}
                </strong>

                <p>
                  {item.quantity} × $
                  {item.price.toFixed(2)}
                </p>
              </div>

              <strong>
                $
                {(
                  item.price *
                  item.quantity
                ).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="summary-row">
            <span>Total Items</span>

            <strong>
              {totalItems}
            </strong>
          </div>

          <div className="summary-row">
            <span>Total</span>

            <strong>
              ${totalPrice.toFixed(2)}
            </strong>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Checkout;
