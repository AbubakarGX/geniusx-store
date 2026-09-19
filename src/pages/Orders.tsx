
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  userId: number;
  status: string;

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };

  items: OrderItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
};

function Orders() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main>
        <section className="empty-cart">
          <p className="section-label">
            MY ORDERS
          </p>

          <h1>Please Login</h1>

          <p>
            You need to be logged in to view
            your orders.
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

  const savedOrders = localStorage.getItem(
    "geniusx-orders"
  );

  const allOrders: Order[] = savedOrders
    ? JSON.parse(savedOrders)
    : [];

  const userOrders = allOrders.filter(
    (order) => order.userId === user.id
  );

  if (userOrders.length === 0) {
    return (
      <main>
        <section className="empty-cart">
          <p className="section-label">
            MY ORDERS
          </p>

          <h1>No Orders Yet</h1>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="cart-shop-button"
          >
            View Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-header">
        <p className="section-label">
          MY ORDERS
        </p>

        <h1>My Orders</h1>

        <p>
          View your previous Geniusx orders.
        </p>
      </section>

      <section className="orders-container">
        {userOrders.map((order) => (
          <article
            className="order-card"
            key={order.id}
          >
            <div className="order-header">
              <div>
                <p className="order-label">
                  ORDER
                </p>

                <h2>
                  #{order.id}
                </h2>
              </div>

              <p>
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="order-status">
              <span>Status</span>

              <strong>
                {order.status}
              </strong>
            </div>

            <div className="order-customer">
              <h3>Delivery Information</h3>

              <p>
                {order.customer.firstName}{" "}
                {order.customer.lastName}
              </p>

              <p>
                {order.customer.email}
              </p>

              <p>
                {order.customer.phone}
              </p>

              <p>
                {order.customer.address},{" "}
                {order.customer.city},{" "}
                {order.customer.state}
              </p>
            </div>

            <div className="order-products">
              <h3>Products</h3>

              {order.items.map((item) => (
                <div
                  className="order-product"
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
            </div>

            <div className="order-total">
              <span>Total</span>

              <strong>
                ${order.totalPrice.toFixed(2)}
              </strong>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Orders;
