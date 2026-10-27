import { useNavigate } from "react-router-dom";
import { useData } from "../hooks/useData";
import { ACTION_TYPES } from "../context/actionTypes";
import WorkshopForm from "../components/WorkshopForm";

export default function CreateWorkshopPage() {
    const { state, dispatch } = useData();
    const navigate = useNavigate();

    const handleCreate = (formData) => {
        const newWorkshop = {
            ...formData,
            id: Math.max(0, ...state.workshops.map((item) => item.id)) + 1,
            imageUrl: "/images/placeholder.svg",
            isAvailable: true
        };

        dispatch({
            type: ACTION_TYPES.ITEM_CREATED,
            payload: newWorkshop
        });

        navigate("/workshops");
    };

    return (
        <section className="create-workshop-page">
            <h1>Create a Workshop</h1>
            <p>Share your creativity with others!</p>

            <WorkshopForm
                onSubmit={handleCreate}
                submitLabel="Create Workshop"
            />
        </section>
    );
}
