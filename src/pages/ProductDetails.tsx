
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  stock: number;
};

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Product details error:", error);
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

function handleAddToCart() {
  if (!product) {
    return;
  }

  addToCart(product);

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 2000);

}


  if (loading) {
    return (
      <main>
        <h1>Loading product...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>{error}</h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <h1>Product not found.</h1>
      </main>
    );
  }

  return (
    <main>
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-details">
        <div className="product-details-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-details-content">
          <p className="section-label">
            {product.category}
          </p>

          <h1>{product.title}</h1>

          <p className="product-details-description">
            {product.description}
          </p>

          <h2 className="details-price">
            ${product.price.toFixed(2)}
          </h2>

          <div className="product-info">
            <p>
              <strong>Rating:</strong> {product.rating}
            </p>

            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
          </div>

          <button
            type="button"
            className="details-cart-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </section>

      {added && (
        <div className="cart-popup">
          Item added to cart
        </div>
      )}
    </main>
  );
}

export default ProductDetails;
