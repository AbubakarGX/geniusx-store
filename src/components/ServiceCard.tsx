
import { Link } from "react-router-dom";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
};

function ServiceCard({
  title,
  description,
  image,
}: ServiceCardProps) {
  return (
    <article className="service-card">
      <img
        src={image}
        alt={title}
        className="service-image"
      />

      <div className="service-content">
        <h2>{title}</h2>

        <p>{description}</p>

        <Link to="/contact">Get Started →</Link>
      </div>
    </article>
  );
}

export default ServiceCard;
