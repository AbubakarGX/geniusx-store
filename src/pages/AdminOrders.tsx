
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

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

function AdminOrders() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <main>
        <section className="empty-cart">
          <p className="section-label">
            ADMIN AREA
          </p>

          <h1>Access Denied</h1>

          <p>
            You do not have permission to
            access this page.
          </p>

          <Link
            to="/"
            className="cart-shop-button"
          >
            Back to Home
          </Link>
        </section>
      </main>
    );
  }

  const savedOrders = localStorage.getItem(
    "geniusx-orders"
  );

  const orders: Order[] = savedOrders
    ? JSON.parse(savedOrders)
    : [];

  function updateOrderStatus(
    orderId: number,
    newStatus: string
  ) {
    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
    );

    localStorage.setItem(
      "geniusx-orders",
      JSON.stringify(updatedOrders)
    );

    window.location.reload();
  }

  if (orders.length === 0) {
    return (
      <main>
        <section className="empty-cart">
          <p className="section-label">
            ADMIN ORDERS
          </p>

          <h1>No Orders Yet</h1>

          <p>
            Customer orders will appear here.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-header">
        <p className="section-label">
          ADMIN ORDERS
        </p>

        <h1>All Customer Orders</h1>

        <p>
          Manage orders placed by Geniusx
          customers.
        </p>
      </section>

      <section className="orders-container">
        {orders.map((order) => (
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

              <select
                value={order.status}
                onChange={(event) =>
                  updateOrderStatus(
                    order.id,
                    event.target.value
                  )
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>
              </select>
            </div>

            <div className="order-customer">
              <h3>Customer</h3>

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

export default AdminOrders;
