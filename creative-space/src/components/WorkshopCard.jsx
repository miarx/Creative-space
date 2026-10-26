import { Link } from "react-router-dom";

import { useState } from "react";

export default function WorkshopCard({ workshop, studio }) {
    const [imageError, setImageError] = useState(false);

    const imageSrc =
        !imageError && workshop.imageUrl
            ? workshop.imageUrl
            : "/images/placeholder.svg";

    return (
        <article className="workshop-card">
            <img
                className="workshop-card__image"
                src={imageSrc}
                alt={workshop.title}
                onError={() => setImageError(true)}
            />

            <div className="workshop-card__content">
                <h2>{workshop.title}</h2>

                <p>{workshop.description}</p>

                <p>
                    <strong>Studio:</strong> {studio?.name ?? "Unknown studio"}
                </p>

                <p>
                    <strong>Date:</strong> {workshop.date}
                </p>

                <p>
                    <strong>Difficulty:</strong> {workshop.difficulty}
                </p>

                <p>
                    <strong>Format:</strong> {workshop.format}
                </p>

                <p>
                    <strong>Price:</strong> {workshop.price} UAH
                </p>
                <Link to={`/workshops/${workshop.id}`}>
                    View Details
                </Link>
            </div>
        </article>
    );
}
