
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../hooks/useData";
import { ACTION_TYPES } from "../context/actionTypes";

export default function CreateWorkshopPage() {
    const { state, dispatch } = useData();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        date: "",
        duration: "",
        studioId: "",
        difficulty: "Beginner",
        format: "Offline",
        maxParticipants: "",
        materialIds: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleMaterialChange = (materialId, checked) => {
        setFormData((previous) => ({
            ...previous,
            materialIds: checked
                ? [...previous.materialIds, materialId]
                : previous.materialIds.filter((id) => id !== materialId)
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newWorkshop = {
            ...formData,
            id: Math.max(0, ...state.workshops.map((item) => item.id)) + 1,
            price: Number(formData.price),
            duration: Number(formData.duration),
            studioId: Number(formData.studioId),
            maxParticipants: Number(formData.maxParticipants),
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

            <form className="workshop-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Workshop Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                />

                <label htmlFor="price">Price (UAH)</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="duration">Duration (minutes)</label>
                <input
                    id="duration"
                    type="number"
                    name="duration"
                    min="1"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="studioId">Studio</label>
                <select
                    id="studioId"
                    name="studioId"
                    value={formData.studioId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a studio</option>
                    {state.studios.map((studio) => (
                        <option key={studio.id} value={studio.id}>
                            {studio.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="difficulty">Difficulty</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <label htmlFor="format">Format</label>
                <select
                    id="format"
                    name="format"
                    value={formData.format}
                    onChange={handleChange}
                >
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                </select>

                <label htmlFor="maxParticipants">
                    Maximum Participants
                </label>
                <input
                    id="maxParticipants"
                    type="number"
                    name="maxParticipants"
                    min="1"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    required
                />

                <fieldset className="form-materials">
                    <legend>Materials</legend>
                    {state.materials.map((material) => (
                        <label key={material.id}>
                            <input
                                type="checkbox"
                                checked={formData.materialIds.includes(material.id)}
                                onChange={(event) =>
                                    handleMaterialChange(
                                        material.id,
                                        event.target.checked
                                    )
                                }
                            />
                            {material.name}
                        </label>
                    ))}
                </fieldset>

                <button type="submit" className="primary-button">
                    Create Workshop
                </button>
            </form>
        </section>
    );
}
