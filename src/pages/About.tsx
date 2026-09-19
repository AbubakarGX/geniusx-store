
function About() {
  return (
    <main className="about-page">

      {/* About Header */}
      <section className="about-header">
        <p className="section-label">ABOUT GENIUSX</p>

        <h1>Technology Solutions That Help You Grow</h1>

        <p>
          Geniusx provides technology services and products
          that help individuals and businesses solve their
          technology needs.
        </p>
      </section>


      {/* What We Do */}
      <section className="about-section">
        <h2>What We Do</h2>

        <p>
          We provide web development, IT support, digital
          services, and technology products.
        </p>
      </section>


      {/* Our Goal */}
      <section className="about-section">
        <h2>Our Goal</h2>

        <p>
          Our goal is to provide useful and reliable technology
          solutions for our customers.
        </p>
      </section>


      {/* Our Services */}
      <section>
        <div className="section-heading">
          <p className="section-label">OUR FOCUS</p>

          <h2>What Geniusx Focuses On</h2>

          <p>
            We focus on practical technology solutions that
            make everyday work easier.
          </p>
        </div>

        <div className="about-grid">

          <article className="about-card">
            <h2>Web Development</h2>

            <p>
              Building modern and responsive websites for
              individuals and businesses.
            </p>
          </article>

          <article className="about-card">
            <h2>IT Support</h2>

            <p>
              Helping customers solve technical problems and
              get more from their technology.
            </p>
          </article>

        </div>
      </section>

    </main>
  );
}

export default About;
