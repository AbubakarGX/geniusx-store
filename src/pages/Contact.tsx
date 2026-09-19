
import { useState, type FormEvent } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || !email || !message) {
      return;
    }

    setSubmitted(true);

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main>

      {/* Page Header */}
      <section className="page-header">
        <p className="section-label">CONTACT GENIUSX</p>

        <h1>Get in Touch</h1>

        <p>
          Have a question or need our services?
          Send us a message and we'll get back to you.
        </p>
      </section>


      {/* Contact Section */}
      <section className="contact-section">

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Let's Talk</h2>

          <p>
            Whether you need a website, IT support, or
            another technology service, we're here to help.
          </p>

          <div className="contact-details">
            <p>
              <strong>Email</strong>
              <br />
              info@geniusx.com
            </p>

            <p>
              <strong>Phone</strong>
              <br />
              +234 000 000 0000
            </p>

            <p>
              <strong>Location</strong>
              <br />
              Nigeria
            </p>
          </div>
        </div>


        {/* Contact Form */}
        <div className="contact-form-container">
          <h2>Send a Message</h2>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
              />
            </div>


            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
              />
            </div>


            <div className="form-group">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Enter your message"
                rows={6}
              />
            </div>


            <button
              type="submit"
              className="contact-submit-button"
            >
              Send Message
            </button>

          </form>

          {submitted && (
            <p className="success-message">
              Thank you! Your message has been submitted.
            </p>
          )}
        </div>

      </section>

    </main>
  );
}

export default Contact;
