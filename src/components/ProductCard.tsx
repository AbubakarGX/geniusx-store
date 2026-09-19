
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

type ProductCardProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

function ProductCard({
  id,
  title,
  description,
  price,
  thumbnail,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const [isAdding, setIsAdding] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  function handleAddToCart() {
    if (isAdding) {
      return;
    }

    setIsAdding(true);

    setTimeout(() => {
      addToCart({
        id,
        title,
        description,
        price,
        thumbnail,
      });

      setIsAdding(false);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }, 700);
  }

  return (
    <>
      <article className="product-card">
        <img
          src={thumbnail}
          alt={title}
          className="product-image"
        />

        <div className="product-content">
          <h2>{title}</h2>

          <p>{description}</p>

          <strong className="product-price">
            ${price.toFixed(2)}
          </strong>

          <div className="product-actions">
            <Link
              to={`/products/${id}`}
              className="product-link"
            >
              View Details
            </Link>

            <button
              type="button"
              className="add-cart-button"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <span className="button-spinner"></span>
                  Adding...
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </article>

      {showMessage && (
        <div className="cart-popup">
          <span>✓</span>
          <p>Item added to cart</p>
        </div>
      )}
    </>
  );
}

export default ProductCard;
