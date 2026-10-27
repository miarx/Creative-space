import { useParams, useNavigate, Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import { ACTION_TYPES } from "../context/actionTypes";
import WorkshopForm from "../components/WorkshopForm";

export default function EditWorkshopPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state, dispatch } = useData();

    const workshop = state.workshops.find(
        (item) => item.id === Number(id)
    );

    if (!workshop) {
        return (
            <section className="create-workshop-page">
                <h1>Workshop not found</h1>
                <Link to="/workshops">Back to Workshops</Link>
            </section>
        );
    }

    const handleUpdate = (formData) => {
        const updatedWorkshop = {
            ...workshop,
            ...formData
        };

        dispatch({
            type: ACTION_TYPES.ITEM_UPDATED,
            payload: updatedWorkshop
        });

        navigate(`/workshops/${id}`);
    };

    return (
        <section className="create-workshop-page">
            <h1>Edit Workshop</h1>
            <p>Update the details of your workshop.</p>

            <WorkshopForm
                initialData={workshop}
                onSubmit={handleUpdate}
                submitLabel="Save Changes"
            />
        </section>
    );
}
