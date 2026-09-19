
import ServiceCard from "../components/ServiceCard";

const services = [
  {
    id: 1,
    title: "Web Development",
    description:
      "We build modern and responsive websites for businesses.",
    image: "/images/web-development.jpg",
  },
  {
    id: 2,
    title: "IT Support",
    description:
      "We provide technical support and solutions for technology problems.",
    image: "/images/it-support.jpg",
  },
  {
    id: 3,
    title: "Digital Services",
    description:
      "We help businesses and individuals with useful digital services.",
    image: "/images/digital-services.jpg",
  },
];

function Services() {
  return (
    <main>
      <section className="page-header">
        <p className="section-label">OUR SERVICES</p>

        <h1>Technology Services</h1>

        <p>
          Explore the technology and digital services offered
          by Geniusx.
        </p>
      </section>

      <section className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </section>
    </main>
  );
}

export default Services;
