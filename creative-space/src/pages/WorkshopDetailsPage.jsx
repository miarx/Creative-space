import { Link, useParams } from "react-router-dom";
import { useData } from "../hooks/useData";

function WorkshopDetailsPage() {
    const { id } = useParams();
    const { state } = useData();

    const workshop = state.workshops.find(
        (item) => item.id === Number(id)
    );

    if (!workshop) {
        return (
            <section className="workshop-details">
                <h1>Workshop not found</h1>
                <Link to="/workshops">
                    Back to Workshops
                </Link>
            </section>
        );
    }

    const studio = state.studios.find(
        (item) => item.id === workshop.studioId
    );

    return (
        <section className="workshop-details">
            <h1>{workshop.title}</h1>

            <p>{workshop.description}</p>

            <p><strong>Studio:</strong> {studio?.name ?? "Unknown studio"}</p>
            <p><strong>Date:</strong> {workshop.date}</p>
            <p><strong>Duration:</strong> {workshop.duration} minutes</p>
            <p><strong>Difficulty:</strong> {workshop.difficulty}</p>
            <p><strong>Format:</strong> {workshop.format}</p>
            <p><strong>Price:</strong> {workshop.price} UAH</p>
            <p><strong>Maximum participants:</strong> {workshop.maxParticipants}</p>
            <p>
                <strong>Availability:</strong>{" "}
                {workshop.isAvailable ? "Available" : "Unavailable"}
            </p>

            <Link to="/workshops">
                Back to Workshops
            </Link>
        </section>
    );
}

export default WorkshopDetailsPage;