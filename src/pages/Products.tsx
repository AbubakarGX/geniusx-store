
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const categories = [
      "smartphones",
      "laptops",
      "tablets",
      "mobile-accessories",
    ];

    Promise.all(
      categories.map((category) =>
        fetch(
          `https://dummyjson.com/products/category/${category}`
        ).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }

          return response.json();
        })
      )
    )
      .then((results) => {
        const allProducts = results.flatMap(
          (result) => result.products
        );

        setProducts(allProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Product fetch error:", error);

        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  function handleSearch() {
    setSearchTerm(search);
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <main>
        <h1>Loading products...</h1>
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

  return (
    <main>
      <section className="page-header">
        <p className="section-label">OUR PRODUCTS</p>

        <h1>Technology Products</h1>

        <p>
          Explore smartphones, laptops, tablets, and
          technology accessories available from Geniusx.
        </p>
      </section>

      {/* Search */}
      <section className="product-search">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />

          <button
            type="submit"
            className="search-button"
          >
            Search
          </button>
        </form>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <button
          type="button"
          className={category === "all" ? "active" : ""}
          onClick={() => setCategory("all")}
        >
          All
        </button>

        <button
          type="button"
          className={category === "smartphones" ? "active" : ""}
          onClick={() => setCategory("smartphones")}
        >
          Smartphones
        </button>

        <button
          type="button"
          className={category === "laptops" ? "active" : ""}
          onClick={() => setCategory("laptops")}
        >
          Laptops
        </button>

        <button
          type="button"
          className={category === "tablets" ? "active" : ""}
          onClick={() => setCategory("tablets")}
        >
          Tablets
        </button>

        <button
          type="button"
          className={
            category === "mobile-accessories" ? "active" : ""
          }
          onClick={() => setCategory("mobile-accessories")}
        >
          Accessories
        </button>
      </section>

      {/* Products */}
      <section className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        ))}
      </section>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <p className="no-products">
          No products found.
        </p>
      )}
    </main>
  );
}

export default Products;
