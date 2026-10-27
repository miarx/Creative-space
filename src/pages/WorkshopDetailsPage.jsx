
import { Link, useNavigate, useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { ACTION_TYPES } from "../context/actionTypes";

function WorkshopDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state, dispatch } = useData();

    const workshop = state.workshops.find(
        (item) => item.id === Number(id)
    );

    if (!workshop) {
        return (
            <section className="workshop-details-page">
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

    const workshopMaterials = state.materials.filter(
        (material) => workshop.materialIds?.includes(material.id)
    );

    const handleDelete = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${workshop.title}"?`
        );

        if (!confirmed) {
            return;
        }

        dispatch({
            type: ACTION_TYPES.ITEM_DELETED,
            payload: workshop.id
        });

        navigate("/workshops");
    };

    return (
        <section className="workshop-details-page">

            <div className="workshop-details__layout">

                <div className="workshop-details__info">
                    <h1>{workshop.title}</h1>

                    <p>{workshop.description}</p>

                    <p>
                        <strong>Studio:</strong>{" "}
                        {studio?.name ?? "Unknown studio"}
                    </p>

                    <p>
                        <strong>Date:</strong> {workshop.date}
                    </p>

                    <p>
                        <strong>Duration:</strong>{" "}
                        {workshop.duration} minutes
                    </p>

                    <p>
                        <strong>Difficulty:</strong>{" "}
                        {workshop.difficulty}
                    </p>

                    <p>
                        <strong>Format:</strong> {workshop.format}
                    </p>

                    <p>
                        <strong>Price:</strong>{" "}
                        {workshop.price} UAH
                    </p>

                    <p>
                        <strong>Maximum participants:</strong>{" "}
                        {workshop.maxParticipants}
                    </p>

                    <p>
                        <strong>Availability:</strong>{" "}
                        {workshop.isAvailable
                            ? "Available"
                            : "Unavailable"}
                    </p>

                    <div className="workshop-details-materials">
                        <strong>Materials:</strong>

                        {workshopMaterials.length > 0 ? (
                            <ul>
                                {workshopMaterials.map((material) => (
                                    <li key={material.id}>
                                        {material.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No materials specified.</p>
                        )}
                    </div>
                </div>

                <div className="workshop-details__photo">
                    <img
                        key={workshop.id}
                        src={
                            workshop.imageUrl ||
                            "/images/placeholder.svg"
                        }
                        alt={workshop.title}
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                                "/images/placeholder.svg";
                        }}
                    />
                </div>

            </div>

            <div className="workshop-details-actions">
                <Link
                    to={`/workshops/${workshop.id}/edit`}
                    className="primary-button"
                >
                    Edit Workshop
                </Link>

                <button
                    type="button"
                    className="delete-button"
                    onClick={handleDelete}
                >
                    Delete Workshop
                </button>

                <Link to="/workshops">
                    Back to Workshops
                </Link>
            </div>

        </section>
    );
}

export default WorkshopDetailsPage;
