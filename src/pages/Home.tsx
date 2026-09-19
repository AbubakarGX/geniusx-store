import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
{/* Hero Section */}
<section className="hero">
  <div className="hero-content">
    <p className="hero-label">
      TECHNOLOGY & DIGITAL SOLUTIONS
    </p>

    <h1>
      Technology Solutions
      <br />
      for Your Business
    </h1>

    <p className="hero-text">
      Geniusx provides modern technology services and
      products to help individuals and businesses grow.
    </p>

    <div className="hero-buttons">
      <Link to="/services" className="btn btn-primary">
        Explore Services
      </Link>

      <Link to="/products" className="btn btn-secondary">
        View Products
      </Link>
    </div>
  </div>

  <div className="hero-image">
    <img
     src="/images/hero.jpg"
     alt="Modern technology workspace"
/>
  </div>
</section>

      {/* What We Offer */}
      <section className="offer-section">
        <div className="section-heading">
          <p className="section-label">WHAT WE OFFER</p>

          <h2>Solutions for Your Technology Needs</h2>

          <p>
            From digital services to technology products,
            Geniusx helps you solve everyday technology needs.
          </p>
        </div>

        <div className="offer-grid">
          <article className="offer-card">
            <h3>IT Services</h3>

            <p>
              Technology solutions and technical support for
              individuals and businesses.
            </p>

            <Link to="/services">Learn More →</Link>
          </article>

          <article className="offer-card">
            <h3>Technology Products</h3>

            <p>
              Explore useful technology products and
              accessories.
            </p>

            <Link to="/products">View Products →</Link>
          </article>

          <article className="offer-card">
            <h3>Professional Support</h3>

            <p>
              Get practical help with technology and digital
              solutions.
            </p>

            <Link to="/contact">Contact Us →</Link>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;